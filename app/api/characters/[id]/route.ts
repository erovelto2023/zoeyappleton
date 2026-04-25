import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Character from "@/models/Character";
import { isAdmin } from "@/lib/admin";

export async function GET(req: NextRequest, { 
    params 
}: { 
    params: Promise<{ id: string }> 
}) {
    try {
        const { id } = await params;
        await dbConnect();
        const character = await Character.findById(id);
        if (!character) {
            return NextResponse.json({ error: "Character not found" }, { status: 404 });
        }
        return NextResponse.json(character);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(req: NextRequest, { 
    params 
}: { 
    params: Promise<{ id: string }> 
}) {
    try {
        const { id } = await params;
        if (!(await isAdmin())) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();
        const body = await req.json();
        const character = await Character.findByIdAndUpdate(id, body, { new: true });

        if (!character) {
            return NextResponse.json({ error: "Character not found" }, { status: 404 });
        }

        return NextResponse.json(character);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { 
    params 
}: { 
    params: Promise<{ id: string }> 
}) {
    try {
        const { id } = await params;
        if (!(await isAdmin())) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();
        const character = await Character.findByIdAndDelete(id);

        if (!character) {
            return NextResponse.json({ error: "Character not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Character deleted" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
