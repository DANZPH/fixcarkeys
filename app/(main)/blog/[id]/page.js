
import { getDb } from '@/lib/db';
import { notFound } from 'next/navigation';
import BlogPostClient from './BlogPostClient';

export const dynamic = 'force-dynamic';

async function getBlogPost(id) {
    try {
        const db = getDb();
        const result = await db.execute({
            sql: 'SELECT * FROM blog_posts WHERE id = ?',
            args: [id]
        });
        return result.rows[0];
    } catch (error) {
        console.error('Error fetching blog post:', error);
        return null;
    }
}

export default async function BlogPost({ params }) {
    const { id } = await params;
    const post = await getBlogPost(id);

    if (!post) {
        notFound();
    }

    // Convert to plain object to avoid "Server Functions" serialization error
    // because the DB driver might return a Row class instance.
    const plainPost = JSON.parse(JSON.stringify(post));

    return <BlogPostClient post={plainPost} />;
}
