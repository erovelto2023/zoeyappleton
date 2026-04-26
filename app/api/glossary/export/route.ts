import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import GlossaryTerm from '@/models/GlossaryTerm';

export async function GET() {
    try {
        await dbConnect();
        // Export everything except views, _id, and internal fields, but include what the AI needs
        const terms = await GlossaryTerm.find({}, { _id: 0, createdAt: 0, updatedAt: 0, __v: 0 }).lean();
        
        return new NextResponse(JSON.stringify(terms, null, 2), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Content-Disposition': 'attachment; filename="glossary.json"'
            }
        });
    } catch (error) {
        console.error("Export error:", error);
        return new NextResponse("Failed to export glossary", { status: 500 });
    }
}
