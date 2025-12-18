import { NextResponse } from 'next/server';
import { getDb, initializeDatabase, seedDefaultData } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';

// GET all settings
export async function GET() {
    try {
        await initializeDatabase();
        const db = getDb();

        const result = await db.execute('SELECT key, value FROM settings');

        // Convert to object
        const settings = {};
        for (const row of result.rows) {
            settings[row.key] = row.value;
        }

        return NextResponse.json(settings);
    } catch (error) {
        console.error('Settings GET error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch settings' },
            { status: 500 }
        );
    }
}

// POST/PUT update settings
export async function POST(request) {
    try {
        const authenticated = await isAuthenticated();
        if (!authenticated) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const settings = await request.json();
        const db = getDb();

        for (const [key, value] of Object.entries(settings)) {
            await db.execute({
                sql: `INSERT INTO settings (key, value, updated_at) 
              VALUES (?, ?, CURRENT_TIMESTAMP) 
              ON CONFLICT(key) DO UPDATE SET value = ?, updated_at = CURRENT_TIMESTAMP`,
                args: [key, value, value]
            });
        }

        return NextResponse.json({ success: true, message: 'Settings updated' });
    } catch (error) {
        console.error('Settings POST error:', error);
        return NextResponse.json(
            { error: 'Failed to update settings' },
            { status: 500 }
        );
    }
}
