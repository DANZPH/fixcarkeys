import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{
      backgroundColor: '#778873',
      color: '#F1F3E0',
      padding: '3rem 0 1rem'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          <div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>🔑 FixCarKeys</h3>
            <p style={{ opacity: 0.9, lineHeight: 1.6 }}>
              Professional car key services for all makes and models. Fast, reliable, and affordable.
            </p>
          </div>
          <div>
            <h4 style={{ marginBottom: '1rem' }}>Quick Links</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <Link href="/services" style={{ color: '#D2DCB6', textDecoration: 'none' }}>Services</Link>
              <Link href="/car-brands" style={{ color: '#D2DCB6', textDecoration: 'none' }}>Car Brands</Link>
              <Link href="/areas" style={{ color: '#D2DCB6', textDecoration: 'none' }}>Areas We Cover</Link>
              <Link href="/reviews" style={{ color: '#D2DCB6', textDecoration: 'none' }}>Reviews</Link>
            </div>
          </div>
          <div>
            <h4 style={{ marginBottom: '1rem' }}>Services</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', opacity: 0.9 }}>
              <span>Key Cutting</span>
              <span>Key Programming</span>
              <span>Key Replacement</span>
              <span>Emergency Lockout</span>
            </div>
          </div>
          <div>
            <h4 style={{ marginBottom: '1rem' }}>Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', opacity: 0.9 }}>
              <span>📞 [phone_number]</span>
              <span>✉️ [email]</span>
              <span>📍 [address]</span>
            </div>
          </div>
        </div>
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.2)',
          paddingTop: '1rem',
          textAlign: 'center',
          opacity: 0.8
        }}>
          <p>© 2024 FixCarKeys. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
