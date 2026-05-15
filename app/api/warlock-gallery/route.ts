import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const status = url.searchParams.get('status') || 'published';
        const limit = url.searchParams.get('limit') || '50';
        const page = url.searchParams.get('page') || '1';
        const tag = url.searchParams.get('tag');

        let targetUrl = `https://warlockpublishing.com/api/gallery?status=${status}&limit=${limit}&page=${page}`;
        if (tag) {
            targetUrl += `&tag=${encodeURIComponent(tag)}`;
        }

        const res = await fetch(targetUrl, {
            headers: {
                'Accept': 'application/json',
            },
            cache: 'no-store'
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch from Warlock Publishing: ${res.statusText}`);
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error: any) {
        console.error("Warlock Proxy Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
