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

    // Calculate reading time
    const words = post.content?.split(/\s+/).length || 0;
    const readTime = Math.ceil(words / 200);

    return (
        <article className="min-h-screen bg-midnight text-cream">
            {/* Top Navigation */}
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Link
                    href="/blog"
                    className="inline-flex items-center text-gray-400 hover:text-gold transition-colors text-sm font-medium tracking-wide"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog
                </Link>
            </nav>

            {/* Article Header */}
            <header className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12 mt-4">
                {tags.length > 0 && (
                    <div className="text-blood-rose text-sm font-bold tracking-[0.2em] uppercase mb-6">
                        {tags[0]}
                    </div>
                )}
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-8 leading-tight">
                    {post.title}
                </h1>
                <div className="flex items-center justify-center gap-4 text-gray-400 text-base font-light">
                    <span>{formattedDate}</span>
                    <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                    <span>{readTime} min read</span>
                </div>
            </header>

            {/* Feature Image (Breakout) */}
            {post.coverImage && (
                <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 mb-16">
                    <div className="relative aspect-[21/9] w-full rounded-lg overflow-hidden shadow-2xl">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            )}

            {/* Content Column */}
            <div className="max-w-2xl mx-auto px-6">
                {/* Excerpt/Lead if explicitly used as such, otherwise just content */}
                {post.excerpt && (
                    <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-serif italic mb-12 border-l-4 border-gold pl-6">
                        {post.excerpt}
                    </p>
                )}

                <div className="prose prose-invert prose-lg max-w-none prose-p:text-xl prose-p:leading-[1.8] prose-p:text-gray-300 prose-headings:font-serif prose-headings:text-white prose-a:text-gold prose-a:no-underline hover:prose-a:underline prose-strong:text-white prose-blockquote:border-blood-rose prose-blockquote:text-gray-400 prose-li:text-gray-300">
                    <ReactMarkdown
                        remarkPlugins={[remarkBreaks]}
                        components={{
                            // Override components to enforce the Ghost look
                            p: ({ node, ...props }) => <p className="mb-8" {...props} />, // larger margins
                            img: ({ node, ...props }) => (
                                <figure className="my-10 -mx-6 md:-mx-12">
                                    <img className="w-full rounded-md shadow-lg" {...props} alt={props.alt || ""} />
                                    {props.alt && <figcaption className="text-center text-sm text-gray-500 mt-2">{props.alt}</figcaption>}
                                </figure>
                            ),
                            h2: ({ node, ...props }) => <h2 className="text-3xl font-bold mt-12 mb-6 text-white" {...props} />,
                            blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-blood-rose pl-6 my-10 italic text-2xl text-gray-400" {...props} />
                        }}
                    >
                        {post.content}
                    </ReactMarkdown>
                </div>

                {/* Separator / End of Article */}
                <div className="flex justify-center my-16">
                    <div className="text-gold text-2xl">***</div>
                </div>

                {/* Author Section */}
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8 py-12 border-t border-gray-800">
                    <div className="shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="/images/zoey.png"
                            alt="Zoey Appleton"
                            className="w-24 h-24 rounded-full border-2 border-gold object-cover"
                        />
                    </div>
                    <div className="text-center md:text-left">
                        <h4 className="text-xl font-bold text-white mb-2">Zoey Appleton</h4>
                        <p className="text-gray-400 mb-4 leading-relaxed">
                            Bestselling author of the &quot;Billionaires of Sterling City&quot; series. I write romance that burns slow and hits hard. Lover of dark chocolate, red wine, and fictional men who would burn the world down for her.
                        </p>
                        <div className="flex gap-4 justify-center md:justify-start">
                            <Link href="/books" className="text-sm font-bold text-blood-rose uppercase tracking-widest hover:text-white transition-colors">
                                Read my books
                            </Link>
                            <Link href="https://twitter.com" target="_blank" className="text-sm font-bold text-gray-500 uppercase tracking-widest hover:text-white transition-colors">
                                Twitter
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Newsletter CTA */}
            <div className="bg-charcoal py-20 mt-10">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h3 className="text-3xl font-serif font-bold text-white mb-4">Don&apos;t miss the next chapter</h3>
                    <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                        Join the inner circle. Get exclusive bonus scenes, cover reveals, and updates delivered straight to your inbox.
                    </p>
                    <Link
                        href="/newsletter"
                        className="inline-block bg-gold hover:bg-white text-midnight font-bold py-4 px-10 rounded-sm uppercase tracking-widest transition-all duration-300"
                    >
                        Subscribe Now
                    </Link>
                </div>
            </div>
        </article >
    );
}
