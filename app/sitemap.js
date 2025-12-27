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

    return routes;
}
