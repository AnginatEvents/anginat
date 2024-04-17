import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { options } from "../auth/[...nextauth]/options";

export async function GET() {
    const session = await getServerSession(options);
    return NextResponse.json({ session: session ?? "Not Logged In" });
}
