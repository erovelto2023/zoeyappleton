import Link from "next/link";
import { Calendar, Tag } from "lucide-react";
import dbConnect from "@/lib/db";
import Post from "@/models/Post";

export const dynamic = 'force-dynamic';

export default async function BlogPage() {
    await dbConnect();
    const posts = await Post.find({ isPublished: true }).sort({ publishedAt: -1 });

    return (
        <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-cream mb-4">Behind the Scenes</h1>
                <div className="w-24 h-1 bg-blood-rose mx-auto"></div>
                <p className="mt-4 text-gray-400">
                    Author notes, research rabbit holes, and the music that fuels the fire.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {posts.length === 0 ? (
                    <div className="text-center text-gray-500 col-span-full">No posts yet. Check back soon!</div>
                ) : (
                    posts.map((post) => {
                        const tags = post.tags || [];
                        const date = post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : '';

                        return (
                            <article key={post._id.toString()} className="bg-charcoal rounded-sm border border-gray-800 hover:border-gold transition-colors duration-300 overflow-hidden group flex flex-col h-full">
                                {post.coverImage && (
                                    <Link href={`/blog/${post._id}`} className="block aspect-[3/2] overflow-hidden relative">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={post.coverImage}
                                            alt={post.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </Link>
                                )}
                                <div className="p-5 flex flex-col flex-grow">
                                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                                        {date && (
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />
                                                {date}
                                            </span>
                                        )}
                                    </div>

                                    <h2 className="text-lg font-serif font-bold text-white mb-3 hover:text-gold transition-colors line-clamp-2">
                                        <Link href={`/blog/${post._id}`}>{post.title}</Link>
                                    </h2>

                                    <p className="text-gray-400 mb-4 text-sm line-clamp-3 leading-relaxed flex-grow">
                                        {post.excerpt}
                                    </p>

                                    <Link
                                        href={`/blog/${post._id}`}
                                        className="text-blood-rose hover:text-red-400 font-medium uppercase tracking-wider text-xs transition-colors mt-auto inline-block"
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
