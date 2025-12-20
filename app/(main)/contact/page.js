'use client';

import { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';

export default function ContactPage() {
    const [settings, setSettings] = useState({});
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const [settingsRes, servicesRes] = await Promise.all([
                    fetch('/api/settings'),
                    fetch('/api/services')
                ]);

                if (settingsRes.ok) {
                    const settingsData = await settingsRes.json();
                    const settingsObj = {};
                    settingsData.forEach(s => { settingsObj[s.key] = s.value; });
                    setSettings(settingsObj);
                }

                if (servicesRes.ok) {
                    const servicesData = await servicesRes.json();
                    setServices(servicesData);
                }
            } catch (error) {
                console.error('Failed to fetch data:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send the form data to your backend
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 5000);
        setFormData({ name: '', email: '', phone: '', service: '', message: '' });
    };

    const phoneNumber = settings.phone_number || '07444 125447';
    const whatsappNumber = settings.whatsapp_number || '447444125447';

    return (
        <>
            {/* Page Header */}
            <section style={{
                background: 'linear-gradient(135deg, #778873 0%, #A1BC98 50%, #D2DCB6 100%)',
                padding: '160px 0 80px',
                color: 'white',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Grid Background */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: `
                        linear-gradient(rgba(255, 255, 255, 0.07) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255, 255, 255, 0.07) 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px',
                    pointerEvents: 'none',
                    zIndex: 0
                }} />
                <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                    <h1 style={{
                        fontSize: '3.5rem',
                        fontWeight: '800',
                        marginBottom: '1rem',
                        letterSpacing: '-1px'
                    }}>Contact Us</h1>
                    <p style={{
                        fontSize: '1.25rem',
                        opacity: 0.9,
                        maxWidth: '600px',
                        margin: '0 auto'
                    }}>Ready to get started? Contact us for a free quote</p>
                </div>
            </section>

            {/* Quick Contact Buttons */}
            <section style={{ padding: '0', backgroundColor: '#F1F3E0', marginTop: '-40px', position: 'relative', zIndex: 10 }}>
                <div className="container">
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '1rem',
                        maxWidth: '800px',
                        margin: '0 auto'
                    }}>
                        <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.75rem',
                            backgroundColor: '#25D366',
                            color: 'white',
                            padding: '20px',
                            borderRadius: '16px',
                            textDecoration: 'none',
                            fontWeight: '700',
                            fontSize: '1.1rem',
                            boxShadow: '0 10px 30px rgba(37, 211, 102, 0.3)',
                            transition: 'transform 0.2s ease'
                        }}>
                            <MessageCircle size={24} />
                            WhatsApp Us
                        </a>

                        <a href={`tel:${phoneNumber.replace(/\s/g, '')}`} style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.75rem',
                            backgroundColor: '#778873',
                            color: 'white',
                            padding: '20px',
                            borderRadius: '16px',
                            textDecoration: 'none',
                            fontWeight: '700',
                            fontSize: '1.1rem',
                            boxShadow: '0 10px 30px rgba(119, 136, 115, 0.3)',
                            transition: 'transform 0.2s ease'
                        }}>
                            <Phone size={24} />
                            Call {phoneNumber}
                        </a>
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section style={{ padding: '100px 0', backgroundColor: '#F1F3E0' }}>
                <div className="container">
                    <div className="contact-grid" style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '3rem',
                        maxWidth: '1100px',
                        margin: '0 auto'
                    }}>
                        {/* Form */}
                        <div style={{
                            backgroundColor: 'white',
                            borderRadius: '24px',
                            padding: '3rem',
                            boxShadow: '0 10px 40px rgba(0,0,0,0.08)'
                        }}>
                            <h2 style={{ color: '#778873', fontSize: '1.75rem', marginBottom: '1.5rem' }}>
                                Send us a Message
                            </h2>

                            {submitted && (
                                <div style={{
                                    backgroundColor: '#D2DCB6',
                                    color: '#778873',
                                    padding: '1rem',
                                    borderRadius: '10px',
                                    marginBottom: '1.5rem',
                                    fontWeight: '600'
                                }}>
                                    ✓ Thank you! We'll contact you shortly.
                                </div>
                            )}

                            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    style={{
                                        padding: '16px 20px',
                                        borderRadius: '10px',
                                        border: '2px solid #eee',
                                        fontSize: '1rem',
                                        transition: 'border-color 0.3s ease',
                                        outline: 'none'
                                    }}
                                />
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    style={{
                                        padding: '16px 20px',
                                        borderRadius: '10px',
                                        border: '2px solid #eee',
                                        fontSize: '1rem',
                                        outline: 'none'
                                    }}
                                />
                                <input
                                    type="tel"
                                    placeholder="Phone Number"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    style={{
                                        padding: '16px 20px',
                                        borderRadius: '10px',
                                        border: '2px solid #eee',
                                        fontSize: '1rem',
                                        outline: 'none'
                                    }}
                                />
                                <select
                                    value={formData.service}
                                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                                    style={{
                                        padding: '16px 20px',
                                        borderRadius: '10px',
                                        border: '2px solid #eee',
                                        fontSize: '1rem',
                                        backgroundColor: 'white',
                                        outline: 'none'
                                    }}
                                >
                                    <option value="">Select a Service</option>
                                    {services.map((s, i) => (
                                        <option key={i} value={s.title}>{s.title}</option>
                                    ))}
                                </select>
                                <textarea
                                    placeholder="Tell us about your needs..."
                                    rows={5}
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    style={{
                                        padding: '16px 20px',
                                        borderRadius: '10px',
                                        border: '2px solid #eee',
                                        fontSize: '1rem',
                                        resize: 'vertical',
                                        fontFamily: 'inherit',
                                        outline: 'none'
                                    }}
                                />
                                <button type="submit" style={{
                                    backgroundColor: '#778873',
                                    color: 'white',
                                    padding: '18px',
                                    borderRadius: '10px',
                                    border: 'none',
                                    fontSize: '1.1rem',
                                    fontWeight: '700',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease'
                                }}>
                                    Send Message →
                                </button>
                            </form>
                        </div>

                        {/* Contact Info */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <h2 style={{ color: '#778873', fontSize: '1.75rem', marginBottom: '0.5rem' }}>
                                Get in Touch
                            </h2>
                            <p style={{ color: '#666', marginBottom: '1rem' }}>
                                We're available 24/7 for emergency lockouts. Reach out anytime!
                            </p>

                            {[
                                { icon: <Phone size={24} />, title: 'Phone', info: phoneNumber, sub: '24/7 Emergency Line Available' },
                                { icon: <Mail size={24} />, title: 'Email', info: settings.email || 'info@fixcarkeys.co.uk', sub: 'We reply within 24 hours' },
                                { icon: <MapPin size={24} />, title: 'Location', info: settings.address || 'North West England, UK', sub: 'Mobile service available' },
                                { icon: <Clock size={24} />, title: 'Hours', info: settings.hours || 'Mon-Sun: 24/7', sub: 'Emergency availability' }
                            ].map((item, i) => (
                                <div key={i} style={{
                                    backgroundColor: '#778873',
                                    padding: '1.5rem',
                                    borderRadius: '16px',
                                    color: 'white'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <span style={{
                                            backgroundColor: 'rgba(255,255,255,0.2)',
                                            padding: '12px',
                                            borderRadius: '12px',
                                            display: 'flex'
                                        }}>{item.icon}</span>
                                        <div>
                                            <h3 style={{ marginBottom: '0.25rem', fontSize: '1.1rem' }}>{item.title}</h3>
                                            <p style={{ margin: 0, fontWeight: '600', fontSize: '1rem' }}>{item.info}</p>
                                            <p style={{ margin: '0.25rem 0 0', opacity: 0.85, fontSize: '0.85rem' }}>{item.sub}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
