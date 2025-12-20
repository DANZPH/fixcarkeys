'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { FocusCards } from "@/components/ui/focus-cards";
import { LayoutTextFlip } from "@/components/ui/TextFlip";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { LogoMarquee } from "@/components/ui/LogoMarquee";
import { BlogCarousel } from "@/components/ui/BlogCarousel";
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

// Import default images as fallbacks
import keyCuttingImg from '@/assets/key_cutting_service.png';
import keyProgrammingImg from '@/assets/key_programming_service.png';
import remoteKeyFobImg from '@/assets/remote_key_fob_service.png';
import keyReplacementImg from '@/assets/key_replacement_service.png';
import emergencyLockoutImg from '@/assets/emergency_lockout_service.png';
import ignitionRepairImg from '@/assets/ignition_repair_service.png';

// Default fallback images mapping
const defaultServiceImages = {
  'Key Cutting': keyCuttingImg.src,
  'Key Programming': keyProgrammingImg.src,
  'Remote Key Fob': remoteKeyFobImg.src,
  'Key Replacement': keyReplacementImg.src,
  'Emergency Lockout': emergencyLockoutImg.src,
  'Ignition Repair': ignitionRepairImg.src,
};

function AreasSection({ areas }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="areas" suppressHydrationWarning style={{ paddingTop: '100px', paddingBottom: '100px', backgroundColor: '#F1F3E0' }}>
      <div className="container reveal-on-scroll" suppressHydrationWarning>
        <h2 className="section-title">Areas We Cover</h2>
        <p className="section-subtitle">Mobile car key services across the North West UK</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>
          {/* Accordion List */}
          <div>
            {areas.map((area, i) => (
              <div key={area.id || i} style={{
                backgroundColor: 'white',
                marginBottom: '0.25rem',
                borderRadius: '6px',
                overflow: 'hidden',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
              }}>
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    borderTop: 'none',
                    borderRight: 'none',
                    borderLeft: 'none',
                    borderBottom: openIndex === i ? '1px solid #eee' : 'none',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    color: '#778873',
                    textAlign: 'left'
                  }}
                  suppressHydrationWarning
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
                      {(area.towns || []).map((town, j) => (
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

export default function Home() {
  const [showContactModal, setShowContactModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState({
    settings: {},
    services: [],
    testimonials: [],
    brands: [],
    areas: [],
    blogPosts: []
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const res = await fetch('/api/content');
      if (res.ok) {
        const data = await res.json();
        setContent(data);
      }
    } catch (error) {
      console.error('Failed to fetch content:', error);
    } finally {
      setLoading(false);
    }
  };

  const scrollTo = (id) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  const { settings, services, testimonials, brands, areas, blogPosts } = content;

  // Process services for FocusCards
  const processedServices = services.map(service => ({
    ...service,
    src: service.image_url || defaultServiceImages[service.title] || keyCuttingImg.src,
    desc: service.description,
  }));

  // Process testimonials for AnimatedTestimonials
  const processedTestimonials = testimonials.map(t => ({
    name: t.name,
    designation: t.designation,
    quote: t.quote,
    src: t.image_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop'
  }));

  // Get phone number for contact
  const phoneNumber = settings.phone_number || '07444 125447';
  const whatsappNumber = settings.whatsapp_number || '447444125447';
  const heroVideoUrl = settings.hero_video_url || '/assets/Car_Moving_Video.mp4';

  if (loading) {
    return (
      <div suppressHydrationWarning style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #778873 0%, #A1BC98 50%, #D2DCB6 100%)'
      }}>
        <div suppressHydrationWarning style={{ textAlign: 'center', color: 'white' }}>
          <div suppressHydrationWarning style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔑</div>
          <p suppressHydrationWarning style={{ fontSize: '1.1rem', opacity: 0.9 }}>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section id="home" suppressHydrationWarning style={{
        background: 'linear-gradient(135deg, #778873 0%, #A1BC98 50%, #D2DCB6 100%)',
        padding: '140px 0 100px',
        color: 'white',
        minHeight: '100vh',
        display: 'flex',
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
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '4rem',
            flexWrap: 'wrap-reverse'
          }}>
            <div style={{ flex: '1 1 500px', textAlign: 'left' }}>
              <h1 className="hero-title" style={{
                fontSize: '4.5rem',
                marginBottom: '0.5rem',
                fontWeight: '800',
                lineHeight: 1.1,
                letterSpacing: '-2px',
                textShadow: '0 2px 10px rgba(0,0,0,0.1)'
              }}>
                <LayoutTextFlip
                  staticText='Fix'
                  flipWords={['CarKeys', 'AutoKeys', 'Keys', 'Fobs']}
                  interval={2500}
                />
              </h1>
              <div className="hero-subtitle" style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                marginBottom: '2rem',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                opacity: 0.95,
                textShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}>
                MOBILE AUTO LOCKSMITH
              </div>
              <p className="hero-description" style={{
                fontSize: '1.25rem',
                marginBottom: '2.5rem',
                opacity: 0.95,
                lineHeight: 1.7,
                maxWidth: '600px'
              }}>
                Lost your car keys? Need a spare? We provide fast, reliable car key cutting, programming, and replacement services for all vehicle makes and models.
              </p>
              <div className="hero-buttons" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
                <button
                  onClick={() => setShowContactModal(true)}
                  style={{
                    backgroundColor: '#F1F3E0',
                    color: '#778873',
                    padding: '16px 32px',
                    borderRadius: '10px',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '1.05rem',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                  }}>
                  Contact →
                </button>
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
              <div className="hero-stats" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '2rem',
                maxWidth: '500px',
                paddingTop: '2rem',
                borderTop: '1px solid rgba(255,255,255,0.2)'
              }}>
                <div>
                  <div style={{ fontSize: '2rem', fontWeight: '700' }}>
                    <AnimatedCounter
                      end={parseInt(settings.hero_stat_1_value) || 24}
                      duration={1500}
                      suffix={settings.hero_stat_1_value?.includes('/') ? '/7' : ''}
                    />
                  </div>
                  <div style={{ opacity: 0.85, fontSize: '0.9rem' }}>{settings.hero_stat_1_label || 'Emergency Service'}</div>
                </div>
                <div>
                  <div style={{ fontSize: '2rem', fontWeight: '700' }}>
                    <AnimatedCounter
                      end={parseInt(settings.hero_stat_2_value) || 15}
                      duration={1800}
                      suffix={settings.hero_stat_2_value?.includes('+') ? '+' : ''}
                    />
                  </div>
                  <div style={{ opacity: 0.85, fontSize: '0.9rem' }}>{settings.hero_stat_2_label || 'Years Experience'}</div>
                </div>
                <div>
                  <div style={{ fontSize: '2rem', fontWeight: '700' }}>
                    <AnimatedCounter
                      end={parseInt(settings.hero_stat_3_value) || 100}
                      duration={2000}
                      suffix={settings.hero_stat_3_value?.includes('%') ? '%' : ''}
                    />
                  </div>
                  <div style={{ opacity: 0.85, fontSize: '0.9rem' }}>{settings.hero_stat_3_label || 'Satisfaction'}</div>
                </div>
              </div>
            </div>

            <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}>
              <div className="hero-video" style={{
                position: 'relative',
                width: '100%',
                maxWidth: '800px',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
                transform: 'perspective(1000px) rotateY(-5deg)',
                transition: 'transform 0.5s ease'
              }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'perspective(1000px) rotateY(0deg) scale(1.02)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'perspective(1000px) rotateY(-5deg)'}
              >
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
                >
                  <source src={heroVideoUrl} type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Services Section */}
      <section id="services" suppressHydrationWarning style={{ padding: '100px 0', backgroundColor: '#F1F3E0' }}>
        <div className="container reveal-on-scroll">
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">Professional car key solutions tailored to your needs</p>
          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}>
            <FocusCards cards={processedServices} />
          </div>
        </div>
      </section>

      {/* Car Brands Section */}
      <section id="car-brands" suppressHydrationWarning style={{
        paddingTop: '100px',
        paddingBottom: '100px',
        backgroundImage: 'linear-gradient(135deg, #778873 0%, #A1BC98 50%, #D2DCB6 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative background elements */}
        <div suppressHydrationWarning style={{
          position: 'absolute',
          top: '-10%',
          right: '5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          backgroundColor: 'rgba(255,255,255,0.03)',
          filter: 'blur(80px)',
          zIndex: 0
        }} />
        <div suppressHydrationWarning style={{
          position: 'absolute',
          bottom: '-10%',
          left: '5%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          backgroundColor: 'rgba(255,255,255,0.05)',
          filter: 'blur(60px)',
          zIndex: 0
        }} />

        <div className="reveal-on-scroll" suppressHydrationWarning style={{ position: 'relative', zIndex: 1 }}>
          <div suppressHydrationWarning style={{ textAlign: 'center', marginBottom: '4rem' }} className="container">
            <span style={{
              display: 'inline-block',
              backgroundColor: 'rgba(255,255,255,0.2)',
              backdropFilter: 'blur(10px)',
              color: 'white',
              padding: '8px 20px',
              borderRadius: '50px',
              fontSize: '0.85rem',
              fontWeight: '600',
              marginBottom: '1rem',
              border: '1px solid rgba(255,255,255,0.3)',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              Certified Brand Specialists
            </span>
            <h2 style={{
              fontSize: '3.5rem',
              color: 'white',
              marginBottom: '1rem',
              fontWeight: '800',
              letterSpacing: '-1.5px',
              lineHeight: 1.1
            }}>Car Brands We Service</h2>
            <p style={{
              color: 'rgba(255,255,255,0.9)',
              fontSize: '1.25rem',
              maxWidth: '600px',
              margin: '0 auto'
            }}>We carry the latest diagnostic equipment and key blanks for over 60 manufacturers.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
            <LogoMarquee items={brands.slice(0, Math.ceil(brands.length / 2))} speed={50} direction="left" suppressHydrationWarning />
            <LogoMarquee items={brands.slice(Math.ceil(brands.length / 2))} speed={60} direction="right" suppressHydrationWarning />
          </div>

          <div className="container" style={{ marginTop: '3rem' }}>
            <div style={{
              backgroundColor: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '24px',
              padding: '2rem',
              border: '1px solid rgba(255,255,255,0.2)',
              textAlign: 'center'
            }}>
              <p style={{
                color: 'white',
                fontSize: '1.1rem',
                margin: 0,
                fontWeight: '500'
              }}>
                Don't see your brand? <a
                  href="#contact"
                  onClick={(e) => { e.preventDefault(); scrollTo('#contact'); }}
                  style={{
                    color: 'white',
                    fontWeight: '700',
                    textDecoration: 'underline',
                    textUnderlineOffset: '4px'
                  }}
                >Contact us</a> — we service 99% of vehicles on the road today!
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* Areas Section */}
      <AreasSection areas={areas} />


      {/* Reviews Section */}
      <section id="reviews" suppressHydrationWarning style={{ padding: '100px 0', backgroundColor: '#778873' }}>
        <div className="container reveal-on-scroll">
          <h2 className="section-title" style={{ color: 'white' }}>What Our Customers Say</h2>
          <p className="section-subtitle" style={{ color: 'rgba(255,255,255,0.85)' }}>Real reviews from real customers</p>

          {processedTestimonials.length > 0 && (
            <AnimatedTestimonials testimonials={processedTestimonials} />
          )}
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" suppressHydrationWarning style={{ padding: '100px 0', backgroundColor: '#F1F3E0' }}>
        <div className="container reveal-on-scroll">
          <h2 className="section-title">Tips & Resources</h2>
          <p className="section-subtitle">Helpful articles about car keys and locksmith services</p>
          <div style={{ marginTop: '2rem' }}>
            <BlogCarousel posts={blogPosts} />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" suppressHydrationWarning style={{ padding: '100px 0', backgroundColor: '#A1BC98' }}>
        <div className="container reveal-on-scroll">
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
                {services.map((s, i) => (
                  <option key={i}>{s.title}</option>
                ))}
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
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  { icon: <Phone size={24} />, title: 'Phone', info: phoneNumber, sub: '24/7 Emergency Line Available' },
                  { icon: <Mail size={24} />, title: 'Email', info: settings.email || 'info@fixcarkeys.co.uk', sub: 'We reply within 24 hours' },
                  { icon: <MapPin size={24} />, title: 'Location', info: settings.address || 'North West England, UK', sub: 'Mobile service available' },
                  { icon: <Clock size={24} />, title: 'Hours', info: settings.hours || 'Mon-Sun: 24/7', sub: 'Emergency availability' }
                ].map((item, i) => (
                  <div key={`${item.title}-${i}`} suppressHydrationWarning style={{
                    backgroundColor: 'rgba(255,255,255,0.15)',
                    padding: '1rem 1.25rem',
                    borderRadius: '12px',
                    backdropFilter: 'blur(10px)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }} suppressHydrationWarning>
                      <span style={{
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: 0.9
                      }}>{item.icon}</span>
                      <div suppressHydrationWarning>
                        <h3 style={{ marginBottom: '0.1rem', fontSize: '1rem' }}>{item.title}</h3>
                        <p style={{ margin: 0, fontWeight: '500', fontSize: '0.95rem' }}>{item.info}</p>
                        <p style={{ margin: '0.1rem 0 0', opacity: 0.8, fontSize: '0.8rem' }}>{item.sub}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Modal */}
      <AnimatePresence>
        {showContactModal && (
          <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowContactModal(false)}
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(0,0,0,0.6)',
                backdropFilter: 'blur(5px)'
              }}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              style={{
                backgroundColor: 'white',
                borderRadius: '24px',
                padding: '2.5rem',
                width: '100%',
                maxWidth: '400px',
                position: 'relative',
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
                textAlign: 'center'
              }}
            >
              <button
                onClick={() => setShowContactModal(false)}
                style={{
                  position: 'absolute',
                  top: '1.5rem',
                  right: '1.5rem',
                  background: '#f3f4f6',
                  border: 'none',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.2rem',
                  color: '#4b5563'
                }}
              >✕</button>

              <h3 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#778873', marginBottom: '0.5rem' }}>Get in Touch</h3>
              <p style={{ color: '#6b7280', marginBottom: '2rem' }}>How would you like to contact us?</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.75rem',
                  backgroundColor: '#25D366',
                  color: 'white',
                  padding: '16px',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  fontWeight: '700',
                  fontSize: '1.1rem',
                  transition: 'transform 0.2s ease'
                }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                  WhatsApp Us
                </a>

                <a href={`tel:${phoneNumber.replace(/\s/g, '')}`} style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.75rem',
                  backgroundColor: '#778873',
                  color: 'white',
                  padding: '16px',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  fontWeight: '700',
                  fontSize: '1.1rem',
                  transition: 'transform 0.2s ease'
                }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  📞 Call {phoneNumber}
                </a>
              </div>

              <p style={{ marginTop: '1.5rem', fontSize: '0.85rem', color: '#9ca3af' }}>
                Available 24/7 for emergency lockouts.
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
