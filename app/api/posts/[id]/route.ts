import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Post from "@/models/Post";
import { isAdmin } from "@/lib/admin";

export async function GET(req: NextRequest, { 
    params 
}: { 
    params: Promise<{ id: string }> 
}) {
    try {
        const { id } = await params;
        await dbConnect();
        const post = await Post.findById(id);
        if (!post) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }
        return NextResponse.json(post);
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
        const post = await Post.findByIdAndUpdate(id, body, { new: true });

        if (!post) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }

        return NextResponse.json(post);
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
        const post = await Post.findByIdAndDelete(id);

        if (!post) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Post deleted" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
