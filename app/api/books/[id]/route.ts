import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Book from "@/models/Book";
import { auth } from "@clerk/nextjs/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await dbConnect();
        const book = await Book.findById(params.id);
        if (!book) {
            return NextResponse.json({ error: "Book not found" }, { status: 404 });
        }
        return NextResponse.json(book);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { userId } = auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();
        const body = await req.json();
        const book = await Book.findByIdAndUpdate(params.id, body, { new: true });

        if (!book) {
            return NextResponse.json({ error: "Book not found" }, { status: 404 });
        }

        return NextResponse.json(book);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { userId } = auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();
        const book = await Book.findByIdAndDelete(params.id);

        if (!book) {
            return NextResponse.json({ error: "Book not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Book deleted" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
