import Link from 'next/link';

const reviews = [
  {
    name: 'John D.',
    rating: 5,
    text: 'Excellent service! Lost my car keys and they came out within 30 minutes. Very professional and affordable.',
    date: 'December 2024'
  },
  {
    name: 'Sarah M.',
    rating: 5,
    text: 'Had my BMW key programmed here. Great price compared to the dealership and done in no time.',
    date: 'November 2024'
  },
  {
    name: 'Mike R.',
    rating: 5,
    text: 'Emergency lockout at 2am and they still came out quickly. Lifesaver!',
    date: 'November 2024'
  },
  {
    name: 'Emily K.',
    rating: 5,
    text: 'Needed a spare key for my Honda. Quick, easy, and half the price of the dealer.',
    date: 'October 2024'
  },
  {
    name: 'David L.',
    rating: 5,
    text: 'Very knowledgeable about Mercedes keys. Fixed my smart key issue on the spot.',
    date: 'October 2024'
  },
  {
    name: 'Lisa T.',
    rating: 5,
    text: 'Friendly staff and great service. Will definitely recommend to friends and family.',
    date: 'September 2024'
  },
];

export default function ReviewsPage() {
  return (
    <>
      <section style={{
        background: 'linear-gradient(135deg, #778873 0%, #A1BC98 100%)',
        padding: '60px 0',
        color: 'white',
        textAlign: 'center'
      }}>
        <div className="container">
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Customer Reviews</h1>
          <p style={{ opacity: 0.95, maxWidth: '600px', margin: '0 auto' }}>
            See what our customers have to say about our services
          </p>
          <div style={{ marginTop: '2rem', fontSize: '1.25rem' }}>
            ⭐⭐⭐⭐⭐ <span style={{ opacity: 0.9 }}>5.0 Average Rating</span>
          </div>
        </div>
      </section>

      <section style={{ padding: '60px 0', backgroundColor: '#F1F3E0' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.5rem'
          }}>
            {reviews.map((review, i) => (
              <div key={i} style={{
                backgroundColor: 'white',
                padding: '1.5rem',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}>
                <div style={{ marginBottom: '0.5rem' }}>
                  {'⭐'.repeat(review.rating)}
                </div>
                <p style={{ color: '#555', marginBottom: '1rem', fontStyle: 'italic' }}>
                  "{review.text}"
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: '600', color: '#778873' }}>{review.name}</span>
                  <span style={{ color: '#999', fontSize: '0.85rem' }}>{review.date}</span>
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
          <h2 style={{ color: '#778873', marginBottom: '1rem' }}>Ready to Experience Our Service?</h2>
          <p style={{ marginBottom: '2rem', color: '#555' }}>
            Join our satisfied customers today
          </p>
          <Link href="/contact" className="btn-primary" style={{
            display: 'inline-block',
            textDecoration: 'none'
          }}>Get Started</Link>
        </div>
      </section>
    </>
  );
}
