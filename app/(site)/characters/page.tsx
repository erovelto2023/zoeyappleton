import CharacterGrid from "@/components/CharacterGrid";
import dbConnect from "@/lib/db";
import Character from "@/models/Character";
import Book from "@/models/Book";

export const dynamic = 'force-dynamic';

export default async function CharactersPage() {
    await dbConnect();
    // Fetch characters and populate book details
    const characters = await Character.find({}).populate('book').lean();

    // Fetch all books to get series list
    const books = await Book.find({}).lean();

    // Extract unique series and book titles for the filter
    const seriesSet = new Set<string>();
    books.forEach((book: any) => {
        if (book.series) seriesSet.add(book.series);
        seriesSet.add(book.title);
    });
    const seriesList = Array.from(seriesSet).sort();

    // Serialize characters for client component
    const serializedCharacters = characters.map((char: any) => ({
        _id: char._id.toString(),
        name: char.name,
        image: char.image,
        tagline: char.tagline,
        coreIdentity: char.coreIdentity,
        book: char.book ? {
            _id: char.book._id.toString(),
            title: char.book.title,
            series: char.book.series
        } : undefined
    }));

    return (
        <div className="min-h-screen bg-midnight pt-24 pb-20">
            {/* Hero Section */}
            <div className="relative py-20 mb-8 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1496568816309-51d7c20e3b21?q=80&w=2531&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-midnight/80 via-midnight/90 to-midnight"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-cream mb-6 tracking-tight">
                        Explore the <span className="text-gold">Universe</span>
                    </h1>
                    <div className="w-24 h-1 bg-blood-rose mx-auto mb-8"></div>
                    <p className="text-xl md:text-2xl text-gray-300 font-light tracking-wide max-w-3xl mx-auto">
                        Billionaires. Spies. Survivors. Lovers.
                    </p>
                </div>
            </div>

            {/* Grid & Filters */}
            <CharacterGrid characters={serializedCharacters} seriesList={seriesList} />
        </div>
    );
}
