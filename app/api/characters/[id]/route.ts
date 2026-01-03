import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Character from "@/models/Character";
import { auth } from "@clerk/nextjs/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await dbConnect();
        const character = await Character.findById(params.id);
        if (!character) {
            return NextResponse.json({ error: "Character not found" }, { status: 404 });
        }
        return NextResponse.json(character);
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
        const character = await Character.findByIdAndUpdate(params.id, body, { new: true });

        if (!character) {
            return NextResponse.json({ error: "Character not found" }, { status: 404 });
        }

        return NextResponse.json(character);
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
        const character = await Character.findByIdAndDelete(params.id);

        if (!character) {
            return NextResponse.json({ error: "Character not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Character deleted" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
