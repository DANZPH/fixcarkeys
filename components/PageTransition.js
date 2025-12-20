'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

const pageVariants = {
    initial: {
        x: '100%',
        opacity: 0,
    },
    enter: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94], // Custom easing for smooth feel
        },
    },
    exit: {
        x: '-100%',
        opacity: 0,
        transition: {
            duration: 0.4,
            ease: [0.55, 0.06, 0.68, 0.19],
        },
    },
};

export default function PageTransition({ children }) {
    const pathname = usePathname();

    return (
        <AnimatePresence mode="wait" initial={false}>
            <motion.div
                key={pathname}
                initial="initial"
                animate="enter"
                exit="exit"
                variants={pageVariants}
                style={{
                    width: '100%',
                    minHeight: '100vh',
                    position: 'relative',
                }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
