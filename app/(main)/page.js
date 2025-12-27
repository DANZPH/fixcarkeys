import { getDb, initializeDatabase, seedDefaultData } from '@/lib/db';
import HomeClient from './HomeClient';

export const metadata = {
  title: {
    absolute: 'FixCarKeys - Professional Car Key Services'
  },
  description: 'Professional car key cutting, programming, and replacement services for all vehicle makes and models.'
};

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

    // Fetch settings for the hero section
    const settingsRes = await db.execute('SELECT key, value FROM settings');

    // Convert settings to object
    const settings = {};
    for (const row of settingsRes.rows) {
      settings[row.key] = row.value;
    }

    // Plain object serialization (JSON.parse(JSON.stringify)) to ensure
    // no class instances (like Row objects) are passed to Client Components.
    return JSON.parse(JSON.stringify({
      settings,
      services: [], // Not needed on home page anymore
    }));
  } catch (error) {
    console.error('Server-side content fetch error:', error);
    // Fallback to avoid breaking the UI completely
    return {
      settings: {},
      services: []
    };
  }
}

export default async function Home() {
  const content = await getContent();

  return <HomeClient initialContent={content} />;
}
