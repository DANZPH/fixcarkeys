import Link from 'next/link';

const brands = [
  { name: 'BMW', desc: 'All BMW models including comfort access keys' },
  { name: 'Mercedes-Benz', desc: 'Mercedes smart keys and keyless go' },
  { name: 'Audi', desc: 'Audi advanced key systems' },
  { name: 'Volkswagen', desc: 'VW transponder and remote keys' },
  { name: 'Toyota', desc: 'Toyota smart keys and remotes' },
  { name: 'Honda', desc: 'Honda key fobs and smart entry' },
  { name: 'Ford', desc: 'Ford intelligent access keys' },
  { name: 'Nissan', desc: 'Nissan intelligent keys' },
  { name: 'Chevrolet', desc: 'Chevy keyless entry systems' },
  { name: 'Hyundai', desc: 'Hyundai smart keys and proximity' },
  { name: 'Kia', desc: 'Kia smart key programming' },
  { name: 'Mazda', desc: 'Mazda advanced keyless entry' },
  { name: 'Subaru', desc: 'Subaru keyless access' },
  { name: 'Lexus', desc: 'Lexus smart access keys' },
  { name: 'Jeep', desc: 'Jeep key fobs and remotes' },
  { name: 'Land Rover', desc: 'Land Rover smart keys' },
];

export default function CarBrandsPage() {
  return (
    <>
      <section style={{
        background: 'linear-gradient(135deg, #778873 0%, #A1BC98 100%)',
        padding: '60px 0',
        color: 'white',
        textAlign: 'center'
      }}>
        <div className="container">
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Car Brands We Service</h1>
          <p style={{ opacity: 0.95, maxWidth: '600px', margin: '0 auto' }}>
            Expert key services for all major vehicle manufacturers
          </p>
        </div>
      </section>

      <section style={{ padding: '60px 0', backgroundColor: '#F1F3E0' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem'
          }}>
            {brands.map((brand, i) => (
              <div key={i} style={{
                backgroundColor: 'white',
                padding: '1.5rem',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                borderLeft: '4px solid #A1BC98'
              }}>
                <h3 style={{ color: '#778873', marginBottom: '0.5rem' }}>{brand.name}</h3>
                <p style={{ color: '#666', fontSize: '0.95rem' }}>{brand.desc}</p>
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
          <h2 style={{ color: '#778873', marginBottom: '1rem' }}>Don't See Your Brand?</h2>
          <p style={{ marginBottom: '2rem', color: '#555' }}>
            We service virtually all vehicle makes and models. Contact us for your specific needs.
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
