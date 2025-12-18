import { NextResponse } from 'next/server';
import { getDb, initializeDatabase } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';

// GET all services
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
        return NextResponse.json(
            { error: 'Failed to fetch services' },
            { status: 500 }
        );
    }
}

// POST create new service
export async function POST(request) {
    try {
        const authenticated = await isAuthenticated();
        if (!authenticated) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const data = await request.json();
        const db = getDb();

        const features = Array.isArray(data.features) ? JSON.stringify(data.features) : data.features;

        const result = await db.execute({
            sql: `INSERT INTO services (icon, title, description, features, image_url, sort_order, active) 
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            args: [
                data.icon || '🔑',
                data.title,
                data.description,
                features,
                data.image_url || null,
                data.sort_order || 0,
                data.active !== undefined ? data.active : 1
            ]
        });

        return NextResponse.json({ success: true, id: Number(result.lastInsertRowid) });
    } catch (error) {
        console.error('Services POST error:', error);
        return NextResponse.json(
            { error: 'Failed to create service' },
            { status: 500 }
        );
    }
}

// PUT update service
export async function PUT(request) {
    try {
        const authenticated = await isAuthenticated();
        if (!authenticated) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const data = await request.json();
        const db = getDb();

        if (!data.id) {
            return NextResponse.json({ error: 'Service ID required' }, { status: 400 });
        }

        const features = Array.isArray(data.features) ? JSON.stringify(data.features) : data.features;

        await db.execute({
            sql: `UPDATE services SET 
            icon = ?, title = ?, description = ?, features = ?, 
            image_url = ?, sort_order = ?, active = ?, updated_at = CURRENT_TIMESTAMP
            WHERE id = ?`,
            args: [
                data.icon,
                data.title,
                data.description,
                features,
                data.image_url,
                data.sort_order || 0,
                data.active !== undefined ? data.active : 1,
                data.id
            ]
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Services PUT error:', error);
        return NextResponse.json(
            { error: 'Failed to update service' },
            { status: 500 }
        );
    }
}

// DELETE service
export async function DELETE(request) {
    try {
        const authenticated = await isAuthenticated();
        if (!authenticated) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Service ID required' }, { status: 400 });
        }

        const db = getDb();
        await db.execute({
            sql: 'DELETE FROM services WHERE id = ?',
            args: [id]
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Services DELETE error:', error);
        return NextResponse.json(
            { error: 'Failed to delete service' },
            { status: 500 }
        );
    }
}
