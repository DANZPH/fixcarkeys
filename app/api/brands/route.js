import { NextResponse } from 'next/server';
import { getDb, initializeDatabase } from '@/lib/db';

// GET all active brands (public)
export async function GET() {
    try {
        await initializeDatabase();
        const db = getDb();

        const result = await db.execute('SELECT * FROM brands WHERE active = 1 ORDER BY sort_order ASC');

        return NextResponse.json(result.rows);
    } catch (error) {
        console.error('Brands GET error:', error);
        return NextResponse.json([], { status: 200 }); // Return empty array to prevent page crash
    }
}
