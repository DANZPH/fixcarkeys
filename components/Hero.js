export default function Hero() {
    return (
        <section style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
            paddingTop: '80px' // For fixed navbar
        }}>
            {/* Background Elements */}
            <div style={{
                position: 'absolute',
                top: '20%',
                left: '10%',
                width: '400px',
                height: '400px',
                background: 'var(--primary)',
                filter: 'blur(150px)',
                opacity: '0.2',
                borderRadius: '50%',
                zIndex: '-1'
            }} />

            <div style={{
                position: 'absolute',
                bottom: '10%',
                right: '10%',
                width: '300px',
                height: '300px',
                background: 'var(--accent)',
                filter: 'blur(120px)',
                opacity: '0.15',
                borderRadius: '50%',
                zIndex: '-1'
            }} />

            <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: '1' }}>
                <div className="animate-fade-in">
                    <span style={{
                        color: 'var(--accent)',
                        fontWeight: '600',
                        letterSpacing: '2px',
                        textTransform: 'uppercase',
                        fontSize: '0.9rem',
                        marginBottom: '1rem',
                        display: 'block'
                    }}>
                        Premium Automotive Security
                    </span>

                    <h1 className="gradient-text" style={{
                        fontSize: '4.5rem',
                        fontWeight: '800',
                        lineHeight: '1.1',
                        marginBottom: '1.5rem',
                        letterSpacing: '-1px'
                    }}>
                        Professional Auto<br />Locksmith Solutions
                    </h1>

                    <p style={{
                        fontSize: '1.25rem',
                        color: 'var(--text-muted)',
                        maxWidth: '600px',
                        margin: '0 auto 2.5rem',
                        lineHeight: '1.7'
                    }}>
                        Fast, reliable, and secure car key replacement and lockout services.
                        We get you back on the road with state-of-the-art technology.
                    </p>

                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <button className="btn btn-primary" style={{ minWidth: '160px' }}>
                            Emergency Service
                        </button>
                        <button className="btn btn-glass" style={{ minWidth: '160px' }}>
                            View Services
                        </button>
                    </div>
                </div>

                {/* Stats / Trust Indicators */}
                <div className="glass-panel animate-fade-in delay-200" style={{
                    marginTop: '5rem',
                    padding: '2rem',
                    borderRadius: 'var(--radius-lg)',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '2rem'
                }}>
                    <div>
                        <h3 style={{ fontSize: '2.5rem', fontWeight: '700', color: 'var(--text-main)' }}>24/7</h3>
                        <p style={{ color: 'var(--text-muted)' }}>Emergency Support</p>
                    </div>
                    <div>
                        <h3 style={{ fontSize: '2.5rem', fontWeight: '700', color: 'var(--text-main)' }}>15m</h3>
                        <p style={{ color: 'var(--text-muted)' }}>Avg. Response Time</p>
                    </div>
                    <div>
                        <h3 style={{ fontSize: '2.5rem', fontWeight: '700', color: 'var(--text-main)' }}>5000+</h3>
                        <p style={{ color: 'var(--text-muted)' }}>Keys Unlocked</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
