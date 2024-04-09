"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { TimerReset, Trash2 } from "lucide-react";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { DualCode } from "@/app/api/db/data";

export const columns: ColumnDef<DualCode>[] = [
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
        accessorKey: "primaryCode",
        header: "Primary Code",
        cell: ({ row }) => {
            const code = row.getValue("primaryCode") as string;
            return <div className="flex items-center">{code}</div>;
        },
    },
    {
        accessorKey: "secondaryCode",
        header: "Secondary Code",
        cell: ({ row }) => {
            const code = row.getValue("secondaryCode") as string;
            return <div className="flex items-center">{code}</div>;
        },
    },
    {
        // TODO: Format shit here instead of in page
        accessorKey: "lastChecked",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="px-0"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Checked Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const checkedDate: Date = row.getValue("lastChecked");
            const checkedDateString = checkedDate.toLocaleDateString("en-GB");
            return <div className="flex items-center">{checkedDateString}</div>;
        },
    },
    {
        // TODO: Format shit here instead of in page.tsx
        accessorKey: "lastChecked",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="px-0"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Checked Time
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const checkedDate: Date = row.getValue("lastChecked");
            const checkedDateString = checkedDate.toLocaleTimeString("en-GB");
            return <div className="flex items-center">{checkedDateString}</div>;
        },
    },
    {
        accessorKey: "uploaded",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="px-0"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Uploaded
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const uploaded: Date = row.getValue("uploaded");
            const uploadedDate = uploaded.toLocaleDateString("en-GB");

            return <div className="flex items-center">{uploadedDate}</div>;
        },
    },
    {
        accessorKey: "checked",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost_text_left"
                    className="px-0"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Access Time
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
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
                        variant="ghost_text_left"
                        className="px-1"
                        onClick={() => {
                            alert(`Delete pressed for  ${payment.primaryCode}`);
                        }}
                    >
                        <Trash2 className="text-red-500" />
                    </Button>
                    <Button
                        variant="ghost"
                        className="px-1"
                        onClick={() => {
                            alert(`Reload pressed for  ${payment.primaryCode}`);
                        }}
                    >
                        <TimerReset className="text-blue-500" />
                    </Button>
                </div>
            );
        },
    },
];
