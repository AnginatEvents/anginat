import { NextRequest } from "next/server";
import { getCodes } from "./data";

export async function GET(req: NextRequest) {
    const requestHeaders = new Headers(req.headers);

    const codeType = requestHeaders.get("type");
    console.info(`Request for code type: ${codeType}`);

    const res = await getCodes(codeType);
    return Response.json(res);
}
