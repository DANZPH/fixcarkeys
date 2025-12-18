'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Check if already logged in
        fetch('/api/auth/check')
            .then(res => res.json())
            .then(data => {
                if (data.authenticated) {
                    router.push('/admin/dashboard');
                }
            });
    }, [router]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();

            if (res.ok) {
                router.push('/admin/dashboard');
            } else {
                setError(data.error || 'Login failed');
            }
        } catch (err) {
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            display: 'flex',
            minHeight: '100vh',
            width: '100vw',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            backgroundColor: '#ffffff'
        }}>
            {/* Left Side - Branding (Hidden on mobile) */}
            <div className="hidden md:flex" style={{
                width: '50%',
                backgroundColor: '#1a1f2e',
                color: 'white',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '4rem 5rem',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    opacity: 0.1,
                    backgroundImage: 'radial-gradient(circle at 20% 50%, #778873 0%, transparent 50%)',
                    pointerEvents: 'none'
                }} />

                <div style={{ position: 'relative', zIndex: 10 }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        marginBottom: '2rem',
                        opacity: 0.8
                    }}>
                        <span style={{ fontSize: '2rem' }}>🔐</span>
                        <span style={{
                            fontSize: '1rem',
                            fontWeight: '700',
                            letterSpacing: '2px',
                            textTransform: 'uppercase'
                        }}>
                            Admin Portal
                        </span>
                    </div>

                    <h1 style={{
                        fontSize: '4rem',
                        fontWeight: '800',
                        lineHeight: '1.1',
                        marginBottom: '1.5rem',
                        color: '#ffffff'
                    }}>
                        Welcome<br />Back.
                    </h1>

                    <p style={{
                        fontSize: '1.25rem',
                        lineHeight: '1.6',
                        color: '#a0aec0',
                        maxWidth: '500px'
                    }}>
                        Sign in to access your dashboard, manage services, and update your site content securely.
                    </p>
                </div>

                <div style={{
                    marginTop: 'auto',
                    color: '#4a5568',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                }}>
                    <span style={{ width: '8px', height: '8px', backgroundColor: '#48bb78', borderRadius: '50%' }}></span>
                    System Operational
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'white',
                padding: '2rem'
            }}>
                <div style={{ width: '100%', maxWidth: '480px' }}>

                    <div style={{ marginBottom: '3rem' }}>
                        <h2 style={{
                            fontSize: '2.5rem',
                            fontWeight: '700',
                            color: '#1a202c',
                            marginBottom: '0.5rem'
                        }}>
                            Sign In
                        </h2>
                        <p style={{ fontSize: '1.1rem', color: '#718096' }}>
                            Enter your credentials to continue.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        {error && (
                            <div style={{
                                padding: '1rem',
                                backgroundColor: '#fff5f5',
                                borderLeft: '4px solid #f56565',
                                color: '#c53030',
                                borderRadius: '4px',
                                fontSize: '0.95rem',
                                fontWeight: '500'
                            }}>
                                {error}
                            </div>
                        )}

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{
                                fontSize: '0.9rem',
                                fontWeight: '600',
                                color: '#4a5568',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px'
                            }}>
                                Username
                            </label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                placeholder="Enter your username"
                                style={{
                                    padding: '1.25rem',
                                    fontSize: '1.1rem',
                                    borderRadius: '12px',
                                    border: '2px solid #e2e8f0',
                                    backgroundColor: '#f8fafc',
                                    outline: 'none',
                                    transition: 'border-color 0.2s',
                                    width: '100%',
                                    boxSizing: 'border-box'
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = '#1a1f2e';
                                    e.target.style.backgroundColor = '#fff';
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = '#e2e8f0';
                                    e.target.style.backgroundColor = '#f8fafc';
                                }}
                            />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <label style={{
                                    fontSize: '0.9rem',
                                    fontWeight: '600',
                                    color: '#4a5568',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px'
                                }}>
                                    Password
                                </label>
                            </div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="Enter your password"
                                style={{
                                    padding: '1.25rem',
                                    fontSize: '1.1rem',
                                    borderRadius: '12px',
                                    border: '2px solid #e2e8f0',
                                    backgroundColor: '#f8fafc',
                                    outline: 'none',
                                    transition: 'border-color 0.2s',
                                    width: '100%',
                                    boxSizing: 'border-box'
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = '#1a1f2e';
                                    e.target.style.backgroundColor = '#fff';
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = '#e2e8f0';
                                    e.target.style.backgroundColor = '#f8fafc';
                                }}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                marginTop: '1rem',
                                padding: '1.25rem',
                                backgroundColor: '#1a1f2e',
                                color: 'white',
                                fontSize: '1.1rem',
                                fontWeight: '700',
                                borderRadius: '12px',
                                border: 'none',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                opacity: loading ? 0.7 : 1,
                                transition: 'background-color 0.2s, transform 0.1s',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                            }}
                            onMouseOver={(e) => !loading && (e.currentTarget.style.backgroundColor = '#2d3748')}
                            onMouseOut={(e) => !loading && (e.currentTarget.style.backgroundColor = '#1a1f2e')}
                            onMouseDown={(e) => !loading && (e.currentTarget.style.transform = 'scale(0.98)')}
                            onMouseUp={(e) => !loading && (e.currentTarget.style.transform = 'scale(1)')}
                        >
                            {loading ? 'Signing In...' : 'Sign In To Dashboard'}
                        </button>
                    </form>

                    <div style={{ marginTop: '3rem', textAlign: 'center' }}>
                        <a
                            href="/"
                            style={{
                                color: '#718096',
                                textDecoration: 'none',
                                fontSize: '0.95rem',
                                fontWeight: '500',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                transition: 'color 0.2s'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.color = '#1a1f2e'}
                            onMouseOut={(e) => e.currentTarget.style.color = '#718096'}
                        >
                            <span>←</span> Back to Website
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
