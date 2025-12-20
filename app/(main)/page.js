import { getDb, initializeDatabase, seedDefaultData } from '@/lib/db';
import HomeClient from './HomeClient';

// Ensure data is fresh
// Ensure data is cached but fresh enough
export const revalidate = 30; // 30 seconds cache

async function getContent() {
  try {
    await initializeDatabase();
    const db = getDb();

    // Check if data exists, if not seed defaults
    const settingsResult = await db.execute('SELECT COUNT(*) as count FROM settings');
    if (settingsResult.rows[0].count === 0) {
      await seedDefaultData();
    }

    // Fetch all data in parallel
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

    // Parse JSON fields and serialize plain objects
    const services = servicesRes.rows.map(row => ({
      ...row,
      features: row.features ? JSON.parse(row.features) : []
    }));

    const areas = areasRes.rows.map(row => ({
      ...row,
      towns: row.towns ? JSON.parse(row.towns) : []
    }));

    // Plain object serialization (JSON.parse(JSON.stringify)) to ensure
    // no class instances (like Row objects) are passed to Client Components.
    return JSON.parse(JSON.stringify({
      settings,
      services,
      testimonials: testimonialsRes.rows,
      brands: brandsRes.rows,
      areas,
      blogPosts: blogRes.rows
    }));
  } catch (error) {
    console.error('Server-side content fetch error:', error);
    // Fallback to avoid breaking the UI completely
    return {
      settings: {},
      services: [],
      testimonials: [],
      brands: [],
      areas: [],
      blogPosts: []
    };
  }
}

export default async function Home() {
  const content = await getContent();

  return <HomeClient initialContent={content} />;
}
