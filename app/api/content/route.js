import { NextResponse } from 'next/server';
import { getDb, initializeDatabase, seedDefaultData } from '@/lib/db';

// Helper for retry logic
const retry = async (fn, retries = 3, delay = 1000) => {
    try {
        return await fn();
    } catch (error) {
        if (retries <= 0) throw error;
        console.log(`Database operation failed, retrying... (${retries} attempts left)`);
        await new Promise(resolve => setTimeout(resolve, delay));
        return retry(fn, retries - 1, delay * 1.5);
    }
};

// GET all content for the website
export async function GET() {
    try {
        const data = await retry(async () => {
            await initializeDatabase();
            const db = getDb();

            // Check if data exists, if not seed defaults
            const settingsResult = await db.execute('SELECT COUNT(*) as count FROM settings');
            if (settingsResult.rows[0].count === 0) {
                await seedDefaultData();
            }

            // Fetch all data
            const [settingsRes, servicesRes, testimonialsRes, brandsRes, areasRes, blogRes] = await Promise.all([
                db.execute('SELECT key, value FROM settings'),
                db.execute('SELECT * FROM services WHERE active = 1 ORDER BY sort_order ASC'),
                db.execute('SELECT * FROM testimonials WHERE active = 1 ORDER BY sort_order ASC'),
                db.execute('SELECT * FROM brands WHERE active = 1 ORDER BY sort_order ASC'),
                db.execute('SELECT * FROM areas WHERE active = 1 ORDER BY sort_order ASC'),
                db.execute('SELECT * FROM blog_posts WHERE active = 1 ORDER BY created_at DESC'),
            ]);

            // Convert settings to object
            const settings = {};
            for (const row of settingsRes.rows) {
                settings[row.key] = row.value;
            }

            // Parse JSON fields
            const services = servicesRes.rows.map(row => ({
                ...row,
                features: row.features ? JSON.parse(row.features) : []
            }));

            const areas = areasRes.rows.map(row => ({
                ...row,
                towns: row.towns ? JSON.parse(row.towns) : []
            }));

            return {
                settings,
                services,
                testimonials: testimonialsRes.rows,
                brands: brandsRes.rows,
                areas,
                blogPosts: blogRes.rows
            };
        });

        return NextResponse.json(data);
    } catch (error) {
        console.error('Content API error:', error);
        // Fallback to avoid breaking the UI completely
        return NextResponse.json({
            settings: {},
            services: [],
            testimonials: [],
            brands: [],
            areas: [],
            blogPosts: [],
            error: 'Failed to load content from database'
        }, { status: 200 }); // Return 200 with empty data to prevent page crash
    }
}
