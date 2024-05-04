"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode } from "react";
import FileDropzone from "../Dropzone";

const FileUploadDialog = ({
    children,
    uploadApiUrl,
}: {
    children: ReactNode;
    uploadApiUrl?: string;
}) => {
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[1000px]">
                <DialogHeader>
                    <DialogTitle>Import Codes via CSV</DialogTitle>
                    <DialogDescription>
                        You can use Google Sheets or Microsoft Excel to generate
                        a csv file (.csv or .csv utf-8). Make sure the
                        Verification Code has the header &quot;code&quot; in all
                        lowercase&nbsp;
                        <a
                            className="text-blue-500 underline"
                            target="_blank"
                            rel="noopener noreferrer"
                            href="/sample.csv"
                        >
                            Download FIle
                        </a>
                        .
                    </DialogDescription>
                </DialogHeader>
                <FileDropzone uploadApiUrl={uploadApiUrl} />
            </DialogContent>
        </Dialog>
    );
};

export default FileUploadDialog;
