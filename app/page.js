import Navbar from '../components/Navbar';
import Hero from '../components/Hero';

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', position: 'relative' }}>
      <Navbar />
      <Hero />

      {/* Services Section Placeholder */}
      <section id="services" style={{ padding: '5rem 0' }}>
        <div className="container">
          <div className="glass-panel" style={{ padding: '3rem', borderRadius: 'var(--radius-lg)' }}>
            <h2 className="gradient-text" style={{ fontSize: '2.5rem', marginBottom: '2rem', textAlign: 'center' }}>Our Premium Services</h2>
            <div className="grid-cols-2">
              <div style={{ padding: '1rem' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--primary)' }}>Emergency Lockout</h3>
                <p style={{ color: 'var(--text-muted)' }}>Locked out? We provide rapid response to get you back in your vehicle without damage.</p>
              </div>
              <div style={{ padding: '1rem' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--primary)' }}>Key Programming</h3>
                <p style={{ color: 'var(--text-muted)' }}>Advanced diagnostics and programming for transponder keys, fobs, and smart keys.</p>
              </div>
              <div style={{ padding: '1rem' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--primary)' }}>Ignition Repair</h3>
                <p style={{ color: 'var(--text-muted)' }}>Stuck ignition? Key won't turn? We can repair or replace your ignition cylinder.</p>
              </div>
              <div style={{ padding: '1rem' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--primary)' }}>Key Duplication</h3>
                <p style={{ color: 'var(--text-muted)' }}>High-precision laser cutting for spare keys and replacements.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--surface-highlight)', padding: '3rem 0', marginTop: '3rem' }}>
        <div className="container" style={{ textAlign: 'center', color: 'var(--text-dim)' }}>
          <p>&copy; {new Date().getFullYear()} AutoLock Pro CMS. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
