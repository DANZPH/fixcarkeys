import { NextResponse } from 'next/server';
import { getDb, initializeDatabase } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';

// GET all blog posts
export async function GET() {
    try {
        await initializeDatabase();
        const db = getDb();

        const result = await db.execute('SELECT * FROM blog_posts WHERE active = 1 ORDER BY created_at DESC');

        return NextResponse.json(result.rows);
    } catch (error) {
        console.error('Blog GET error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch blog posts' },
            { status: 500 }
        );
    }
}

// POST create new blog post
export async function POST(request) {
    try {
        const authenticated = await isAuthenticated();
        if (!authenticated) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const data = await request.json();
        const db = getDb();

        const result = await db.execute({
            sql: `INSERT INTO blog_posts (title, excerpt, content, category, image_url, active) 
            VALUES (?, ?, ?, ?, ?, ?)`,
            args: [
                data.title,
                data.excerpt,
                data.content || null,
                data.category || 'Uncategorized',
                data.image_url || null,
                data.active !== undefined ? data.active : 1
            ]
        });

        return NextResponse.json({ success: true, id: Number(result.lastInsertRowid) });
    } catch (error) {
        console.error('Blog POST error:', error);
        return NextResponse.json(
            { error: 'Failed to create blog post' },
            { status: 500 }
        );
    }
}

// PUT update blog post
export async function PUT(request) {
    try {
        const authenticated = await isAuthenticated();
        if (!authenticated) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const data = await request.json();
        const db = getDb();

        if (!data.id) {
            return NextResponse.json({ error: 'Blog post ID required' }, { status: 400 });
        }

        await db.execute({
            sql: `UPDATE blog_posts SET 
            title = ?, excerpt = ?, content = ?, category = ?, 
            image_url = ?, active = ?, updated_at = CURRENT_TIMESTAMP
            WHERE id = ?`,
            args: [
                data.title,
                data.excerpt,
                data.content,
                data.category || 'Uncategorized',
                data.image_url,
                data.active !== undefined ? data.active : 1,
                data.id
            ]
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Blog PUT error:', error);
        return NextResponse.json(
            { error: 'Failed to update blog post' },
            { status: 500 }
        );
    }
}

// DELETE blog post
export async function DELETE(request) {
    try {
        const authenticated = await isAuthenticated();
        if (!authenticated) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Blog post ID required' }, { status: 400 });
        }

        const db = getDb();
        await db.execute({
            sql: 'DELETE FROM blog_posts WHERE id = ?',
            args: [id]
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Blog DELETE error:', error);
        return NextResponse.json(
            { error: 'Failed to delete blog post' },
            { status: 500 }
        );
    }
}
