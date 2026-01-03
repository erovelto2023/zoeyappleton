import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Character from "@/models/Character";
import { auth } from "@clerk/nextjs/server";

export async function GET(req: NextRequest) {
    try {
        await dbConnect();
        const characters = await Character.find({}).populate('book');
        return NextResponse.json(characters);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const { userId } = auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();
        const body = await req.json();
        const character = await Character.create(body);
        return NextResponse.json(character, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
