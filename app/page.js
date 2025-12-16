'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import carHero from '@/assets/car_hero.png';
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { FocusCards } from "@/components/ui/focus-cards";
import keyCuttingImg from '@/assets/key_cutting_service.png';
import keyProgrammingImg from '@/assets/key_programming_service.png';
import remoteKeyFobImg from '@/assets/remote_key_fob_service.png';
import keyReplacementImg from '@/assets/key_replacement_service.png';
import emergencyLockoutImg from '@/assets/emergency_lockout_service.png';
import ignitionRepairImg from '@/assets/ignition_repair_service.png';

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
                    border: 'none',
                    borderBottom: openIndex === i ? '1px solid #eee' : 'none',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
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
  {
    icon: '🔑',
    title: 'Key Cutting',
    desc: 'Precision key cutting for all vehicle types including standard, laser-cut, and high-security keys.',
    features: ['All key types', 'On-site service', 'Same-day completion'],
    src: keyCuttingImg.src
  },
  {
    icon: '💻',
    title: 'Key Programming',
    desc: 'Expert transponder and smart key programming for modern vehicles with advanced security.',
    features: ['Transponder keys', 'Smart keys', 'Remote fobs'],
    src: keyProgrammingImg.src
  },
  {
    icon: '🔄',
    title: 'Key Replacement',
    desc: 'Complete key replacement solutions when you\'ve lost all your keys or need extras.',
    features: ['All makes & models', 'OEM quality', 'Warranty included'],
    src: keyReplacementImg.src
  },
  {
    icon: '🚗',
    title: 'Emergency Lockout',
    desc: '24/7 emergency lockout assistance to get you back on the road quickly and safely.',
    features: ['24/7 availability', 'Fast response', 'No damage entry'],
    src: emergencyLockoutImg.src
  },
  {
    icon: '🔧',
    title: 'Ignition Repair',
    desc: 'Professional ignition cylinder repair and replacement services for all vehicles.',
    features: ['Diagnosis', 'Repair', 'Full replacement'],
    src: ignitionRepairImg.src
  },
  {
    icon: '📱',
    title: 'Remote Key Fob',
    desc: 'Remote key fob programming, repair, and battery replacement services.',
    features: ['Programming', 'Battery swap', 'Shell replacement'],
    src: remoteKeyFobImg.src
  },
];

