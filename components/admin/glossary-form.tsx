"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { updateGlossaryTerm, deleteGlossaryTerm } from "@/lib/actions/glossary";
import toast from "react-hot-toast";

export function GlossaryForm({ initialData }: { initialData: any }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [formData, setFormData] = useState({
        keyword: initialData.keyword || "",
        hook: initialData.hook || "",
        definition: initialData.definition || "",
        whyWeLoveIt: initialData.whyWeLoveIt || "",
        subGenreVariations: initialData.subGenreVariations || "",
        heatLevel: initialData.heatLevel || "",
        redFlags: initialData.redFlags || "",
        microTropes: initialData.microTropes?.join(", ") || "",
        relatedTropes: initialData.relatedTropes?.join(", ") || "",
        seoKeywords: initialData.seoKeywords?.join(", ") || "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const processedData = {
            ...formData,
            microTropes: formData.microTropes.split(",").map(s => s.trim()).filter(Boolean),
            relatedTropes: formData.relatedTropes.split(",").map(s => s.trim()).filter(Boolean),
            seoKeywords: formData.seoKeywords.split(",").map(s => s.trim()).filter(Boolean),
        };

        const result = await updateGlossaryTerm(initialData._id, processedData);

        if (result.success) {
            toast.success("Term updated successfully!");
            router.push("/admin/glossary");
        } else {
            toast.error(result.error || "Failed to update term");
        }
        setIsLoading(false);
    };

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this term?")) return;
        setIsDeleting(true);
        const result = await deleteGlossaryTerm(initialData._id);
        if (result.success) {
            toast.success("Term deleted!");
            router.push("/admin/glossary");
        } else {
            toast.error(result.error || "Failed to delete term");
            setIsDeleting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label>Keyword / Term Name</Label>
                    <Input name="keyword" value={formData.keyword} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                    <Label>Heat Level</Label>
                    <Input name="heatLevel" value={formData.heatLevel} onChange={handleChange} />
                </div>
            </div>

            <div className="space-y-2">
                <Label>The Hook (1-sentence vibe)</Label>
                <Input name="hook" value={formData.hook} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
                <Label>Definition</Label>
                <Textarea name="definition" value={formData.definition} onChange={handleChange} required className="min-h-[100px]" />
            </div>

            <div className="space-y-2">
                <Label>Why We Love It</Label>
                <Textarea name="whyWeLoveIt" value={formData.whyWeLoveIt} onChange={handleChange} className="min-h-[80px]" />
            </div>

            <div className="space-y-2">
                <Label>Sub-Genre Variations</Label>
                <Textarea name="subGenreVariations" value={formData.subGenreVariations} onChange={handleChange} className="min-h-[80px]" />
            </div>

            <div className="space-y-2">
                <Label>Red Flags / Content Warnings</Label>
                <Input name="redFlags" value={formData.redFlags} onChange={handleChange} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                    <Label>Micro-Tropes (comma separated)</Label>
                    <Textarea name="microTropes" value={formData.microTropes} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                    <Label>Related Tropes (comma separated)</Label>
                    <Textarea name="relatedTropes" value={formData.relatedTropes} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                    <Label>SEO Keywords (comma separated)</Label>
                    <Textarea name="seoKeywords" value={formData.seoKeywords} onChange={handleChange} />
                </div>
            </div>

            <div className="flex justify-between items-center pt-6 border-t border-white/10">
                <Button type="button" variant="destructive" onClick={handleDelete} disabled={isDeleting || isLoading}>
                    {isDeleting ? "Deleting..." : "Delete Term"}
                </Button>
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Saving..." : "Save Changes"}
                </Button>
            </div>
        </form>
    );
}
