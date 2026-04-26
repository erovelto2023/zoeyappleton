import { Metadata } from 'next';
import GlossaryClient from '@/components/glossary/GlossaryClient';

export const metadata: Metadata = {
    title: "Romance Glossary | Zoey Appleton",
    description: "The ultimate directory of romance tropes, keywords, and their deep psychological appeal.",
};

export default function GlossaryIndexPage() {
    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-900">
            {/* Hero Section */}
            <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
                <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('/images/hero/zoey_hero_2.jpg')` }}
                />
                <div className="absolute inset-0 bg-slate-900/60 backdrop-brightness-75" />
                
                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto space-y-4">
                    <span className="text-gold text-sm font-bold tracking-[0.2em] uppercase">Glossary</span>
                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-white tracking-tight">
                        The Language of Romance
                    </h1>
                    <p className="text-xl text-gray-200 font-light max-w-2xl mx-auto">
                        Understanding the tropes and keywords that shape your journey through Romancelandia.
                    </p>
                </div>
            </section>

            {/* Client Component for Interactive Filtering & Pagination */}
            <GlossaryClient />
        </main>
    );
}
