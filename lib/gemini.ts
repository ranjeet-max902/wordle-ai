import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'mock-key');

export async function generateWordOfTheDay() {
    if (!process.env.GEMINI_API_KEY) {
        console.warn('No GEMINI_API_KEY found, using fallback.');
        return 'REACT';
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `Generate a random 5-letter English word for a Wordle game. 
  Output ONLY the word in uppercase. No explanation. 
  Ensure it is a common dictionary word.`;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        const word = text.trim().toUpperCase().replace(/[^A-Z]/g, '');

        if (word.length !== 5) {
            console.error('Gemini returned invalid length:', word);
            return 'REACT'; // Fallback
        }
        return word;
    } catch (error) {
        console.error('Gemini generation failed:', error);
        return 'REACT'; // Fallback
    }
}
