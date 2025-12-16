'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import logo from '@/assets/logo_full.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#services', label: 'Services' },
    { href: '#car-brands', label: 'Car Brands' },
    { href: '#areas', label: 'Areas' },
    { href: '#reviews', label: 'Reviews' },
    { href: '#blog', label: 'Blog' },
    { href: '#contact', label: 'Contact' },
  ];

  const scrollToSection = (e, href) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <nav style={{
      backgroundColor: scrolled ? 'rgba(119, 136, 115, 0.98)' : '#778873',
      padding: '0.75rem 0',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      backdropFilter: scrolled ? 'blur(10px)' : 'none',
      boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.1)' : 'none',
      transition: 'all 0.3s ease'
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <a href="#home" onClick={(e) => scrollToSection(e, '#home')} style={{
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <div style={{ position: 'relative', width: '40px', height: '40px' }}>
            <Image src={logo} alt="FixCarKeys Logo" fill style={{ objectFit: 'contain' }} />
          </div>
          <span style={{ fontSize: '1.5rem', fontWeight: '700', color: '#F1F3E0' }}>FixCarKeys</span>
        </a>

        <button onClick={() => setIsOpen(!isOpen)} className="mobile-menu-btn" style={{
          display: 'none',
          background: 'none',
          border: 'none',
          color: '#F1F3E0',
          fontSize: '1.5rem',
          cursor: 'pointer'
        }}>
          {isOpen ? '✕' : '☰'}
        </button>

        <div className="nav-links" style={{
          display: 'flex',
          gap: '2rem',
          alignItems: 'center'
        }}>
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={(e) => scrollToSection(e, link.href)} style={{
              color: '#F1F3E0',
              textDecoration: 'none',
              fontWeight: '500',
              fontSize: '0.95rem',
              padding: '0.5rem 0',
              position: 'relative',
              transition: 'opacity 0.3s ease'
            }}>
              {link.label}
            </a>
          ))}
          <a href="tel:07444125447" style={{
            backgroundColor: '#F1F3E0',
            color: '#778873',
            padding: '10px 20px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '0.9rem',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            📞 Call Now
          </a>
        </div>
      </div>

      {isOpen && (
        <div style={{
          backgroundColor: '#778873',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          borderTop: '1px solid rgba(255,255,255,0.1)'
        }}>
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={(e) => scrollToSection(e, link.href)} style={{
              color: '#F1F3E0',
              textDecoration: 'none',
              fontWeight: '500',
              padding: '0.5rem 0'
            }}>
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
