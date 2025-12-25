'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import LoadingSpinner from "@/components/LoadingSpinner";

export default function BlogPage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
        async function fetchPosts() {
            try {
                const res = await fetch('/api/blog');
                if (res.ok) {
                    const data = await res.json();
                    setPosts(data);
                }
            } catch (error) {
                console.error('Failed to fetch blog posts:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchPosts();
    }, []);

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
                        fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                        fontWeight: '800',
                        marginBottom: '1rem',
                        letterSpacing: '-1px',
                        lineHeight: 1.2
                    }}>Tips & Resources</h1>
                    <p style={{
                        fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                        opacity: 0.9,
                        maxWidth: '600px',
                        margin: '0 auto',
                        padding: '0 1rem'
                    }}>Helpful articles about car keys and locksmith services</p>
                </div>
            </section>

            {/* Blog Posts Grid */}
            <section style={{ padding: 'clamp(60px, 10vh, 100px) 0', backgroundColor: '#F1F3E0' }}>
                <div className="container">
                    {loading ? (
                        <LoadingSpinner text="Loading articles..." variant="default" size="medium" />
                    ) : posts.length > 0 ? (
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                            gap: '2rem'
                        }}>
                            {posts.map((post, index) => (
                                <Link
                                    key={post.id || index}
                                    href={`/blog/${post.id}`}
                                    style={{ textDecoration: 'none' }}
                                >
                                    <article style={{
                                        backgroundColor: 'white',
                                        borderRadius: '20px',
                                        overflow: 'hidden',
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                        height: '100%',
                                        cursor: 'pointer'
                                    }}
                                        onMouseOver={(e) => {
                                            e.currentTarget.style.transform = 'translateY(-8px)';
                                            e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.12)';
                                        }}
                                        onMouseOut={(e) => {
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.05)';
                                        }}
                                    >
                                        {/* Image */}
                                        <div style={{
                                            position: 'relative',
                                            height: '220px',
                                            backgroundColor: '#D2DCB6'
                                        }}>
                                            {post.image_url ? (
                                                <img
                                                    src={post.image_url}
                                                    alt={post.title}
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        objectFit: 'cover'
                                                    }}
                                                />
                                            ) : (
                                                <div style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    fontSize: '4rem'
                                                }}>
                                                    🔑
                                                </div>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div style={{ padding: '1.75rem' }}>
                                            {post.category && (
                                                <span style={{
                                                    display: 'inline-block',
                                                    backgroundColor: '#D2DCB6',
                                                    color: '#778873',
                                                    padding: '4px 12px',
                                                    borderRadius: '20px',
                                                    fontSize: '0.8rem',
                                                    fontWeight: '600',
                                                    marginBottom: '0.75rem'
                                                }}>
                                                    {post.category}
                                                </span>
                                            )}
                                            <h2 style={{
                                                color: '#778873',
                                                fontSize: '1.35rem',
                                                fontWeight: '700',
                                                marginBottom: '0.75rem',
                                                lineHeight: 1.3
                                            }}>
                                                {post.title}
                                            </h2>
                                            <p style={{
                                                color: '#666',
                                                fontSize: '0.95rem',
                                                lineHeight: 1.6,
                                                marginBottom: '1rem'
                                            }}>
                                                {post.excerpt || post.content?.substring(0, 120)}...
                                            </p>
                                            <div style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                fontSize: '0.85rem',
                                                color: '#999'
                                            }}>
                                                <span>
                                                    {hasMounted && post.created_at ? new Date(post.created_at).toLocaleDateString('en-GB', {
                                                        day: 'numeric',
                                                        month: 'short',
                                                        year: 'numeric'
                                                    }) : 'Recently'}
                                                </span>
                                                <span style={{ color: '#778873', fontWeight: '600' }}>
                                                    Read More →
                                                </span>
                                            </div>
                                        </div>
                                    </article>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '4rem' }}>
                            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📝</div>
                            <h2 style={{ color: '#778873', marginBottom: '0.5rem' }}>No Articles Yet</h2>
                            <p style={{ color: '#666' }}>Check back soon for helpful tips and resources!</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Newsletter CTA */}
            <section style={{ padding: '80px 0', backgroundColor: '#778873' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <h2 style={{ color: 'white', fontSize: '2rem', marginBottom: '1rem' }}>
                        Stay Updated
                    </h2>
                    <p style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem' }}>
                        Need help with your car keys? Contact us for expert advice and service.
                    </p>
                    <Link href="/contact" style={{
                        display: 'inline-block',
                        backgroundColor: '#F1F3E0',
                        color: '#778873',
                        padding: '16px 36px',
                        borderRadius: '10px',
                        textDecoration: 'none',
                        fontWeight: '700',
                        fontSize: '1.05rem'
                    }}>
                        Get in Touch →
                    </Link>
                </div>
            </section>
        </>
    );
}
