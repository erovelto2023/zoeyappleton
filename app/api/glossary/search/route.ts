import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import GlossaryTerm from '@/models/GlossaryTerm';

export async function GET(request: Request) {
    try {
        await dbConnect();
        
        const { searchParams } = new URL(request.url);
        const search = searchParams.get('search') || '';
        const letter = searchParams.get('letter') || '';
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '12');

        const query: any = {};

        if (search) {
            query.$or = [
                { keyword: { $regex: search, $options: 'i' } },
                { hook: { $regex: search, $options: 'i' } },
                { definition: { $regex: search, $options: 'i' } }
            ];
        } else if (letter) {
            query.keyword = { $regex: `^${letter}`, $options: 'i' };
        }

        const skip = (page - 1) * limit;

        const [terms, total] = await Promise.all([
            GlossaryTerm.find(query)
                .sort({ keyword: 1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            GlossaryTerm.countDocuments(query)
        ]);

        return NextResponse.json({
            terms,
            total,
            page,
            totalPages: Math.ceil(total / limit)
        });
    } catch (error) {
        console.error("Glossary search error:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
