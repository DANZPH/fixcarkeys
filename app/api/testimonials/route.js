import { NextResponse } from 'next/server';
import { getDb, initializeDatabase } from '@/lib/db';

// GET all active testimonials (public)
export async function GET() {
    try {
        await initializeDatabase();
        const db = getDb();

        const result = await db.execute('SELECT * FROM testimonials WHERE active = 1 ORDER BY sort_order ASC');

        return NextResponse.json(result.rows);
    } catch (error) {
        console.error('Testimonials GET error:', error);
        return NextResponse.json([], { status: 200 }); // Return empty array to prevent page crash
    }
}
