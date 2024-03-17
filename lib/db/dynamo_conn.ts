"use server";

import {
    DynamoDBClient,
    GetItemCommand,
    PutItemCommand,
    UpdateItemCommand,
} from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { generatePassword, isValidPassword } from "@/lib/auth/password_utils";

export const db = new DynamoDBClient({
    region: "us-west-2",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});

export const checkUserExists = async (email: string) => {
    let params = {
        TableName: "users",
        Key: {
            username: { S: email },
        },
    };

    try {
        const command = new GetItemCommand(params);
        const response = await db.send(command);
        if (response && response.Item) {
            return true;
        }
    } catch (error) {
        console.error("Error getting item from Dynamo db", error);
        throw error;
    }
    return false;
};

export const createUser = async (email: string, password: string) => {
    let newSaltHash = generatePassword(password);

    let params = {
        TableName: "users",
        Item: {
            email: { S: email.toString() },
            hashstring: { S: newSaltHash.hashstring },
            salt: { S: newSaltHash.salt },
            rolename: { S: "basic" },
        },
    };

    try {
        const putItemCommand = new PutItemCommand(params);
        let putitemResponse = await db.send(putItemCommand);

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

// export const UpdateUser = async (email: string, rolename: string) => {
//     let params = {
//         TableName: "users",
//         Key: {
//             username: { S: email.toString() },
//         },
//         UpdateExpression: "SET rolename = :rolevalue",
//         ExpressionAttributeValues: {
//             ":rolevalue": { S: rolename.toString() },
//         },
//         ReturnValues: "UPDATED_NEW",
//     };

//     try {
//         const updateItemCommand = new UpdateItemCommand(params);
//         let updateItemCommandResponse = await db.send(updateItemCommand);

//         if (
//             updateItemCommandResponse &&
//             updateItemCommandResponse.$metadata.httpStatusCode === 200
//         ) {
//             console.log("Item successfully updated in Dynamo db");
//             return true;
//         } else {
//             console.log("Unexpected response from Dynamo db");
//             return false;
//         }
//     } catch (error) {
//         console.error("Error updating item from Dynamo db", error);
//         throw error;
//     }
// };
