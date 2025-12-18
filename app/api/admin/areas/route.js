import { NextResponse } from 'next/server';
import { getDb, initializeDatabase } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';

// GET all areas
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
        return NextResponse.json(
            { error: 'Failed to fetch areas' },
            { status: 500 }
        );
    }
}

// POST create new area
export async function POST(request) {
    try {
        const authenticated = await isAuthenticated();
        if (!authenticated) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const data = await request.json();
        const db = getDb();

        const towns = Array.isArray(data.towns) ? JSON.stringify(data.towns) : data.towns;

        const result = await db.execute({
            sql: `INSERT INTO areas (name, towns, sort_order, active) 
            VALUES (?, ?, ?, ?)`,
            args: [
                data.name,
                towns,
                data.sort_order || 0,
                data.active !== undefined ? data.active : 1
            ]
        });

        return NextResponse.json({ success: true, id: Number(result.lastInsertRowid) });
    } catch (error) {
        console.error('Areas POST error:', error);
        return NextResponse.json(
            { error: 'Failed to create area' },
            { status: 500 }
        );
    }
}

// PUT update area
export async function PUT(request) {
    try {
        const authenticated = await isAuthenticated();
        if (!authenticated) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const data = await request.json();
        const db = getDb();

        if (!data.id) {
            return NextResponse.json({ error: 'Area ID required' }, { status: 400 });
        }

        const towns = Array.isArray(data.towns) ? JSON.stringify(data.towns) : data.towns;

        await db.execute({
            sql: `UPDATE areas SET 
            name = ?, towns = ?, sort_order = ?, active = ?, updated_at = CURRENT_TIMESTAMP
            WHERE id = ?`,
            args: [
                data.name,
                towns,
                data.sort_order || 0,
                data.active !== undefined ? data.active : 1,
                data.id
            ]
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Areas PUT error:', error);
        return NextResponse.json(
            { error: 'Failed to update area' },
            { status: 500 }
        );
    }
}

// DELETE area
export async function DELETE(request) {
    try {
        const authenticated = await isAuthenticated();
        if (!authenticated) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Area ID required' }, { status: 400 });
        }

        const db = getDb();
        await db.execute({
            sql: 'DELETE FROM areas WHERE id = ?',
            args: [id]
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Areas DELETE error:', error);
        return NextResponse.json(
            { error: 'Failed to delete area' },
            { status: 500 }
        );
    }
}
