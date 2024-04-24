import { NextRequest, NextResponse } from "next/server";
import {
    DynamoDBClient,
    GetItemCommand,
    GetItemCommandOutput,
    UpdateItemInput,
    UpdateItemCommand,
} from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { db } from "@/lib/db/dynamo_conn";

export async function POST(
    req: NextRequest,
    { params }: { params: { userId: string } },
) {
    const formData = await req.formData();
    const code = formData.get("code");

    // const code = "00OQMXHALXF7";

    console.log(params);
    if (!code || typeof code !== "string") {
        return NextResponse.json(
            { error: "No code provided" },
            { status: 400 },
        );
    }
    const queryResponse = await getItemFromUserAndCode(params.userId, code);
    if (!queryResponse) {
        return NextResponse.json({ error: "No item found" }, { status: 400 });
    }
    console.log(queryResponse);
    return NextResponse.json(
        { message: "Item found", ...queryResponse },
        { status: 200 },
    );
}

async function getItemFromUserAndCode(userId: string, code: string) {
    const params = {
        TableName: "user-codes-single",
        Key: {
            pk: { S: `USER#${userId}` },
            code: { S: code },
        },
    };
    try {
        const dbResponse: GetItemCommandOutput = await db.send(
            new GetItemCommand(params),
        );
        if (dbResponse && dbResponse.Item) {
            console.log("Item successfully retrieved from Dynamo db");
            // console.log(dbResponse);
            // console.log(dbResponse.Item);
            const existingItem = dbResponse.Item;

            updateItemWithUserIdAndCode(userId, code);

            return unmarshall(dbResponse.Item);
        } else {
            console.log("No item found in Dynamo db");
            console.log(dbResponse);
        }
    } catch (error) {
        console.error(error);
    }
}

async function updateItemWithUserIdAndCode(userId: string, code: string) {
    const updateItemParams: UpdateItemInput = {
        TableName: "user-codes-single",
        Key: { pk: { S: `USER#${userId}` }, code: { S: code } },
        UpdateExpression: "SET #checked = #checked + :increment",
        ExpressionAttributeNames: {
            "#checked": "checked",
        },
        ExpressionAttributeValues: {
            ":increment": { N: "1" },
        },
        ReturnValues: "ALL_NEW",
    };
    const updateResponse = await db.send(
        new UpdateItemCommand(updateItemParams),
    );
    console.log(updateResponse);
}
