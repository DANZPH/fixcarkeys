import { getDb } from '@/lib/db';

function slugify(text) {
    return text ? text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') : '';
}

export async function GET() {
    const baseUrl = 'https://fixcarkeys.co.uk';
    let areas = [];

    try {
        const db = getDb();
        const result = await db.execute('SELECT id, name, updated_at FROM areas WHERE active = 1');
        areas = result.rows;
    } catch (error) {
        console.error('Error fetching areas for sitemap:', error);
    }

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${areas.map(area => `
    <url>
        <loc>${baseUrl}/areas/${slugify(area.name)}</loc>
        <lastmod>${new Date(area.updated_at).toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
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
