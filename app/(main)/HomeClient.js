'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutTextFlip } from "@/components/ui/TextFlip";
import { Phone, ChevronRight, Shield, Clock, Wrench } from 'lucide-react';

export default function HomeClient({ initialContent }) {
    const [showContactModal, setShowContactModal] = useState(false);
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    // Use initialContent directly
    const { settings, services } = initialContent || {
        settings: {}, services: []
    };

    // Get phone number for contact
    const phoneNumber = settings.phone_number || '07444 125447';
    const whatsappNumber = settings.whatsapp_number || '447444125447';
    const heroVideoUrl = settings.hero_video_url || '/assets/Car_Moving_Video.mp4';

    return (
        <>
            {/* Hero Section */}
            <section id="home" suppressHydrationWarning style={{
                background: 'linear-gradient(135deg, #778873 0%, #A1BC98 50%, #D2DCB6 100%)',
                padding: '50px 0 60px',
                color: 'white',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Grid Background */}
                <div
                    suppressHydrationWarning
                    style={{
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
                <div className="container" style={{ position: 'relative', zIndex: 1, width: '100%' }}>
                    <div className="hero-content" style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '3rem',
                        flexWrap: 'wrap-reverse'
                    }}>
                        <div className="hero-text" style={{ flex: '1 1 320px', textAlign: 'left', minWidth: '280px' }}>
                            <h1 className="hero-title" style={{
                                fontSize: '5rem',
                                marginBottom: '1rem',
                                fontWeight: '800',
                                lineHeight: 1.1,
                                letterSpacing: '-2px',
                                textShadow: '0 2px 10px rgba(0,0,0,0.1)'
                            }}>
                                {hasMounted ? (
                                    <LayoutTextFlip
                                        staticText='Fix'
                                        flipWords={['CarKeys', 'AutoKeys', 'Keys', 'Fobs']}
                                        interval={2500}
                                    />
                                ) : (
                                    'Fix CarKeys'
                                )}
                            </h1>
                            <div className="hero-subtitle" style={{
                                fontSize: '2rem',
                                fontWeight: '700',
                                marginBottom: '2rem',
                                letterSpacing: '3px',
                                textTransform: 'uppercase',
                                opacity: 0.95,
                                textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                            }}>
                                MOBILE AUTO LOCKSMITH
                            </div>
                            <p className="hero-description" style={{
                                fontSize: '1.5rem',
                                marginBottom: '2.5rem',
                                opacity: 0.95,
                                lineHeight: 1.7,
                                maxWidth: '750px'
                            }}>
                                Lost your car keys? Need a spare? We provide fast, reliable car key cutting, programming, and replacement services for all vehicle makes and models.
                            </p>
                            <div className="hero-buttons" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
                                <button
                                    onClick={() => setShowContactModal(true)}
                                    style={{
                                        backgroundColor: '#F1F3E0',
                                        color: '#778873',
                                        padding: '16px 32px',
                                        borderRadius: '10px',
                                        border: 'none',
                                        cursor: 'pointer',
                                        fontWeight: '600',
                                        fontSize: '1.05rem',
                                        transition: 'all 0.3s ease',
                                        boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                                    }}>
                                    Contact →
                                </button>
                                <Link href="/services"
                                    style={{
                                        border: '2px solid rgba(255,255,255,0.8)',
                                        color: 'white',
                                        padding: '14px 30px',
                                        borderRadius: '10px',
                                        textDecoration: 'none',
                                        fontWeight: '600',
                                        fontSize: '1.05rem'
                                    }}>
                                    View Services
                                </Link>
                            </div>
                        </div>

                        <div className="hero-media" style={{ flex: '1 1 280px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minWidth: '250px' }}>
                            <motion.a
                                href={`tel:${phoneNumber.replace(/\s/g, '')}`}
                                animate={{ scale: [1, 1.05, 1] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                style={{
                                    fontSize: 'clamp(2rem, 6vw, 3.5rem)',
                                    fontWeight: '800',
                                    color: '#F1F3E0',
                                    textDecoration: 'none',
                                    marginBottom: '1.5rem',
                                    textShadow: '0 2px 4px rgba(0,0,0,0.2)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    zIndex: 10,
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                <Phone fill="currentColor" size={42} style={{ filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.2))' }} />
                                {phoneNumber}
                            </motion.a>
                            <div className="hero-video" style={{
                                position: 'relative',
                                width: '100%',
                                maxWidth: '1000px',
                                borderRadius: '24px',
                                overflow: 'hidden',
                                boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
                                transform: 'perspective(1000px) rotateY(-5deg)',
                                transition: 'transform 0.5s ease'
                            }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'perspective(1000px) rotateY(0deg) scale(1.02)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'perspective(1000px) rotateY(-5deg)'}
                            >
                                <video
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
                                >
                                    <source src={heroVideoUrl} type="video/mp4" />
                                </video>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section style={{ padding: '60px 0', backgroundColor: 'white' }}>
                <div className="container">
                    <h2 style={{
                        textAlign: 'center',
                        fontSize: '2rem',
                        fontWeight: '700',
                        color: '#778873',
                        marginBottom: '2rem'
                    }}>Why Choose FixCarKeys?</h2>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                        gap: '2rem'
                    }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                                <Clock size={36} color="#778873" />
                            </div>
                            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: '#1f2937', fontWeight: '600' }}>24/7 Availability</h3>
                            <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>Emergency services any time</p>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                                <Shield size={36} color="#778873" />
                            </div>
                            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: '#1f2937', fontWeight: '600' }}>Licensed & Insured</h3>
                            <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>Fully certified professionals</p>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                                <Wrench size={36} color="#778873" />
                            </div>
                            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: '#1f2937', fontWeight: '600' }}>Mobile Service</h3>
                            <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>We come to you</p>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                                <span style={{ fontSize: '2.25rem', lineHeight: 1 }}>⭐</span>
                            </div>
                            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: '#1f2937', fontWeight: '600' }}>5-Star Rated</h3>
                            <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>Trusted by customers</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quick Links Section */}
            <section style={{ padding: '60px 0', backgroundColor: '#F1F3E0' }}>
                <div className="container">
                    <h2 style={{
                        textAlign: 'center',
                        fontSize: '2rem',
                        fontWeight: '700',
                        color: '#778873',
                        marginBottom: '0.75rem'
                    }}>Explore Our Services</h2>
                    <p style={{
                        textAlign: 'center',
                        color: '#666',
                        marginBottom: '2rem',
                        maxWidth: '500px',
                        margin: '0 auto 2rem',
                        fontSize: '0.95rem'
                    }}>Professional car key solutions for all your needs</p>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                        gap: '1rem'
                    }}>
                        <Link href="/services" style={{ textDecoration: 'none' }}>
                            <div style={{
                                backgroundColor: 'white',
                                borderRadius: '16px',
                                padding: '1.5rem',
                                boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                textAlign: 'center',
                                cursor: 'pointer',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-5px)';
                                    e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.08)';
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)';
                                }}
                            >
                                <div style={{
                                    width: '50px',
                                    height: '50px',
                                    backgroundColor: '#D2DCB6',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 1rem'
                                }}>
                                    <Wrench size={24} color="#778873" />
                                </div>
                                <h3 style={{ color: '#778873', fontSize: '1.1rem', marginBottom: '0.5rem' }}>Our Services</h3>
                                <p style={{ color: '#666', marginBottom: '0.75rem', fontSize: '0.85rem' }}>Key cutting, programming & more</p>
                                <span style={{ color: '#778873', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem', fontSize: '0.9rem', marginTop: 'auto' }}>
                                    View <ChevronRight size={16} />
                                </span>
                            </div>
                        </Link>

                        <Link href="/car-brands" style={{ textDecoration: 'none' }}>
                            <div style={{
                                backgroundColor: 'white',
                                borderRadius: '16px',
                                padding: '1.5rem',
                                boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                textAlign: 'center',
                                cursor: 'pointer',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-5px)';
                                    e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.08)';
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)';
                                }}
                            >
                                <div style={{
                                    width: '50px',
                                    height: '50px',
                                    backgroundColor: '#D2DCB6',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 1rem',
                                    fontSize: '1.5rem'
                                }}>
                                    🚗
                                </div>
                                <h3 style={{ color: '#778873', fontSize: '1.1rem', marginBottom: '0.5rem' }}>Car Brands</h3>
                                <p style={{ color: '#666', marginBottom: '0.75rem', fontSize: '0.85rem' }}>60+ brands supported</p>
                                <span style={{ color: '#778873', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem', fontSize: '0.9rem', marginTop: 'auto' }}>
                                    View <ChevronRight size={16} />
                                </span>
                            </div>
                        </Link>

                        <Link href="/areas" style={{ textDecoration: 'none' }}>
                            <div style={{
                                backgroundColor: 'white',
                                borderRadius: '16px',
                                padding: '1.5rem',
                                boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                textAlign: 'center',
                                cursor: 'pointer',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-5px)';
                                    e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.08)';
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)';
                                }}
                            >
                                <div style={{
                                    width: '50px',
                                    height: '50px',
                                    backgroundColor: '#D2DCB6',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 1rem',
                                    fontSize: '1.5rem'
                                }}>
                                    📍
                                </div>
                                <h3 style={{ color: '#778873', fontSize: '1.1rem', marginBottom: '0.5rem' }}>Areas Covered</h3>
                                <p style={{ color: '#666', marginBottom: '0.75rem', fontSize: '0.85rem' }}>North West UK service</p>
                                <span style={{ color: '#778873', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem', fontSize: '0.9rem', marginTop: 'auto' }}>
                                    View <ChevronRight size={16} />
                                </span>
                            </div>
                        </Link>

                        <Link href="/reviews" style={{ textDecoration: 'none' }}>
                            <div style={{
                                backgroundColor: 'white',
                                borderRadius: '16px',
                                padding: '1.5rem',
                                boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                textAlign: 'center',
                                cursor: 'pointer',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-5px)';
                                    e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.08)';
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)';
                                }}
                            >
                                <div style={{
                                    width: '50px',
                                    height: '50px',
                                    backgroundColor: '#D2DCB6',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 1rem',
                                    fontSize: '1.5rem'
                                }}>
                                    ⭐
                                </div>
                                <h3 style={{ color: '#778873', fontSize: '1.1rem', marginBottom: '0.5rem' }}>Reviews</h3>
                                <p style={{ color: '#666', marginBottom: '0.75rem', fontSize: '0.85rem' }}>Customer testimonials</p>
                                <span style={{ color: '#778873', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem', fontSize: '0.9rem', marginTop: 'auto' }}>
                                    View <ChevronRight size={16} />
                                </span>
                            </div>
                        </Link>

                        <Link href="/blog" style={{ textDecoration: 'none' }}>
                            <div style={{
                                backgroundColor: 'white',
                                borderRadius: '16px',
                                padding: '1.5rem',
                                boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                textAlign: 'center',
                                cursor: 'pointer',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-5px)';
                                    e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.08)';
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)';
                                }}
                            >
                                <div style={{
                                    width: '50px',
                                    height: '50px',
                                    backgroundColor: '#D2DCB6',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 1rem',
                                    fontSize: '1.5rem'
                                }}>
                                    📝
                                </div>
                                <h3 style={{ color: '#778873', fontSize: '1.1rem', marginBottom: '0.5rem' }}>Tips & Blog</h3>
                                <p style={{ color: '#666', marginBottom: '0.75rem', fontSize: '0.85rem' }}>Guides & resources</p>
                                <span style={{ color: '#778873', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem', fontSize: '0.9rem', marginTop: 'auto' }}>
                                    Read <ChevronRight size={16} />
                                </span>
                            </div>
                        </Link>

                        <Link href="/contact" style={{ textDecoration: 'none' }}>
                            <div style={{
                                backgroundColor: '#778873',
                                borderRadius: '16px',
                                padding: '1.5rem',
                                boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                textAlign: 'center',
                                cursor: 'pointer',
                                color: 'white',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-5px)';
                                    e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.12)';
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.08)';
                                }}
                            >
                                <div style={{
                                    width: '50px',
                                    height: '50px',
                                    backgroundColor: 'rgba(255,255,255,0.2)',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 1rem'
                                }}>
                                    <Phone size={24} color="white" />
                                </div>
                                <h3 style={{ color: 'white', fontSize: '1.1rem', marginBottom: '0.5rem' }}>Contact Us</h3>
                                <p style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '0.75rem', fontSize: '0.85rem' }}>Get a free quote</p>
                                <span style={{ color: '#F1F3E0', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem', fontSize: '0.9rem', marginTop: 'auto' }}>
                                    Contact <ChevronRight size={16} />
                                </span>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>



            {/* Contact Modal */}
            <AnimatePresence>
                {showContactModal && (
                    <div style={{
                        position: 'fixed',
                        inset: 0,
                        zIndex: 9999,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '20px'
                    }}>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowContactModal(false)}
                            style={{
                                position: 'absolute',
                                inset: 0,
                                backgroundColor: 'rgba(0,0,0,0.6)',
                                backdropFilter: 'blur(5px)'
                            }}
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            style={{
                                backgroundColor: 'white',
                                borderRadius: '24px',
                                padding: '2.5rem',
                                width: '100%',
                                maxWidth: '400px',
                                position: 'relative',
                                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
                                textAlign: 'center'
                            }}
                        >
                            <button
                                onClick={() => setShowContactModal(false)}
                                style={{
                                    position: 'absolute',
                                    top: '1.5rem',
                                    right: '1.5rem',
                                    background: '#f3f4f6',
                                    border: 'none',
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '50%',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '1.2rem',
                                    color: '#4b5563'
                                }}
                            >✕</button>

                            <h3 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#778873', marginBottom: '0.5rem' }}>Get in Touch</h3>
                            <p style={{ color: '#6b7280', marginBottom: '2rem' }}>How would you like to contact us?</p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.75rem',
                                    backgroundColor: '#25D366',
                                    color: 'white',
                                    padding: '16px',
                                    borderRadius: '12px',
                                    textDecoration: 'none',
                                    fontWeight: '700',
                                    fontSize: '1.1rem',
                                    transition: 'transform 0.2s ease'
                                }}
                                    onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                                    onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                                    WhatsApp Us
                                </a>

                                <a href={`tel:${phoneNumber.replace(/\s/g, '')}`} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.75rem',
                                    backgroundColor: '#778873',
                                    color: 'white',
                                    padding: '16px',
                                    borderRadius: '12px',
                                    textDecoration: 'none',
                                    fontWeight: '700',
                                    fontSize: '1.1rem',
                                    transition: 'transform 0.2s ease'
                                }}
                                    onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                                    onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                                >
                                    📞 Call {phoneNumber}
                                </a>

                                <Link href="/contact" style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.75rem',
                                    backgroundColor: '#F1F3E0',
                                    color: '#778873',
                                    padding: '16px',
                                    borderRadius: '12px',
                                    textDecoration: 'none',
                                    fontWeight: '700',
                                    fontSize: '1.1rem',
                                    transition: 'transform 0.2s ease'
                                }}
                                    onClick={() => setShowContactModal(false)}
                                >
                                    ✉️ Contact Form
                                </Link>
                            </div>

                            <p style={{ marginTop: '1.5rem', fontSize: '0.85rem', color: '#9ca3af' }}>
                                Available 24/7 for emergency lockouts.
                            </p>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
