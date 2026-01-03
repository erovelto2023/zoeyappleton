"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";

interface ImageUploadProps {
    disabled?: boolean;
    onChange: (value: string) => void;
    onRemove: (value: string) => void;
    value: string[];
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
    disabled,
    onChange,
    onRemove,
    value,
}) => {
    // Ensure we are working with a valid array of URLs
    const urls = Array.isArray(value) ? value : [];

    return (
        <div className="space-y-4">
            {/* Image Previews */}
            {urls.length > 0 && (
                <div className="flex items-center gap-4 flex-wrap">
                    {urls.map((url) => (
                        <div key={url} className="relative w-[200px] h-[300px] rounded-md overflow-hidden border border-slate-200 shadow-sm transition hover:shadow-md">
                            <div className="z-10 absolute top-2 right-2">
                                <Button
                                    type="button"
                                    onClick={() => onRemove(url)}
                                    variant="destructive"
                                    size="icon"
                                    disabled={disabled}
                                >
                                    <Trash className="h-4 w-4" />
                                </Button>
                            </div>
                            <Image
                                fill
                                className="object-cover"
                                alt="Uploaded Image"
                                src={url}
                                unoptimized // Crucial for external URLs like UploadThing
                            />
                        </div>
                    ))}
                </div>
            )}

            {/* Upload Dropzone (Result: 1 image) */}
            {urls.length === 0 && (
                <div className="w-full max-w-sm rounded-lg overflow-hidden border border-dashed border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-slate-900 transition-colors">
                    <UploadDropzone
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {
                            if (res && res[0]) {
                                onChange(res[0].ufsUrl || res[0].url);
                                toast.success("Image uploaded successfully");
                            }
                        }}
                        onUploadError={(error: Error) => {
                            console.error(error);
                            toast.error(`Error: ${error.message}`);
                        }}
                        appearance={{
                            button: "bg-pink-600 hover:bg-pink-700 text-white font-semibold text-sm",
                            container: "p-8",
                            label: "text-gray-500 hover:text-pink-600 dark:text-gray-400",
                            allowedContent: "text-gray-400 text-xs"
                        }}
                    />
                </div>
            )}
        </div>
    );
};
