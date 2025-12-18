import { NextResponse } from 'next/server';
import { getDb, initializeDatabase } from '@/lib/db';

// Test database connection
export async function GET() {
    try {
        // Try to initialize the database
        await initializeDatabase();

        const db = getDb();

        // Try a simple query
        const result = await db.execute('SELECT COUNT(*) as count FROM settings');

        return NextResponse.json({
            success: true,
            message: 'Database connected successfully!',
            settingsCount: result.rows[0].count,
            databaseUrl: process.env.TURSO_DATABASE_URL ? 'Set' : 'Not set',
            authToken: process.env.TURSO_AUTH_TOKEN ? 'Set (hidden)' : 'Not set',
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            error: error.message,
            databaseUrl: process.env.TURSO_DATABASE_URL ? 'Set' : 'Not set',
            authToken: process.env.TURSO_AUTH_TOKEN ? 'Set (hidden)' : 'Not set',
        }, { status: 500 });
    }
}
