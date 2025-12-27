import { getDb } from '@/lib/db';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Phone, MapPin, ArrowLeft } from 'lucide-react';

export const revalidate = 60;

function slugify(text) {
    return text ? text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') : '';
}

async function getArea(slug) {
    try {
        const db = getDb();
        const result = await db.execute('SELECT * FROM areas WHERE active = 1');
        const area = result.rows.find(row => slugify(row.name) === slug);
        if (!area) return null;
        return {
            ...area,
            towns: area.towns ? JSON.parse(area.towns) : []
        };
    } catch (error) {
        console.error('Error fetching area:', error);
        return null;
    }
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const area = await getArea(slug);
    
    if (!area) return { title: 'Area Not Found' };

    return {
        title: `Car Key Services in ${area.name} - FixCarKeys`,
        description: `Professional car key cutting, programming, and replacement services in ${area.name} and surrounding areas.`
    };
}

export default async function AreaPage({ params }) {
    const { slug } = await params;
    const area = await getArea(slug);

    if (!area) {
        notFound();
    }

    return (
        <>
            {/* Page Header */}
            <section style={{
                background: 'linear-gradient(135deg, #778873 0%, #A1BC98 50%, #D2DCB6 100%)',
                padding: 'clamp(100px, 15vh, 160px) 0 clamp(60px, 8vh, 80px)',
                color: 'white',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    backgroundImage: `
                        linear-gradient(rgba(255, 255, 255, 0.07) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255, 255, 255, 0.07) 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px',
                    pointerEvents: 'none',
                    zIndex: 0
                }} />
                <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                    <h1 style={{
                        fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                        fontWeight: '800',
                        marginBottom: '1rem',
                        letterSpacing: '-1px',
                        lineHeight: 1.2
                    }}>Car Key Services in {area.name}</h1>
                    <p style={{
                        fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                        opacity: 0.9,
                        maxWidth: '600px',
                        margin: '0 auto',
                        padding: '0 1rem'
                    }}>Professional mobile locksmith covering {area.name} and surrounding towns</p>
                </div>
            </section>

            {/* Area Content */}
            <section style={{ padding: 'clamp(60px, 10vh, 100px) 0', backgroundColor: '#F1F3E0' }}>
                <div className="container" style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1rem' }}>
                    <Link href="/areas" style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: '#778873',
                        textDecoration: 'none',
                        marginBottom: '2rem',
                        fontWeight: '500'
                    }}>
                        <ArrowLeft size={20} /> Back to All Areas
                    </Link>

                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '20px',
                        padding: 'clamp(1.5rem, 4vw, 3rem)',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
                    }}>
                        <h2 style={{ 
                            fontSize: '1.5rem', 
                            fontWeight: '700', 
                            marginBottom: '1rem',
                            color: '#333'
                        }}>We Cover {area.name}</h2>
                        
                        <p style={{ color: '#555', marginBottom: '2rem', lineHeight: 1.7 }}>
                            Our mobile car key specialists provide fast, reliable services across {area.name}. 
                            Whether you need emergency lockout assistance, key cutting, or key programming, 
                            we come to you at your location.
                        </p>

                        {area.towns && area.towns.length > 0 && (
                            <>
                                <h3 style={{ 
                                    fontSize: '1.25rem', 
                                    fontWeight: '600', 
                                    marginBottom: '1rem',
                                    color: '#333'
                                }}>Towns We Cover</h3>
                                <div style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: '0.75rem',
                                    marginBottom: '2rem'
                                }}>
                                    {area.towns.map((town, index) => (
                                        <span key={index} style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            backgroundColor: '#F1F3E0',
                                            padding: '0.5rem 1rem',
                                            borderRadius: '50px',
                                            fontSize: '0.9rem',
                                            color: '#555'
                                        }}>
                                            <MapPin size={14} color="#778873" />
                                            {town}
                                        </span>
                                    ))}
                                </div>
                            </>
                        )}

                        <div style={{
                            backgroundColor: '#F1F3E0',
                            borderRadius: '12px',
                            padding: '1.5rem',
                            textAlign: 'center'
                        }}>
                            <p style={{ marginBottom: '1rem', color: '#555' }}>
                                Need a car key specialist in {area.name}? Call us now!
                            </p>
                            <a href="tel:07444125447" style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                backgroundColor: '#778873',
                                color: 'white',
                                padding: '0.75rem 1.5rem',
                                borderRadius: '50px',
                                textDecoration: 'none',
                                fontWeight: '600'
                            }}>
                                <Phone size={18} /> Call 07444 125447
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
