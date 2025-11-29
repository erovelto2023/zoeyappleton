import BookCard from "@/components/BookCard";
import dbConnect from "@/lib/db";
import Book from "@/models/Book";

export const dynamic = 'force-dynamic';

export default async function BooksPage() {
    await dbConnect();
    const allBooks = await Book.find({}).sort({ seriesOrder: 1 });

    const seriesOrder = [
        "Billionaire Bosses",
        "Into the Shadows Series",
        "Adrian Knight Series",
        "Underworld of Vegas Series",
        "Zoey's Bedtime Stories",
    ];

    // Group books by series
    const booksBySeries: Record<string, any[]> = {};
    allBooks.forEach((book) => {
        const series = book.series || "Other Works";
        if (!booksBySeries[series]) {
            booksBySeries[series] = [];
        }
        booksBySeries[series].push(book);
    });

    return (
        <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-cream mb-4">The Series</h1>
                <div className="w-24 h-1 bg-blood-rose mx-auto"></div>
                <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
                    Dive into the dark, dangerous world of Sterling City. Where passion meets power, and every kiss has a price.
                </p>
            </div>

            <div className="space-y-20">
                {seriesOrder.map((seriesName) => {
                    const books = booksBySeries[seriesName];
                    if (!books || books.length === 0) return null;

                    return (
                        <section key={seriesName}>
                            <h2 className="text-3xl font-serif font-bold text-gold mb-8 border-b border-charcoal pb-2 inline-block">
                                {seriesName}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {books.map((book) => (
                                    <BookCard key={book._id.toString()} book={{ ...book.toObject(), id: book._id.toString() }} />
                                ))}
                            </div>
                        </section>
                    );
                })}

                {/* Handle any books not in the explicit list */}
                {Object.keys(booksBySeries).map((seriesName) => {
                    if (seriesOrder.includes(seriesName)) return null;
                    return (
                        <section key={seriesName}>
                            <h2 className="text-3xl font-serif font-bold text-gold mb-8 border-b border-charcoal pb-2 inline-block">
                                {seriesName}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {booksBySeries[seriesName].map((book) => (
                                    <BookCard key={book._id.toString()} book={{ ...book.toObject(), id: book._id.toString() }} />
                                ))}
                            </div>
                        </section>
                    );
                })}
            </div>
        </div>
    );
}
