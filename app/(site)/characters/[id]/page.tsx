import dbConnect from '@/lib/db';
import Character from '@/models/Character';
import CharacterProfile from '@/components/CharacterProfile';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

async function getCharacter(id: string) {
    await dbConnect();
    try {
        const character = await Character.findById(id).populate('book').lean();
        if (!character) return null;

        // Serialize for client component
        return {
            ...character,
            _id: character._id.toString(),
            book: character.book ? {
                ...character.book,
                _id: character.book._id.toString()
            } : null,
            relationships: character.relationships?.map((rel: any) => ({
                ...rel,
                _id: rel._id?.toString()
            }))
        };
    } catch (error) {
        return null;
    }
}

export default async function CharacterPage({ params }: { params: { id: string } }) {
    const character = await getCharacter(params.id);

    if (!character) {
        notFound();
    }

    return <CharacterProfile character={character} />;
}
