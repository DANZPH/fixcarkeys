'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import logo from '@/assets/logo_full.png';
import { Phone, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Determine visibility
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down & past 100px
        setIsVisible(false);
        setIsOpen(false); // Close menu when scrolling down
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

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/car-brands', label: 'Car Brands' },
    { href: '/areas', label: 'Areas' },
    { href: '/reviews', label: 'Reviews' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ];

  const isActive = (href) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
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
          <Link href="/" suppressHydrationWarning style={{
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <div style={{ position: 'relative', width: '40px', height: '40px' }}>
              <Image src={logo} alt="FixCarKeys Logo" fill style={{ objectFit: 'contain' }} />
            </div>
            <span className="brand-name" style={{ fontSize: '1.5rem', fontWeight: '700', color: '#F1F3E0' }}>FixCarKeys</span>
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="mobile-menu-btn"
            suppressHydrationWarning
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            style={{
              display: 'none',
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              color: '#F1F3E0',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '8px',
              width: '44px',
              height: '44px',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.3s ease'
            }}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop navigation */}
          <div className="nav-links" suppressHydrationWarning style={{
            display: 'flex',
            gap: '2rem',
            alignItems: 'center'
          }}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                suppressHydrationWarning
                style={{
                  color: '#F1F3E0',
                  textDecoration: 'none',
                  fontWeight: (hasMounted && isActive(link.href)) ? '700' : '500',
                  fontSize: '0.95rem',
                  padding: '0.5rem 0',
                  position: 'relative',
                  transition: 'opacity 0.3s ease',
                  cursor: 'pointer',
                  borderBottom: (hasMounted && isActive(link.href)) ? '2px solid #F1F3E0' : '2px solid transparent'
                }}
              >
                {link.label}
              </Link>
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
              <Phone size={18} />Call Now
            </a>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {isOpen && (
        <div
          suppressHydrationWarning
          onClick={() => setIsOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 998,
            backdropFilter: 'blur(4px)'
          }}
        />
      )}

      {/* Mobile menu */}
      <div
        suppressHydrationWarning
        style={{
          position: 'fixed',
          top: '70px',
          left: 0,
          right: 0,
          backgroundColor: '#778873',
          zIndex: 999,
          transform: isOpen ? 'translateY(0)' : 'translateY(-120%)',
          opacity: isOpen ? 1 : 0,
          transition: 'transform 0.3s ease, opacity 0.3s ease',
          boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
          maxHeight: 'calc(100vh - 70px)',
          overflowY: 'auto'
        }}
      >
        <div style={{
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem'
        }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              style={{
                color: '#F1F3E0',
                textDecoration: 'none',
                fontWeight: isActive(link.href) ? '700' : '500',
                padding: '1rem',
                cursor: 'pointer',
                fontSize: '1.1rem',
                backgroundColor: isActive(link.href) ? 'rgba(255,255,255,0.1)' : 'transparent',
                borderRadius: '10px',
                transition: 'background 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              {link.label}
              {(hasMounted && isActive(link.href)) && <span style={{ opacity: 0.7 }}>•</span>}
            </Link>
          ))}

          {/* Mobile call button */}
          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.15)',
            marginTop: '0.75rem',
            paddingTop: '1.25rem'
          }}>
            <a
              href="tel:07444125447"
              onClick={() => setIsOpen(false)}
              style={{
                backgroundColor: '#F1F3E0',
                color: '#778873',
                padding: '16px 20px',
                borderRadius: '12px',
                textDecoration: 'none',
                fontWeight: '700',
                fontSize: '1.1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
              }}
            >
              <Phone size={22} />
              Call Now - 07444 125447
            </a>
          </div>

          {/* WhatsApp button in mobile menu */}
          <a
            href="https://wa.me/447444125447"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            style={{
              backgroundColor: '#25D366',
              color: 'white',
              padding: '16px 20px',
              borderRadius: '12px',
              textDecoration: 'none',
              fontWeight: '700',
              fontSize: '1.1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              marginTop: '0.5rem'
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp Us
          </a>
        </div>
      </div>
    </>
  );
}
