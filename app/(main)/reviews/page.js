'use client';

import { useState, useEffect } from 'react';
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function ReviewsPage() {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchTestimonials() {
            try {
                const res = await fetch('/api/testimonials');
                if (res.ok) {
                    const data = await res.json();
                    setTestimonials(data);
                }
            } catch (error) {
                console.error('Failed to fetch testimonials:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchTestimonials();
    }, []);

    // Process testimonials for AnimatedTestimonials
    const processedTestimonials = testimonials.map(t => ({
        name: t.name,
        designation: t.designation,
        quote: t.quote,
        src: t.image_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop'
    }));

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
                    <h1 style={{
                        fontSize: '3.5rem',
                        fontWeight: '800',
                        marginBottom: '1rem',
                        letterSpacing: '-1px'
                    }}>Customer Reviews</h1>
                    <p style={{
                        fontSize: '1.25rem',
                        opacity: 0.9,
                        maxWidth: '600px',
                        margin: '0 auto'
                    }}>Real reviews from real customers who trust our services</p>
                </div>
            </section>

            {/* Reviews Section */}
            <section style={{ padding: '100px 0', backgroundColor: '#778873' }}>
                <div className="container">
                    {loading ? (
                        <LoadingSpinner text="Loading reviews..." variant="light" size="medium" />
                    ) : processedTestimonials.length > 0 ? (
                        <AnimatedTestimonials testimonials={processedTestimonials} />
                    ) : (
                        <p style={{ textAlign: 'center', color: 'white' }}>No reviews available.</p>
                    )}
                </div>
            </section>

            {/* Trust Indicators */}
            <section style={{ padding: '100px 0', backgroundColor: '#F1F3E0' }}>
                <div className="container">
                    <h2 style={{
                        fontSize: '2.5rem',
                        fontWeight: '700',
                        color: '#778873',
                        textAlign: 'center',
                        marginBottom: '3rem'
                    }}>Why Customers Trust Us</h2>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '2rem'
                    }}>
                        <div style={{
                            backgroundColor: 'white',
                            borderRadius: '20px',
                            padding: '2.5rem',
                            textAlign: 'center',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
                        }}>
                            <div style={{
                                fontSize: '3rem',
                                marginBottom: '1rem'
                            }}>⭐</div>
                            <h3 style={{ color: '#778873', fontSize: '1.5rem', marginBottom: '0.75rem' }}>5-Star Service</h3>
                            <p style={{ color: '#666' }}>Consistently rated 5 stars by our customers for quality and reliability.</p>
                        </div>

                        <div style={{
                            backgroundColor: 'white',
                            borderRadius: '20px',
                            padding: '2.5rem',
                            textAlign: 'center',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
                        }}>
                            <div style={{
                                fontSize: '3rem',
                                marginBottom: '1rem'
                            }}>🔒</div>
                            <h3 style={{ color: '#778873', fontSize: '1.5rem', marginBottom: '0.75rem' }}>Licensed & Insured</h3>
                            <p style={{ color: '#666' }}>Fully licensed auto locksmith with comprehensive insurance coverage.</p>
                        </div>

                        <div style={{
                            backgroundColor: 'white',
                            borderRadius: '20px',
                            padding: '2.5rem',
                            textAlign: 'center',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
                        }}>
                            <div style={{
                                fontSize: '3rem',
                                marginBottom: '1rem'
                            }}>🏆</div>
                            <h3 style={{ color: '#778873', fontSize: '1.5rem', marginBottom: '0.75rem' }}>15+ Years Experience</h3>
                            <p style={{ color: '#666' }}>Over 15 years of expertise in automotive locksmith services.</p>
                        </div>

                        <div style={{
                            backgroundColor: 'white',
                            borderRadius: '20px',
                            padding: '2.5rem',
                            textAlign: 'center',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
                        }}>
                            <div style={{
                                fontSize: '3rem',
                                marginBottom: '1rem'
                            }}>✅</div>
                            <h3 style={{ color: '#778873', fontSize: '1.5rem', marginBottom: '0.75rem' }}>100% Satisfaction</h3>
                            <p style={{ color: '#666' }}>We guarantee your satisfaction with every service we provide.</p>
                        </div>
                    </div>

                    {/* Review Stats */}
                    <div style={{
                        marginTop: '4rem',
                        backgroundColor: '#778873',
                        borderRadius: '24px',
                        padding: '3rem',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                        gap: '2rem',
                        textAlign: 'center',
                        color: 'white'
                    }}>
                        <div>
                            <div style={{ fontSize: '3rem', fontWeight: '800' }}>500+</div>
                            <div style={{ opacity: 0.9 }}>Happy Customers</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '3rem', fontWeight: '800' }}>4.9</div>
                            <div style={{ opacity: 0.9 }}>Average Rating</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '3rem', fontWeight: '800' }}>98%</div>
                            <div style={{ opacity: 0.9 }}>Would Recommend</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '3rem', fontWeight: '800' }}>24/7</div>
                            <div style={{ opacity: 0.9 }}>Available</div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
