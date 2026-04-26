import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import dbConnect from "@/lib/db";
import GlossaryTerm from "@/models/GlossaryTerm";
import { notFound } from "next/navigation";
import { GlossaryForm } from "@/components/admin/glossary-form";

export default async function EditGlossaryTermPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    await dbConnect();
    const term = await GlossaryTerm.findById(id).lean();

    if (!term) {
        notFound();
    }

    return (
        <div className="p-8 space-y-6 max-w-4xl mx-auto">
            <div className="flex items-center gap-4">
                <Link href="/admin/glossary">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                </Link>
                <h2 className="text-3xl font-bold tracking-tight">Edit Glossary Term</h2>
            </div>
            
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm p-6">
                <GlossaryForm initialData={JSON.parse(JSON.stringify(term))} />
            </div>
        </div>
    );
}
