import { Star, ShoppingCart, BookOpen, Flame, Heart, AlertTriangle, CheckCircle2, User } from "lucide-react";
import Link from "next/link";
import dbConnect from "@/lib/db";
import Book from "@/models/Book";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function BookDetails({ params }: { params: { id: string } }) {
    await dbConnect();

    let book;
    try {
        book = await Book.findById(params.id).lean();
    } catch (e) {
        notFound();
    }

    if (!book) {
        notFound();
    }

    return (
        <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Left Column: Cover & Quick Stats */}
                <div className="lg:col-span-4 space-y-8">
                    <div className="relative aspect-[2/3] rounded-sm overflow-hidden shadow-2xl border border-charcoal group">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={book.coverImage}
                            alt={book.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    {/* Quick Stats Card */}
                    <div className="bg-charcoal/50 p-6 rounded-sm border border-gray-800 space-y-4">
                        <div className="flex justify-between items-center border-b border-gray-700 pb-3">
                            <span className="text-gray-400 text-sm uppercase tracking-widest">Heat Level</span>
                            <div className="flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Flame
                                        key={i}
                                        className={`w-5 h-5 ${i < (book.heatLevel || 0) ? "fill-blood-rose text-blood-rose" : "text-gray-700"}`}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="flex justify-between items-center border-b border-gray-700 pb-3">
                            <span className="text-gray-400 text-sm uppercase tracking-widest">Rating</span>
                            <div className="flex items-center gap-2">
                                <span className="text-gold font-bold">{book.rating}</span>
                                <div className="flex gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-5 h-5 ${i < Math.floor(book.rating || 0) ? "fill-gold text-gold" : "text-gray-700"}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                        {book.releaseDate && (
                            <div className="flex justify-between items-center">
                                <span className="text-gray-400 text-sm uppercase tracking-widest">Released</span>
                                <span className="text-white font-medium">
                                    {new Date(book.releaseDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Buy Buttons */}
                    <div className="space-y-4">
                        {book.buyLinks?.amazon && (
                            <Link
                                href={book.buyLinks.amazon}
                                className="flex items-center justify-center gap-2 bg-blood-rose hover:bg-red-900 text-white w-full py-4 rounded-sm font-bold uppercase tracking-widest transition-all duration-300 shadow-lg hover:shadow-blood-rose/20"
                            >
                                <ShoppingCart className="w-5 h-5" />
                                Buy on Amazon
                            </Link>
                        )}

                    </div>
                </div>

                {/* Right Column: Details & Content */}
                <div className="lg:col-span-8 space-y-12">
                    <div>
                        <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-2">{book.title}</h1>
                        {book.series && (
                            <p className="text-gold text-lg md:text-xl font-medium mb-6">{book.series}</p>
                        )}

                        {/* Tropes & Themes */}
                        <div className="flex flex-wrap gap-2 mb-8">
                            {book.tropes?.map((trope: string) => (
                                <span key={trope} className="text-xs font-bold text-midnight bg-gold px-3 py-1 rounded-sm uppercase tracking-wider">
                                    {trope}
                                </span>
                            ))}
                            {book.themes?.map((theme: string) => (
                                <span key={theme} className="text-xs font-bold text-gray-300 bg-charcoal border border-gray-600 px-3 py-1 rounded-sm uppercase tracking-wider">
                                    {theme}
                                </span>
                            ))}
                        </div>

                        <div className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed whitespace-pre-line border-l-4 border-blood-rose pl-6">
                            {book.blurb}
                        </div>
                    </div>

                    {/* Deep Dive Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {book.sexualTension && (
                            <div className="bg-midnight/50 p-6 rounded-sm border border-gray-800">
                                <div className="flex items-center gap-3 mb-4">
                                    <Heart className="w-6 h-6 text-blood-rose" />
                                    <h3 className="text-xl font-serif font-bold text-white">Sexual Tension</h3>
                                </div>
                                <p className="text-gray-400 text-sm leading-relaxed">{book.sexualTension}</p>
                            </div>
                        )}

                        {book.explicitScenes && (
                            <div className="bg-midnight/50 p-6 rounded-sm border border-gray-800">
                                <div className="flex items-center gap-3 mb-4">
                                    <AlertTriangle className="w-6 h-6 text-gold" />
                                    <h3 className="text-xl font-serif font-bold text-white">Explicit Scenes</h3>
                                </div>
                                <p className="text-gray-400 text-sm leading-relaxed">{book.explicitScenes}</p>
                            </div>
                        )}
                    </div>

                    {/* Ideal Reader */}
                    {book.idealReader && book.idealReader.length > 0 && (
                        <div className="bg-charcoal/30 p-8 rounded-sm border border-gray-800">
                            <h3 className="text-2xl font-serif font-bold text-white mb-6">Is This Book For You?</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {book.idealReader.map((item: string, i: number) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                        <span className="text-gray-300 text-sm">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Reviews */}
                    {book.reviews && book.reviews.length > 0 && (
                        <div className="pt-8 border-t border-gray-800">
                            <h3 className="text-3xl font-serif font-bold text-white mb-8">Reader Reviews</h3>
                            <div className="grid gap-6">
                                {book.reviews.map((review: any, i: number) => (
                                    <div key={i} className="bg-charcoal p-6 rounded-sm border border-gray-700 hover:border-gold transition-colors duration-300">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-midnight rounded-full flex items-center justify-center border border-gray-600">
                                                    <User className="w-5 h-5 text-gray-400" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-white">{review.user}</p>
                                                    <p className="text-xs text-gray-500">{review.source} • {review.date}</p>
                                                </div>
                                            </div>
                                            <div className="flex">
                                                {[...Array(5)].map((_, j) => (
                                                    <Star
                                                        key={j}
                                                        className={`w-4 h-4 ${j < review.rating ? "fill-gold text-gold" : "text-gray-700"}`}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-gray-300 italic text-sm leading-relaxed">&quot;{review.text}&quot;</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
