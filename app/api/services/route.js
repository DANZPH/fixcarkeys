import { NextResponse } from 'next/server';
import { getDb, initializeDatabase } from '@/lib/db';

// GET all active services (public)
export async function GET() {
    try {
        await initializeDatabase();
        const db = getDb();

        const result = await db.execute('SELECT * FROM services WHERE active = 1 ORDER BY sort_order ASC');

        const services = result.rows.map(row => ({
            ...row,
            features: row.features ? JSON.parse(row.features) : []
        }));

        return NextResponse.json(services);
    } catch (error) {
        console.error('Services GET error:', error);
        return NextResponse.json([], { status: 200 }); // Return empty array to prevent page crash
    }
}
