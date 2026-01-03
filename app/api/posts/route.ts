import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Post from "@/models/Post";
import { auth } from "@clerk/nextjs/server";

export async function GET(req: NextRequest) {
    try {
        await dbConnect();
        const posts = await Post.find({});
        return NextResponse.json(posts);
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
        const post = await Post.create(body);
        return NextResponse.json(post, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
