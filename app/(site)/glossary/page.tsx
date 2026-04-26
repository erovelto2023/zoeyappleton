import dbConnect from "@/lib/db";
import GlossaryTerm from "@/models/GlossaryTerm";
import Link from "next/link";

export const metadata = {
    title: "Romance Glossary | Zoey Appleton",
    description: "The ultimate directory of romance tropes, keywords, and their deep psychological appeal.",
};

export const dynamic = 'force-dynamic';

export default async function GlossaryIndexPage() {
    await dbConnect();
    const terms = await GlossaryTerm.find({}).sort({ keyword: 1 }).lean();
    const formattedTerms = JSON.parse(JSON.stringify(terms));

    // Group terms alphabetically
    const groupedTerms = formattedTerms.reduce((acc: any, term: any) => {
        const letter = term.keyword.charAt(0).toUpperCase();
        if (!acc[letter]) acc[letter] = [];
        acc[letter].push(term);
        return acc;
    }, {});

    const alphabet = Object.keys(groupedTerms).sort();

    return (
        <main className="min-h-screen pt-32 pb-24 px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 tracking-tight text-glow">
                    Romance <span className="text-gold">Glossary</span>
                </h1>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light">
                    The ultimate directory of "Romancelandia" tropes and keywords. Explore the psychological appeal and aesthetic vibes of your favorite stories.
                </p>
            </div>

            {formattedTerms.length === 0 ? (
                <div className="text-center py-20 text-gray-400">
                    <p>The glossary is currently being updated. Check back soon!</p>
                </div>
            ) : (
                <div className="space-y-16">
                    {alphabet.map((letter) => (
                        <section key={letter} className="relative">
                            <div className="sticky top-24 z-10 glass-dark inline-flex w-16 h-16 items-center justify-center rounded-full border border-gold/30 mb-8 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                                <span className="text-3xl font-serif font-bold text-gold">{letter}</span>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {groupedTerms[letter].map((term: any) => (
                                    <Link key={term.slug} href={`/glossary/${term.slug}`} className="group">
                                        <div className="h-full glass-dark p-6 rounded-2xl border border-white/5 transition-all duration-300 hover:border-gold/50 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(212,175,55,0.1)] flex flex-col">
                                            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-gold transition-colors">{term.keyword}</h3>
                                            <p className="text-sm text-gold/80 italic mb-4 line-clamp-2">"{term.hook}"</p>
                                            <p className="text-gray-400 text-sm line-clamp-3 mb-6 flex-grow">{term.definition}</p>
                                            
                                            <div className="flex flex-wrap gap-2 mt-auto">
                                                {term.heatLevel && (
                                                    <span className="text-xs px-2 py-1 bg-white/5 border border-white/10 rounded text-gray-300">
                                                        🔥 {term.heatLevel}
                                                    </span>
                                                )}
                                                {term.microTropes?.slice(0, 1).map((micro: string, i: number) => (
                                                    <span key={i} className="text-xs px-2 py-1 bg-gold/10 border border-gold/20 rounded text-gold">
                                                        {micro}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>
            )}
        </main>
    );
}
