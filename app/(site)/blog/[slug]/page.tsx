import { notFound } from "next/navigation";
import { Calendar, Tag, ArrowLeft } from "lucide-react";
import Link from "next/link";
import dbConnect from "@/lib/db";
import Post from "@/models/Post";
import { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import mongoose from "mongoose";

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    await dbConnect();
    let post = null;
    try {
        post = await Post.findOne({ slug: params.slug });
        if (!post && mongoose.Types.ObjectId.isValid(params.slug)) {
            post = await Post.findById(params.slug);
        }
    } catch (e) {
        // error
    }

    if (!post) {
        return {
            title: "Post Not Found",
        };
    }

    return {
        title: post.title,
        description: post.excerpt,
    };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
    await dbConnect();

    let post;
    try {
        post = await Post.findOne({ slug: params.slug });
        if (!post && mongoose.Types.ObjectId.isValid(params.slug)) {
            post = await Post.findById(params.slug);
        }
    } catch (error) {
        notFound();
    }

    if (!post || (!post.isPublished && process.env.NODE_ENV === 'production')) {
        if (!post) notFound();
    }

    const formattedDate = post.publishedAt
        ? new Date(post.publishedAt).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
        : 'Draft';

    const tags = post.tags || [];

    return (
        <article className="min-h-screen bg-midnight pt-32 pb-20">
            {/* Header */}
            <header className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
                <Link
                    href="/blog"
                    className="inline-flex items-center text-gold hover:text-white mb-8 text-sm uppercase tracking-widest transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog
                </Link>

                <h1 className="text-4xl md:text-6xl font-serif font-bold text-cream mb-6 leading-tight">
                    {post.title}
                </h1>

                <div className="flex flex-wrap items-center justify-center gap-6 text-gray-400 text-sm">
                    <span className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {formattedDate}
                    </span>
                    {tags.length > 0 && (
                        <span className="flex items-center gap-2">
                            <Tag className="w-4 h-4" />
                            {tags.join(", ")}
                        </span>
                    )}
                </div>
            </header>

            {/* Feature Image */}
            {post.coverImage && (
                <div className="relative w-full h-auto max-w-5xl mx-auto mb-16 px-4">
                    <div className="relative w-full rounded-sm overflow-hidden shadow-2xl">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-auto max-h-[600px] object-cover mx-auto"
                        />
                    </div>
                </div>
            )}

            {/* Separator */}
            {!post.coverImage && <div className="w-24 h-1 bg-blood-rose mx-auto mb-16"></div>}

            {/* Content */}
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="prose prose-invert prose-lg max-w-none prose-headings:font-serif prose-headings:text-gold prose-a:text-blood-rose hover:prose-a:text-red-400 prose-img:rounded-md prose-img:shadow-lg">
                    <ReactMarkdown remarkPlugins={[remarkBreaks]}>{post.content}</ReactMarkdown>
                </div>
            </div>

            {/* Footer Navigation */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 pt-10 border-t border-gray-800 text-center">
                <p className="text-gray-500 italic mb-6">Thanks for reading.</p>
                <Link
                    href="/books"
                    className="inline-block bg-transparent border border-gold text-gold hover:bg-gold hover:text-midnight px-8 py-3 rounded-sm transition-all duration-300 uppercase tracking-widest text-sm font-bold"
                >
                    Explore My Books
                </Link>
            </div>
        </article >
    );
}
