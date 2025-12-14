'use client';
import { useState } from 'react';
import Link from 'next/link';

function AreasSection({ areas }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="areas" style={{ padding: '100px 0', backgroundColor: '#F1F3E0' }}>
      <div className="container">
        <h2 className="section-title">Areas We Cover</h2>
        <p className="section-subtitle">Mobile car key services across the North West UK</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>
          {/* Accordion List */}
          <div>
            {areas.map((area, i) => (
              <div key={i} style={{
                backgroundColor: 'white',
                marginBottom: '0.5rem',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
              }}>
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  style={{
                    width: '100%',
                    padding: '1rem 1.25rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    border: 'none',
                    borderBottom: openIndex === i ? '1px solid #eee' : 'none',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: '500',
                    color: '#778873',
                    textAlign: 'left'
                  }}
                >
                  <span style={{ textDecoration: 'underline' }}>{area.name}</span>
                  <span style={{
                    transform: openIndex === i ? 'rotate(180deg)' : 'rotate(0)',
                    transition: 'transform 0.3s ease',
                    fontSize: '1.25rem',
                    color: '#999'
                  }}>⌄</span>
                </button>
                {openIndex === i && (
                  <div style={{ padding: '1rem 1.25rem', backgroundColor: '#fafafa' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {area.towns.map((town, j) => (
                        <span key={j} style={{
                          backgroundColor: '#D2DCB6',
                          color: '#778873',
                          padding: '0.35rem 0.75rem',
                          borderRadius: '20px',
                          fontSize: '0.85rem'
                        }}>{town}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            <Link href="/areas" style={{
              display: 'inline-block',
              marginTop: '1.5rem',
              color: '#778873',
              fontWeight: '600',
              textDecoration: 'none'
            }}>
              View all areas →
            </Link>
          </div>
          {/* Google Map */}
          <div style={{
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            height: '500px'
          }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1523489.8010036945!2d-3.9772853!3d53.4807593!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487a4d4c5226f5db%3A0xd9be143804fe6baa!2sNorth%20West%20England!5e0!3m2!1sen!2suk!4v1702500000000!5m2!1sen!2suk"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

const services = [
  { icon: '🔑', title: 'Key Cutting', desc: 'Precision key cutting for all vehicle types including standard, laser-cut, and high-security keys.', features: ['All key types', 'On-site service', 'Same-day completion'] },
  { icon: '💻', title: 'Key Programming', desc: 'Expert transponder and smart key programming for modern vehicles with advanced security.', features: ['Transponder keys', 'Smart keys', 'Remote fobs'] },
  { icon: '🔄', title: 'Key Replacement', desc: 'Complete key replacement solutions when you\'ve lost all your keys or need extras.', features: ['All makes & models', 'OEM quality', 'Warranty included'] },
  { icon: '🚗', title: 'Emergency Lockout', desc: '24/7 emergency lockout assistance to get you back on the road quickly and safely.', features: ['24/7 availability', 'Fast response', 'No damage entry'] },
  { icon: '🔧', title: 'Ignition Repair', desc: 'Professional ignition cylinder repair and replacement services for all vehicles.', features: ['Diagnosis', 'Repair', 'Full replacement'] },
  { icon: '📱', title: 'Remote Key Fob', desc: 'Remote key fob programming, repair, and battery replacement services.', features: ['Programming', 'Battery swap', 'Shell replacement'] },
];

const brands = [
  { name: 'BMW', desc: 'Comfort access & digital keys' },
  { name: 'Mercedes-Benz', desc: 'Smart keys & keyless go' },
  { name: 'Audi', desc: 'Advanced key systems' },
  { name: 'Volkswagen', desc: 'Transponder & remote keys' },
  { name: 'Toyota', desc: 'Smart keys & remotes' },
  { name: 'Honda', desc: 'Key fobs & smart entry' },
  { name: 'Ford', desc: 'Intelligent access keys' },
  { name: 'Nissan', desc: 'Intelligent keys' },
  { name: 'Chevrolet', desc: 'Keyless entry systems' },
  { name: 'Hyundai', desc: 'Smart keys & proximity' },
  { name: 'Kia', desc: 'Smart key programming' },
  { name: 'Lexus', desc: 'Smart access keys' },
];

const areas = [
  { name: 'Wigan', towns: ['Wigan Town Centre', 'Ashton-in-Makerfield', 'Leigh', 'Standish', 'Hindley'] },
  { name: 'Warrington', towns: ['Warrington Town Centre', 'Lymm', 'Culcheth', 'Birchwood', 'Padgate'] },
  { name: 'Bolton', towns: ['Bolton Town Centre', 'Horwich', 'Farnworth', 'Westhoughton', 'Bromley Cross'] },
  { name: 'Liverpool', towns: ['Liverpool City Centre', 'Anfield', 'Wavertree', 'Woolton', 'Crosby'] },
  { name: 'Manchester', towns: ['Manchester City Centre', 'Salford', 'Trafford', 'Didsbury', 'Chorlton'] },
  { name: 'Stoke-on-Trent', towns: ['Hanley', 'Stoke', 'Burslem', 'Tunstall', 'Longton'] },
  { name: 'Chester & Ellesmere Port', towns: ['Chester City Centre', 'Ellesmere Port', 'Neston', 'Hoole', 'Blacon'] },
  { name: 'Southport & Chorley', towns: ['Southport Town Centre', 'Chorley', 'Formby', 'Ormskirk', 'Leyland'] },
  { name: 'Skelmersdale & Ormskirk', towns: ['Skelmersdale', 'Ormskirk', 'Burscough', 'Aughton', 'Rainford'] },
];

const reviews = [
  { name: 'John D.', text: 'Excellent service! Lost my car keys and they came out within 30 minutes. Very professional and affordable. Highly recommend!', date: 'Dec 2024' },
  { name: 'Sarah M.', text: 'Had my BMW key programmed here. Great price compared to the dealership and done in no time. Will use again!', date: 'Nov 2024' },
  { name: 'Mike R.', text: 'Emergency lockout at 2am and they still came out quickly. Absolute lifesaver! Can\'t thank them enough.', date: 'Nov 2024' },
  { name: 'Emily K.', text: 'Needed a spare key for my Honda. Quick, easy, and half the price of the dealer. Fantastic service!', date: 'Oct 2024' },
  { name: 'David L.', text: 'Very knowledgeable about Mercedes keys. Fixed my smart key issue on the spot. True professionals!', date: 'Oct 2024' },
  { name: 'Lisa T.', text: 'Friendly staff and great service. Will definitely recommend to friends and family. Five stars!', date: 'Sep 2024' },
];

const blogPosts = [
  { title: 'What to Do When You Lose Your Car Keys', excerpt: 'Don\'t panic. Here\'s a comprehensive step-by-step guide to help you through this stressful situation.', category: 'Tips' },
  { title: 'Transponder Keys Explained', excerpt: 'Learn how transponder keys work, why they\'re important for security, and what to do if yours fails.', category: 'Education' },
  { title: 'Smart Key vs Traditional Key', excerpt: 'A detailed comparison of smart keys and traditional keys to help you understand the pros and cons.', category: 'Comparison' },
  { title: 'Car Key Battery Replacement', excerpt: 'A simple DIY guide to replacing the battery in your car key fob and extending its life.', category: 'DIY' },
];

export default function Home() {
  const scrollTo = (id) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <>
      {/* Hero Section */}
      <section id="home" style={{
        background: 'linear-gradient(135deg, #778873 0%, #A1BC98 50%, #D2DCB6 100%)',
        padding: '100px 0',
        color: 'white',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center'
      }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <span style={{
              backgroundColor: 'rgba(255,255,255,0.2)',
              padding: '8px 20px',
              borderRadius: '50px',
              fontSize: '0.9rem',
              fontWeight: '500',
              display: 'inline-block',
              marginBottom: '1.5rem'
            }}>
              🚗 Trusted by 500+ Happy Customers
            </span>
            <h1 style={{
              fontSize: '3.5rem',
              marginBottom: '1.5rem',
              fontWeight: '700',
              lineHeight: 1.2,
              letterSpacing: '-1px'
            }}>
              Professional Car Key<br />Services You Can Trust
            </h1>
            <p style={{
              fontSize: '1.25rem',
              marginBottom: '2.5rem',
              opacity: 0.95,
              lineHeight: 1.7,
              maxWidth: '600px',
              margin: '0 auto 2.5rem'
            }}>
              Lost your car keys? Need a spare? We provide fast, reliable car key cutting, 
              programming, and replacement services for all vehicle makes and models.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3rem' }}>
              <a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('#contact'); }}
                style={{
                  backgroundColor: '#F1F3E0',
                  color: '#778873',
                  padding: '16px 32px',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  fontWeight: '600',
                  fontSize: '1.05rem',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                }}>
                Get a Free Quote →
              </a>
              <a href="#services" onClick={(e) => { e.preventDefault(); scrollTo('#services'); }}
                style={{
                  border: '2px solid rgba(255,255,255,0.8)',
                  color: 'white',
                  padding: '14px 30px',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  fontWeight: '600',
                  fontSize: '1.05rem'
                }}>
                View Services
              </a>
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '2rem',
              maxWidth: '500px',
              margin: '0 auto',
              paddingTop: '2rem',
              borderTop: '1px solid rgba(255,255,255,0.2)'
            }}>
              {[
                { num: '24/7', label: 'Emergency Service' },
                { num: '15+', label: 'Years Experience' },
                { num: '100%', label: 'Satisfaction' }
              ].map((stat, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', fontWeight: '700' }}>{stat.num}</div>
                  <div style={{ opacity: 0.85, fontSize: '0.9rem' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* Services Section */}
      <section id="services" style={{ padding: '100px 0', backgroundColor: '#F1F3E0' }}>
        <div className="container">
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">Professional car key solutions tailored to your needs</p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '2rem'
          }}>
            {services.map((service, i) => (
              <div key={i} className="card" style={{
                backgroundColor: 'white',
                padding: '2.5rem',
                borderRadius: '16px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                border: '1px solid rgba(0,0,0,0.04)'
              }}>
                <div style={{
                  fontSize: '2.5rem',
                  marginBottom: '1.25rem',
                  backgroundColor: '#F1F3E0',
                  width: '70px',
                  height: '70px',
                  borderRadius: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>{service.icon}</div>
                <h3 style={{ color: '#778873', marginBottom: '0.75rem', fontSize: '1.35rem', fontWeight: '600' }}>{service.title}</h3>
                <p style={{ color: '#666', marginBottom: '1.25rem', lineHeight: 1.7, fontSize: '0.95rem' }}>{service.desc}</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {service.features.map((f, j) => (
                    <li key={j} style={{ color: '#555', padding: '0.4rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                      <span style={{ color: '#A1BC98', fontWeight: 'bold' }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Car Brands Section */}
      <section id="car-brands" style={{ padding: '100px 0', backgroundColor: '#D2DCB6' }}>
        <div className="container">
          <h2 className="section-title">Car Brands We Service</h2>
          <p className="section-subtitle">Expert key services for all major vehicle manufacturers</p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1.25rem'
          }}>
            {brands.map((brand, i) => (
              <div key={i} className="card" style={{
                backgroundColor: 'white',
                padding: '1.5rem',
                borderRadius: '12px',
                borderLeft: '4px solid #778873',
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
              }}>
                <h3 style={{ color: '#778873', marginBottom: '0.35rem', fontSize: '1.1rem', fontWeight: '600' }}>{brand.name}</h3>
                <p style={{ color: '#666', fontSize: '0.85rem', margin: 0 }}>{brand.desc}</p>
              </div>
            ))}
          </div>
          <p style={{ textAlign: 'center', marginTop: '2.5rem', color: '#555' }}>
            Don't see your brand? <strong>We service virtually all makes and models!</strong>
          </p>
        </div>
      </section>

      {/* Areas Section */}
      <AreasSection areas={areas} />


      {/* Reviews Section */}
      <section id="reviews" style={{ padding: '100px 0', backgroundColor: '#778873' }}>
        <div className="container">
          <h2 className="section-title" style={{ color: 'white' }}>What Our Customers Say</h2>
          <p className="section-subtitle" style={{ color: 'rgba(255,255,255,0.85)' }}>Real reviews from real customers</p>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ fontSize: '1.5rem', letterSpacing: '2px' }}>⭐⭐⭐⭐⭐</span>
            <p style={{ color: 'white', marginTop: '0.5rem', fontSize: '1.1rem' }}>5.0 Average Rating</p>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.5rem'
          }}>
            {reviews.map((review, i) => (
              <div key={i} className="card" style={{
                backgroundColor: 'white',
                padding: '2rem',
                borderRadius: '16px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
              }}>
                <div style={{ marginBottom: '1rem', color: '#F4B942' }}>★★★★★</div>
                <p style={{ color: '#444', marginBottom: '1.5rem', fontStyle: 'italic', lineHeight: 1.7, fontSize: '0.95rem' }}>
                  "{review.text}"
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #eee', paddingTop: '1rem' }}>
                  <span style={{ fontWeight: '600', color: '#778873' }}>{review.name}</span>
                  <span style={{ color: '#999', fontSize: '0.85rem' }}>{review.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" style={{ padding: '100px 0', backgroundColor: '#F1F3E0' }}>
        <div className="container">
          <h2 className="section-title">Tips & Resources</h2>
          <p className="section-subtitle">Helpful articles about car keys and locksmith services</p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1.5rem'
          }}>
            {blogPosts.map((post, i) => (
              <article key={i} className="card" style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 4px 15px rgba(0,0,0,0.06)'
              }}>
                <div style={{
                  backgroundColor: '#A1BC98',
                  height: '140px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '3rem'
                }}>🔑</div>
                <div style={{ padding: '1.5rem' }}>
                  <span style={{
                    backgroundColor: '#D2DCB6',
                    color: '#778873',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: '600'
                  }}>{post.category}</span>
                  <h3 style={{ color: '#778873', fontSize: '1.05rem', margin: '0.75rem 0 0.5rem', fontWeight: '600', lineHeight: 1.4 }}>{post.title}</h3>
                  <p style={{ color: '#666', fontSize: '0.9rem', margin: 0, lineHeight: 1.6 }}>{post.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{ padding: '100px 0', backgroundColor: '#A1BC98' }}>
        <div className="container">
          <h2 className="section-title" style={{ color: 'white' }}>Get In Touch</h2>
          <p className="section-subtitle" style={{ color: 'rgba(255,255,255,0.9)' }}>Ready to get started? Contact us for a free quote</p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '4rem',
            maxWidth: '1000px',
            margin: '0 auto'
          }}>
            <form onSubmit={(e) => { e.preventDefault(); alert('Thank you! We will contact you soon.'); }} 
              style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <input type="text" placeholder="Your Name" required style={{
                padding: '16px 20px',
                borderRadius: '10px',
                border: 'none',
                fontSize: '1rem',
                backgroundColor: 'white',
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
              }} />
              <input type="email" placeholder="Email Address" required style={{
                padding: '16px 20px',
                borderRadius: '10px',
                border: 'none',
                fontSize: '1rem',
                backgroundColor: 'white',
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
              }} />
              <input type="tel" placeholder="Phone Number" style={{
                padding: '16px 20px',
                borderRadius: '10px',
                border: 'none',
                fontSize: '1rem',
                backgroundColor: 'white',
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
              }} />
              <select style={{
                padding: '16px 20px',
                borderRadius: '10px',
                border: 'none',
                fontSize: '1rem',
                backgroundColor: 'white',
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
              }}>
                <option value="">Select a Service</option>
                <option>Key Cutting</option>
                <option>Key Programming</option>
                <option>Key Replacement</option>
                <option>Emergency Lockout</option>
                <option>Other</option>
              </select>
              <textarea placeholder="Tell us about your needs..." rows={4} style={{
                padding: '16px 20px',
                borderRadius: '10px',
                border: 'none',
                fontSize: '1rem',
                resize: 'vertical',
                backgroundColor: 'white',
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                fontFamily: 'inherit'
              }} />
              <button type="submit" style={{
                backgroundColor: '#778873',
                color: 'white',
                padding: '16px',
                borderRadius: '10px',
                border: 'none',
                fontSize: '1.05rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}>Send Message →</button>
            </form>
            <div style={{ color: 'white' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {[
                  { icon: '📞', title: 'Phone', info: '[phone_number]', sub: '24/7 Emergency Line Available' },
                  { icon: '✉️', title: 'Email', info: '[email]', sub: 'We reply within 24 hours' },
                  { icon: '📍', title: 'Location', info: '[address]', sub: 'Mobile service available' },
                  { icon: '⏰', title: 'Hours', info: 'Mon-Fri: 8am-6pm', sub: 'Sat: 9am-4pm • Sun: Emergency' }
                ].map((item, i) => (
                  <div key={i} style={{
                    backgroundColor: 'rgba(255,255,255,0.15)',
                    padding: '1.5rem',
                    borderRadius: '12px',
                    backdropFilter: 'blur(10px)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <span style={{ fontSize: '1.75rem' }}>{item.icon}</span>
                      <div>
                        <h3 style={{ marginBottom: '0.25rem', fontSize: '1.1rem' }}>{item.title}</h3>
                        <p style={{ margin: 0, fontWeight: '500' }}>{item.info}</p>
                        <p style={{ margin: '0.25rem 0 0', opacity: 0.8, fontSize: '0.85rem' }}>{item.sub}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
