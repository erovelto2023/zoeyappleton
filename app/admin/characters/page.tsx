import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Plus, Edit } from 'lucide-react';
import dbConnect from '@/lib/db';
import Character from '@/models/Character';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search } from '@/components/ui/search';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

export default async function CharactersPage({
    searchParams,
}: {
    searchParams?: {
        query?: string;
    };
}) {
    await dbConnect();
    const query = searchParams?.query || "";
    const filter = query ? { name: { $regex: query, $options: "i" } } : {};

    // We handle potential population if Book model is registered
    // Using try/catch for populate in case Book model isn't compiled yet in this context
    let characters = [];
    try {
        characters = await Character.find(filter).populate('book');
    } catch (e) {
        characters = await Character.find(filter);
    }

    const formattedCharacters = characters.map((doc) => {
        const char = doc.toObject();
        return {
            ...char,
            _id: char._id.toString(),
            bookName: char.book && typeof char.book === 'object' && 'title' in char.book ? char.book.title : 'No Book Assigned',
            book: char.book ? char.book.toString() : null,
        };
    });

    return (
        <div className="p-8 space-y-6">
            <div className="flex items-center justify-between gap-4">
                <h2 className="text-3xl font-bold tracking-tight">Characters</h2>
                <Link href="/admin/characters/new">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> Add Character
                    </Button>
                </Link>
            </div>

            <div className="w-full max-w-sm">
                <Search placeholder="Search characters..." />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {formattedCharacters.length === 0 ? (
                    <div className="col-span-full text-center py-10 text-muted-foreground">
                        {query ? "No characters found matching your search." : "No characters found."}
                    </div>
                ) : (
                    formattedCharacters.map((char) => (
                        <Card key={char._id} className="overflow-hidden">
                            <div className="aspect-square relative bg-muted">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                {char.image ? (
                                    <Image src={char.image} alt={char.name} fill className="object-cover" unoptimized />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">No Image</div>
                                )}
                            </div>
                            <CardHeader className="p-4">
                                <CardTitle>{char.name}</CardTitle>
                                <p className="text-sm text-muted-foreground">{char.bookName}</p>
                            </CardHeader>
                            <CardContent className="p-4 pt-0">
                                <Link href={`/admin/characters/${char._id}`} className="w-full">
                                    <Button variant="outline" className="w-full">
                                        <Edit className="w-4 h-4 mr-2" /> Edit
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    )
}
