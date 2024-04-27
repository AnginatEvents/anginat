import { DataTable } from "@/components/dashboard/data-table";
import { SingleCode, getCodes } from "@/app/api/db/data";
import { columns } from "./columns";

export default async function Page() {
    const rawData = (await getCodes("single")) as SingleCode[];

    return (
        <div className="">
            <DataTable
                columns={columns}
                uploadApiUrl="/api/upload-csv/single"
                demoUrl="/dashboard/demo/single"
                data={rawData}
            />
        </div>
    );
}
