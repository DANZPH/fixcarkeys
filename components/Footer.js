'use client';

export default function Footer() {
  const scrollTo = (id) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer style={{
      backgroundColor: '#778873',
      color: '#F1F3E0',
      padding: '60px 0 30px'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: '3rem',
          marginBottom: '3rem'
        }}>
          <div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: '700' }}>🔑 FixCarKeys</h3>
            <p style={{ opacity: 0.9, lineHeight: 1.7, maxWidth: '300px' }}>
              Professional car key services for all makes and models. Fast, reliable, and affordable solutions.
            </p>
          </div>
          <div>
            <h4 style={{ marginBottom: '1.25rem', fontWeight: '600' }}>Quick Links</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {['Services', 'Car Brands', 'Areas', 'Reviews'].map((link) => (
                <a key={link} href={`#${link.toLowerCase().replace(' ', '-')}`} 
                  onClick={(e) => { e.preventDefault(); scrollTo(`#${link.toLowerCase().replace(' ', '-')}`); }}
                  style={{ color: '#D2DCB6', textDecoration: 'none', fontSize: '0.95rem' }}>
                  {link}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 style={{ marginBottom: '1.25rem', fontWeight: '600' }}>Services</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', opacity: 0.9, fontSize: '0.95rem' }}>
              <span>Key Cutting</span>
              <span>Key Programming</span>
              <span>Key Replacement</span>
              <span>Emergency Lockout</span>
            </div>
          </div>
          <div>
            <h4 style={{ marginBottom: '1.25rem', fontWeight: '600' }}>Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', opacity: 0.9, fontSize: '0.95rem' }}>
              <span>📞 [phone_number]</span>
              <span>✉️ [email]</span>
              <span>📍 [address]</span>
            </div>
          </div>
        </div>
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.15)',
          paddingTop: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          opacity: 0.8,
          fontSize: '0.9rem'
        }}>
          <p>© 2024 FixCarKeys. All rights reserved.</p>
          <p>Designed with ❤️ for car owners</p>
        </div>
      </div>
    </footer>
  );
}
