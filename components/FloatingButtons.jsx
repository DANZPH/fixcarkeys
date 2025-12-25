'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone } from 'lucide-react';
import { IconBrandWhatsapp } from '@tabler/icons-react';

export default function FloatingButtons() {
    const [isHovered, setIsHovered] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);

    useEffect(() => {
        // Show tooltip initially after 2 seconds
        const initialTimer = setTimeout(() => {
            setShowTooltip(true);
        }, 2000);

        // Hide it after 5 seconds of being shown
        const hideTimer = setTimeout(() => {
            setShowTooltip(false);
        }, 7000);

        // Then pulse it every 10 seconds
        const interval = setInterval(() => {
            setShowTooltip(true);
            setTimeout(() => setShowTooltip(false), 4000);
        }, 14000);

        return () => {
            clearTimeout(initialTimer);
            clearTimeout(hideTimer);
            clearInterval(interval);
        };
    }, []);

    return (
        <>
            {/* WhatsApp Button - Left */}
            <motion.a
                href="https://wa.me/447444125447"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-4 left-4 z-50 flex h-14 w-14 items-center justify-center rounded-full border-2 border-white bg-[#25D366] text-white shadow-lg transition-colors hover:bg-[#20bd5a]"
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                    scale: 1,
                    opacity: 1,
                    boxShadow: [
                        "0 0 0 0 rgba(37, 211, 102, 0.4)",
                        "0 0 0 10px rgba(37, 211, 102, 0)",
                        "0 0 0 0 rgba(37, 211, 102, 0)"
                    ]
                }}
                transition={{
                    scale: { duration: 0.2 },
                    boxShadow: {
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "loop"
                    }
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title="Chat on WhatsApp"
            >
                <IconBrandWhatsapp className="h-8 w-8" stroke={2} />
            </motion.a>

            {/* Call Button - Right */}
            <div className="fixed bottom-4 right-4 z-50 flex flex-row-reverse items-center gap-3">
                <motion.a
                    href="tel:07444125447"
                    className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-white bg-[#DC2626] text-white shadow-lg transition-colors hover:bg-[#B91C1C]"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                        scale: 1,
                        opacity: 1,
                        boxShadow: [
                            "0 0 0 0 rgba(220, 38, 38, 0.4)",
                            "0 0 0 10px rgba(220, 38, 38, 0)",
                            "0 0 0 0 rgba(220, 38, 38, 0)"
                        ]
                    }}
                    transition={{
                        scale: { duration: 0.2 },
                        boxShadow: {
                            duration: 2,
                            repeat: Infinity,
                            repeatType: "loop"
                        }
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onHoverStart={() => setIsHovered(true)}
                    onHoverEnd={() => setIsHovered(false)}
                >
                    <Phone className="h-6 w-6" />
                </motion.a>

                <AnimatePresence>
                    {(isHovered || showTooltip) && (
                        <motion.div
                            initial={{ x: 20, opacity: 0, scale: 0.9 }}
                            animate={{ x: 0, opacity: 1, scale: 1 }}
                            exit={{ x: 10, opacity: 0, scale: 0.9 }}
                            className="pointer-events-none whitespace-nowrap rounded-lg bg-white px-3 py-1.5 text-sm font-bold text-gray-800 shadow-xl"
                        >
                            Call Now
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
}
