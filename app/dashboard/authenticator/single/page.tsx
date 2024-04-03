import { DataTable } from "./data-table";
import { getCodes } from "@/app/api/db/data";
import { clientSideCode, columns } from "./columns";

const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
};

export default async function Page() {
    const rawData = await getCodes();
    const data: clientSideCode[] = rawData.map((code) => ({
        code: code.code,
        lastCheckedDate: new Date(code.lastChecked).toLocaleDateString("en-GB"),
        lastCheckedTime: new Date(code.lastChecked).toLocaleTimeString("en-GB"),
        uploaded: new Date(code.uploaded).toLocaleDateString("en-GB"),
        checked: code.checked,
    }));

    return (
        <div className="">
            <DataTable columns={columns} data={data} />
        </div>
    );
}
