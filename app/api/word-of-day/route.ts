import { NextResponse } from 'next/server';
import { generateWordOfTheDay } from '@/lib/gemini';

export const dynamic = 'force-dynamic';

export async function GET() {
    // Generate a fresh word for each game
    const word = await generateWordOfTheDay();
    const today = new Date().toISOString().split('T')[0];

    return NextResponse.json({
        date: today,
        wordId: Buffer.from(word).toString('base64'), // WARNING: decoding reveals word. Use encryption in prod.
    });
}

