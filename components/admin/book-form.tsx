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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const formSchema = z.object({
    title: z.string().min(1, "Title is required"),
    coverImage: z.string().min(1, "Cover Image URL is required"),
    blurb: z.string().min(1, "Blurb is required"),
    amazon: z.string().optional(),
    kobo: z.string().optional(),
    apple: z.string().optional(),
    google: z.string().optional(),
    direct: z.string().optional(),
    series: z.string().optional(),
    seriesOrder: z.coerce.number().optional(),
    heatLevel: z.coerce.number().min(1).max(5).optional(),
    rating: z.coerce.number().min(0).max(5).optional(),
    releaseDate: z.string().optional(),
    tropes: z.string().optional(),
    reviews: z.array(z.object({
        user: z.string().min(1, "Name required"),
        rating: z.coerce.number().min(0).max(5),
        text: z.string().min(1, "Review text required"),
        date: z.string().optional(),
        source: z.string().optional()
    })).optional()
});

type FormValues = z.infer<typeof formSchema>;

interface BookFormProps {
    initialData?: any;
}

export const BookForm: React.FC<BookFormProps> = ({ initialData }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const title = initialData ? "Edit Book" : "Create Book";
    const description = initialData ? "Edit book details." : "Add a new book to your catalog.";
    const toastMessage = initialData ? "Book updated." : "Book created.";
    const action = initialData ? "Save changes" : "Create";

    const defaultValues: FormValues = initialData ? {
        title: initialData.title,
        coverImage: initialData.coverImage,
        blurb: initialData.blurb,
        amazon: initialData.buyLinks?.amazon || "",
        kobo: initialData.buyLinks?.kobo || "",
        apple: initialData.buyLinks?.apple || "",
        google: initialData.buyLinks?.google || "",
        direct: initialData.buyLinks?.direct || "",
        series: initialData.series || "",
        seriesOrder: initialData.seriesOrder || 1,
        heatLevel: initialData.heatLevel || 1,
        rating: initialData.rating || 0,
        tropes: initialData.tropes?.join(", ") || "",
        releaseDate: initialData.releaseDate ? new Date(initialData.releaseDate).toISOString().split('T')[0] : "",
        reviews: initialData.reviews || [],
    } : {
        title: "",
        coverImage: "",
        blurb: "",
        amazon: "",
        kobo: "",
        apple: "",
        google: "",
        direct: "",
        series: "",
        seriesOrder: 1,
        heatLevel: 1,
        rating: 0,
        releaseDate: "",
        tropes: "",
        reviews: [],
    };

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema) as any,
        defaultValues,
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "reviews",
    });

    const onSubmit = async (data: FormValues) => {
        try {
            setLoading(true);
            const payload = {
                ...data,
                buyLinks: {
                    amazon: data.amazon,
                    kobo: data.kobo,
                    apple: data.apple,
                    google: data.google,
                    direct: data.direct,
                },
                tropes: data.tropes ? data.tropes.split(",").map((t) => t.trim()) : [],
                reviews: data.reviews,
            };

            if (initialData) {
                await axios.put(`/api/books/${initialData._id}`, payload);
            } else {
                await axios.post(`/api/books`, payload);
            }
            router.refresh();
            router.push(`/admin/books`);
            toast.success(toastMessage);
        } catch (error: any) {
            console.error(error);
            toast.error("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    const onDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(`/api/books/${initialData._id}`);
            router.refresh();
            router.push(`/admin/books`);
            toast.success("Book deleted.");
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Book Title" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="coverImage"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Cover Image</FormLabel>
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
                    </div>
                    <FormField
                        control={form.control}
                        name="blurb"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Blurb</FormLabel>
                                <FormControl>
                                    <Textarea disabled={loading} rows={5} placeholder="Book description..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="series"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Series Name</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="The Billionaire..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="seriesOrder"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Series Order</FormLabel>
                                    <FormControl>
                                        <Input type="number" disabled={loading} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="releaseDate"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Release Date</FormLabel>
                                    <FormControl>
                                        <Input type="date" disabled={loading} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <FormField
                            control={form.control}
                            name="heatLevel"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Heat Level (1-5)</FormLabel>
                                    <FormControl>
                                        <Input type="number" min={1} max={5} disabled={loading} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="rating"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Rating (0-5)</FormLabel>
                                    <FormControl>
                                        <Input type="number" min={0} max={5} step="0.1" disabled={loading} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="tropes"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tropes (comma separated)</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Enemies to Lovers, Fake Dating..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Reviews</CardTitle>
                            <Button type="button" variant="outline" size="sm" onClick={() => append({ user: "", rating: 5, text: "", source: "", date: new Date().toISOString().split('T')[0] })}>
                                <Plus className="h-4 w-4 mr-2" /> Add Review
                            </Button>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {fields.map((field, index) => (
                                <div key={field.id} className="p-4 border rounded-md relative bg-slate-50 dark:bg-slate-900">
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                                        onClick={() => remove(index)}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-8">
                                        <FormField
                                            control={form.control}
                                            name={`reviews.${index}.user`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Reviewer Name</FormLabel>
                                                    <FormControl><Input {...field} placeholder="Jane Doe" /></FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name={`reviews.${index}.source`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Source</FormLabel>
                                                    <FormControl><Input {...field} placeholder="Amazon, Goodreads..." /></FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name={`reviews.${index}.rating`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Rating</FormLabel>
                                                    <FormControl><Input type="number" min={0} max={5} step="0.1" {...field} /></FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name={`reviews.${index}.date`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Date</FormLabel>
                                                    <FormControl><Input type="date" {...field} /></FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <div className="col-span-full">
                                            <FormField
                                                control={form.control}
                                                name={`reviews.${index}.text`}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Review Text</FormLabel>
                                                        <FormControl><Textarea rows={3} {...field} placeholder="This book was amazing..." /></FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="pt-6">
                            <h3 className="text-lg font-medium mb-4">Buy Links</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="amazon"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Amazon</FormLabel>
                                            <FormControl>
                                                <Input disabled={loading} {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="kobo"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Kobo</FormLabel>
                                            <FormControl>
                                                <Input disabled={loading} {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                {/* Other links */}
                                <FormField
                                    control={form.control}
                                    name="apple"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Apple Books</FormLabel>
                                            <FormControl>
                                                <Input disabled={loading} {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="google"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Google Play</FormLabel>
                                            <FormControl>
                                                <Input disabled={loading} {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="direct"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Direct Store</FormLabel>
                                            <FormControl>
                                                <Input disabled={loading} {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
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
