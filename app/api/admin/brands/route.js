import { NextResponse } from 'next/server';
import { getDb, initializeDatabase } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';

// GET all brands
export async function GET() {
    try {
        await initializeDatabase();
        const db = getDb();

        const result = await db.execute('SELECT * FROM brands WHERE active = 1 ORDER BY sort_order ASC');

        return NextResponse.json(result.rows);
    } catch (error) {
        console.error('Brands GET error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch brands' },
            { status: 500 }
        );
    }
}

// POST create new brand
export async function POST(request) {
    try {
        const authenticated = await isAuthenticated();
        if (!authenticated) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const data = await request.json();
        const db = getDb();

        const result = await db.execute({
            sql: `INSERT INTO brands (name, description, logo_url, sort_order, active) 
            VALUES (?, ?, ?, ?, ?)`,
            args: [
                data.name,
                data.description,
                data.logo_url || null,
                data.sort_order || 0,
                data.active !== undefined ? data.active : 1
            ]
        });

        return NextResponse.json({ success: true, id: Number(result.lastInsertRowid) });
    } catch (error) {
        console.error('Brands POST error:', error);
        return NextResponse.json(
            { error: 'Failed to create brand' },
            { status: 500 }
        );
    }
}

// PUT update brand
export async function PUT(request) {
    try {
        const authenticated = await isAuthenticated();
        if (!authenticated) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const data = await request.json();
        const db = getDb();

        if (!data.id) {
            return NextResponse.json({ error: 'Brand ID required' }, { status: 400 });
        }

        await db.execute({
            sql: `UPDATE brands SET 
            name = ?, description = ?, logo_url = ?, 
            sort_order = ?, active = ?, updated_at = CURRENT_TIMESTAMP
            WHERE id = ?`,
            args: [
                data.name,
                data.description,
                data.logo_url,
                data.sort_order || 0,
                data.active !== undefined ? data.active : 1,
                data.id
            ]
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Brands PUT error:', error);
        return NextResponse.json(
            { error: 'Failed to update brand' },
            { status: 500 }
        );
    }
}

// DELETE brand
export async function DELETE(request) {
    try {
        const authenticated = await isAuthenticated();
        if (!authenticated) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Brand ID required' }, { status: 400 });
        }

        const db = getDb();
        await db.execute({
            sql: 'DELETE FROM brands WHERE id = ?',
            args: [id]
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Brands DELETE error:', error);
        return NextResponse.json(
            { error: 'Failed to delete brand' },
            { status: 500 }
        );
    }
}
