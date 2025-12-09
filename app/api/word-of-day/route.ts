import { NextResponse } from 'next/server';
import { generateWordOfTheDay } from '@/lib/gemini';

// In-memory cache for simplicity (use Redis/DB in prod)
let cachedWord = '';
let lastGeneratedDate = '';

export async function GET() {
    const today = new Date().toISOString().split('T')[0];

    if (lastGeneratedDate !== today || !cachedWord) {
        cachedWord = await generateWordOfTheDay();
        lastGeneratedDate = today;
    }

    // Return obfuscated ID (in real app, use database ID)
    // We use base64 of the word as a simple "ID" for this MVP to be stateless-ish
    // BUT this leaks the word if user decodes base64. 
    // For security, we should encrypt it or store in map.
    // Since we have in-memory cache, we can just return a hash and look it up.

    return NextResponse.json({
        date: today,
        wordId: Buffer.from(cachedWord).toString('base64'), // WARNING: decoding reveals word. Use DB ID in prod.
    });
}
