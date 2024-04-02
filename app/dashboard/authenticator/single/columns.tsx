"use client";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { ColumnDef } from "@tanstack/react-table";
import { TimerReset, Trash2 } from "lucide-react";

export type clientSideCode = {
    code: string;
    lastCheckedDate: string;
    lastCheckedTime: string;
    uploaded: string;
    checked: number;
};

export const columns: ColumnDef<clientSideCode>[] = [
    {
        accessorKey: "code",
        header: "Code",
    },
    {
        // TODO: Format shit here instead of in page
        accessorKey: "lastCheckedDate",
        header: "Checked Date",
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
