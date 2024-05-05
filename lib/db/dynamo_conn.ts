"use server";

import {
    GetItemCommand,
    PutItemCommand,
    QueryCommand,
    UpdateItemCommand,
    UpdateItemCommandInput,
} from "@aws-sdk/client-dynamodb";
import { v4 as uuid } from "uuid";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { generatePassword, isValidPassword } from "@/lib/auth/password_utils";
import { db } from "./db";
import { QueryCommandInput } from "@aws-sdk/lib-dynamodb";

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
    try {
        const userExists = await getUserByEmail(email);
        if (userExists) {
            console.log("CreateUser: User already exists in Dynamo db");
            return { success: false, message: "Email already exists" };
        }
    } catch (error) {
        console.error("CreateUser: Error fetching user by email", error);
        return { success: true, message: "Error fetching user by email" };
    }
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
            firstName: { S: name.split(" ")[0] },
            // Internal details for the table
            type: { S: "USER" },
            id: { S: userId },
            pk: { S: `USER#${userId}` },
            sk: { S: `USER#${userId}` },
            GSI1PK: { S: `USER#${email}` },
            GSI1SK: { S: `USER#${email}` },
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
            return { success: true, message: "User created successfully" };
        } else {
            console.log("CreateUser: Unexpected response from Dynamo db");
            return { success: false, message: "Error creating user" };
        }
    } catch (error) {
        console.error("CreateUser: Error creating new user in DynamoDB", error);
        return { success: false, message: "Error creating user" };
    }
};

export const getUserByEmail = async (email: string) => {
    const params: QueryCommandInput = {
        TableName: "user-auth",
        IndexName: "GSI1",
        KeyConditionExpression: "#gsi1pk = :gsi1pk AND #gsi1sk = :gsi1sk",
        ExpressionAttributeNames: {
            "#gsi1pk": "GSI1PK",
            "#gsi1sk": "GSI1SK",
        },
        ExpressionAttributeValues: {
            ":gsi1pk": { S: `USER#${email}` },
            ":gsi1sk": { S: `USER#${email}` },
        },
    };
    try {
        const command = new QueryCommand(params);
        const dbResponse = await db.send(command);
        if (!dbResponse.Count) {
            console.log(
                "GetUserByEmail: No item found in Dynamo db for:  ",
                email,
            );
            return null;
        }
        console.log("GetUserByEmail: ");
        const data = unmarshall(dbResponse.Items![0]);
        console.log(
            "GetUserByEmail: Item successfully retrieved from Dynamo db: ",
            data,
        );
        return data;
    } catch (e) {
        console.error("GetUserByEmail: Error fetching user by email", e);
        throw new Error("Error fetching user by email");
    }
};

export const verifyUser = async (email: string, password: string) => {
    try {
        const userdata = await getUserByEmail(email);
        if (!userdata) {
            console.log("VerifyUser: User not found in Dynamo db");
            return null;
        }
        // Return the item if it exists
        console.log("VerifyUser: Item successfully retrieved from Dynamo db");
        if (!userdata.hashstring || !userdata.salt) {
            console.log("VerifyUser: Hash or salt not found in Dynamo db");
            return null;
        }
        const isValid = isValidPassword(
            password,
            userdata.hashstring,
            userdata.salt,
        );
        if (isValid) {
            console.log("VerifyUser: User verified successfully");
            console.log("Userdata: ", userdata);
            return userdata;
        }
        console.log("VerifyUser: User verification failed");
        return null;
    } catch (error) {
        console.error("VerifyUser: Error fetching item from Dynamo db", error);
        return null;
    }
};

export const updateUser = async (email: string, rolename: string) => {
    let params: UpdateItemCommandInput = {
        TableName: "user_auth",
        Key: {
            email: { S: email.toString() },
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
//             email: { S: email },
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
