"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ImagePlus, Trash, UploadCloud } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";
import axios from "axios";

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
    const [isMounted, setIsMounted] = useState(false);
    const [loading, setLoading] = useState(false);

    // Hydration fix
    if (typeof window !== "undefined" && !isMounted) {
        setIsMounted(true);
    }

    const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const file = e.target.files?.[0];
            if (!file) return;

            setLoading(true);
            const formData = new FormData();
            formData.append("file", file);

            const response = await axios.post("/api/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });

            if (response.data.success) {
                onChange(response.data.url);
                toast.success("Image uploaded");
            }
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    if (!isMounted) {
        return null;
    }

    return (
        <div>
            <div className="mb-4 flex items-center gap-4">
                {value.map((url) => (
                    <div
                        key={url}
                        className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
                    >
                        <div className="z-10 absolute top-2 right-2">
                            <Button
                                type="button"
                                onClick={() => onRemove(url)}
                                variant="destructive"
                                size="icon"
                            >
                                <Trash className="h-4 w-4" />
                            </Button>
                        </div>
                        <Image fill className="object-cover" alt="Image" src={url} unoptimized />
                    </div>
                ))}
            </div>
            <div className="flex items-center gap-4">
                <Button
                    type="button"
                    disabled={disabled || loading}
                    variant="secondary"
                    onClick={() => document.getElementById("image-upload-input")?.click()}
                >
                    <ImagePlus className="h-4 w-4 mr-2" />
                    {loading ? "Uploading..." : "Upload an Image"}
                </Button>
                <input
                    id="image-upload-input"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    disabled={disabled || loading}
                    onChange={onUpload}
                />
            </div>
        </div>
    );
};
