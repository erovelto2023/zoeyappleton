import { CharacterForm } from "@/components/admin/character-form";
import dbConnect from "@/lib/db";
import Character from "@/models/Character";
import Book from "@/models/Book";

export default async function CharacterPage({ params }: { params: { id: string } }) {
    await dbConnect();

    // Ensure Book model is registered
    // We can just query it lightly or rely on import
    const existingCharacter = await Character.findById(params.id);
    const books = await Book.find({}).sort({ title: 1 });

    const formattedBooks = books.map((book) => ({
        _id: book._id.toString(),
        title: book.title,
    }));

    const formattedCharacter = existingCharacter ? {
        ...existingCharacter.toObject(),
        _id: existingCharacter._id.toString(),
        book: existingCharacter.book ? existingCharacter.book.toString() : "",
        // Ensure nesting is safe, although toObject usually helps
    } : null;

    if (!formattedCharacter) {
        return <div>Character not found</div>;
    }

    return (
        <div className="p-8">
            <CharacterForm initialData={formattedCharacter} books={formattedBooks} />
        </div>
    );
}
