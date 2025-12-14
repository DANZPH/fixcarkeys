'use client';
import { useState } from 'react';
import Link from 'next/link';

const areas = [
  { name: 'Wigan', towns: ['Wigan Town Centre', 'Ashton-in-Makerfield', 'Leigh', 'Standish', 'Hindley', 'Ince', 'Pemberton', 'Orrell', 'Aspull', 'Golborne'] },
  { name: 'Warrington', towns: ['Warrington Town Centre', 'Lymm', 'Culcheth', 'Birchwood', 'Padgate', 'Woolston', 'Grappenhall', 'Stockton Heath', 'Great Sankey', 'Penketh'] },
  { name: 'Bolton', towns: ['Bolton Town Centre', 'Horwich', 'Farnworth', 'Westhoughton', 'Bromley Cross', 'Kearsley', 'Little Lever', 'Blackrod', 'Lostock', 'Astley Bridge'] },
  { name: 'Liverpool', towns: ['Liverpool City Centre', 'Anfield', 'Wavertree', 'Woolton', 'Crosby', 'Bootle', 'Walton', 'Allerton', 'Garston', 'Speke'] },
  { name: 'Manchester', towns: ['Manchester City Centre', 'Salford', 'Trafford', 'Didsbury', 'Chorlton', 'Stretford', 'Sale', 'Altrincham', 'Stockport', 'Oldham'] },
  { name: 'Stoke-on-Trent', towns: ['Hanley', 'Stoke', 'Burslem', 'Tunstall', 'Longton', 'Fenton', 'Newcastle-under-Lyme', 'Kidsgrove', 'Meir', 'Bentilee'] },
  { name: 'Chester & Ellesmere Port', towns: ['Chester City Centre', 'Ellesmere Port', 'Neston', 'Hoole', 'Blacon', 'Upton', 'Saltney', 'Christleton', 'Vicars Cross', 'Great Boughton'] },
  { name: 'Southport & Chorley', towns: ['Southport Town Centre', 'Chorley', 'Formby', 'Leyland', 'Ainsdale', 'Birkdale', 'Crossens', 'Marshside', 'Adlington', 'Coppull'] },
  { name: 'Skelmersdale & Ormskirk', towns: ['Skelmersdale', 'Ormskirk', 'Burscough', 'Aughton', 'Rainford', 'Bickerstaffe', 'Lathom', 'Scarisbrick', 'Halsall', 'Melling'] },
  { name: 'Preston', towns: ['Preston City Centre', 'Fulwood', 'Ribbleton', 'Ashton-on-Ribble', 'Penwortham', 'Bamber Bridge', 'Lostock Hall', 'Walton-le-Dale', 'Longridge', 'Grimsargh'] },
  { name: 'Blackburn & Burnley', towns: ['Blackburn', 'Burnley', 'Accrington', 'Darwen', 'Nelson', 'Colne', 'Clitheroe', 'Great Harwood', 'Padiham', 'Oswaldtwistle'] },
  { name: 'St Helens & Widnes', towns: ['St Helens', 'Widnes', 'Newton-le-Willows', 'Earlestown', 'Haydock', 'Rainhill', 'Eccleston', 'Billinge', 'Runcorn', 'Halewood'] },
];

export default function AreasPage() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <>
      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, #778873 0%, #A1BC98 100%)',
        padding: '80px 0 60px',
        color: 'white',
        textAlign: 'center'
      }}>
        <div className="container">
          <Link href="/#areas" style={{ color: '#D2DCB6', textDecoration: 'none', fontSize: '0.9rem' }}>
            ← Back to Home
          </Link>
          <h1 style={{ fontSize: '2.75rem', margin: '1rem 0', fontWeight: '700' }}>Areas We Cover</h1>
          <p style={{ opacity: 0.95, maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
            Professional car key services across the North West UK and surrounding areas
          </p>
        </div>
      </section>

      {/* Map Section */}
      <section style={{ padding: '60px 0', backgroundColor: '#D2DCB6' }}>
        <div className="container">
          <div style={{
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 4px 30px rgba(0,0,0,0.15)',
            height: '450px'
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
      </section>

      {/* Areas List */}
      <section style={{ padding: '60px 0', backgroundColor: '#F1F3E0' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', color: '#778873', fontSize: '2rem', marginBottom: '0.5rem' }}>
            Service Locations
          </h2>
          <p style={{ textAlign: 'center', color: '#666', marginBottom: '3rem' }}>
            Click on an area to see the towns we cover
          </p>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {areas.map((area, i) => (
              <div key={i} style={{
                backgroundColor: 'white',
                marginBottom: '0.75rem',
                borderRadius: '10px',
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
              }}>
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  style={{
                    width: '100%',
                    padding: '1.25rem 1.5rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: openIndex === i ? '#778873' : 'white',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    color: openIndex === i ? 'white' : '#778873',
                    textAlign: 'left',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <span>{area.name}</span>
                  <span style={{
                    transform: openIndex === i ? 'rotate(180deg)' : 'rotate(0)',
                    transition: 'transform 0.3s ease',
                    fontSize: '1.5rem'
                  }}>⌄</span>
                </button>
                {openIndex === i && (
                  <div style={{ padding: '1.5rem', backgroundColor: '#fafafa', borderTop: '1px solid #eee' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                      {area.towns.map((town, j) => (
                        <span key={j} style={{
                          backgroundColor: '#D2DCB6',
                          color: '#778873',
                          padding: '0.5rem 1rem',
                          borderRadius: '25px',
                          fontSize: '0.9rem',
                          fontWeight: '500'
                        }}>{town}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{
        padding: '60px 0',
        backgroundColor: '#A1BC98',
        textAlign: 'center',
        color: 'white'
      }}>
        <div className="container">
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Not Sure If We Cover Your Area?</h2>
          <p style={{ marginBottom: '2rem', opacity: 0.95, fontSize: '1.1rem' }}>
            Give us a call and we'll let you know if we can help!
          </p>
          <Link href="/#contact" style={{
            backgroundColor: '#F1F3E0',
            color: '#778873',
            padding: '14px 32px',
            borderRadius: '10px',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '1rem',
            display: 'inline-block'
          }}>Contact Us Today</Link>
        </div>
      </section>
    </>
  );
}
