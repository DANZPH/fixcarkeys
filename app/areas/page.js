import Link from 'next/link';

const areas = [
  { name: 'Downtown', desc: 'Full coverage in the downtown area' },
  { name: 'North Side', desc: 'Serving all north side neighborhoods' },
  { name: 'South Side', desc: 'Complete south side coverage' },
  { name: 'East End', desc: 'East end and surrounding areas' },
  { name: 'West End', desc: 'West end service available' },
  { name: 'Suburbs', desc: 'Extended suburban coverage' },
  { name: 'Industrial District', desc: 'Commercial and industrial areas' },
  { name: 'Airport Area', desc: 'Airport and nearby locations' },
];

export default function AreasPage() {
  return (
    <>
      <section style={{
        background: 'linear-gradient(135deg, #778873 0%, #A1BC98 100%)',
        padding: '60px 0',
        color: 'white',
        textAlign: 'center'
      }}>
        <div className="container">
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Areas We Cover</h1>
          <p style={{ opacity: 0.95, maxWidth: '600px', margin: '0 auto' }}>
            Mobile car key services throughout the region
          </p>
        </div>
      </section>

      <section style={{ padding: '60px 0', backgroundColor: '#F1F3E0' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem'
          }}>
            {areas.map((area, i) => (
              <div key={i} style={{
                backgroundColor: 'white',
                padding: '1.5rem',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}>
                <div style={{
                  backgroundColor: '#A1BC98',
                  color: 'white',
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem'
                }}>📍</div>
                <div>
                  <h3 style={{ color: '#778873', marginBottom: '0.25rem' }}>{area.name}</h3>
                  <p style={{ color: '#666', fontSize: '0.9rem' }}>{area.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{
        padding: '60px 0',
        backgroundColor: '#D2DCB6',
        textAlign: 'center'
      }}>
        <div className="container">
          <h2 style={{ color: '#778873', marginBottom: '1rem' }}>Not Sure If We Cover Your Area?</h2>
          <p style={{ marginBottom: '2rem', color: '#555' }}>
            Give us a call and we'll let you know if we can help!
          </p>
          <Link href="/contact" className="btn-primary" style={{
            display: 'inline-block',
            textDecoration: 'none'
          }}>Contact Us</Link>
        </div>
      </section>
    </>
  );
}
