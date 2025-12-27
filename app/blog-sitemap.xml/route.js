import { getDb } from '@/lib/db';

function slugify(text) {
    return text ? text.toLowerCase().replace(/'/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') : '';
}

export async function GET() {
    const baseUrl = 'https://fixcarkeys.co.uk';
    let posts = [];
    let categories = [];

    try {
        const db = getDb();
        const postsResult = await db.execute('SELECT id, updated_at FROM blog_posts WHERE active = 1');
        posts = postsResult.rows;
        
        const categoriesResult = await db.execute('SELECT DISTINCT category FROM blog_posts WHERE active = 1 AND category IS NOT NULL');
        categories = categoriesResult.rows;
    } catch (error) {
        console.error('Error fetching blog data for sitemap:', error);
    }

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${posts.map(post => `
    <url>
        <loc>${baseUrl}/blog/${post.id}</loc>
        <lastmod>${new Date(post.updated_at).toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.6</priority>
    </url>
    `).join('')}
    ${categories.map(row => `
    <url>
        <loc>${baseUrl}/blog/category/${slugify(row.category)}</loc>
        <changefreq>weekly</changefreq>
        <priority>0.7</priority>
    </url>
    `).join('')}
</urlset>`;

    return new Response(sitemap, {
        headers: {
            'Content-Type': 'application/xml',
        },
    });
}
