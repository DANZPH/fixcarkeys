import { NextResponse } from 'next/server';
import { getDb, initializeDatabase } from '@/lib/db';

// GET all active blog posts (public)
export async function GET() {
    try {
        await initializeDatabase();
        const db = getDb();

        const result = await db.execute('SELECT * FROM blog_posts WHERE active = 1 ORDER BY created_at DESC');

        return NextResponse.json(result.rows);
    } catch (error) {
        console.error('Blog GET error:', error);
        return NextResponse.json([], { status: 200 }); // Return empty array to prevent page crash
    }
}
