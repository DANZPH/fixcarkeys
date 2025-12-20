'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import logo from '@/assets/logo_full.png';
import { Phone } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Determine visibility
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down & past 100px
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }

      setScrolled(currentScrollY > 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#services', label: 'Services' },
    { href: '#car-brands', label: 'Car Brands' },
    { href: '#areas', label: 'Areas' },
    { href: '#reviews', label: 'Reviews' },
    { href: '#blog', label: 'Blog' },
    { href: '#contact', label: 'Contact' },
  ];

  const handleNavigation = (e, href) => {
    e.preventDefault();
    setIsOpen(false);

    if (pathname === '/') {
      // If we are on the homepage, scroll smoothly
      const sectionId = href.replace('#', '');
      if (sectionId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If we are not on the homepage, navigate to the homepage with the hash
      router.push(`/${href}`);
    }
  };

  return (
    <nav suppressHydrationWarning style={{
      backgroundColor: scrolled ? 'rgba(119, 136, 115, 0.98)' : '#778873',
      padding: '0.75rem 0',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      backdropFilter: scrolled ? 'blur(10px)' : 'none',
      boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.1)' : 'none',
      transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
      transition: 'transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease'
    }}>
      <div className="container" suppressHydrationWarning style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <a href="#home" onClick={(e) => handleNavigation(e, '#home')} suppressHydrationWarning style={{
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

        <button onClick={() => setIsOpen(!isOpen)} className="mobile-menu-btn" suppressHydrationWarning style={{
          display: 'none',
          background: 'none',
          border: 'none',
          color: '#F1F3E0',
          fontSize: '1.5rem',
          cursor: 'pointer'
        }}>
          {isOpen ? '✕' : '☰'}
        </button>

        <div className="nav-links" suppressHydrationWarning style={{
          display: 'flex',
          gap: '2rem',
          alignItems: 'center'
        }}>
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={(e) => handleNavigation(e, link.href)} suppressHydrationWarning style={{
              color: '#F1F3E0',
              textDecoration: 'none',
              fontWeight: '500',
              fontSize: '0.95rem',
              padding: '0.5rem 0',
              position: 'relative',
              transition: 'opacity 0.3s ease',
              cursor: 'pointer'
            }}>
              {link.label}
            </a>
          ))}
          <a href="tel:07444125447" suppressHydrationWarning style={{
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
            <Phone size={18} /> Call Now
          </a>
        </div>
      </div>

      {isOpen && (
        <div suppressHydrationWarning style={{
          backgroundColor: '#778873',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          borderTop: '1px solid rgba(255,255,255,0.1)'
        }}>
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={(e) => handleNavigation(e, link.href)} style={{
              color: '#F1F3E0',
              textDecoration: 'none',
              fontWeight: '500',
              padding: '0.5rem 0',
              cursor: 'pointer'
            }}>
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
