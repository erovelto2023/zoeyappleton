import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Subscriber from "@/models/Subscriber";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({ message: "Email is required" }, { status: 400 });
        }

        // Check if already subscribed
        const existingDefault = await Subscriber.findOne({ email });
        if (existingDefault) {
            if (existingDefault.status === 'unsubscribed') {
                existingDefault.status = 'active';
                await existingDefault.save();
                return NextResponse.json({ message: "Welcome back! subscription reactivated." }, { status: 200 });
            }
            return NextResponse.json({ message: "You are already subscribed!" }, { status: 200 }); // Not an error, just info
        }

        const newSubscriber = await Subscriber.create({ email });
        return NextResponse.json(newSubscriber, { status: 201 });
    } catch (error: any) {
        if (error.code === 11000) {
            return NextResponse.json({ message: "You are already subscribed!" }, { status: 200 }); // Handle race condition
        }
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    try {
        const { userId } = auth();
        // Protect this route - admin only
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        await dbConnect();
        const subscribers = await Subscriber.find({}).sort({ createdAt: -1 });

        return NextResponse.json(subscribers);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
