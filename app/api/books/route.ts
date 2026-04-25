import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Book from "@/models/Book";
import { isAdmin } from "@/lib/admin";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const books = await Book.find({});
    return NextResponse.json(books);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    if (!(await isAdmin())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const body = await req.json();
    const book = await Book.create(body);
    return NextResponse.json(book, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
