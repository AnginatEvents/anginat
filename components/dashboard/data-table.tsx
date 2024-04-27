"use client";

import {
    ColumnDef,
    flexRender,
    SortingState,
    ColumnFiltersState,
    getFilteredRowModel,
    getSortedRowModel,
    getPaginationRowModel,
    getCoreRowModel,
    useReactTable,
    RowSelectionState,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
    ChevronFirst,
    ChevronLast,
    ChevronLeft,
    ChevronRight,
    Download,
    Eye,
    TimerReset,
    Trash2,
    Upload,
} from "lucide-react";
import FileUploadDialog from "@/components/dashboard/FileUploadDialog";
import Link from "next/link";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    uploadApiUrl?: string;
    demoUrl?: string;
}

export function DataTable<TData, TValue>({
    columns,
    data,
    uploadApiUrl,
    demoUrl,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onRowSelectionChange: setRowSelection,
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting,
            columnFilters,
            rowSelection,
        },
    });

    return (
        <div className="px-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center py-4">
                    <Input
                        placeholder="Filter codes..."
                        value={
                            (table
                                .getColumn("code")
                                ?.getFilterValue() as string) ?? ""
                        }
                        onChange={(event) =>
                            table
                                .getColumn("code")
                                ?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm"
                    />
                    <Button
                        variant="outline"
                        onClick={() => {
                            table
                                .getFilteredSelectedRowModel()
                                .rows.forEach((row) => {
                                    toast.info("Attempting to delete", {
                                        // @ts-expect-error
                                        description: row.original.code,
                                    });
                                });
                        }}
                        className="mx-0 ml-2 rounded-none"
                    >
                        <Trash2 /> Delete
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => {
                            table
                                .getFilteredSelectedRowModel()
                                .rows.forEach((row) => {
                                    toast.info("Attempting to reset", {
                                        // @ts-expect-error
                                        description: row.original.code,
                                    });
                                });
                        }}
                        className="ml-2 rounded-none"
                    >
                        <TimerReset /> Reset
                    </Button>
                </div>
                <div>
                    <Button variant="outline" className="mr-0 rounded-none">
                        <Upload className="text-red-400" /> Export
                    </Button>
                    <FileUploadDialog uploadApiUrl={uploadApiUrl}>
                        <Button
                            variant="outline"
                            className="mr-1.5 rounded-none"
                        >
                            <Download className="text-green-400" /> Import
                        </Button>
                    </FileUploadDialog>
                    <Button className="rounded-sm" asChild>
                        <Link href={demoUrl || ""}>
                            <Eye /> User Demo
                        </Link>
                    </Button>
                </div>
            </div>
            <div className="w-full rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext(),
                                              )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            className="py-2.5"
                                            key={cell.id}
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end gap-2 pt-1">
                <Select
                    onValueChange={(e) => {
                        table.setPageSize(Number(e));
                    }}
                >
                    Rows per page:
                    <SelectTrigger className="w-20">
                        <SelectValue>
                            {table.getState().pagination.pageSize}
                        </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                        {[5, 10, 15, 20, 50].map((pageSize) => (
                            <SelectItem
                                key={pageSize}
                                value={pageSize.toString()}
                            >
                                {pageSize}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <span className="flex items-center gap-1">
                    <span>
                        {table.getState().pagination.pageIndex + 1} of{" "}
                        {table.getPageCount().toLocaleString()}
                    </span>
                </span>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => table.firstPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    <ChevronFirst />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    <ChevronLeft />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    <ChevronRight />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => table.lastPage()}
                    disabled={!table.getCanNextPage()}
                >
                    <ChevronLast />
                </Button>
            </div>
        </div>
    );
}
