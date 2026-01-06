import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Plus, Edit } from 'lucide-react';
import dbConnect from '@/lib/db';
import Post from '@/models/Post';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search } from '@/components/ui/search';

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

    const formattedPosts = JSON.parse(JSON.stringify(posts)).map((post: any) => ({
        ...post,
        _id: post._id,
        createdAt: post.createdAt || new Date().toISOString(),
    }));

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

            <div className="grid gap-4">
                {formattedPosts.length === 0 ? (
                    <div className="text-center py-10 text-muted-foreground">
                        {query ? "No posts found matching your search." : "No blog posts found."}
                    </div>
                ) : (
                    formattedPosts.map((post: any) => (
                        <Card key={post._id}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-xl font-semibold">{post.title}</CardTitle>
                                <Badge variant={post.isPublished ? "default" : "secondary"}>
                                    {post.isPublished ? 'Published' : 'Draft'}
                                </Badge>
                            </CardHeader>
                            <CardContent>
                                <div className="flex justify-between items-end">
                                    <p className="text-sm text-muted-foreground line-clamp-2 max-w-[80%]">
                                        {post.excerpt || post.content.substring(0, 100)}...
                                    </p>
                                    <Link href={`/admin/posts/${post._id}`}>
                                        <Button variant="outline" size="sm">
                                            <Edit className="w-4 h-4 mr-2" /> Edit
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
