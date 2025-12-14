'use client';

import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
            <div className="glass-panel" style={{ borderRadius: '0 0 20px 20px', borderTop: 'none' }}>
                <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.5rem' }}>
                    <div className="logo">
                        <Link href="/" style={{ textDecoration: 'none', fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ color: 'var(--primary)' }}>Auto</span>Lock<span style={{ color: 'var(--accent)' }}>Pro</span>
                        </Link>
                    </div>

                    <div className="nav-links" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                        {['Services', 'About', 'Pricing', 'Contact'].map((item) => (
                            <Link
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                style={{ color: 'var(--text-muted)', textDecoration: 'none', fontWeight: '500', transition: 'color 0.2s' }}
                                onMouseOver={(e) => e.target.style.color = 'var(--primary)'}
                                onMouseOut={(e) => e.target.style.color = 'var(--text-muted)'}
                            >
                                {item}
                            </Link>
                        ))}
                    </div>

                    <div className="actions">
                        <Link href="/login" className="btn btn-primary" style={{ textDecoration: 'none', padding: '0.5rem 1.2rem', fontSize: '0.9rem' }}>
                            Client Portal
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
