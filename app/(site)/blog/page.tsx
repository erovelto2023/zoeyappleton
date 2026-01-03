import Link from "next/link";
import { Calendar, Tag } from "lucide-react";
import dbConnect from "@/lib/db";
import Post from "@/models/Post";

export const dynamic = 'force-dynamic';

export default async function BlogPage() {
    await dbConnect();
    const posts = await Post.find({ isPublished: true }).sort({ publishedAt: -1 });

    return (
        <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-cream mb-4">Behind the Scenes</h1>
                <div className="w-24 h-1 bg-blood-rose mx-auto"></div>
                <p className="mt-4 text-gray-400">
                    Author notes, research rabbit holes, and the music that fuels the fire.
                </p>
            </div>

            <div className="space-y-12">
                {posts.map((post) => (
                    <article key={post._id.toString()} className="bg-charcoal p-8 rounded-sm border border-gray-800 hover:border-gold transition-colors duration-300">
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                            <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {new Date(post.publishedAt).toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-1">
                                <Tag className="w-4 h-4" />
                                {post.tags.join(", ")}
                            </span>
                        </div>

                        <h2 className="text-2xl font-serif font-bold text-white mb-4 hover:text-gold transition-colors">
                            <Link href={`/blog/${post._id}`}>{post.title}</Link>
                        </h2>

                        <p className="text-gray-400 mb-6 leading-relaxed">
                            {post.excerpt}
                        </p>

                        <Link
                            href={`/blog/${post._id}`}
                            className="text-blood-rose hover:text-red-400 font-medium uppercase tracking-wider text-sm transition-colors"
                        >
                            Read More &rarr;
                        </Link>
                    </article>
                ))}
            </div>
        </div>
    );
}
