"use server";

import {
    GetItemCommand,
    PutItemCommand,
    UpdateItemCommand,
    UpdateItemCommandInput,
} from "@aws-sdk/client-dynamodb";
import { v4 as uuid } from "uuid";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { generatePassword, isValidPassword } from "@/lib/auth/password_utils";
import { db } from "./db";

export const createUser = async ({
    email,
    password,
    phone,
    name,
}: {
    email: string;
    password: string;
    phone: string;
    name: string;
}) => {
    const userId = uuid();
    let newSaltHash = generatePassword(password);

    let params = {
        TableName: "user-auth",
        Item: {
            name: { S: name },
            phone: { S: phone },
            email: { S: email.toString() },
            salt: { S: newSaltHash.salt },
            hashstring: { S: newSaltHash.hashstring },
            role: { S: "basic" },
            // Internal details for the table
            type: { S: "USER" },
            pk: { S: `USER#${userId}` },
            sk: { S: `USER#${userId}` },
            GSI1PK: { S: `USER#${userId}` },
            GSI1SK: { S: `USER#${userId}` },
            provider: { S: "credentials" },
        },
    };

    try {
        const putItemCommand = new PutItemCommand(params);
        let putitemResponse = await db.send(putItemCommand);

        if (
            putitemResponse &&
            putitemResponse.$metadata.httpStatusCode === 200
        ) {
            console.log("CreateUser: Item successfully added to Dynamo db");
            return true;
        } else {
            console.log("CreateUser: Unexpected response from Dynamo db");
            return false;
        }
    } catch (error) {
        console.error("CreateUser: Error creating new user in DynamoDB", error);
        throw error;
    }
};

export const verifyUser = async (username: string, password: string) => {
    let params = {
        TableName: "user-auth",
        Key: {
            username: { S: username.toString() },
        },
    };

    try {
        const getItemCommand = new GetItemCommand(params);
        const dbResponse = await db.send(getItemCommand);

        if (!dbResponse || !dbResponse.Item) {
            console.log(
                "VerifyUser: No item found in Dynamo db for:  ",
                username,
            );
            return null;
        }
        // Return the item if it exists
        console.log("VerifyUser: Item successfully retrieved from Dynamo db");
        const userdata = unmarshall(dbResponse.Item);
        const isValid = isValidPassword(
            password,
            userdata.hashstring,
            userdata.salt,
        );
        return isValid;
    } catch (error) {
        console.error("VerifyUser: Error fetching item from Dynamo db", error);
        throw error;
    }
};

export const updateUser = async (username: string, rolename: string) => {
    let params: UpdateItemCommandInput = {
        TableName: "user_auth",
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
        let updateItemCommandResponse = await db.send(updateItemCommand);

        if (
            updateItemCommandResponse &&
            updateItemCommandResponse.$metadata.httpStatusCode === 200
        ) {
            console.log("UpdateUser: Item successfully updated in Dynamo db");
            return true;
        } else {
            console.log("UpdateUser: Unexpected response from Dynamo db");
            return false;
        }
    } catch (error) {
        console.error("UpdateUser: Error updating item from Dynamo db", error);
        throw error;
    }
};

// export const checkUserExists = async (email: string) => {
//     let params = {
//         TableName: "users-auth",
//         Key: {
//             username: { S: email },
//         },
//     };

//     try {
//         const command = new GetItemCommand(params);
//         const response = await db.send(command);
//         if (response && response.Item) {
//             return true;
//         }
//     } catch (error) {
//         console.error(
//             "CheckUserExists: Error getting item from Dynamo db",
//             error,
//         );
//         throw error;
//     }
//     return false;
// };
