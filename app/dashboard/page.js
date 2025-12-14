export default function Dashboard() {
    return (
        <div style={{ padding: '2rem' }}>
            <div className="container">
                <h1 className="gradient-text" style={{ fontSize: '3rem', marginBottom: '2rem' }}>CMS Dashboard</h1>
                <div className="glass-panel" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
                    <p style={{ color: 'var(--text-muted)' }}>Welcome to the AutoLock Pro Content Management System.</p>
                    <p style={{ marginTop: '1rem', color: 'var(--text-dim)' }}>Manage services, bookings, and customer data here.</p>

                    <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                        {['Manage Services', 'View Bookings', 'Customer Database', 'Settings'].map(item => (
                            <div key={item} style={{
                                background: 'rgba(255,255,255,0.03)',
                                padding: '1.5rem',
                                borderRadius: 'var(--radius-md)',
                                cursor: 'pointer',
                                border: '1px solid var(--glass-border)'
                            }}>
                                <h3 style={{ color: 'var(--primary)' }}>{item}</h3>
                            </div>
                        ))}
                    </div>
                </div>
                <div style={{ marginTop: '2rem' }}>
                    <a href="/" className="btn btn-glass">Back to Site</a>
                </div>
            </div>
        </div>
    );
}
