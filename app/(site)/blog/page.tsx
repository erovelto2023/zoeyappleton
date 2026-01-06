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
                {posts.length === 0 ? (
                    <div className="text-center text-gray-500">No posts yet. Check back soon!</div>
                ) : (
                    posts.map((post) => {
                        const tags = post.tags || [];
                        const date = post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : '';

                        return (
                            <article key={post._id.toString()} className="bg-charcoal rounded-sm border border-gray-800 hover:border-gold transition-colors duration-300 overflow-hidden group">
                                {post.coverImage && (
                                    <Link href={`/blog/${post._id}`} className="block h-64 overflow-hidden relative">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={post.coverImage}
                                            alt={post.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </Link>
                                )}
                                <div className="p-8">
                                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                                        {date && (
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-4 h-4" />
                                                {date}
                                            </span>
                                        )}
                                        {tags.length > 0 && (
                                            <span className="flex items-center gap-1">
                                                <Tag className="w-4 h-4" />
                                                {tags.join(", ")}
                                            </span>
                                        )}
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
                                </div>
                            </article>
                        )
                    })
                )}
            </div>
        </div>
    );
}
