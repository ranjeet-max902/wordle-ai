import { NextResponse } from 'next/server';
import { TileState } from '@/components/Game/types';

export async function POST(req: Request) {
    try {
        const { guess, wordId } = await req.json();

        if (!guess || guess.length !== 5) {
            return NextResponse.json({ error: 'Invalid guess' }, { status: 400 });
        }

        // In a real app, look up wordId in DB. 
        // Here we decode the base64 ID
        const targetWord = Buffer.from(wordId, 'base64').toString('utf-8');

        // Validation Logic
        const result: TileState[] = Array(5).fill('absent');
        const targetChars = targetWord.split('');
        const guessChars = guess.toUpperCase().split('');

        // First pass: Correct position
        guessChars.forEach((char: string, i: number) => {
            if (char === targetChars[i]) {
                result[i] = 'correct';
                targetChars[i] = '';
                guessChars[i] = '';
            }
        });

        // Second pass: Present
        guessChars.forEach((char: string, i: number) => {
            if (char !== '' && targetChars.includes(char)) {
                result[i] = 'present';
                const idx = targetChars.indexOf(char);
                targetChars[idx] = '';
            }
        });

        return NextResponse.json({ result });

    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
