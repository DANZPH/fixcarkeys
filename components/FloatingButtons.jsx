'use client';

import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';
import { IconBrandWhatsapp } from '@tabler/icons-react';

export default function FloatingButtons() {
    return (
        <>
            {/* WhatsApp Button - Left */}
            <motion.a
                href="https://wa.me/447444125447"
                target="_blank"
                rel="noopener noreferrer"
                className="floating-btn fixed bottom-6 left-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-colors hover:bg-[#20bd5a]"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title="Chat on WhatsApp"
            >
                <IconBrandWhatsapp className="h-8 w-8" stroke={2} />
            </motion.a>

            {/* Call Button - Right */}
            <motion.a
                href="tel:07444125447"
                className="floating-btn fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full border-2 border-white bg-[#778873] text-[#F1F3E0] shadow-lg transition-colors hover:bg-[#667762]"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title="Call Now"
            >
                <Phone className="h-6 w-6" />
            </motion.a>
        </>
    );
}
