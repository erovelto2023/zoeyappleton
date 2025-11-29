import Link from "next/link";
import { Star } from "lucide-react";

interface BookProps {
    id: string;
    title: string;
    coverImage: string;
    blurb: string;
    heatLevel: number;
    tropes: string[];
}

export default function BookCard({ book }: { book: BookProps }) {
    return (
        <div className="bg-midnight border border-charcoal hover:border-gold transition-colors duration-300 rounded-sm overflow-hidden flex flex-col h-full group">
            <div className="relative aspect-[2/3] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight via-transparent to-transparent opacity-60"></div>
            </div>

            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-serif font-bold text-cream mb-2 group-hover:text-gold transition-colors">{book.title}</h3>

                <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            className={`w-4 h-4 ${i < book.heatLevel ? "fill-blood-rose text-blood-rose" : "text-gray-600"}`}
                        />
                    ))}
                </div>

                <p className="text-gray-400 text-sm mb-4 line-clamp-3 flex-grow">
                    {book.blurb}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                    {book.tropes.slice(0, 3).map((trope) => (
                        <span key={trope} className="text-xs text-gray-500 bg-charcoal px-2 py-1 rounded-sm border border-gray-700">
                            {trope}
                        </span>
                    ))}
                </div>

                <Link
                    href={`/books/${book.id}`}
                    className="block w-full text-center bg-transparent border border-gray-500 text-gray-300 hover:border-gold hover:text-gold py-2 rounded-sm transition-colors duration-300 text-sm uppercase tracking-wider"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
}
