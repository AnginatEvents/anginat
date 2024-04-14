import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { CloudUpload, X } from "lucide-react";
import { Button } from "./ui/button";
import { DialogFooter } from "./ui/dialog";
import { toast } from "sonner";

const Dropzone: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const onDrop = (acceptedFiles: File[]) => {
        // Accept only the first accepted file (if multiple files are dropped)
        if (acceptedFiles.length > 0) {
            setSelectedFile(acceptedFiles[0]);
            toast.error("Only one file can be imported at a time");
        }
    };

    const clearFile = () => {
        setSelectedFile(null);
    };

    const sendToAPI = async () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append("file", selectedFile);

            try {
                // Send formData to your API endpoint
                const response = await axios.post(
                    "/api/upload-csv/single",
                    formData,
                );

                // Handle response (e.g., show success message)
                console.log("File uploaded successfully:", response.data);
            } catch (error) {
                console.error("Error uploading file:", error);
                // Handle error (e.g., display error message)
            }
        }
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: { "text/csv": [".csv"] },
        multiple: false,
        maxSize: 1024 * 1024 * 5, // 5MB
    });

    return (
        <>
            <div
                {...getRootProps({
                    className:
                        "dropzone h-[500px] bg-[#EEF0F8] flex flex-col items-center justify-center border-dashed border-4 border-black rounded-2xl",
                })}
            >
                <input {...getInputProps()} />
                <CloudUpload size={100} />
                <p>Choose a file or Drag & Drop it here</p>
                <p className="text-sm text-[#A9ACB4]">
                    File format must be *.csv, under 5MB
                </p>
            </div>
            {selectedFile && (
                <div>
                    <p>
                        Selected File:{" "}
                        <span>
                            <strong className="my-3 ml-4 rounded-sm bg-green-100 p-1">
                                {selectedFile.name}
                            </strong>
                            <Button
                                className="h-4 w-4 rounded-full p-0"
                                variant={"destructive"}
                                onClick={clearFile}
                            >
                                <X />
                            </Button>
                        </span>
                    </p>
                    <DialogFooter>
                        <Button
                            onClick={sendToAPI}
                            className="items-center rounded-2xl bg-[#232B53] px-20 py-4"
                            type="submit"
                        >
                            Import
                        </Button>
                    </DialogFooter>
                </div>
            )}
        </>
    );
};

export default Dropzone;
