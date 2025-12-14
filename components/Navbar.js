'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/car-brands', label: 'Car Brands' },
    { href: '/areas', label: 'Areas We Cover' },
    { href: '/reviews', label: 'Reviews' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav style={{
      backgroundColor: '#778873',
      padding: '1rem 0',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Link href="/" style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: '#F1F3E0',
          textDecoration: 'none'
        }}>
          🔑 FixCarKeys
        </Link>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            color: '#F1F3E0',
            fontSize: '1.5rem',
            cursor: 'pointer'
          }}
          className="mobile-menu-btn"
        >
          ☰
        </button>

        {/* Desktop Navigation */}
        <div style={{
          display: 'flex',
          gap: '1.5rem',
          alignItems: 'center'
        }} className="nav-links">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                color: '#F1F3E0',
                textDecoration: 'none',
                fontWeight: '500',
                transition: 'color 0.3s ease'
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div style={{
          backgroundColor: '#778873',
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              style={{
                color: '#F1F3E0',
                textDecoration: 'none',
                fontWeight: '500'
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}

    </nav>
  );
}
