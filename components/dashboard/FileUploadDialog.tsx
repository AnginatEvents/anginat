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
                        a csv file (.csv or .csv utf-8). Your file must have
                        phone number with country code, name.It can also have
                        custom columns that can be imported to Anginat as
                        attriibutes. Download Sample CSV.
                    </DialogDescription>
                </DialogHeader>
                {
                    //content
                    // <Input className="h-[300px]" type="file" />
                }
                <FileDropzone uploadApiUrl={uploadApiUrl} />
            </DialogContent>
        </Dialog>
    );
};

export default FileUploadDialog;
