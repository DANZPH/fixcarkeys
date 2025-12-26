import { getDb } from '@/lib/db';
import AreasClient from './AreasClient';

// Cache for 60 seconds
export const revalidate = 60;

async function getAreas() {
  try {
    const db = getDb();
    const result = await db.execute('SELECT * FROM areas WHERE active = 1 ORDER BY sort_order ASC');

    // Parse towns JSON and convert to plain objects
    const areas = result.rows.map(row => ({
      ...row,
      towns: row.towns ? JSON.parse(row.towns) : []
    }));

    return JSON.parse(JSON.stringify(areas));
  } catch (error) {
    console.error('Error fetching areas:', error);
    return [];
  }
}

export default async function AreasPage() {
  const areas = await getAreas();

  return <AreasClient initialAreas={areas} />;
}
