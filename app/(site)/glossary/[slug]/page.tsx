import { Metadata } from 'next';
import dbConnect from '@/lib/db';
import GlossaryTerm from '@/models/GlossaryTerm';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Flame, Heart, AlertTriangle } from 'lucide-react';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    await dbConnect();
    const term = await GlossaryTerm.findOne({ slug }).lean();

    if (!term) return { title: "Term Not Found" };

    return {
        title: `${term.keyword} - Romance Glossary | Zoey Appleton`,
        description: term.hook,
        keywords: term.seoKeywords || [],
    };
}

export default async function GlossaryTermPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    await dbConnect();
    
    // Fetch and increment views in one operation
    const term = await GlossaryTerm.findOneAndUpdate(
        { slug },
        { $inc: { views: 1 } },
        { new: true }
    ).lean() as any;

    if (!term) {
        notFound();
    }

    return (
        <main className="min-h-screen pt-32 pb-24 px-6 lg:px-8 max-w-5xl mx-auto">
            <Link href="/glossary" className="inline-flex items-center text-gold hover:text-white transition-colors mb-8">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Glossary
            </Link>

            <article className="space-y-12">
                {/* Header Section */}
                <header className="text-center space-y-6">
                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-white tracking-tight text-glow">
                        {term.keyword}
                    </h1>
                    <p className="text-2xl md:text-3xl font-serif italic text-gold/90 max-w-2xl mx-auto leading-snug">
                        "{term.hook}"
                    </p>
                </header>

                <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Left Column (Primary Content) */}
                    <div className="md:col-span-2 space-y-8">
                        <section className="glass-dark p-8 rounded-3xl border border-white/5 shadow-2xl">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                                <BookOpen className="w-6 h-6 mr-3 text-gold" /> The Definition
                            </h2>
                            <div className="prose prose-invert prose-p:leading-relaxed max-w-none text-gray-300">
                                <p>{term.definition}</p>
                            </div>
                        </section>

                        <section className="glass-dark p-8 rounded-3xl border border-white/5 shadow-2xl">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                                <Heart className="w-6 h-6 mr-3 text-pink-500" /> Why We Love It
                            </h2>
                            <div className="prose prose-invert prose-p:leading-relaxed max-w-none text-gray-300">
                                <p>{term.whyWeLoveIt}</p>
                            </div>
                        </section>

                        {term.microTropes && term.microTropes.length > 0 && (
                            <section className="space-y-4">
                                <h3 className="text-xl font-bold text-white pl-4 border-l-2 border-gold">Key Micro-Tropes</h3>
                                <div className="flex flex-wrap gap-3">
                                    {term.microTropes.map((micro: string, idx: number) => (
                                        <span key={idx} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-200">
                                            {micro}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Right Column (Sidebar details) */}
                    <div className="md:col-span-1 space-y-6">
                        {term.heatLevel && (
                            <div className="glass-dark p-6 rounded-2xl border border-white/5 text-center">
                                <Flame className="w-8 h-8 mx-auto mb-3 text-orange-500" />
                                <h3 className="text-sm uppercase tracking-widest text-gray-400 mb-2">Heat Level</h3>
                                <p className="font-bold text-white text-lg">{term.heatLevel}</p>
                            </div>
                        )}

                        {term.subGenreVariations && (
                            <div className="glass-dark p-6 rounded-2xl border border-white/5">
                                <h3 className="text-sm uppercase tracking-widest text-gray-400 mb-3">Sub-Genre Vibe</h3>
                                <p className="text-sm text-gray-300">{term.subGenreVariations}</p>
                            </div>
                        )}

                        {term.relatedTropes && term.relatedTropes.length > 0 && (
                            <div className="glass-dark p-6 rounded-2xl border border-white/5">
                                <h3 className="text-sm uppercase tracking-widest text-gray-400 mb-4">Related Tropes</h3>
                                <ul className="space-y-2">
                                    {term.relatedTropes.map((related: string, idx: number) => (
                                        <li key={idx} className="text-sm text-gold hover:underline cursor-pointer">
                                            {related}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {term.redFlags && (
                            <div className="bg-red-950/30 p-6 rounded-2xl border border-red-900/50">
                                <h3 className="text-sm uppercase tracking-widest text-red-400 mb-3 flex items-center">
                                    <AlertTriangle className="w-4 h-4 mr-2" /> Red Flags
                                </h3>
                                <p className="text-sm text-red-200/80">{term.redFlags}</p>
                            </div>
                        )}
                    </div>
                </div>
            </article>
        </main>
    );
}
