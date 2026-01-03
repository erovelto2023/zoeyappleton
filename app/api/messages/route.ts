import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Message from "@/models/Message";

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const body = await req.json();

        // Basic validation
        if (!body.name || !body.email || !body.message) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const message = await Message.create(body);

        return NextResponse.json(message, { status: 201 });
    } catch (error: any) {
        console.error("Error submitting message:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
