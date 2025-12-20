'use client';

import { useState, useEffect } from 'react';
import { LogoMarquee } from "@/components/ui/LogoMarquee";
import Link from 'next/link';
import LoadingSpinner from "@/components/LoadingSpinner";

export default function CarBrandsPage() {
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchBrands() {
            try {
                const res = await fetch('/api/brands');
                if (res.ok) {
                    const data = await res.json();
                    setBrands(data);
                }
            } catch (error) {
                console.error('Failed to fetch brands:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchBrands();
    }, []);

    return (
        <>
            {/* Page Header */}
            <section style={{
                background: 'linear-gradient(135deg, #778873 0%, #A1BC98 50%, #D2DCB6 100%)',
                padding: '160px 0 80px',
                color: 'white',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Grid Background */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: `
                        linear-gradient(rgba(255, 255, 255, 0.07) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255, 255, 255, 0.07) 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px',
                    pointerEvents: 'none',
                    zIndex: 0
                }} />
                <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                    <span style={{
                        display: 'inline-block',
                        backgroundColor: 'rgba(255,255,255,0.2)',
                        backdropFilter: 'blur(10px)',
                        color: 'white',
                        padding: '8px 20px',
                        borderRadius: '50px',
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        marginBottom: '1rem',
                        border: '1px solid rgba(255,255,255,0.3)',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                    }}>
                        Certified Brand Specialists
                    </span>
                    <h1 style={{
                        fontSize: '3.5rem',
                        fontWeight: '800',
                        marginBottom: '1rem',
                        letterSpacing: '-1px'
                    }}>Car Brands We Service</h1>
                    <p style={{
                        fontSize: '1.25rem',
                        opacity: 0.9,
                        maxWidth: '600px',
                        margin: '0 auto'
                    }}>We carry the latest diagnostic equipment and key blanks for over 60 manufacturers.</p>
                </div>
            </section>

            {/* Brands Marquee Section */}
            <section style={{ padding: '60px 0', backgroundColor: '#778873' }}>
                {loading ? (
                    <LoadingSpinner text="Loading brands..." variant="light" size="medium" />
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
                        <LogoMarquee items={brands.slice(0, Math.ceil(brands.length / 2))} speed={50} direction="left" />
                        <LogoMarquee items={brands.slice(Math.ceil(brands.length / 2))} speed={60} direction="right" />
                    </div>
                )}
            </section>

            {/* All Brands Grid */}
            <section style={{ padding: '100px 0', backgroundColor: '#F1F3E0' }}>
                <div className="container">
                    <h2 style={{
                        fontSize: '2.5rem',
                        fontWeight: '700',
                        color: '#778873',
                        textAlign: 'center',
                        marginBottom: '3rem'
                    }}>All Supported Brands</h2>

                    {!loading && (
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                            gap: '1.5rem'
                        }}>
                            {brands.map((brand, index) => (
                                <div key={brand.id || index} style={{
                                    backgroundColor: 'white',
                                    borderRadius: '12px',
                                    padding: '1.5rem',
                                    textAlign: 'center',
                                    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                    cursor: 'default'
                                }}
                                    onMouseOver={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-5px)';
                                        e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
                                    }}
                                    onMouseOut={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
                                    }}
                                >
                                    {brand.logo_url && (
                                        <img
                                            src={brand.logo_url}
                                            alt={brand.name}
                                            style={{
                                                width: '60px',
                                                height: '60px',
                                                objectFit: 'contain',
                                                margin: '0 auto 0.75rem'
                                            }}
                                        />
                                    )}
                                    <p style={{
                                        fontWeight: '600',
                                        color: '#778873',
                                        fontSize: '0.95rem',
                                        margin: 0
                                    }}>{brand.name}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Contact CTA */}
                    <div style={{
                        marginTop: '4rem',
                        backgroundColor: '#778873',
                        borderRadius: '24px',
                        padding: '3rem',
                        textAlign: 'center',
                        color: 'white'
                    }}>
                        <h3 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '1rem' }}>
                            Don't see your brand?
                        </h3>
                        <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', opacity: 0.9 }}>
                            We service 99% of vehicles on the road today. Contact us to check if we can help!
                        </p>
                        <Link href="/contact" style={{
                            display: 'inline-block',
                            backgroundColor: '#F1F3E0',
                            color: '#778873',
                            padding: '14px 32px',
                            borderRadius: '10px',
                            textDecoration: 'none',
                            fontWeight: '600',
                            fontSize: '1rem',
                            transition: 'transform 0.3s ease'
                        }}>
                            Contact Us →
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
