"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";

export type Invoice = {
    invoiceId: string;
    billingDate: string;
    plan: "Basic Plan" | "Growth Plan" | "Enterprise Plan";
    amount: number;
};

export const columns: ColumnDef<Invoice>[] = [
    {
        accessorKey: "invoiceId",
        header: "Invoice ID",
    },
    {
        accessorKey: "billingDate",
        header: "Billing Date",
    },
    {
        accessorKey: "plan",
        header: "Plan",
    },
    {
        accessorKey: "amount",
        header: "Amount",
    },
    {
        header: "Invoice",
        id: "invoices",
        cell: ({ row }) => {
            const invoice = row.original;
            function handleViewInvoice() {
                toast.info("Viewing invoice " + invoice.invoiceId);
            }
            return (
                <div>
                    <Button
                        onClick={handleViewInvoice}
                        variant="outline"
                        className="rounded-full text-zinc-600"
                    >
                        Download
                    </Button>
                </div>
            );
        },
    },
];
