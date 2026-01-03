import { CharacterForm } from "@/components/admin/character-form";
import dbConnect from "@/lib/db";
import Book from "@/models/Book";

export default async function NewCharacterPage() {
    await dbConnect();
    const books = await Book.find({}).sort({ title: 1 });
    const formattedBooks = books.map((book) => ({
        _id: book._id.toString(),
        title: book.title,
    }));

    return (
        <div className="p-8">
            <CharacterForm books={formattedBooks} />
        </div>
    );
}
