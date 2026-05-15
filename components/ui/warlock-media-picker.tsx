"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Image from "next/image";

interface WarlockMediaPickerProps {
    onSelect: (url: string) => void;
    children: React.ReactNode;
}

export function WarlockMediaPicker({ onSelect, children }: WarlockMediaPickerProps) {
    const [open, setOpen] = useState(false);
    const [images, setImages] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (open && images.length === 0) {
            fetchImages();
        }
    }, [open]);

    const fetchImages = async () => {
        setLoading(true);
        setError("");
        try {
            // Might need a CORS proxy if warlockpublishing.com does not allow direct fetching,
            // but we'll try fetching directly first.
            const res = await fetch("https://warlockpublishing.com/api/gallery?status=published&limit=50");
            if (!res.ok) {
                throw new Error("Failed to fetch media");
            }
            const data = await res.json();
            setImages(data.images || []);
        } catch (err: any) {
            setError(err.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    const handleSelect = (image: any) => {
        const fullUrl = `https://warlockpublishing.com${image.fileUrl}`;
        onSelect(fullUrl);
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="max-w-4xl h-[80vh] flex flex-col" aria-describedby={undefined}>
                <DialogHeader>
                    <DialogTitle>Select Warlock Publishing Media</DialogTitle>
                </DialogHeader>
                <div className="flex-1 overflow-y-auto p-4 border rounded-md bg-muted/10">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center h-full">
                            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                            <p className="mt-2 text-sm text-muted-foreground">Loading media...</p>
                        </div>
                    ) : error ? (
                        <div className="text-center text-red-500">{error}</div>
                    ) : images.length === 0 ? (
                        <div className="text-center text-muted-foreground">No media found.</div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {images.map((img) => (
                                <div
                                    key={img._id}
                                    className="relative aspect-square cursor-pointer rounded-md overflow-hidden border hover:border-primary transition-colors"
                                    onClick={() => handleSelect(img)}
                                >
                                    <Image
                                        src={`https://warlockpublishing.com${img.thumbnailUrl || img.fileUrl}`}
                                        alt={img.altText || img.title || "Image"}
                                        fill
                                        className="object-cover"
                                        unoptimized
                                    />
                                    <div className="absolute inset-x-0 bottom-0 bg-black/50 p-1 text-xs text-white truncate">
                                        {img.title || img.originalFilename}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
