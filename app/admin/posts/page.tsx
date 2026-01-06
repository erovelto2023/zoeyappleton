import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Plus, Edit } from 'lucide-react';
import dbConnect from '@/lib/db';
import Post from '@/models/Post';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search } from '@/components/ui/search';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export const dynamic = 'force-dynamic';

export default async function PostsPage({
    searchParams,
}: {
    searchParams?: {
        query?: string;
    };
}) {
    await dbConnect();
    const query = searchParams?.query || "";
    const filter = query ? { title: { $regex: query, $options: "i" } } : {};

    const posts = await Post.find(filter).sort({ createdAt: -1 });

    let formattedPosts = [];
    try {
        formattedPosts = JSON.parse(JSON.stringify(posts)).map((post: any) => ({
            ...post,
            _id: post._id,
            createdAt: post.createdAt || new Date().toISOString(),
        }));
    } catch (error) {
        console.error("Failed to parse posts:", error);
        formattedPosts = [];
    }

    return (
        <div className="p-8 space-y-6">
            <div className="flex items-center justify-between gap-4">
                <h2 className="text-3xl font-bold tracking-tight">Blog Posts</h2>
                <Link href="/admin/posts/new">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> New Post
                    </Button>
                </Link>
            </div>

            <div className="w-full max-w-sm">
                <Search placeholder="Search posts..." />
            </div>

            <div className="border rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {formattedPosts.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="h-24 text-center">
                                    {query ? "No posts found matching your search." : "No blog posts found."}
                                </TableCell>
                            </TableRow>
                        ) : (
                            formattedPosts.map((post: any) => (
                                <TableRow key={post._id}>
                                    <TableCell className="font-medium">
                                        {post.title}
                                        <div className="text-xs text-muted-foreground line-clamp-1 max-w-[300px]">
                                            {post.excerpt || (post.content ? post.content.substring(0, 50) + "..." : "")}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={post.isPublished ? "default" : "secondary"}>
                                            {post.isPublished ? 'Published' : 'Draft'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {new Date(post.createdAt).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Link href={`/admin/posts/${post._id}`}>
                                            <Button variant="ghost" size="sm">
                                                <Edit className="w-4 h-4 mr-2" /> Edit
                                            </Button>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
