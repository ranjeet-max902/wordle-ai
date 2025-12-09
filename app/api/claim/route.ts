import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const address = searchParams.get('address');

    if (!address) {
        return NextResponse.json({ error: 'Address required' }, { status: 400 });
    }

    const claim = db.getClaim(address);
    // Cooldown is 24 hours
    const COOLDOWN_MS = 24 * 60 * 60 * 1000;
    const now = Date.now();

    let eligible = true;
    let nextEligibleAt = now;

    if (claim) {
        const timeSince = now - claim.lastClaimAt;
        if (timeSince < COOLDOWN_MS) {
            eligible = false;
            nextEligibleAt = claim.lastClaimAt + COOLDOWN_MS;
        }
    }

    return NextResponse.json({
        eligible,
        lastClaimAt: claim?.lastClaimAt || null,
        nextEligibleAt
    });
}

export async function POST(req: Request) {
    try {
        const { address } = await req.json();

        if (!address) {
            return NextResponse.json({ error: 'Address required' }, { status: 400 });
        }

        // Check eligibility again
        const claim = db.getClaim(address);
        const COOLDOWN_MS = 24 * 60 * 60 * 1000;
        const now = Date.now();

        if (claim && (now - claim.lastClaimAt < COOLDOWN_MS)) {
            return NextResponse.json({ error: 'Cooldown active' }, { status: 400 });
        }

        db.updateClaim(address);

        return NextResponse.json({ success: true, newClaimAt: now });

    } catch (e) {
        return NextResponse.json({ error: 'Server Error' }, { status: 500 });
    }
}
