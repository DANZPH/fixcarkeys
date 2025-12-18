'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import logo from '@/assets/logo_full.png';
import { Phone, MessageCircle } from 'lucide-react';

export default function Footer() {
  const [settings, setSettings] = useState({});
  const scrollTo = (id) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then(data => setSettings(data.settings || {}))
      .catch(err => console.error('Footer settings fetch error:', err));
  }, []);

  const phoneNumber = settings.phone_number || '07444 125447';
  const whatsappNumber = settings.whatsapp_number || '447444125447';
  const email = settings.email || 'info@fixcarkeys.co.uk';
  const facebookUrl = settings.facebook_url || 'https://www.facebook.com/profile.php?id=61557261796916';
  const instagramUrl = settings.instagram_url || 'https://www.instagram.com/fixcarkeys';
  const tiktokUrl = settings.tiktok_url || 'https://tiktok.com/@FixCarKeys';

  return (
    <footer suppressHydrationWarning style={{
      backgroundColor: '#778873',
      color: '#F1F3E0',
      padding: '60px 0 30px'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: '3rem',
          marginBottom: '3rem'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <div style={{ position: 'relative', width: '32px', height: '32px' }}>
                <Image src={logo} alt="FixCarKeys Logo" fill style={{ objectFit: 'contain' }} />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700', margin: 0 }}>FixCarKeys</h3>
            </div>
            <p style={{ opacity: 0.9, lineHeight: 1.7, maxWidth: '300px' }}>
              Professional car key services for all makes and models. Fast, reliable, and affordable solutions.
            </p>
          </div>
          <div>
            <h4 style={{ marginBottom: '1.25rem', fontWeight: '600' }}>Quick Links</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {['Services', 'Car Brands', 'Areas', 'Reviews'].map((link) => (
                <a key={link} href={`#${link.toLowerCase().replace(' ', '-')}`}
                  onClick={(e) => { e.preventDefault(); scrollTo(`#${link.toLowerCase().replace(' ', '-')}`); }}
                  style={{ color: '#D2DCB6', textDecoration: 'none', fontSize: '0.95rem' }}>
                  {link}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 style={{ marginBottom: '1.25rem', fontWeight: '600' }}>Services</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', opacity: 0.9, fontSize: '0.95rem' }}>
              <span>Key Cutting</span>
              <span>Key Programming</span>
              <span>Key Replacement</span>
              <span>Emergency Lockout</span>
            </div>
          </div>
          <div>
            <h4 style={{ marginBottom: '1.25rem', fontWeight: '600' }}>Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', opacity: 0.9, fontSize: '0.95rem' }}>
              <a href={`tel:${phoneNumber.replace(/\s/g, '')}`} style={{ color: '#D2DCB6', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Phone size={16} /> {phoneNumber}
              </a>
              <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" style={{ color: '#D2DCB6', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MessageCircle size={16} /> WhatsApp
              </a>
            </div>
            <h4 style={{ marginTop: '1.5rem', marginBottom: '1rem', fontWeight: '600' }}>Follow Us</h4>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href={facebookUrl} target="_blank" rel="noopener noreferrer" style={{
                color: '#F1F3E0',
                fontSize: '1.5rem',
                transition: 'opacity 0.3s ease'
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
              </a>
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer" style={{
                color: '#F1F3E0',
                fontSize: '1.5rem',
                transition: 'opacity 0.3s ease'
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
              </a>
              <a href={tiktokUrl} target="_blank" rel="noopener noreferrer" style={{
                color: '#F1F3E0',
                fontSize: '1.5rem',
                transition: 'opacity 0.3s ease'
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" /></svg>
              </a>
              <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" style={{
                color: '#F1F3E0',
                fontSize: '1.5rem',
                transition: 'opacity 0.3s ease'
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              </a>
            </div>
          </div>
        </div>
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.15)',
          paddingTop: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          opacity: 0.8,
          fontSize: '0.9rem'
        }}>
          <p>© 2024 FixCarKeys. All rights reserved.</p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            Mobile Auto Locksmith - UK
            <img
              src="https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg"
              alt="UK Flag"
              style={{ width: '20px', height: 'auto', borderRadius: '2px', display: 'inline-block' }}
            />
          </p>
        </div>
      </div>
    </footer>
  );
}
