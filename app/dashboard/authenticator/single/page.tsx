import { DataTable } from "@/components/dashboard/data-table";
import { getCodes } from "@/app/api/db/data";
import { columns } from "./columns";

export default async function Page() {
    const rawData = await getCodes();

    return (
        <div className="">
            <DataTable columns={columns} data={rawData} />
        </div>
    );
}
