"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import { Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
    title: z.string().min(1, "Title is required"),
    content: z.string().min(1, "Content is required"),
    excerpt: z.string().optional(),
    tags: z.string().optional(),
    isPublished: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

interface PostFormProps {
    initialData?: any;
}

export const PostForm: React.FC<PostFormProps> = ({ initialData }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const title = initialData ? "Edit Post" : "Create Post";
    const description = initialData ? "Edit blog post." : "Add a new blog post.";
    const toastMessage = initialData ? "Post updated." : "Post created.";
    const action = initialData ? "Save changes" : "Create";

    const defaultValues: FormValues = initialData ? {
        title: initialData.title,
        content: initialData.content,
        excerpt: initialData.excerpt || "",
        tags: initialData.tags?.join(", ") || "",
        isPublished: initialData.isPublished,
    } : {
        title: "",
        content: "",
        excerpt: "",
        tags: "",
        isPublished: false,
    };

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema) as any,
        defaultValues,
    });

    const onSubmit = async (data: FormValues) => {
        try {
            setLoading(true);
            const payload = {
                ...data,
                tags: data.tags ? data.tags.split(",").map((t) => t.trim()) : [],
            };
            if (initialData) {
                await axios.put(`/api/posts/${initialData._id}`, payload);
            } else {
                await axios.post(`/api/posts`, payload);
            }
            router.refresh();
            router.push(`/admin/posts`);
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
            await axios.delete(`/api/posts/${initialData._id}`);
            router.refresh();
            router.push(`/admin/posts`);
            toast.success("Post deleted.");
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
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input disabled={loading} placeholder="Post Title" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Content</FormLabel>
                                <FormControl>
                                    <Textarea disabled={loading} rows={10} placeholder="Write your post..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <FormField
                            control={form.control}
                            name="tags"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tags (comma separated)</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="News, Update,..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="isPublished"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                    <FormControl>
                                        <input
                                            type="checkbox"
                                            checked={field.value}
                                            onChange={field.onChange}
                                            disabled={loading}
                                            className="h-4 w-4 accent-pink-500"
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>
                                            Published?
                                        </FormLabel>
                                        <FormDescription>
                                            Check to make this post visible on the site.
                                        </FormDescription>
                                    </div>
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name="excerpt"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Excerpt (Optional)</FormLabel>
                                <FormControl>
                                    <Textarea disabled={loading} rows={3} placeholder="Short summary..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button disabled={loading} type="submit">
                        {action}
                    </Button>
                </form>
            </Form>
        </div>
    );
};
