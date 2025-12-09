import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function generateWordOfTheDay(): Promise<string> {
    if (!process.env.GEMINI_API_KEY) {
        console.warn('No GEMINI_API_KEY found, using fallback word.');
        return 'REACT';
    }

    // Using Gemini 2.5 Flash model
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const prompt = `Generate a random common 5-letter English word suitable for a Wordle game.
Requirements:
- Must be exactly 5 letters
- Must be a common, recognizable English word (not obscure)
- Output ONLY the word in UPPERCASE
- No explanations, no punctuation, just the word`;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        const word = text.trim().toUpperCase().replace(/[^A-Z]/g, '');

        if (word.length !== 5) {
            console.error('Gemini returned invalid word length:', word);
            return 'CRANE'; // Fallback - good Wordle starting word
        }

        console.log('Generated word of the day:', word);
        return word;
    } catch (error) {
        console.error('Gemini generation failed:', error);
        return 'CRANE'; // Fallback
    }
}

