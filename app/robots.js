export default function robots() {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/admin/', '/api/'],
        },
        sitemap: [
            'https://fixcarkeys.co.uk/sitemap.xml',
            'https://fixcarkeys.co.uk/services-sitemap.xml',
            'https://fixcarkeys.co.uk/areas-sitemap.xml',
            'https://fixcarkeys.co.uk/brands-sitemap.xml',
            'https://fixcarkeys.co.uk/blog-sitemap.xml',
        ],
    }
}
