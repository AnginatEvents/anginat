import { getCodes } from "./data";

export async function GET(req: Request) {
    const res = await getCodes();
    const data = JSON.stringify(res);
    return Response.json(data);
}
