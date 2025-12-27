import { getDb } from '@/lib/db';
import { notFound } from 'next/navigation';
import ServicePage from '../services/[slug]/page';
import AreaPage from '../areas/[slug]/page';
import AreasPage from '../areas/page';
import BlogPost from '../blog/[id]/page';

export const revalidate = 60;

function slugify(text) {
    return text ? text.toLowerCase().replace(/'/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') : '';
}

async function findContent(slug) {
    const db = getDb();
    
    // 1. Check for specific static mappings
    if (slug === 'area-we-cover') {
        return { type: 'static_areas' };
    }
    if (slug === 'spare-car-keys') {
        // Map to Key Replacement service
        return { type: 'service', slug: 'key-replacement' };
    }

    // 2. Check Services
    const services = await db.execute('SELECT title FROM services WHERE active = 1');
    const service = services.rows.find(row => slugify(row.title) === slug);
    if (service) return { type: 'service', slug };

    // 3. Check Areas
    const areas = await db.execute('SELECT name FROM areas WHERE active = 1');
    const area = areas.rows.find(row => slugify(row.name) === slug);
    if (area) return { type: 'area', slug };

    // 4. Check Blog Posts
    const posts = await db.execute('SELECT id, title FROM blog_posts WHERE active = 1');
    const post = posts.rows.find(row => slugify(row.title) === slug);
    if (post) return { type: 'post', id: post.id };

    return null;
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const content = await findContent(slug);

    if (!content) return { title: 'Page Not Found' };

    if (content.type === 'static_areas') {
        return {
            title: 'Areas We Cover - FixCarKeys',
            description: 'Check the areas we cover for car key services.'
        };
    }

    if (content.type === 'service') {
        // We could import generateMetadata from service page, but simpler to just query
        // or let the page handle it? No, metadata needs to be returned here.
        // For now, generic metadata or re-query.
        // Re-querying is safer.
        const db = getDb();
        const res = await db.execute({sql: 'SELECT title, description FROM services WHERE title LIKE ?', args: [slug.replace(/-/g, '%')]}); 
        // Approximate match for metadata is okay, or we can rely on the page's metadata if we could delegate.
        // But we can't easily delegate metadata.
        // Let's just return basic metadata.
        return {
            title: `${slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} - FixCarKeys`,
        };
    }

    if (content.type === 'area') {
        return {
            title: `Car Key Services in ${slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} - FixCarKeys`,
        };
    }

    if (content.type === 'post') {
        const db = getDb();
        const res = await db.execute({sql: 'SELECT title, excerpt FROM blog_posts WHERE id = ?', args: [content.id]});
        if (res.rows.length > 0) {
            return {
                title: res.rows[0].title,
                description: res.rows[0].excerpt
            };
        }
    }

    return { title: 'FixCarKeys' };
}

export default async function CatchAllPage({ params }) {
    const { slug } = await params;
    const content = await findContent(slug);

    if (!content) {
        notFound();
    }

    if (content.type === 'static_areas') {
        return <AreasPage />;
    }

    if (content.type === 'service') {
        return <ServicePage params={Promise.resolve({ slug })} />;
    }

    if (content.type === 'area') {
        return <AreaPage params={Promise.resolve({ slug })} />;
    }

    if (content.type === 'post') {
        return <BlogPost params={Promise.resolve({ id: content.id })} />;
    }

    return notFound();
}
