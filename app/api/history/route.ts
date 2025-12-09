import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const address = searchParams.get('address');

    if (!address) {
        return NextResponse.json({ history: [] }); // or 400, but empty list is safer for UI
    }

    const history = db.getHistory(address);
    // Sort by timestamp desc
    history.sort((a, b) => b.timestamp - a.timestamp);

    return NextResponse.json({ history });
}
