import { getDb } from '../lib/db';

function slugify(text) {
    return text ? text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') : '';
}

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

    // Dynamic routes
    let dynamicRoutes = [];

    try {
        const db = getDb();

        // Blog Posts
        const posts = await db.execute('SELECT id, updated_at FROM blog_posts WHERE active = 1');
        const blogRoutes = posts.rows.map((post) => ({
            url: `${baseUrl}/blog/${post.id}`,
            lastModified: new Date(post.updated_at),
            changeFrequency: 'monthly',
            priority: 0.6,
        }));

        // Blog Categories
        const categories = await db.execute('SELECT DISTINCT category FROM blog_posts WHERE active = 1 AND category IS NOT NULL');
        const categoryRoutes = categories.rows.map((row) => ({
            url: `${baseUrl}/blog/category/${slugify(row.category)}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.7,
        }));

        // Services
        const services = await db.execute('SELECT id, title, updated_at FROM services WHERE active = 1');
        const serviceRoutes = services.rows.map((service) => ({
            url: `${baseUrl}/services/${slugify(service.title)}`,
            lastModified: new Date(service.updated_at),
            changeFrequency: 'monthly',
            priority: 0.7,
        }));

        // Areas
        const areas = await db.execute('SELECT id, name, updated_at FROM areas WHERE active = 1');
        const areaRoutes = areas.rows.map((area) => ({
            url: `${baseUrl}/areas/${slugify(area.name)}`,
            lastModified: new Date(area.updated_at),
            changeFrequency: 'monthly',
            priority: 0.7,
        }));

        // Car Brands
        const brands = await db.execute('SELECT id, name, updated_at FROM brands WHERE active = 1');
        const brandRoutes = brands.rows.map((brand) => ({
            url: `${baseUrl}/car-brands/${slugify(brand.name)}`,
            lastModified: new Date(brand.updated_at),
            changeFrequency: 'monthly',
            priority: 0.7,
        }));

        dynamicRoutes = [...blogRoutes, ...categoryRoutes, ...serviceRoutes, ...areaRoutes, ...brandRoutes];
    } catch (error) {
        console.error('Failed to fetch data for sitemap:', error);
    }

    return [...routes, ...dynamicRoutes];
}
