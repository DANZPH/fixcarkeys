import { getDb } from '@/lib/db';
import BlogClient from '../../blog/BlogClient';
import { notFound } from 'next/navigation';

export const revalidate = 60;

function slugify(text) {
    return text ? text.toLowerCase().replace(/'/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') : '';
}

async function getCategoryPosts(slug) {
    try {
        const db = getDb();
        // First find the category name from the slug
        const categoriesRes = await db.execute('SELECT DISTINCT category FROM blog_posts WHERE active = 1');
        const category = categoriesRes.rows.find(row => slugify(row.category) === slug)?.category;

        if (!category) return null;

        const result = await db.execute({
            sql: 'SELECT * FROM blog_posts WHERE active = 1 AND category = ? ORDER BY created_at DESC',
            args: [category]
        });
        
        return {
            category,
            posts: JSON.parse(JSON.stringify(result.rows))
        };
    } catch (error) {
        console.error('Error fetching category posts:', error);
        return null;
    }
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const data = await getCategoryPosts(slug);
    
    if (!data) return { title: 'Category Not Found' };

    return {
        title: `${data.category} - FixCarKeys Blog`,
        description: `Read our latest articles about ${data.category}.`
    };
}

export default async function CategoryPage({ params }) {
    const { slug } = await params;
    const data = await getCategoryPosts(slug);

    if (!data) {
        notFound();
    }

    return <BlogClient 
        initialPosts={data.posts} 
        title={data.category} 
        subtitle={`Articles in ${data.category}`} 
    />;
}
