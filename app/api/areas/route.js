import { NextResponse } from 'next/server';
import { getDb, initializeDatabase } from '@/lib/db';

// GET all active areas (public)
export async function GET() {
    try {
        await initializeDatabase();
        const db = getDb();

        const result = await db.execute('SELECT * FROM areas WHERE active = 1 ORDER BY sort_order ASC');

        const areas = result.rows.map(row => ({
            ...row,
            towns: row.towns ? JSON.parse(row.towns) : []
        }));

        return NextResponse.json(areas);
    } catch (error) {
        console.error('Areas GET error:', error);
        return NextResponse.json([], { status: 200 }); // Return empty array to prevent page crash
    }
}
