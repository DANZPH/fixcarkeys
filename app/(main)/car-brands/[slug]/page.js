import { getDb } from '@/lib/db';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Phone, ArrowLeft, Key, Settings, Car } from 'lucide-react';

export const revalidate = 60;

function slugify(text) {
    return text ? text.toLowerCase().replace(/'/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') : '';
}

async function getBrand(slug) {
    try {
        const db = getDb();
        const result = await db.execute('SELECT * FROM brands WHERE active = 1');
        const brand = result.rows.find(row => slugify(row.name) === slug);
        return brand || null;
    } catch (error) {
        console.error('Error fetching brand:', error);
        return null;
    }
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const brand = await getBrand(slug);
    
    if (!brand) return { title: 'Brand Not Found' };

    return {
        title: `${brand.name} Car Key Services - FixCarKeys`,
        description: `Professional ${brand.name} car key cutting, programming, and replacement services. Expert ${brand.name} key specialists.`
    };
}

export default async function BrandPage({ params }) {
    const { slug } = await params;
    const brand = await getBrand(slug);

    if (!brand) {
        notFound();
    }

    const services = [
        { icon: Key, title: 'Key Cutting', desc: `Precision key cutting for all ${brand.name} models` },
        { icon: Settings, title: 'Key Programming', desc: `Professional ${brand.name} key programming` },
        { icon: Car, title: 'Emergency Lockout', desc: `Fast lockout assistance for ${brand.name} vehicles` },
    ];

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
                    {brand.logo_url && (
                        <img 
                            src={brand.logo_url} 
                            alt={brand.name}
                            style={{
                                width: '80px',
                                height: '80px',
                                objectFit: 'contain',
                                marginBottom: '1rem',
                                filter: 'brightness(0) invert(1)'
                            }}
                        />
                    )}
                    <h1 style={{
                        fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                        fontWeight: '800',
                        marginBottom: '1rem',
                        letterSpacing: '-1px',
                        lineHeight: 1.2
                    }}>{brand.name} Car Key Services</h1>
                    <p style={{
                        fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                        opacity: 0.9,
                        maxWidth: '600px',
                        margin: '0 auto',
                        padding: '0 1rem'
                    }}>Expert {brand.name} key specialists for all models</p>
                </div>
            </section>

            {/* Brand Content */}
            <section style={{ padding: 'clamp(60px, 10vh, 100px) 0', backgroundColor: '#F1F3E0' }}>
                <div className="container" style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1rem' }}>
                    <Link href="/car-brands" style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: '#778873',
                        textDecoration: 'none',
                        marginBottom: '2rem',
                        fontWeight: '500'
                    }}>
                        <ArrowLeft size={20} /> Back to All Brands
                    </Link>

                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '20px',
                        padding: 'clamp(1.5rem, 4vw, 3rem)',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
                    }}>
                        {brand.description && (
                            <p style={{ color: '#555', marginBottom: '2rem', lineHeight: 1.7 }}>
                                {brand.description}
                            </p>
                        )}

                        <h2 style={{ 
                            fontSize: '1.5rem', 
                            fontWeight: '700', 
                            marginBottom: '1.5rem',
                            color: '#333'
                        }}>Our {brand.name} Services</h2>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                            gap: '1.5rem',
                            marginBottom: '2rem'
                        }}>
                            {services.map((service, index) => (
                                <div key={index} style={{
                                    backgroundColor: '#F1F3E0',
                                    borderRadius: '12px',
                                    padding: '1.5rem',
                                    textAlign: 'center'
                                }}>
                                    <service.icon size={32} color="#778873" style={{ marginBottom: '1rem' }} />
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem', color: '#333' }}>
                                        {service.title}
                                    </h3>
                                    <p style={{ fontSize: '0.9rem', color: '#666' }}>{service.desc}</p>
                                </div>
                            ))}
                        </div>

                        <div style={{
                            backgroundColor: '#F1F3E0',
                            borderRadius: '12px',
                            padding: '1.5rem',
                            textAlign: 'center'
                        }}>
                            <p style={{ marginBottom: '1rem', color: '#555' }}>
                                Need a {brand.name} key specialist? Contact us now!
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
