"use server";

import {
    DynamoDBClient,
    GetItemCommand,
    PutItemCommand,
    UpdateItemCommand,
} from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { generatePassword, isValidPassword } from "@/lib/auth/password_utils";

const dynamodbclient = new DynamoDBClient({
    region: "us-west-2",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});

export const CreateUser = async (username: string, password: string) => {
    let newSaltHash = generatePassword(password);

    let params = {
        TableName: "users",
        Item: {
            username: { S: username.toString() },
            hashstring: { S: newSaltHash.hashstring },
            salt: { S: newSaltHash.salt },
            rolename: { S: "basic" },
        },
    };

    try {
        const putItemCommand = new PutItemCommand(params);
        let putitemResponse = await dynamodbclient.send(putItemCommand);

        if (
            putitemResponse &&
            putitemResponse.$metadata.httpStatusCode === 200
        ) {
            console.log("Item successfully added to Dynamo db");
            return true;
        } else {
            console.log("Unexpected response from Dynamo db");
            return false;
        }
    } catch (error) {
        console.error("Error creating new user in DynamoDB", error);
        throw error;
    }
};

export const UpdateUser = async (username: string, rolename: string) => {
    let params = {
        TableName: "users",
        Key: {
            username: { S: username.toString() },
        },
        UpdateExpression: "SET rolename = :rolevalue",
        ExpressionAttributeValues: {
            ":rolevalue": { S: rolename.toString() },
        },
        ReturnValues: "UPDATED_NEW",
    };

    try {
        const updateItemCommand = new UpdateItemCommand(params);
        let updateItemCommandResponse =
            await dynamodbclient.send(updateItemCommand);

        if (
            updateItemCommandResponse &&
            updateItemCommandResponse.$metadata.httpStatusCode === 200
        ) {
            console.log("Item successfully updated in Dynamo db");
            return true;
        } else {
            console.log("Unexpected response from Dynamo db");
            return false;
        }
    } catch (error) {
        console.error("Error updating item from Dynamo db", error);
        throw error;
    }
};
