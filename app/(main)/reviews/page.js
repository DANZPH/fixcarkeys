import { getDb } from '@/lib/db';
import ReviewsClient from './ReviewsClient';

// Cache for 60 seconds
export const revalidate = 60;

async function getTestimonials() {
    try {
        const db = getDb();
        const result = await db.execute('SELECT * FROM testimonials WHERE active = 1 ORDER BY sort_order ASC');
        return JSON.parse(JSON.stringify(result.rows));
    } catch (error) {
        console.error('Error fetching testimonials:', error);
        return [];
    }
}

export default async function ReviewsPage() {
    const testimonials = await getTestimonials();

    return <ReviewsClient initialTestimonials={testimonials} />;
}
