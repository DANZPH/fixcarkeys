'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MapPin, X } from 'lucide-react';

export default function AreasClient({ initialAreas }) {
    const [openIndex, setOpenIndex] = useState(null);
    const [showMapModal, setShowMapModal] = useState(false);

    // Default areas as fallback
    const defaultAreas = [
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

    const areas = initialAreas && initialAreas.length > 0 ? initialAreas : defaultAreas;

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
                    }}>Areas We Cover</h1>
                    <p style={{
                        fontSize: '1.25rem',
                        opacity: 0.9,
                        maxWidth: '600px',
                        margin: '0 auto 2rem'
                    }}>Professional car key services across the North West UK and surrounding areas</p>

                    {/* View Map Button */}
                    <button
                        onClick={() => setShowMapModal(true)}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            backgroundColor: 'rgba(255,255,255,0.2)',
                            backdropFilter: 'blur(10px)',
                            color: 'white',
                            padding: '12px 24px',
                            borderRadius: '50px',
                            border: '1px solid rgba(255,255,255,0.3)',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            fontWeight: '600',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.3)';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)';
                            e.currentTarget.style.transform = 'translateY(0)';
                        }}
                    >
                        <MapPin size={20} />
                        View Service Area Map
                    </button>
                </div>
            </section>

            {/* Areas List */}
            <section style={{ padding: '80px 0', backgroundColor: '#F1F3E0' }}>
                <div className="container">
                    <h2 style={{ textAlign: 'center', color: '#778873', fontSize: '2.5rem', fontWeight: '700', marginBottom: '0.75rem' }}>
                        Service Locations
                    </h2>
                    <p style={{ textAlign: 'center', color: '#666', marginBottom: '3rem' }}>
                        Click on an area to see the towns we cover
                    </p>

                    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                        {areas.map((area, i) => (
                            <div key={area.id || i} style={{
                                backgroundColor: 'white',
                                marginBottom: '0.75rem',
                                borderRadius: '16px',
                                overflow: 'hidden',
                                boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
                                transition: 'box-shadow 0.3s ease'
                            }}>
                                <button
                                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                    style={{
                                        width: '100%',
                                        padding: '1.5rem 2rem',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        backgroundColor: openIndex === i ? '#778873' : 'white',
                                        border: 'none',
                                        cursor: 'pointer',
                                        fontSize: '1.15rem',
                                        fontWeight: '600',
                                        color: openIndex === i ? 'white' : '#778873',
                                        textAlign: 'left',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <span style={{ fontSize: '1.25rem' }}>📍</span>
                                        {area.name}
                                    </span>
                                    <span style={{
                                        transform: openIndex === i ? 'rotate(180deg)' : 'rotate(0)',
                                        transition: 'transform 0.3s ease',
                                        fontSize: '1.5rem'
                                    }}>⌄</span>
                                </button>
                                {openIndex === i && (
                                    <div style={{ padding: '1.5rem 2rem', backgroundColor: '#fafafa', borderTop: '1px solid #eee' }}>
                                        <ul style={{
                                            listStyle: 'none',
                                            padding: 0,
                                            margin: 0,
                                            display: 'grid',
                                            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                                            gap: '0.5rem'
                                        }}>
                                            {(area.towns || []).map((town, j) => (
                                                <li key={j} style={{
                                                    color: '#778873',
                                                    padding: '0.5rem 0',
                                                    fontSize: '0.95rem',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.5rem'
                                                }}>
                                                    <span style={{ color: '#A1BC98' }}>•</span>
                                                    <span>Autolocksmith in <strong>{town}</strong></span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section style={{
                padding: '80px 0',
                backgroundColor: '#778873',
                textAlign: 'center',
                color: 'white'
            }}>
                <div className="container">
                    <h2 style={{ fontSize: '2.25rem', fontWeight: '700', marginBottom: '1rem' }}>Not Sure If We Cover Your Area?</h2>
                    <p style={{ marginBottom: '2rem', opacity: 0.95, fontSize: '1.15rem', maxWidth: '500px', margin: '0 auto 2rem' }}>
                        Give us a call and we'll let you know if we can help!
                    </p>
                    <Link href="/contact" style={{
                        backgroundColor: '#F1F3E0',
                        color: '#778873',
                        padding: '16px 36px',
                        borderRadius: '12px',
                        textDecoration: 'none',
                        fontWeight: '700',
                        fontSize: '1.05rem',
                        display: 'inline-block'
                    }}>Contact Us Today →</Link>
                </div>
            </section>

            {/* Map Modal */}
            {showMapModal && (
                <div style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 9999,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '20px'
                }}>
                    {/* Backdrop */}
                    <div
                        onClick={() => setShowMapModal(false)}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            backgroundColor: 'rgba(0,0,0,0.7)',
                            backdropFilter: 'blur(5px)'
                        }}
                    />

                    {/* Modal Content */}
                    <div style={{
                        position: 'relative',
                        backgroundColor: 'white',
                        borderRadius: '24px',
                        width: '100%',
                        maxWidth: '900px',
                        maxHeight: '90vh',
                        overflow: 'hidden',
                        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)'
                    }}>
                        {/* Modal Header */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '1.25rem 1.5rem',
                            borderBottom: '1px solid #eee',
                            backgroundColor: '#778873',
                            color: 'white'
                        }}>
                            <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <MapPin size={22} />
                                Service Area Map
                            </h3>
                            <button
                                onClick={() => setShowMapModal(false)}
                                style={{
                                    background: 'rgba(255,255,255,0.2)',
                                    border: 'none',
                                    width: '36px',
                                    height: '36px',
                                    borderRadius: '50%',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    transition: 'background 0.3s ease'
                                }}
                                onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
                                onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Map */}
                        <div style={{ height: '500px', position: 'relative' }}>
                            <iframe
                                src="https://maps.google.com/maps?q=FixCarKeys%20North%20West%20UK&t=&z=9&ie=UTF8&iwloc=&output=embed"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                            <a
                                href="https://maps.app.goo.gl/wPajYwMJRGG5zvVp6"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    position: 'absolute',
                                    bottom: '20px',
                                    right: '20px',
                                    backgroundColor: 'white',
                                    color: '#778873',
                                    padding: '10px 20px',
                                    borderRadius: '50px',
                                    textDecoration: 'none',
                                    fontWeight: '600',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                    zIndex: 10,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    fontSize: '0.9rem'
                                }}
                            >
                                <MapPin size={16} />
                                Open in Google Maps
                            </a>
                        </div>

                        {/* Modal Footer */}
                        <div style={{
                            padding: '1rem 1.5rem',
                            backgroundColor: '#F1F3E0',
                            textAlign: 'center'
                        }}>
                            <p style={{ margin: 0, color: '#778873', fontSize: '0.9rem' }}>
                                We provide mobile auto locksmith services across the entire North West UK region
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
