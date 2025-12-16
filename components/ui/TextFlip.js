'use client';
import { useState, useEffect } from 'react';

export function TextFlip({ words, interval = 3000, className = '' }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipping, setIsFlipping] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setIsFlipping(true);
            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % words.length);
                setIsFlipping(false);
            }, 400);
        }, interval);

        return () => clearInterval(timer);
    }, [words.length, interval]);

    return (
        <span className={className} style={{ position: 'relative', display: 'inline-block' }}>
            <span
                style={{
                    display: 'inline-block',
                    transition: 'all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                    transform: isFlipping ? 'rotateX(90deg) translateY(-10px)' : 'rotateX(0) translateY(0)',
                    opacity: isFlipping ? 0 : 1,
                    transformOrigin: 'center bottom',
                }}
            >
                {words[currentIndex]}
            </span>
        </span>
    );
}

export function LayoutTextFlip({
    staticText = '',
    flipWords = [],
    interval = 2500,
    style = {}
}) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [animationPhase, setAnimationPhase] = useState('visible'); // visible, exit, enter

    useEffect(() => {
        const timer = setInterval(() => {
            setAnimationPhase('exit');
            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % flipWords.length);
                setAnimationPhase('enter');
                setTimeout(() => {
                    setAnimationPhase('visible');
                }, 50);
            }, 500);
        }, interval);

        return () => clearInterval(timer);
    }, [flipWords.length, interval]);

    const getTransformStyle = () => {
        switch (animationPhase) {
            case 'exit':
                return {
                    transform: 'perspective(400px) rotateX(-90deg)',
                    opacity: 0,
                    transition: 'all 0.5s cubic-bezier(0.55, 0.055, 0.675, 0.19)',
                };
            case 'enter':
                return {
                    transform: 'perspective(400px) rotateX(90deg)',
                    opacity: 0,
                    transition: 'none',
                };
            case 'visible':
            default:
                return {
                    transform: 'perspective(400px) rotateX(0deg)',
                    opacity: 1,
                    transition: 'all 0.5s cubic-bezier(0.215, 0.61, 0.355, 1)',
                };
        }
    };

    return (
        <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: '0.3em', ...style }}>
            {staticText && <span>{staticText}</span>}
            <span
                style={{
                    display: 'inline-block',
                    transformOrigin: 'center center',
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.1) 100%)',
                    padding: '0.1em 0.4em',
                    borderRadius: '12px',
                    ...getTransformStyle(),
                }}
            >
                {flipWords[currentIndex]}
            </span>
        </span>
    );
}
