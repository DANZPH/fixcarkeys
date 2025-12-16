'use client';
import { useState, useEffect, useRef } from 'react';

export function AnimatedCounter({
    end,
    duration = 2000,
    prefix = '',
    suffix = '',
    style = {}
}) {
    const [count, setCount] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasStarted) {
                    setHasStarted(true);
                }
            },
            { threshold: 0.3 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [hasStarted]);

    useEffect(() => {
        if (!hasStarted) return;

        let startTime;
        let animationFrame;

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);

            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);

            setCount(Math.floor(easeOutQuart * end));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => {
            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
            }
        };
    }, [hasStarted, end, duration]);

    return (
        <span ref={ref} style={{ fontVariantNumeric: 'tabular-nums', ...style }}>
            {prefix}{count}{suffix}
        </span>
    );
}

export function StatCounter({
    value,
    label,
    duration = 2000,
    containerStyle = {},
    valueStyle = {},
    labelStyle = {}
}) {
    // Parse the value to extract number and suffix
    const parseValue = (val) => {
        const match = val.match(/^(\d+)(.*)$/);
        if (match) {
            return { num: parseInt(match[1], 10), suffix: match[2] };
        }
        return { num: 0, suffix: val };
    };

    const { num, suffix } = parseValue(value);

    return (
        <div style={containerStyle}>
            <div style={{ fontSize: '2rem', fontWeight: '700', ...valueStyle }}>
                <AnimatedCounter end={num} duration={duration} suffix={suffix} />
            </div>
            <div style={{ opacity: 0.85, fontSize: '0.9rem', ...labelStyle }}>{label}</div>
        </div>
    );
}
