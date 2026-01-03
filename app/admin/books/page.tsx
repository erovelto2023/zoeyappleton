import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Plus, Edit } from 'lucide-react';
import dbConnect from '@/lib/db';
import Book from '@/models/Book';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search } from '@/components/ui/search';
import { PaginationControls } from '@/components/ui/pagination-controls';

export const dynamic = 'force-dynamic';

export default async function BooksPage({
    searchParams,
}: {
    searchParams?: {
        query?: string;
        page?: string;
    };
}) {
    await dbConnect();
    const query = searchParams?.query || "";
    const page = Number(searchParams?.page) || 1;
    const limit = 8;
    const skip = (page - 1) * limit;

    const filter = query ? { title: { $regex: query, $options: "i" } } : {};

    // Run query and count in parallel for performance
    const [books, totalCount] = await Promise.all([
        Book.find(filter).sort({ releaseDate: -1 }).skip(skip).limit(limit),
        Book.countDocuments(filter)
    ]);

    const totalPages = Math.ceil(totalCount / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    const formattedBooks = books.map((doc) => {
        const book = doc.toObject();
        return {
            ...book,
            _id: book._id.toString(),
            releaseDate: book.releaseDate ? new Date(book.releaseDate).toLocaleDateString() : 'N/A',
        };
    });

    return (
        <div className="p-8 space-y-6">
            <div className="flex items-center justify-between gap-4">
                <h2 className="text-3xl font-bold tracking-tight">Books</h2>
                <Link href="/admin/books/new">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> Add New Book
                    </Button>
                </Link>
            </div>

            <div className="w-full max-w-sm">
                <Search placeholder="Search books..." />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {formattedBooks.length === 0 ? (
                    <div className="col-span-full text-center py-10 text-muted-foreground">
                        {query ? "No books found matching your search." : "No books found. Create one to get started."}
                    </div>
                ) : (
                    formattedBooks.map((book) => (
                        <Card key={book._id} className="overflow-hidden group">
                            <div className="aspect-[2/3] relative bg-muted">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                {book.coverImage ? (
                                    <img
                                        src={book.coverImage}
                                        alt={book.title}
                                        className="object-cover w-full h-full transition group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                        No Image
                                    </div>
                                )}
                            </div>
                            <CardHeader className="p-4">
                                <CardTitle className="line-clamp-1 text-lg">{book.title}</CardTitle>
                                <p className="text-xs text-muted-foreground">{book.series || 'Standalone'}</p>
                            </CardHeader>
                            <CardContent className="p-4 pt-0 flex gap-2">
                                <Link href={`/admin/books/${book._id}`} className="w-full">
                                    <Button variant="outline" className="w-full">
                                        <Edit className="w-4 h-4 mr-2" /> Edit
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>

            {totalPages > 1 && (
                <PaginationControls
                    hasNextPage={hasNextPage}
                    hasPrevPage={hasPrevPage}
                    totalPages={totalPages}
                />
            )}
        </div>
    );
}
