'use client';

import React, { useEffect, useState } from 'react';

export const LogoMarquee = ({ items, speed = 40, direction = 'left', pauseOnHover = true }) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return <div className="h-[140px] w-full" />; // Placeholder for SSR
    }

    // To make a seamless loop with translateX(-50%), we need exactly two sets of items (or multiples)
    const duplicateItems = [...items, ...items];

    const animationName = direction === 'left' ? `marquee-left-${speed}` : `marquee-right-${speed}`;

    return (
        <div className="relative w-full overflow-hidden py-4" style={{ maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)' }}>
            <style>
                {`
                @keyframes marquee-left-${speed} {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                @keyframes marquee-right-${speed} {
                    0% { transform: translateX(-50%); }
                    100% { transform: translateX(0); }
                }
                .marquee-content-${direction}-${speed} {
                    display: flex;
                    gap: 1.5rem;
                    width: max-content;
                    animation: ${animationName} ${speed}s linear infinite;
                    will-change: transform;
                }
                .marquee-content-${direction}-${speed}:hover {
                    animation-play-state: ${pauseOnHover ? 'paused' : 'running'};
                }
                `}
            </style>

            <div className={`marquee-content-${direction}-${speed}`}>
                {duplicateItems.map((brand, idx) => (
                    <div
                        key={`${brand.name}-${idx}`}
                        className="flex flex-col items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 min-w-[140px] h-[120px] shadow-lg hover:bg-white/20 transition-all duration-300 group"
                    >
                        <div className="w-14 h-14 mb-2 flex items-center justify-center bg-white rounded-md p-2 group-hover:scale-110 transition-transform duration-300 shadow-sm relative overflow-hidden">
                            <img
                                src={brand.logo}
                                alt={brand.name}
                                className="max-w-full max-h-full object-contain"
                                loading="lazy"
                                width={56}
                                height={56}
                                decoding="async"
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                    const fallback = e.currentTarget.parentElement?.querySelector('.fallback-initial');
                                    if (fallback) fallback.style.display = 'flex';
                                }}
                            />
                            <div className="fallback-initial hidden absolute inset-0 items-center justify-center text-xl font-bold bg-gradient-to-br from-[#778873] to-[#A1BC98] bg-clip-text text-transparent">
                                {brand.name.charAt(0)}
                            </div>
                        </div>
                        <span className="text-white font-semibold text-xs tracking-wide">{brand.name}</span>
                        <span className="text-white/60 text-[9px] mt-1 text-center line-clamp-1">{brand.desc}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
