'use client';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', service: '', message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
  };

  return (
    <>
      <section style={{
        background: 'linear-gradient(135deg, #778873 0%, #A1BC98 100%)',
        padding: '60px 0',
        color: 'white',
        textAlign: 'center'
      }}>
        <div className="container">
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Contact Us</h1>
          <p style={{ opacity: 0.95, maxWidth: '600px', margin: '0 auto' }}>
            Get in touch for a free quote or emergency assistance
          </p>
        </div>
      </section>

      <section style={{ padding: '60px 0', backgroundColor: '#F1F3E0' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '3rem'
          }}>
            <div>
              <h2 style={{ color: '#778873', marginBottom: '1.5rem' }}>Get a Free Quote</h2>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                  style={{
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid #D2DCB6',
                    fontSize: '1rem'
                  }}
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                  style={{
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid #D2DCB6',
                    fontSize: '1rem'
                  }}
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  style={{
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid #D2DCB6',
                    fontSize: '1rem'
                  }}
                />
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({...formData, service: e.target.value})}
                  style={{
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid #D2DCB6',
                    fontSize: '1rem',
                    backgroundColor: 'white'
                  }}
                >
                  <option value="">Select a Service</option>
                  <option value="key-cutting">Key Cutting</option>
                  <option value="key-programming">Key Programming</option>
                  <option value="key-replacement">Key Replacement</option>
                  <option value="emergency-lockout">Emergency Lockout</option>
                  <option value="other">Other</option>
                </select>
                <textarea
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  rows={4}
                  style={{
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid #D2DCB6',
                    fontSize: '1rem',
                    resize: 'vertical'
                  }}
                />
                <button type="submit" className="btn-primary" style={{ marginTop: '0.5rem' }}>
                  Send Message
                </button>
              </form>
            </div>

            <div>
              <h2 style={{ color: '#778873', marginBottom: '1.5rem' }}>Contact Information</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{
                  backgroundColor: 'white',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📞</div>
                  <h3 style={{ color: '#778873', marginBottom: '0.25rem' }}>Phone</h3>
                  <p style={{ color: '#666' }}>[phone_number]</p>
                  <p style={{ color: '#A1BC98', fontSize: '0.9rem' }}>24/7 Emergency Line</p>
                </div>
                <div style={{
                  backgroundColor: 'white',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>✉️</div>
                  <h3 style={{ color: '#778873', marginBottom: '0.25rem' }}>Email</h3>
                  <p style={{ color: '#666' }}>[email]</p>
                </div>
                <div style={{
                  backgroundColor: 'white',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📍</div>
                  <h3 style={{ color: '#778873', marginBottom: '0.25rem' }}>Location</h3>
                  <p style={{ color: '#666' }}>[address]</p>
                </div>
                <div style={{
                  backgroundColor: '#778873',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  color: 'white'
                }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⏰</div>
                  <h3 style={{ marginBottom: '0.5rem' }}>Business Hours</h3>
                  <p style={{ opacity: 0.9 }}>Monday - Friday: 8am - 6pm</p>
                  <p style={{ opacity: 0.9 }}>Saturday: 9am - 4pm</p>
                  <p style={{ opacity: 0.9 }}>Sunday: Emergency Only</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
