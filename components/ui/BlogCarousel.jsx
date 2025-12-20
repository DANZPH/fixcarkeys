'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconArrowLeft, IconArrowRight, IconCalendar, IconUser, IconMessageCircle } from '@tabler/icons-react';
import Link from 'next/link';

export const BlogCarousel = ({ posts }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(3);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    // Responsive items per page
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setItemsPerPage(1);
            } else if (window.innerWidth < 1024) {
                setItemsPerPage(2);
            } else {
                setItemsPerPage(3);
            }
        };

        handleResize(); // Init
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const totalPages = Math.max(1, posts.length - (itemsPerPage - 1));

    const nextSlide = () => {
        if (currentIndex < posts.length - itemsPerPage) {
            setCurrentIndex(prev => prev + 1);
        } else {
            // Optional: loop back to start
            setCurrentIndex(0);
        }
    };

    const prevSlide = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        } else {
            // Optional: loop to end
            setCurrentIndex(posts.length - itemsPerPage);
        }
    };

    const handleTouchStart = (e) => {
        touchStartX.current = e.targetTouches[0].clientX;
    };

    const handleTouchMove = (e) => {
        touchEndX.current = e.targetTouches[0].clientX;
    };

    const handleTouchEnd = () => {
        if (!touchStartX.current || !touchEndX.current) return;
        const distance = touchStartX.current - touchEndX.current;

        if (distance > 50) {
            nextSlide();
        } else if (distance < -50) {
            prevSlide();
        }

        // Reset
        touchStartX.current = 0;
        touchEndX.current = 0;
    };

    return (
        <div className="relative w-full max-w-7xl mx-auto px-4 py-8" suppressHydrationWarning>

            {/* Cards Container */}
            <div
                className="overflow-hidden py-10 -mx-4 px-4" // Added vertical padding for shadows, negative margin to offset horizontal padding
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                suppressHydrationWarning
            >
                <motion.div
                    className="flex"
                    initial={false}
                    animate={{ x: `-${(currentIndex * 100) / posts.length}%` }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    style={{
                        width: `${(posts.length / itemsPerPage) * 100}%`,
                        display: 'flex',
                    }}
                    suppressHydrationWarning
                >
                    {posts.map((post, index) => (
                        <div
                            key={index}
                            className="relative px-3 flex-shrink-0 h-auto" // Added flex-shrink-0
                            style={{
                                width: `${100 / posts.length}%`,
                            }}
                            suppressHydrationWarning
                        >
                            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col border border-gray-100 hover:-translate-y-1">
                                {/* Image Placeholder or Actual Image */}
                                <div style={{
                                    backgroundColor: '#F1F3E0',
                                    height: '200px', // Increased height
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '3rem',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}>
                                    {post.image_url ? (
                                        <img
                                            src={post.image_url}
                                            alt={post.title}
                                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                            suppressHydrationWarning
                                        />
                                    ) : (
                                        <span>🔑</span>
                                    )}
                                    <span style={{
                                        position: 'absolute',
                                        top: '1rem',
                                        left: '1rem',
                                        backgroundColor: '#778873',
                                        color: 'white',
                                        padding: '4px 12px',
                                        borderRadius: '20px',
                                        fontSize: '0.75rem',
                                        fontWeight: '600',
                                        zIndex: 10,
                                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                    }}>{post.category}</span>
                                </div>

                                <div className="p-6 flex flex-col flex-grow">

                                    <h3 className="text-xl font-bold text-[#778873] mb-3 line-clamp-2 leading-tight min-h-[3rem]">
                                        {post.title}
                                    </h3>

                                    <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                                        <div className="flex items-center gap-1">
                                            <IconUser size={14} />
                                            <span>admin</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <IconCalendar size={14} />
                                            <span>Apr 16, 2025</span>
                                        </div>
                                    </div>

                                    <p className="text-gray-600 text-sm mb-6 flex-grow line-clamp-3 leading-relaxed">
                                        {post.excerpt}
                                    </p>

                                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                                        <Link href={`/blog/${post.id}`} className="relative z-10 bg-[#0056b3] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#004494] transition-colors flex items-center gap-2" suppressHydrationWarning>
                                            Read More <IconArrowRight size={16} suppressHydrationWarning />
                                        </Link>
                                        <div className="flex items-center gap-1 text-gray-400 text-xs" suppressHydrationWarning>
                                            <IconMessageCircle size={16} suppressHydrationWarning />
                                            <span>0</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-center gap-4 mt-8">
                <button
                    onClick={prevSlide}
                    className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-[#778873] hover:bg-[#778873] hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={currentIndex === 0}
                    suppressHydrationWarning
                >
                    <IconArrowLeft size={20} />
                </button>

                {/* Dots */}
                <div className="flex gap-2 items-center">
                    {Array.from({ length: posts.length - (itemsPerPage - 1) }).map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={`transition-all duration-300 rounded-full ${currentIndex === idx ? 'w-6 h-2 bg-[#778873]' : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'}`}
                        />
                    ))}
                </div>

                <button
                    onClick={nextSlide}
                    className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-[#778873] hover:bg-[#778873] hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={currentIndex >= posts.length - itemsPerPage}
                    suppressHydrationWarning
                >
                    <IconArrowRight size={20} />
                </button>
            </div>
        </div>
    );
};
