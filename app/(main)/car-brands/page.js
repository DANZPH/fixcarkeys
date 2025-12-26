import { getDb } from '@/lib/db';
import CarBrandsClient from './CarBrandsClient';

// Cache for 60 seconds
export const revalidate = 60;

async function getBrands() {
    try {
        const db = getDb();
        const result = await db.execute('SELECT * FROM brands WHERE active = 1 ORDER BY sort_order ASC');
        return JSON.parse(JSON.stringify(result.rows));
    } catch (error) {
        console.error('Error fetching brands:', error);
        return [];
    }
}

export default async function CarBrandsPage() {
    const brands = await getBrands();

    return <CarBrandsClient initialBrands={brands} />;
}
