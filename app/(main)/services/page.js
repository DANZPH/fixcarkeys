import { getDb } from '@/lib/db';
import ServicesClient from './ServicesClient';

// Cache for 60 seconds
export const revalidate = 60;

async function getServices() {
    try {
        const db = getDb();
        const result = await db.execute('SELECT * FROM services WHERE active = 1 ORDER BY sort_order ASC');

        // Parse features JSON and convert to plain objects
        const services = result.rows.map(row => ({
            ...row,
            features: row.features ? JSON.parse(row.features) : []
        }));

        return JSON.parse(JSON.stringify(services));
    } catch (error) {
        console.error('Error fetching services:', error);
        return [];
    }
}

export default async function ServicesPage() {
    const services = await getServices();

    return <ServicesClient initialServices={services} />;
}
