"use server";

import dbConnect from "@/lib/db";
import GlossaryTerm from "@/models/GlossaryTerm";
import slugify from "slugify";
import { revalidatePath } from "next/cache";

export async function bulkImportTerms(termsData: any[]) {
    try {
        await dbConnect();
        
        const operations = termsData.map(term => {
            const slug = slugify(term.keyword, { lower: true, strict: true });
            return {
                updateOne: {
                    filter: { slug },
                    update: { $set: { ...term, slug } },
                    upsert: true
                }
            };
        });

        if (operations.length > 0) {
            await GlossaryTerm.bulkWrite(operations);
        }

        revalidatePath("/glossary");
        revalidatePath("/admin/glossary");
        return { success: true, count: operations.length };
    } catch (error: any) {
        console.error("Bulk import error:", error);
        return { success: false, error: error.message };
    }
}

export async function getGlossaryTerms() {
    try {
        await dbConnect();
        const terms = await GlossaryTerm.find({}).sort({ keyword: 1 }).lean();
        return JSON.parse(JSON.stringify(terms));
    } catch (error) {
        console.error("Failed to fetch glossary terms:", error);
        return [];
    }
}

export async function deleteGlossaryTerm(id: string) {
    try {
        await dbConnect();
        await GlossaryTerm.findByIdAndDelete(id);
        revalidatePath("/glossary");
        revalidatePath("/admin/glossary");
        return { success: true };
    } catch (error: any) {
        console.error("Failed to delete glossary term:", error);
        return { success: false, error: error.message };
    }
}

export async function updateGlossaryTerm(id: string, data: any) {
    try {
        await dbConnect();
        // If keyword changed, update slug
        if (data.keyword) {
            data.slug = slugify(data.keyword, { lower: true, strict: true });
        }
        await GlossaryTerm.findByIdAndUpdate(id, data, { new: true });
        revalidatePath("/glossary");
        revalidatePath("/admin/glossary");
        return { success: true };
    } catch (error: any) {
        console.error("Failed to update glossary term:", error);
        return { success: false, error: error.message };
    }
}

export async function incrementGlossaryView(slug: string) {
    try {
        await dbConnect();
        await GlossaryTerm.findOneAndUpdate(
            { slug },
            { $inc: { views: 1 } }
        );
        return { success: true };
    } catch (error) {
        console.error("Failed to increment views:", error);
        return { success: false };
    }
}
