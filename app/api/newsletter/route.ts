import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { email } = await req.json();

        if (!email || !email.includes('@')) {
            return NextResponse.json(
                { message: 'Please enter a valid email address.' },
                { status: 400 }
            );
        }

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Here you would typically save to a database or call an email service (e.g. Mailchimp, ConvertKit)
        console.log(`New subscriber: ${email}`);

        return NextResponse.json(
            { message: 'Successfully subscribed!' },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: 'Internal server error.' },
            { status: 500 }
        );
    }
}
