import dbConnect from "@/lib/db";
import Post from "@/models/Post";
import { PostForm } from "@/components/admin/post-form";

export default async function EditPostPage({ params }: { params: { id: string } }) {
    await dbConnect();

    let post = null;
    try {
        post = await Post.findById(params.id);
    } catch (e) {
        // invalid id
    }

    if (!post) {
        return <div className="p-8">Post not found</div>;
    }

    const formattedPost = {
        ...post.toObject(),
        _id: post._id.toString(),
        publishedAt: post.publishedAt ? post.publishedAt.toISOString() : null,
    };

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <PostForm initialData={formattedPost} />
        </div>
    );
}
