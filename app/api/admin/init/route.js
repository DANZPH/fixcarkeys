import { NextResponse } from 'next/server';
import { initializeDatabase, seedDefaultData } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';

// Initialize database and seed data
export async function POST() {
    try {
        const authenticated = await isAuthenticated();
        if (!authenticated) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await initializeDatabase();
        await seedDefaultData();

        return NextResponse.json({ success: true, message: 'Database initialized and seeded' });
    } catch (error) {
        console.error('Init error:', error);
        return NextResponse.json(
            { error: 'Failed to initialize database', details: error.message },
            { status: 500 }
        );
    }
}