const brands = [
  { name: 'BMW', desc: 'Comfort access & digital keys', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg' },
  { name: 'Mercedes-Benz', desc: 'Smart keys & keyless go', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Logo.svg' },
  { name: 'Audi', desc: 'Advanced key systems', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/92/Audi-Logo_2016.svg' },
  { name: 'Volkswagen', desc: 'Transponder & remote keys', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6d/Volkswagen_logo_2019.svg' },
  { name: 'Toyota', desc: 'Smart keys & remotes', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Toyota.svg' },
  { name: 'Honda', desc: 'Key fobs & smart entry', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Honda_Logo.svg' },
  { name: 'Ford', desc: 'Intelligent access keys', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Ford_Motor_Company_Logo.svg' },
  { name: 'Nissan', desc: 'Intelligent keys', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/8c/Nissan_2020_logo.svg' },
  { name: 'Chevrolet', desc: 'Keyless entry systems', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/1f/Chevrolet_logo.svg' },
  { name: 'Hyundai', desc: 'Smart keys & proximity', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Hyundai_Motor_Company_logo.svg' },
  { name: 'Kia', desc: 'Smart key programming', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/13/Kia-logo.svg' },
  { name: 'Lexus', desc: 'Smart access keys', logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Lexus_division_emblem.svg' },
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
  {
    quote: "Absolutely spot on. Needed a spare key for my VW, got a very competitive quote, arrived first thing the next morning. Less than half an hour and all done. Key looks and works superb. Quick, great price & polite. Couldn’t ask for more.",
    name: "Nicholas Watkins",
    designation: "VW Owner",
    src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    quote: "Couldn’t have rang a better locksmith. Narcis answered the phone call straight away and arrived within the hour. He had great communication and knowledge and had my van unlocked within 30 minutes. Very nice and friendly guy, highly, highly recommend. Also very fair with his prices.",
    name: "Mathew Tait",
    designation: "Van Owner",
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    quote: "Car battery was dead and the manual lock wouldn't work. He came out within 2 hours and fixed it now problem. Even gave advise to stop it from happening again. Reasonably priced too, especially for a Sunday morning. Absolutely brilliant, thank you so much for you help. Couldn't recommend enough.",
    name: "Karen Berrey",
    designation: "Verified Customer",
    src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    quote: "He is very honest and sincere. I called him for my faulty Ford S-Max car key fob. He came at the given ETA. Fix the issue promptly. I will be happy to recommend him to anyone who needs his services.",
    name: "Harry Ade",
    designation: "Ford Owner",
    src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    quote: "Had a car key broken which I couldn't repair after battery replacement. Messaged company arrived at my home 30 mins later and repaired key. Happy with service and price. Recommended",
    name: "Ian The Monk",
    designation: "Local Guide",
    src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
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
              <h1 style={{
                fontSize: '4.5rem',
                marginBottom: '0.5rem',
                fontWeight: '800',
                lineHeight: 1.1,
                letterSpacing: '-2px',
                textShadow: '0 2px 10px rgba(0,0,0,0.1)'
              }}>
                FixCarKeys
              </h1>
              <div style={{
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
              <p style={{
                fontSize: '1.25rem',
                marginBottom: '2.5rem',
                opacity: 0.95,
                lineHeight: 1.7,
                maxWidth: '600px'
              }}>
                Lost your car keys? Need a spare? We provide fast, reliable car key cutting,
                programming, and replacement services for all vehicle makes and models.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
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
                paddingTop: '2rem',
                borderTop: '1px solid rgba(255,255,255,0.2)'
              }}>
                {[
                  { num: '24/7', label: 'Emergency Service' },
                  { num: '15+', label: 'Years Experience' },
                  { num: '100%', label: 'Satisfaction' }
                ].map((stat, i) => (
                  <div key={i}>
                    <div style={{ fontSize: '2rem', fontWeight: '700' }}>{stat.num}</div>
                    <div style={{ opacity: 0.85, fontSize: '0.9rem' }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}>
              <div style={{
                position: 'relative',
                width: '100%',
                maxWidth: '600px',
                filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.2))'
              }}>
                <Image src={carHero} alt="Luxury Car Key Service" priority style={{ width: '120%', height: 'auto', objectFit: 'contain' }} />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Services Section */}
      <section id="services" style={{ padding: '100px 0', backgroundColor: '#F1F3E0' }}>
        <div className="container">
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">Professional car key solutions tailored to your needs</p>
          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}>
            <FocusCards cards={services} />
          </div>
        </div>
      </section>

      {/* Car Brands Section */}
      <section id="car-brands" style={{
        padding: '60px 0',
        background: 'linear-gradient(135deg, #778873 0%, #A1BC98 50%, #D2DCB6 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative background elements */}
        <div style={{
          position: 'absolute',
          top: '-50%',
          left: '-10%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.05)',
          filter: 'blur(60px)'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-30%',
          right: '-5%',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.08)',
          filter: 'blur(40px)'
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <span style={{
              display: 'inline-block',
              backgroundColor: 'rgba(255,255,255,0.2)',
              backdropFilter: 'blur(10px)',
              color: 'white',
              padding: '6px 14px',
              borderRadius: '50px',
              fontSize: '0.75rem',
              fontWeight: '500',
              marginBottom: '0.75rem',
              border: '1px solid rgba(255,255,255,0.3)'
            }}>
              🚗 All Major Manufacturers
            </span>
            <h2 style={{
              fontSize: '2rem',
              color: 'white',
              marginBottom: '0.5rem',
              fontWeight: '700',
              letterSpacing: '-0.5px'
            }}>Car Brands We Service</h2>
            <p style={{
              color: 'rgba(255,255,255,0.9)',
              fontSize: '0.95rem',
              maxWidth: '400px',
              margin: '0 auto'
            }}>Expert key services for all major manufacturers</p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gap: '0.875rem'
          }}>
            {brands.map((brand, i) => (
              <div key={i} className="card" style={{
                backgroundColor: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(20px)',
                padding: '1rem 0.75rem',
                borderRadius: '12px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                border: '1px solid rgba(255,255,255,0.2)',
                textAlign: 'center',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}>
                {/* Gradient overlay on hover effect */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  background: 'linear-gradient(90deg, #778873, #A1BC98, #D2DCB6)',
                  borderRadius: '12px 12px 0 0'
                }} />

                {/* Logo container */}
                <div style={{
                  width: '48px',
                  height: '48px',
                  margin: '0 auto 0.6rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '10px',
                  padding: '8px',
                  transition: 'all 0.3s ease'
                }}>
                  <img
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                      objectFit: 'contain',
                      filter: 'grayscale(0%)',
                      transition: 'all 0.3s ease'
                    }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div style={{
                    display: 'none',
                    width: '100%',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.25rem',
                    fontWeight: '700',
                    color: '#778873',
                    background: 'linear-gradient(135deg, #778873, #A1BC98)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>
                    {brand.name.charAt(0)}
                  </div>
                </div>

                <h3 style={{
                  color: '#778873',
                  marginBottom: '0.2rem',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  letterSpacing: '-0.2px'
                }}>{brand.name}</h3>
                <p style={{
                  color: '#888',
                  fontSize: '0.7rem',
                  margin: 0,
                  lineHeight: 1.3
                }}>{brand.desc}</p>
              </div>
            ))}
          </div>

          {/* Bottom CTA - Inline */}
          <p style={{
            textAlign: 'center',
            marginTop: '1.5rem',
            color: 'rgba(255,255,255,0.95)',
            fontSize: '0.9rem'
          }}>
            Don't see your brand? <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollTo('#contact'); }}
              style={{
                color: 'white',
                fontWeight: '600',
                textDecoration: 'underline'
              }}
            >Contact us</a> — we service virtually all makes and models!
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


          <AnimatedTestimonials testimonials={reviews} />
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
