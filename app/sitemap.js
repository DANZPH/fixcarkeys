import { getDb } from '../lib/db';

export default async function sitemap() {
    const baseUrl = 'https://fixcarkeys.co.uk';

    // Static routes
    const routes = [
        '',
        '/reviews',
        '/services',
        '/areas',
        '/contact',
        '/blog',
        '/car-brands',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1 : 0.8,
    }));

    // Dynamic routes: Blog Posts
    let blogRoutes = [];
    try {
        const db = getDb();
        const posts = await db.execute('SELECT id, updated_at FROM blog_posts WHERE active = 1');

        blogRoutes = posts.rows.map((post) => ({
            url: `${baseUrl}/blog/${post.id}`,
            lastModified: new Date(post.updated_at),
            changeFrequency: 'monthly',
            priority: 0.6,
        }));
    } catch (error) {
        console.error('Failed to fetch blog posts for sitemap:', error);
    }

    return [...routes, ...blogRoutes];
}
