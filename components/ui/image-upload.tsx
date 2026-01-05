"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash, ImagePlus, Loader2 } from "lucide-react"; // Added Icons
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
    const [isUploading, setIsUploading] = useState(false);

    // Ensure we are working with a valid array of URLs
    const urls = Array.isArray(value) ? value : [];

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const file = e.target.files?.[0];
            if (!file) return;

            setIsUploading(true);
            const formData = new FormData();
            formData.append("file", file);

            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || "Upload failed");
            }

            const data = await response.json();
            onChange(data.url);
            toast.success("Image uploaded successfully");

        } catch (error: any) {
            console.error("Upload error:", error);
            toast.error(error.message || "Something went wrong");
        } finally {
            setIsUploading(false);
            // Reset the input value so the same file can be selected again if needed
            e.target.value = '';
        }
    };

    return (
        <div className="space-y-4">
            {/* Image Previews */}
            {urls.length > 0 && (
                <div className="flex items-center gap-4 flex-wrap">
                    {urls.map((url) => ( // Use index if URL isn't unique, but it should be
                        <div key={url} className="relative w-[200px] h-[300px] rounded-md overflow-hidden border border-slate-200 shadow-sm transition hover:shadow-md">
                            <div className="z-10 absolute top-2 right-2">
                                <Button
                                    type="button"
                                    onClick={() => onRemove(url)}
                                    variant="destructive"
                                    size="icon"
                                    disabled={disabled || isUploading}
                                >
                                    <Trash className="h-4 w-4" />
                                </Button>
                            </div>
                            <Image
                                fill
                                className="object-cover"
                                alt="Uploaded Image"
                                src={url}
                                unoptimized
                            />
                        </div>
                    ))}
                </div>
            )}

            {/* Custom File Input (replaces UploadThing) */}
            {urls.length === 0 && (
                <div className="flex items-center justify-center w-full max-w-sm">
                    <label
                        htmlFor="dropzone-file"
                        className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 ${isUploading || disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            {isUploading ? (
                                <>
                                    <Loader2 className="w-10 h-10 mb-3 text-gray-400 animate-spin" />
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">Uploading...</p>
                                </>
                            ) : (
                                <>
                                    <ImagePlus className="w-10 h-10 mb-3 text-gray-400" />
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span></p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG or GIF (MAX. 2MB)</p>
                                </>
                            )}
                        </div>
                        <input
                            id="dropzone-file"
                            type="file"
                            className="hidden"
                            onChange={handleUpload}
                            accept="image/*"
                            disabled={disabled || isUploading}
                        />
                    </label>
                </div>
            )}
        </div>
    );
};
