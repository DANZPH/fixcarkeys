import { getDb } from '@/lib/db';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Phone, CheckCircle, ArrowLeft } from 'lucide-react';

export const revalidate = 60;

function slugify(text) {
    return text ? text.toLowerCase().replace(/'/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') : '';
}

async function getService(slug) {
    try {
        const db = getDb();
        const result = await db.execute('SELECT * FROM services WHERE active = 1');
        const service = result.rows.find(row => slugify(row.title) === slug);
        if (!service) return null;
        return {
            ...service,
            features: service.features ? JSON.parse(service.features) : []
        };
    } catch (error) {
        console.error('Error fetching service:', error);
        return null;
    }
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const service = await getService(slug);
    
    if (!service) return { title: 'Service Not Found' };

    return {
        title: `${service.title} - FixCarKeys`,
        description: service.description || `Professional ${service.title} services by FixCarKeys.`
    };
}

export default async function ServicePage({ params }) {
    const { slug } = await params;
    const service = await getService(slug);

    if (!service) {
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
                    }}>{service.title}</h1>
                    <p style={{
                        fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                        opacity: 0.9,
                        maxWidth: '600px',
                        margin: '0 auto',
                        padding: '0 1rem'
                    }}>{service.description}</p>
                </div>
            </section>

            {/* Service Content */}
            <section style={{ padding: 'clamp(60px, 10vh, 100px) 0', backgroundColor: '#F1F3E0' }}>
                <div className="container" style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1rem' }}>
                    <Link href="/services" style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: '#778873',
                        textDecoration: 'none',
                        marginBottom: '2rem',
                        fontWeight: '500'
                    }}>
                        <ArrowLeft size={20} /> Back to All Services
                    </Link>

                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '20px',
                        padding: 'clamp(1.5rem, 4vw, 3rem)',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
                    }}>
                        {service.image_url && (
                            <img 
                                src={service.image_url} 
                                alt={service.title}
                                style={{
                                    width: '100%',
                                    height: '300px',
                                    objectFit: 'cover',
                                    borderRadius: '12px',
                                    marginBottom: '2rem'
                                }}
                            />
                        )}

                        {service.features && service.features.length > 0 && (
                            <>
                                <h2 style={{ 
                                    fontSize: '1.5rem', 
                                    fontWeight: '700', 
                                    marginBottom: '1.5rem',
                                    color: '#333'
                                }}>What&apos;s Included</h2>
                                <ul style={{ 
                                    listStyle: 'none', 
                                    padding: 0, 
                                    margin: '0 0 2rem 0',
                                    display: 'grid',
                                    gap: '0.75rem'
                                }}>
                                    {service.features.map((feature, index) => (
                                        <li key={index} style={{ 
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            gap: '0.75rem',
                                            color: '#555'
                                        }}>
                                            <CheckCircle size={20} color="#778873" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}

                        <div style={{
                            backgroundColor: '#F1F3E0',
                            borderRadius: '12px',
                            padding: '1.5rem',
                            textAlign: 'center'
                        }}>
                            <p style={{ marginBottom: '1rem', color: '#555' }}>
                                Need this service? Contact us now for a free quote!
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
