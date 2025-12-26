import { getDb } from '@/lib/db';
import BlogClient from './BlogClient';

// Cache for 60 seconds to improve performance
export const revalidate = 60;

async function getBlogPosts() {
    try {
        const db = getDb();
        const result = await db.execute('SELECT * FROM blog_posts WHERE active = 1 ORDER BY created_at DESC');
        // Convert to plain objects
        return JSON.parse(JSON.stringify(result.rows));
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        return [];
    }
}

export default async function BlogPage() {
    const posts = await getBlogPosts();

    return <BlogClient initialPosts={posts} />;
}
