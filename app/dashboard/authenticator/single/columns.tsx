"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { TimerReset, Trash2 } from "lucide-react";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

export type clientSideCode = {
    code: string;
    lastCheckedDate: string;
    lastCheckedTime: string;
    uploaded: string;
    checked: number;
};

export const columns: ColumnDef<clientSideCode>[] = [
    {
        id: "select",
        header: ({ table }) => {
            return (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) =>
                        table.toggleAllPageRowsSelected(!!value)
                    }
                    aria-label="Select all rows"
                />
            );
        },
        cell: ({ row }) => {
            return (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            );
        },
    },
    {
        accessorKey: "code",
        header: "Code",
    },
    {
        // TODO: Format shit here instead of in page
        accessorKey: "lastCheckedDate",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Checked Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        // TODO: Format shit here instead of in page.tsx
        accessorKey: "lastCheckedTime",
        header: "Checked Time",
    },
    {
        accessorKey: "uploaded",
        header: "Uploaded",
    },
    {
        accessorKey: "checked",
        header: "Access Time",
        cell: ({ row }) => {
            const checked = row.getValue("checked") as string;
            return (
                <div className="flex items-center">
                    <span className="ml-4 flex h-10 w-10 items-center justify-center border-green-500 bg-green-200">
                        {checked}
                    </span>
                </div>
            );
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const payment = row.original;

            return (
                <div className="flex gap-1">
                    <Button
                        variant="ghost"
                        className="px-1"
                        onClick={() => {
                            alert(`Delete pressed for  ${payment.code}`);
                        }}
                    >
                        <Trash2 className="text-red-500" />
                    </Button>
                    <Button
                        variant="ghost"
                        className="px-1"
                        onClick={() => {
                            alert(`Reload pressed for  ${payment.code}`);
                        }}
                    >
                        <TimerReset className="text-blue-500" />
                    </Button>
                </div>
            );
        },
    },
];
