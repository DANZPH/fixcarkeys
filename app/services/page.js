import Link from 'next/link';

const services = [
  {
    icon: '🔑',
    title: 'Car Key Cutting',
    desc: 'Precision key cutting for all vehicle types including standard, laser-cut, and high-security keys.',
    features: ['All key types', 'On-site service', 'Same-day completion']
  },
  {
    icon: '💻',
    title: 'Key Programming',
    desc: 'Expert transponder and smart key programming for modern vehicles.',
    features: ['Transponder keys', 'Smart keys', 'Remote fobs']
  },
  {
    icon: '🔄',
    title: 'Key Replacement',
    desc: 'Complete key replacement when you\'ve lost all your keys.',
    features: ['All makes & models', 'OEM quality', 'Warranty included']
  },
  {
    icon: '🚗',
    title: 'Emergency Lockout',
    desc: '24/7 emergency lockout assistance to get you back on the road.',
    features: ['24/7 availability', 'Fast response', 'No damage entry']
  },
  {
    icon: '🔧',
    title: 'Ignition Repair',
    desc: 'Ignition cylinder repair and replacement services.',
    features: ['Diagnosis', 'Repair', 'Replacement']
  },
  {
    icon: '📱',
    title: 'Remote Key Fob',
    desc: 'Remote key fob programming, repair, and battery replacement.',
    features: ['Programming', 'Battery replacement', 'Shell replacement']
  }
];

export default function ServicesPage() {
  return (
    <>
      <section style={{
        background: 'linear-gradient(135deg, #778873 0%, #A1BC98 100%)',
        padding: '60px 0',
        color: 'white',
        textAlign: 'center'
      }}>
        <div className="container">
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Our Services</h1>
          <p style={{ opacity: 0.95, maxWidth: '600px', margin: '0 auto' }}>
            Professional car key services for all makes and models
          </p>
        </div>
      </section>


      <section style={{ padding: '60px 0', backgroundColor: '#F1F3E0' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem'
          }}>
            {services.map((service, i) => (
              <div key={i} style={{
                backgroundColor: 'white',
                padding: '2rem',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{service.icon}</div>
                <h3 style={{ color: '#778873', marginBottom: '0.5rem', fontSize: '1.25rem' }}>{service.title}</h3>
                <p style={{ color: '#666', marginBottom: '1rem' }}>{service.desc}</p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {service.features.map((feature, j) => (
                    <li key={j} style={{
                      padding: '0.25rem 0',
                      color: '#555',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <span style={{ color: '#A1BC98' }}>✓</span> {feature}
                    </li>
                  ))}
                </ul>
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
          <h2 style={{ color: '#778873', marginBottom: '1rem' }}>Ready to Get Started?</h2>
          <p style={{ marginBottom: '2rem', color: '#555' }}>
            Contact us today for a free quote on any of our services
          </p>
          <Link href="/contact" className="btn-primary" style={{
            display: 'inline-block',
            textDecoration: 'none'
          }}>Get a Free Quote</Link>
        </div>
      </section>
    </>
  );
}
