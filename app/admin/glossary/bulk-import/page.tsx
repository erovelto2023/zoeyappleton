"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Save, AlertCircle, ArrowLeft } from "lucide-react";
import { bulkImportTerms } from "@/lib/actions/glossary";
import toast from "react-hot-toast";
import Link from "next/link";

const jsonSchema = `[
  {
    "keyword": "Grumpy Billionaire",
    "hook": "The stoic titan who hates the world but would burn it down for her.",
    "definition": "A romance trope featuring an incredibly wealthy, emotionally closed-off male protagonist...",
    "whyWeLoveIt": "It appeals to the fantasy of being the sole exception to someone's emotional walls.",
    "microTropes": ["The shared umbrella", "The secret vulnerability", "The grand gesture"],
    "subGenreVariations": "Contemporary: CEO and assistant. Historical: The brooding Duke.",
    "heatLevel": "Steamy/High Heat",
    "relatedTropes": ["Enemies to Lovers", "Sunshine and Grumpy", "Billionaire Romance"],
    "redFlags": "Power imbalances, potential for controlling behavior.",
    "seoKeywords": ["grumpy billionaire romance", "billionaire trope meaning", "sunshine grumpy billionaire"]
  }
]`;

export default function BulkImportGlossaryPage() {
    const router = useRouter();
    const [jsonInput, setJsonInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleCopySchema = () => {
        navigator.clipboard.writeText(jsonSchema);
        toast.success("AI JSON Schema copied to clipboard!");
    };

    const handleImport = async () => {
        if (!jsonInput.trim()) {
            toast.error("Please paste your JSON array first.");
            return;
        }

        try {
            const parsedData = JSON.parse(jsonInput);
            if (!Array.isArray(parsedData)) {
                toast.error("Invalid format: Must be a JSON array.");
                return;
            }

            setIsLoading(true);
            const result = await bulkImportTerms(parsedData);

            if (result.success) {
                toast.success(`Successfully imported ${result.count} terms!`);
                setJsonInput("");
                router.push("/admin/glossary");
            } else {
                toast.error("Failed to import: " + result.error);
            }
        } catch (error) {
            toast.error("Invalid JSON syntax. Please check the format.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-8 space-y-6 max-w-5xl mx-auto">
            <div className="flex items-center gap-4">
                <Link href="/admin/glossary">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                </Link>
                <h2 className="text-3xl font-bold tracking-tight">Bulk Import Glossary</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Instructions</CardTitle>
                            <CardDescription>How to use this tool</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 text-sm text-muted-foreground">
                            <p>1. Copy the exact AI JSON Schema using the button below.</p>
                            <p>2. Ask your AI to generate romance terms using your "Ultimate Romance Glossary Prompt" AND the copied schema.</p>
                            <p>3. Copy the AI's JSON array output and paste it into the editor.</p>
                            <p>4. Click Import Terms.</p>
                            <Button variant="secondary" className="w-full mt-2" onClick={handleCopySchema}>
                                <Copy className="w-4 h-4 mr-2" /> Copy AI Schema
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="bg-amber-500/10 border-amber-500/20">
                        <CardHeader>
                            <CardTitle className="text-amber-600 dark:text-amber-400 flex items-center">
                                <AlertCircle className="w-5 h-5 mr-2" /> Important
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm text-amber-700 dark:text-amber-300">
                            Ensure the AI outputs a valid JSON Array `[ {...} ]`. If a keyword already exists, it will be updated with the new information.
                        </CardContent>
                    </Card>
                </div>

                <div className="md:col-span-2">
                    <Card className="h-full flex flex-col">
                        <CardHeader>
                            <CardTitle>JSON Editor</CardTitle>
                            <CardDescription>Paste the generated JSON array here</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 flex flex-col gap-4">
                            <Textarea 
                                className="flex-1 min-h-[400px] font-mono text-xs" 
                                placeholder="[ { ... } ]"
                                value={jsonInput}
                                onChange={(e) => setJsonInput(e.target.value)}
                            />
                            <div className="flex justify-end">
                                <Button onClick={handleImport} disabled={isLoading}>
                                    <Save className="w-4 h-4 mr-2" /> {isLoading ? "Importing..." : "Import Terms"}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
