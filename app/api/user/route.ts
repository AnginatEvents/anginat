import { checkUserExists, createUser } from "@/lib/db/dynamo_conn";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, password } = body;
        // Check if user exists
        const userExists = await checkUserExists(email);
        if (userExists) {
            return NextResponse.json(
                { message: "User already exists" },
                { status: 409 },
            );
        }
        const createUserSuccess = await createUser(email, password);
        if (createUserSuccess) {
            return NextResponse.json(
                { message: "User created successfully" },
                { status: 201 },
            );
        }
    } catch (error) {
        console.error("Failed to check for existing user: ", error);
    }
}
