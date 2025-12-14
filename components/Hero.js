import Link from 'next/link';

export default function Hero() {
  return (
    <section style={{
      background: 'linear-gradient(135deg, #778873 0%, #A1BC98 100%)',
      padding: '80px 0',
      color: 'white'
    }}>
      <div className="container" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: '3rem',
          marginBottom: '1rem',
          fontWeight: 'bold'
        }}>
          🔑 Professional Car Key Services
        </h1>
        <p style={{
          fontSize: '1.25rem',
          marginBottom: '2rem',
          maxWidth: '600px',
          opacity: 0.95
        }}>
          Lost your car keys? Need a spare? We provide fast, reliable car key cutting, 
          programming, and replacement services for all vehicle makes and models.
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/contact" className="btn-primary" style={{
            backgroundColor: '#F1F3E0',
            color: '#778873',
            padding: '14px 28px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '600'
          }}>
            Get a Quote
          </Link>
          <Link href="/services" className="btn-secondary" style={{
            backgroundColor: 'transparent',
            border: '2px solid #F1F3E0',
            color: '#F1F3E0',
            padding: '12px 26px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '600'
          }}>
            Our Services
          </Link>
        </div>
        <div style={{
          marginTop: '3rem',
          display: 'flex',
          gap: '2rem',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>24/7</div>
            <div style={{ opacity: 0.9 }}>Emergency Service</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>500+</div>
            <div style={{ opacity: 0.9 }}>Happy Customers</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>15+</div>
            <div style={{ opacity: 0.9 }}>Years Experience</div>
          </div>
        </div>
      </div>
    </section>
  );
}
