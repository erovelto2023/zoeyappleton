import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { writeFile, mkdir } from "fs/promises";
import { isAdmin } from "@/lib/admin";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];

export async function POST(request: NextRequest) {
    try {
        // 1. Authorization
        if (!(await isAdmin())) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        const data = await request.formData();
        const file: File | null = data.get("file") as unknown as File;

        if (!file) {
            return NextResponse.json({ success: false, message: "No file found" }, { status: 400 });
        }

        // 2. Size validation
        if (file.size > MAX_FILE_SIZE) {
            return NextResponse.json({ success: false, message: "File too large (max 5MB)" }, { status: 400 });
        }

        // 3. Type validation
        if (!ALLOWED_TYPES.includes(file.type)) {
            return NextResponse.json({ success: false, message: "Invalid file type. Only images are allowed." }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Create unique filename (sanitize input)
        const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, "-");
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const filename = sanitizedName.replace(/\.[^/.]+$/, "") + '-' + uniqueSuffix + path.extname(file.name);

        // Save to public/images
        const uploadDir = path.join(process.cwd(), "public", "images");
        // Ensure the directory exists
        await mkdir(uploadDir, { recursive: true });

        const filepath = path.join(uploadDir, filename);

        await writeFile(filepath, buffer);

        // Return the URL
        // Use the dynamic API route to serve the image immediately
        const fileUrl = `/api/images/${filename}`;

        return NextResponse.json({ success: true, url: fileUrl });
    } catch (error: any) {
        console.error("Upload error:", error);
        return NextResponse.json({ success: false, message: "Upload failed" }, { status: 500 });
    }
}
