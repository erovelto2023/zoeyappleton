"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import { Trash, Plus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ImageUpload } from "@/components/ui/image-upload";
import { Textarea } from "@/components/ui/textarea";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    tagline: z.string().optional(),
    image: z.string().min(1, "Image URL is required"),
    book: z.string().optional(), // ID of the book

    // Core Identity
    role: z.string().optional(),
    archetype: z.string().optional(),
    affiliation: z.string().optional(),
    status: z.string().optional(),

    // Personality
    demeanor: z.string().optional(),
    strengths: z.string().optional(), // Comma separated
    weaknesses: z.string().optional(), // Comma separated
    motivation: z.string().optional(),

    // Background
    origin: z.string().optional(),
    keyTrauma: z.string().optional(),
    secrets: z.string().optional(),

    // Narrative Arc
    beginning: z.string().optional(),
    turningPoint: z.string().optional(),
    climax: z.string().optional(),
    resolution: z.string().optional(),

    // Relationships
    relationships: z.array(z.object({
        name: z.string().min(1, "Name required"),
        description: z.string().optional()
    })).optional()
});

type FormValues = z.infer<typeof formSchema>;

interface CharacterFormProps {
    initialData?: any;
    books: { _id: string; title: string }[];
}

export const CharacterForm: React.FC<CharacterFormProps> = ({ initialData, books }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const title = initialData ? "Edit Character" : "Create Character";
    const description = initialData ? "Edit character details." : "Add a new character.";
    const toastMessage = initialData ? "Character updated." : "Character created.";
    const action = initialData ? "Save changes" : "Create";

    const defaultValues: FormValues = initialData ? {
        name: initialData.name,
        tagline: initialData.tagline || "",
        image: initialData.image,
        book: initialData.book || "",
        role: initialData.coreIdentity?.role || "",
        archetype: initialData.coreIdentity?.archetype || "",
        affiliation: initialData.coreIdentity?.affiliation || "",
        status: initialData.coreIdentity?.status || "",
        demeanor: initialData.personality?.demeanor || "",
        strengths: initialData.personality?.strengths?.join(", ") || "",
        weaknesses: initialData.personality?.weaknesses?.join(", ") || "",
        motivation: initialData.personality?.motivation || "",
        origin: initialData.background?.origin || "",
        keyTrauma: initialData.background?.keyTrauma || "",
        secrets: initialData.background?.secrets || "",
        beginning: initialData.narrativeArc?.beginning || "",
        turningPoint: initialData.narrativeArc?.turningPoint || "",
        climax: initialData.narrativeArc?.climax || "",
        resolution: initialData.narrativeArc?.resolution || "",
        relationships: initialData.relationships || [],
    } : {
        name: "",
        tagline: "",
        image: "",
        book: "",
        role: "",
        archetype: "",
        affiliation: "",
        status: "",
        demeanor: "",
        strengths: "",
        weaknesses: "",
        motivation: "",
        origin: "",
        keyTrauma: "",
        secrets: "",
        beginning: "",
        turningPoint: "",
        climax: "",
        resolution: "",
        relationships: [],
    };

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema) as any,
        defaultValues,
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "relationships",
    });

    const onSubmit = async (data: FormValues) => {
        try {
            setLoading(true);
            const payload = {
                name: data.name,
                tagline: data.tagline,
                image: data.image,
                book: data.book,
                coreIdentity: {
                    role: data.role,
                    archetype: data.archetype,
                    affiliation: data.affiliation,
                    status: data.status,
                },
                personality: {
                    demeanor: data.demeanor,
                    strengths: data.strengths ? data.strengths.split(",").map(s => s.trim()) : [],
                    weaknesses: data.weaknesses ? data.weaknesses.split(",").map(s => s.trim()) : [],
                    motivation: data.motivation,
                },
                background: {
                    origin: data.origin,
                    keyTrauma: data.keyTrauma,
                    secrets: data.secrets,
                },
                narrativeArc: {
                    beginning: data.beginning,
                    turningPoint: data.turningPoint,
                    climax: data.climax,
                    resolution: data.resolution,
                },
                relationships: data.relationships,
            };

            if (initialData) {
                await axios.put(`/api/characters/${initialData._id}`, payload);
            } else {
                await axios.post(`/api/characters`, payload);
            }
            router.refresh();
            router.push(`/admin/characters`);
            toast.success(toastMessage);
        } catch (error: any) {
            toast.error("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    const onDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(`/api/characters/${initialData._id}`);
            router.refresh();
            router.push(`/admin/characters`);
            toast.success("Character deleted.");
        } catch (error: any) {
            toast.error("Something went wrong.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
                    <p className="text-sm text-muted-foreground">{description}</p>
                </div>
                {initialData && (
                    <Button disabled={loading} variant="destructive" size="sm" onClick={onDelete}>
                        <Trash className="h-4 w-4 mr-2" /> Delete
                    </Button>
                )}
            </div>
            <Separator />

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                    {/* Basic Info */}
                    <Card>
                        <CardHeader><CardTitle>Basic Info</CardTitle></CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl><Input disabled={loading} placeholder="Character Name" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="tagline"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tagline</FormLabel>
                                        <FormControl><Input disabled={loading} placeholder="A brief quote or tagline..." {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="image"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Image</FormLabel>
                                        <FormControl>
                                            <ImageUpload
                                                value={field.value ? [field.value] : []}
                                                disabled={loading}
                                                onChange={(url) => field.onChange(url)}
                                                onRemove={() => field.onChange("")}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="book"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Associated Book</FormLabel>
                                        <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a book" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {books.map((book) => (
                                                    <SelectItem key={book._id} value={book._id}>
                                                        {book.title}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>

                    {/* Core Identity */}
                    <Card>
                        <CardHeader><CardTitle>Core Identity</CardTitle></CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="role"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Role</FormLabel>
                                        <FormControl><Input disabled={loading} placeholder="Protagonist, Antagonist..." {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="archetype"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Archetype</FormLabel>
                                        <FormControl><Input disabled={loading} placeholder="The Hero, The Mentor..." {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="affiliation"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Affiliation</FormLabel>
                                        <FormControl><Input disabled={loading} placeholder="House Stark..." {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Status</FormLabel>
                                        <FormControl><Input disabled={loading} placeholder="Alive, Deceased..." {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>

                    {/* Personality */}
                    <Card>
                        <CardHeader><CardTitle>Personality</CardTitle></CardHeader>
                        <CardContent className="grid grid-cols-1 gap-6">
                            <FormField
                                control={form.control}
                                name="demeanor"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Demeanor</FormLabel>
                                        <FormControl><Textarea disabled={loading} rows={2} {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="motivation"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Motivation</FormLabel>
                                        <FormControl><Textarea disabled={loading} rows={2} {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="strengths"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Strengths (comma separated)</FormLabel>
                                            <FormControl><Input disabled={loading} {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="weaknesses"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Weaknesses (comma separated)</FormLabel>
                                            <FormControl><Input disabled={loading} {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Background */}
                    <Card>
                        <CardHeader><CardTitle>Background</CardTitle></CardHeader>
                        <CardContent className="grid grid-cols-1 gap-6">
                            <FormField
                                control={form.control}
                                name="origin"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Origin</FormLabel>
                                        <FormControl><Textarea disabled={loading} rows={2} {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="keyTrauma"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Key Trauma</FormLabel>
                                        <FormControl><Textarea disabled={loading} rows={2} {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="secrets"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Secrets</FormLabel>
                                        <FormControl><Textarea disabled={loading} rows={2} {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>

                    {/* Narrative Arc */}
                    <Card>
                        <CardHeader><CardTitle>Narrative Arc</CardTitle></CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="beginning"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Beginning</FormLabel>
                                        <FormControl><Textarea disabled={loading} rows={3} {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="turningPoint"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Turning Point</FormLabel>
                                        <FormControl><Textarea disabled={loading} rows={3} {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="climax"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Climax</FormLabel>
                                        <FormControl><Textarea disabled={loading} rows={3} {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="resolution"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Resolution</FormLabel>
                                        <FormControl><Textarea disabled={loading} rows={3} {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>

                    {/* Relationships */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Relationships</CardTitle>
                            <Button type="button" variant="outline" size="sm" onClick={() => append({ name: "", description: "" })}>
                                <Plus className="h-4 w-4 mr-2" /> Add
                            </Button>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {fields.map((field, index) => (
                                <div key={field.id} className="flex items-start gap-4 p-4 border rounded-md">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                                        <FormField
                                            control={form.control}
                                            name={`relationships.${index}.name`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Name</FormLabel>
                                                    <FormControl><Input {...field} placeholder="Relation Name" /></FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name={`relationships.${index}.description`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Description</FormLabel>
                                                    <FormControl><Input {...field} placeholder="Relationship details..." /></FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <Button type="button" variant="ghost" size="sm" onClick={() => remove(index)}>
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Button disabled={loading} type="submit" className="w-full md:w-auto">
                        {action}
                    </Button>
                </form>
            </Form>
        </div>
    );
};
