import { NextResponse } from 'next/server';
import { getDb, initializeDatabase } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';

// GET all testimonials
export async function GET() {
    try {
        await initializeDatabase();
        const db = getDb();

        const result = await db.execute('SELECT * FROM testimonials WHERE active = 1 ORDER BY sort_order ASC');

        return NextResponse.json(result.rows);
    } catch (error) {
        console.error('Testimonials GET error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch testimonials' },
            { status: 500 }
        );
    }
}

// POST create new testimonial
export async function POST(request) {
    try {
        const authenticated = await isAuthenticated();
        if (!authenticated) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const data = await request.json();
        const db = getDb();

        const result = await db.execute({
            sql: `INSERT INTO testimonials (name, designation, quote, image_url, rating, sort_order, active) 
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            args: [
                data.name,
                data.designation,
                data.quote,
                data.image_url || null,
                data.rating || 5,
                data.sort_order || 0,
                data.active !== undefined ? data.active : 1
            ]
        });

        return NextResponse.json({ success: true, id: Number(result.lastInsertRowid) });
    } catch (error) {
        console.error('Testimonials POST error:', error);
        return NextResponse.json(
            { error: 'Failed to create testimonial' },
            { status: 500 }
        );
    }
}

// PUT update testimonial
export async function PUT(request) {
    try {
        const authenticated = await isAuthenticated();
        if (!authenticated) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const data = await request.json();
        const db = getDb();

        if (!data.id) {
            return NextResponse.json({ error: 'Testimonial ID required' }, { status: 400 });
        }

        await db.execute({
            sql: `UPDATE testimonials SET 
            name = ?, designation = ?, quote = ?, image_url = ?, 
            rating = ?, sort_order = ?, active = ?, updated_at = CURRENT_TIMESTAMP
            WHERE id = ?`,
            args: [
                data.name,
                data.designation,
                data.quote,
                data.image_url,
                data.rating || 5,
                data.sort_order || 0,
                data.active !== undefined ? data.active : 1,
                data.id
            ]
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Testimonials PUT error:', error);
        return NextResponse.json(
            { error: 'Failed to update testimonial' },
            { status: 500 }
        );
    }
}

// DELETE testimonial
export async function DELETE(request) {
    try {
        const authenticated = await isAuthenticated();
        if (!authenticated) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Testimonial ID required' }, { status: 400 });
        }

        const db = getDb();
        await db.execute({
            sql: 'DELETE FROM testimonials WHERE id = ?',
            args: [id]
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Testimonials DELETE error:', error);
        return NextResponse.json(
            { error: 'Failed to delete testimonial' },
            { status: 500 }
        );
    }
}
