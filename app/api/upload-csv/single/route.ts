import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

import { options } from "@/app/api/auth/[...nextauth]/options";
import { File } from "buffer";
import { Readable } from "stream";
import { parse } from "csv-parse";
import { db } from "@/lib/db/dynamo_conn";
import { BatchWriteItemCommand, WriteRequest } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";

export interface CSVRowItem {
    pk: string;
    [key: string]: string;
    uploadedOn: string;
}

export async function POST(req: NextRequest) {
    const session = await getServerSession(options);
    const formData = await req.formData();

    if (!session) {
        return NextResponse.json({ session: "Not Logged In" }, { status: 401 });
    }

    const file = formData.get("file");
    if (!file || !(file instanceof File)) {
        return NextResponse.json(
            { error: "No file uploaded" },
            { status: 400 },
        );
    }

    try {
        const csvHandler = await handleCSVandPushToDb(
            session.user.id as string,
            file,
        );
        if (csvHandler === "success") {
            return NextResponse.json(
                { message: "CSV uploaded successfully" },
                { status: 200 },
            );
        }
    } catch (e) {
        console.error("Failed to parse the CSV", e);
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 },
        );
    }

    return NextResponse.json({ session }, { status: 200 });
}

async function handleCSVandPushToDb(id: string, file: File) {
    const stream = Readable.from(file.stream());
    const parser = stream.pipe(
        parse({
            delimiter: ",",
            columns: true,
            skipEmptyLines: true,
            recordDelimiter: "\n",
        }),
    );

    const batchItems: WriteRequest[] = [];
    let rowCount = 0;

    for await (const record of parser) {
        const item: CSVRowItem = {
            pk: `USER#${id}`,
            uploadedOn: new Date().toISOString(),
            ...record,
        };
        // for (let i = 0; i < record.length; i++) {
        //     item[`column${i}`] = record[i];

        // }
        const dynamoDBItem = marshall(item);
        batchItems.push({
            PutRequest: {
                Item: dynamoDBItem,
            },
        });
        rowCount++;

        if (batchItems.length === 25) {
            const params = {
                RequestItems: {
                    "user-codes-single": batchItems,
                },
            };
            try {
                await db.send(new BatchWriteItemCommand(params));
            } catch (e) {
                console.error("Error writing to DynamoDB", e);
                throw e;
            }
            batchItems.length = 0;
        }
    }
    if (batchItems.length > 0) {
        const params = {
            RequestItems: {
                "user-codes-single": batchItems,
            },
        };

        try {
            await db.send(new BatchWriteItemCommand(params));
        } catch (error) {
            console.error("Error writing remaining batch to DynamoDB:", error);
            throw error;
        }
    }
    return "success";
}