import { Metadata } from "next";
import BillingDetails from "./billing-details";
import CurrentPlanSummary from "./current-plan-summary";
import { InvoiceTable } from "@/components/dashboard/InvoiceTable";
import { Invoice, columns } from "./columns";

export const metadata: Metadata = {
    title: "Billing | Anginat",
};

async function fetchInvoices(): Promise<Invoice[]> {
    // const response = await fetch("/api/invoices");
    // return response.json();

    return [
        {
            invoiceId: "A314",
            billingDate: "2021-01-01",
            plan: "Growth Plan",
            amount: 100,
        },
        {
            invoiceId: "B314",
            billingDate: "2021-02-01",
            plan: "Growth Plan",
            amount: 100,
        },
        {
            invoiceId: "Z122",
            billingDate: "2021-03-01",
            plan: "Growth Plan",
            amount: 100,
        },
    ];
}

export default async function BillingPage() {
    const data = await fetchInvoices();
    return (
        <div className="px-9">
            <div className="my-4 items-center overflow-auto bg-white px-4 py-2">
                <CurrentPlanSummary />
            </div>
            <div className="my-4 items-center overflow-auto bg-[#232B53] px-4 py-2 text-white">
                <BillingDetails />
            </div>
            <InvoiceTable columns={columns} data={data} />
        </div>
    );
}
