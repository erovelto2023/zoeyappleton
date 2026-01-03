import dbConnect from "@/lib/db";
import Book from "@/models/Book";
import { BookForm } from "@/components/admin/book-form";

export default async function BookPage({ params }: { params: { id: string } }) {
    await dbConnect();

    let book = null;
    try {
        book = await Book.findById(params.id);
    } catch (e) {
        // invalid id format
    }

    if (!book) {
        return <div className="p-8">Book not found</div>;
    }

    // Serialize
    const formattedBook = {
        ...book.toObject(),
        _id: book._id.toString(),
        releaseDate: book.releaseDate ? book.releaseDate.toISOString() : null,
        // Ensure nested objects are handled if needed, but simple JSON types are fine
    };

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <BookForm initialData={formattedBook} />
        </div>
    );
}
