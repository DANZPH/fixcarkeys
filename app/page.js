import Hero from '@/components/Hero';
import Link from 'next/link';

const services = [
  { icon: '🔑', title: 'Key Cutting', desc: 'Precision key cutting for all vehicle types' },
  { icon: '💻', title: 'Key Programming', desc: 'Transponder and smart key programming' },
  { icon: '🔄', title: 'Key Replacement', desc: 'Complete key replacement solutions' },
  { icon: '🚗', title: 'Emergency Lockout', desc: '24/7 emergency lockout assistance' },
];

const brands = ['BMW', 'Mercedes', 'Audi', 'Toyota', 'Honda', 'Ford', 'VW', 'Nissan'];

export default function Home() {
  return (
    <>
      <Hero />
      
      {/* Services Section */}
      <section style={{ padding: '60px 0', backgroundColor: '#F1F3E0' }}>
        <div className="container">
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">Professional car key solutions for every need</p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem'
          }}>
            {services.map((service, i) => (
              <div key={i} style={{
                backgroundColor: 'white',
                padding: '2rem',
                borderRadius: '12px',
                textAlign: 'center',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s ease'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{service.icon}</div>
                <h3 style={{ color: '#778873', marginBottom: '0.5rem' }}>{service.title}</h3>
                <p style={{ color: '#666' }}>{service.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link href="/services" className="btn-primary" style={{
              display: 'inline-block',
              textDecoration: 'none'
            }}>View All Services</Link>
          </div>
        </div>
      </section>

      {/* Car Brands Section */}
      <section style={{ padding: '60px 0', backgroundColor: '#D2DCB6' }}>
        <div className="container">
          <h2 className="section-title">Car Brands We Service</h2>
          <p className="section-subtitle">We work with all major vehicle manufacturers</p>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '1rem'
          }}>
            {brands.map((brand, i) => (
              <div key={i} style={{
                backgroundColor: 'white',
                padding: '1rem 2rem',
                borderRadius: '8px',
                fontWeight: '600',
                color: '#778873'
              }}>{brand}</div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link href="/car-brands" className="btn-primary" style={{
              display: 'inline-block',
              textDecoration: 'none'
            }}>View All Brands</Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section style={{ padding: '60px 0', backgroundColor: '#F1F3E0' }}>
        <div className="container">
          <h2 className="section-title">Why Choose FixCarKeys?</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem',
            marginTop: '2rem'
          }}>
            {[
              { icon: '⚡', title: 'Fast Service', desc: 'Quick turnaround times' },
              { icon: '💰', title: 'Competitive Prices', desc: 'Affordable rates' },
              { icon: '✅', title: 'Guaranteed Work', desc: 'Quality assured' },
              { icon: '🏆', title: 'Expert Technicians', desc: 'Certified professionals' },
            ].map((item, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{item.icon}</div>
                <h3 style={{ color: '#778873', marginBottom: '0.5rem' }}>{item.title}</h3>
                <p style={{ color: '#666' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '60px 0',
        backgroundColor: '#A1BC98',
        textAlign: 'center',
        color: 'white'
      }}>
        <div className="container">
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Need Car Key Help?</h2>
          <p style={{ marginBottom: '2rem', opacity: 0.95 }}>Contact us today for a free quote</p>
          <Link href="/contact" style={{
            backgroundColor: '#F1F3E0',
            color: '#778873',
            padding: '14px 28px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '600',
            display: 'inline-block'
          }}>Get in Touch</Link>
        </div>
      </section>
    </>
  );
}
