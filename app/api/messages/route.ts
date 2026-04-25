import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Message from "@/models/Message";

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const body = await req.json();
        const { name, email, message, honeypot } = body;

        // Honeypot check for bots
        if (honeypot) {
            return NextResponse.json({ message: "Spam detected" }, { status: 400 });
        }

        // Basic validation
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Explicitly only save allowed fields to prevent mass assignment
        const newMessage = await Message.create({
            name,
            email,
            message,
            read: false, // Ensure new messages are unread
        });

        return NextResponse.json(newMessage, { status: 201 });
    } catch (error: any) {
        console.error("Error submitting message:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
