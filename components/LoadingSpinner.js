'use client';

import { useEffect, useState } from 'react';

export default function LoadingSpinner({
    text = "Loading...",
    variant = "default",
    size = "medium"
}) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Size configurations
    const sizes = {
        small: { spinner: 32, stroke: 3, text: '0.875rem' },
        medium: { spinner: 50, stroke: 4, text: '1rem' },
        large: { spinner: 70, stroke: 5, text: '1.125rem' }
    };

    const config = sizes[size] || sizes.medium;

    // Color variants
    const colorVariants = {
        default: {
            primary: '#778873',
            secondary: 'rgba(119, 136, 115, 0.2)',
            text: '#778873'
        },
        light: {
            primary: 'white',
            secondary: 'rgba(255, 255, 255, 0.2)',
            text: 'white'
        },
        dark: {
            primary: '#1a1f2e',
            secondary: 'rgba(26, 31, 46, 0.2)',
            text: '#1a1f2e'
        }
    };

    const colors = colorVariants[variant] || colorVariants.default;

    if (!mounted) {
        return null; // Prevent hydration mismatch
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '3rem',
            gap: '1.5rem'
        }}>
            {/* Animated Spinner Container */}
            <div style={{ position: 'relative', width: config.spinner, height: config.spinner }}>
                {/* Outer pulsing ring */}
                <div
                    className="loading-spinner-pulse"
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        width: config.spinner + 20,
                        height: config.spinner + 20,
                        borderRadius: '50%',
                        border: `2px solid ${colors.secondary}`,
                        marginLeft: -(config.spinner + 20) / 2,
                        marginTop: -(config.spinner + 20) / 2
                    }}
                />

                {/* Main rotating spinner */}
                <svg
                    className="loading-spinner-rotate"
                    width={config.spinner}
                    height={config.spinner}
                    viewBox="0 0 50 50"
                >
                    {/* Background circle */}
                    <circle
                        cx="25"
                        cy="25"
                        r="20"
                        fill="none"
                        stroke={colors.secondary}
                        strokeWidth={config.stroke}
                    />
                    {/* Animated arc */}
                    <circle
                        className="loading-spinner-dash"
                        cx="25"
                        cy="25"
                        r="20"
                        fill="none"
                        stroke={colors.primary}
                        strokeWidth={config.stroke}
                        strokeLinecap="round"
                        strokeDasharray="31.4 94.2"
                    />
                </svg>

                {/* Center dot */}
                <div
                    className="loading-spinner-dot"
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        width: 8,
                        height: 8,
                        backgroundColor: colors.primary,
                        borderRadius: '50%',
                        marginLeft: -4,
                        marginTop: -4
                    }}
                />
            </div>

            {/* Animated text */}
            <p
                className="loading-spinner-text"
                style={{
                    color: colors.text,
                    fontSize: config.text,
                    fontWeight: 500,
                    margin: 0
                }}
            >
                {text}
            </p>

            {/* CSS Animations - injected inline for reliability */}
            <style>{`
                @keyframes loading-spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                
                @keyframes loading-pulse {
                    0%, 100% { transform: scale(1); opacity: 0.5; }
                    50% { transform: scale(1.15); opacity: 0.2; }
                }
                
                @keyframes loading-dot-pulse {
                    0%, 100% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.4); opacity: 0.6; }
                }
                
                @keyframes loading-text-fade {
                    0%, 100% { opacity: 0.5; }
                    50% { opacity: 1; }
                }
                
                @keyframes loading-dash {
                    0% { stroke-dashoffset: 0; }
                    50% { stroke-dashoffset: -62.8; }
                    100% { stroke-dashoffset: -125.6; }
                }
                
                .loading-spinner-rotate {
                    animation: loading-spin 1s linear infinite !important;
                }
                
                .loading-spinner-pulse {
                    animation: loading-pulse 2s ease-in-out infinite !important;
                }
                
                .loading-spinner-dot {
                    animation: loading-dot-pulse 1s ease-in-out infinite !important;
                }
                
                .loading-spinner-text {
                    animation: loading-text-fade 1.5s ease-in-out infinite !important;
                }
                
                .loading-spinner-dash {
                    animation: loading-dash 1.5s ease-in-out infinite !important;
                }
            `}</style>
        </div>
    );
}

// Full page loading overlay
export function LoadingOverlay({ text = "Loading..." }) {
    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(8px)',
                zIndex: 9999
            }}
        >
            <LoadingSpinner text={text} size="large" />
        </div>
    );
}

// Skeleton loading for cards
export function LoadingSkeleton({ count = 3 }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            width: '100%'
        }}>
            {[...Array(count)].map((_, i) => (
                <div
                    key={i}
                    className="loading-skeleton-card"
                    style={{
                        backgroundColor: 'rgba(119, 136, 115, 0.1)',
                        borderRadius: '16px',
                        padding: '1.5rem',
                        height: '200px',
                        overflow: 'hidden'
                    }}
                >
                    <div
                        className="loading-skeleton-shimmer"
                        style={{
                            height: '100%',
                            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                            backgroundSize: '200% 100%'
                        }}
                    />
                </div>
            ))}
            <style>{`
                @keyframes shimmer {
                    0% { background-position: 200% 0; }
                    100% { background-position: -200% 0; }
                }
                .loading-skeleton-shimmer {
                    animation: shimmer 1.5s linear infinite !important;
                }
            `}</style>
        </div>
    );
}
