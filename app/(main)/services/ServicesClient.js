'use client';

import { useState } from 'react';
import { FocusCards } from "@/components/ui/focus-cards";

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

export default function ServicesClient({ initialServices }) {
    const [services] = useState(initialServices || []);

    // Process services for FocusCards
    const processedServices = services.map(service => ({
        ...service,
        src: service.image_url || defaultServiceImages[service.title] || keyCuttingImg.src,
        desc: service.description,
    }));

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
                    }}>Our Services</h1>
                    <p style={{
                        fontSize: '1.25rem',
                        opacity: 0.9,
                        maxWidth: '600px',
                        margin: '0 auto'
                    }}>Professional car key solutions tailored to your needs</p>
                </div>
            </section>

            {/* Services Section */}
            <section style={{ padding: '100px 0', backgroundColor: '#F1F3E0' }}>
                <div className="container">
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <FocusCards cards={processedServices} />
                    </div>

                    {/* Additional Information */}
                    <div style={{
                        marginTop: '4rem',
                        backgroundColor: 'white',
                        borderRadius: '20px',
                        padding: '3rem',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
                    }}>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                            gap: '2rem'
                        }}>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{
                                    width: '60px',
                                    height: '60px',
                                    backgroundColor: '#D2DCB6',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '1.5rem',
                                    margin: '0 auto 1rem'
                                }}>🚗</div>
                                <h3 style={{ color: '#778873', marginBottom: '0.5rem' }}>All Makes & Models</h3>
                                <p style={{ color: '#666', fontSize: '0.95rem' }}>We service virtually every car brand on the road today.</p>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{
                                    width: '60px',
                                    height: '60px',
                                    backgroundColor: '#D2DCB6',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '1.5rem',
                                    margin: '0 auto 1rem'
                                }}>⚡</div>
                                <h3 style={{ color: '#778873', marginBottom: '0.5rem' }}>Fast Response</h3>
                                <p style={{ color: '#666', fontSize: '0.95rem' }}>Mobile service - we come to you within 30-60 minutes.</p>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{
                                    width: '60px',
                                    height: '60px',
                                    backgroundColor: '#D2DCB6',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '1.5rem',
                                    margin: '0 auto 1rem'
                                }}>✓</div>
                                <h3 style={{ color: '#778873', marginBottom: '0.5rem' }}>Guaranteed Work</h3>
                                <p style={{ color: '#666', fontSize: '0.95rem' }}>All our work comes with a satisfaction guarantee.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
