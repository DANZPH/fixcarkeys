'use client';

import { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from 'lucide-react';

export default function ContactPage() {
    const [settings, setSettings] = useState({});
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        postcode: '',
        carMake: '',
        service: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const carMakes = [
        'Ford', 'Vauxhall', 'Volkswagen', 'BMW', 'Audi',
        'Mercedes', 'Peugeot', 'Citroen', 'Nissan', 'Toyota',
        'Honda', 'Kia', 'Hyundai', 'Land Rover', 'Other'
    ];

    const operatingHours = [
        { day: 'Monday', status: 'Open' },
        { day: 'Tuesday', status: 'Open' },
        { day: 'Wednesday', status: 'Open' },
        { day: 'Thursday', status: 'Open' },
        { day: 'Friday', status: 'Open' },
        { day: 'Saturday', status: 'Open' },
        { day: 'Sunday', status: 'Closed' }
    ];

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
        console.log(formData);
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 5000);
        setFormData({
            name: '', email: '', phone: '', postcode: '',
            carMake: '', service: '', message: ''
        });
    };

    const phoneNumber = settings.phone_number || '07444 125447';
    const whatsappNumber = settings.whatsapp_number || '447444125447';
    const emailAddress = 'fixcarkeys@yahoo.com';

    return (
        <>
            {/* Page Header */}
            <section style={{
                background: 'linear-gradient(135deg, #778873 0%, #A1BC98 50%, #D2DCB6 100%)',
                padding: '120px 0 80px',
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
                        fontSize: '3rem',
                        fontWeight: '800',
                        marginBottom: '1rem',
                        letterSpacing: '-1px'
                    }}>Contact Our Expert Locksmiths</h1>
                    <p style={{
                        fontSize: '1.1rem',
                        opacity: 0.95,
                        maxWidth: '700px',
                        margin: '0 auto',
                        fontWeight: '500'
                    }}>Need urgent assistance or have a question about car key replacement? We're here to help.</p>
                </div>
            </section>

            {/* Main Content */}
            <section style={{ padding: '60px 0 100px', backgroundColor: '#F8F9F5' }}>
                <div className="container">
                    <div className="contact-grid" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                        gap: '4rem',
                        maxWidth: '1200px',
                        margin: '0 auto',
                        alignItems: 'start'
                    }}>

                        {/* Left Column: Contact Info */}
                        <div style={{
                            backgroundColor: 'white',
                            borderRadius: '24px',
                            padding: '3rem',
                            boxShadow: '0 10px 40px rgba(0,0,0,0.06)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '2.5rem'
                        }}>

                            {/* Get in Touch */}
                            <div>
                                <h2 style={{ color: '#333', fontSize: '1.5rem', marginBottom: '1.5rem', fontWeight: '700' }}>
                                    Get in Touch
                                </h2>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                                    {/* Phone */}
                                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                        <div style={{
                                            backgroundColor: '#E2E8D5', padding: '12px', borderRadius: '50%', color: '#778873'
                                        }}>
                                            <Phone size={24} />
                                        </div>
                                        <div>
                                            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#1a1a1a', margin: '0 0 0.25rem' }}>Phone Support</h3>
                                            <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>Emergency Line</p>
                                            <a href={`tel:${phoneNumber.replace(/\s/g, '')}`} style={{
                                                display: 'block', margin: '0.25rem 0 0', fontWeight: '700', color: '#778873', textDecoration: 'none', fontSize: '1.1rem'
                                            }}>{phoneNumber}</a>
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                        <div style={{
                                            backgroundColor: '#E2E8D5', padding: '12px', borderRadius: '50%', color: '#778873'
                                        }}>
                                            <Mail size={24} />
                                        </div>
                                        <div>
                                            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#1a1a1a', margin: '0 0 0.25rem' }}>Email Us</h3>
                                            <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>For quotes & inquiries</p>
                                            <a href={`mailto:${emailAddress}`} style={{
                                                display: 'block', margin: '0.25rem 0 0', fontWeight: '600', color: '#778873', textDecoration: 'none'
                                            }}>{emailAddress}</a>
                                        </div>
                                    </div>

                                    {/* WhatsApp */}
                                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                        <div style={{
                                            backgroundColor: '#E2E8D5', padding: '12px', borderRadius: '50%', color: '#778873'
                                        }}>
                                            <MessageCircle size={24} />
                                        </div>
                                        <div>
                                            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#1a1a1a', margin: '0 0 0.25rem' }}>WhatsApp</h3>
                                            <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>Send us photos of your key</p>
                                            <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" style={{
                                                display: 'block', margin: '0.25rem 0 0', fontWeight: '600', color: '#25D366', textDecoration: 'none'
                                            }}>Chat on WhatsApp</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Operating Hours */}
                            <div>
                                <h3 style={{ color: '#333', fontSize: '1.25rem', marginBottom: '1rem', fontWeight: '700' }}>
                                    Operating Hours
                                </h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    {operatingHours.map((item, index) => (
                                        <div key={index} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', borderBottom: index !== operatingHours.length - 1 ? '1px solid #eee' : 'none', paddingBottom: '0.5rem' }}>
                                            <span style={{ color: '#555' }}>{item.day}</span>
                                            <span style={{
                                                fontWeight: '600',
                                                color: item.status === 'Open' ? '#778873' : '#d9534f'
                                            }}>{item.status}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>

                        {/* Right Column: Contact Form */}
                        <div style={{
                            backgroundColor: 'white',
                            borderRadius: '24px',
                            padding: '3rem',
                            boxShadow: '0 10px 40px rgba(0,0,0,0.06)'
                        }}>
                            <h2 style={{ color: '#1a1a1a', fontSize: '2rem', marginBottom: '0.5rem', fontWeight: '800' }}>
                                Send us a Message
                            </h2>
                            <p style={{ color: '#666', marginBottom: '2rem' }}>
                                Fill out the form below for a free quote. We aim to respond within 30 minutes.
                            </p>

                            {submitted && (
                                <div style={{
                                    backgroundColor: '#D2DCB6',
                                    color: '#778873',
                                    padding: '1rem',
                                    borderRadius: '10px',
                                    marginBottom: '1.5rem',
                                    fontWeight: '600',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}>
                                    Currently this is a demo form. Your message would be sent!
                                </div>
                            )}

                            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#444' }}>Full Name</label>
                                        <input
                                            type="text"
                                            placeholder="John Doe"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            style={{
                                                padding: '14px',
                                                borderRadius: '8px',
                                                border: '1px solid #ddd',
                                                fontSize: '0.95rem',
                                                outline: 'none',
                                                width: '100%'
                                            }}
                                        />
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#444' }}>Phone Number</label>
                                        <input
                                            type="tel"
                                            placeholder="07123 456789"
                                            required
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            style={{
                                                padding: '14px',
                                                borderRadius: '8px',
                                                border: '1px solid #ddd',
                                                fontSize: '0.95rem',
                                                outline: 'none',
                                                width: '100%'
                                            }}
                                        />
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#444' }}>Email Address</label>
                                        <input
                                            type="email"
                                            placeholder="john@example.com"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            style={{
                                                padding: '14px',
                                                borderRadius: '8px',
                                                border: '1px solid #ddd',
                                                fontSize: '0.95rem',
                                                outline: 'none',
                                                width: '100%'
                                            }}
                                        />
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#444' }}>Postcode / Area</label>
                                        <input
                                            type="text"
                                            placeholder="M1 1AA"
                                            value={formData.postcode}
                                            onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                                            style={{
                                                padding: '14px',
                                                borderRadius: '8px',
                                                border: '1px solid #ddd',
                                                fontSize: '0.95rem',
                                                outline: 'none',
                                                width: '100%'
                                            }}
                                        />
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#444' }}>Car Make</label>
                                        <select
                                            value={formData.carMake}
                                            onChange={(e) => setFormData({ ...formData, carMake: e.target.value })}
                                            style={{
                                                padding: '14px',
                                                borderRadius: '8px',
                                                border: '1px solid #ddd',
                                                fontSize: '0.95rem',
                                                outline: 'none',
                                                width: '100%',
                                                backgroundColor: 'white'
                                            }}
                                        >
                                            <option value="">Select your car make</option>
                                            {carMakes.map(make => (
                                                <option key={make} value={make}>{make}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#444' }}>Service Required</label>
                                        <select
                                            value={formData.service}
                                            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                                            style={{
                                                padding: '14px',
                                                borderRadius: '8px',
                                                border: '1px solid #ddd',
                                                fontSize: '0.95rem',
                                                outline: 'none',
                                                width: '100%',
                                                backgroundColor: 'white'
                                            }}
                                        >
                                            <option value="">Select a service</option>
                                            {services.map((s, i) => (
                                                <option key={i} value={s.title}>{s.title}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#444' }}>Message</label>
                                    <textarea
                                        placeholder="Please describe your issue or what service you need..."
                                        rows={4}
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        style={{
                                            padding: '14px',
                                            borderRadius: '8px',
                                            border: '1px solid #ddd',
                                            fontSize: '0.95rem',
                                            resize: 'vertical',
                                            fontFamily: 'inherit',
                                            outline: 'none'
                                        }}
                                    />
                                </div>

                                <button type="submit" style={{
                                    backgroundColor: '#778873',
                                    color: 'white',
                                    padding: '18px',
                                    borderRadius: '12px',
                                    border: 'none',
                                    fontSize: '1.1rem',
                                    fontWeight: '700',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    marginTop: '1rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem',
                                    boxShadow: '0 4px 14px rgba(119, 136, 115, 0.4)'
                                }}>
                                    <Send size={20} />
                                    Send Message & Get Quote
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
