'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { heroData } from '@/lib/hero-content';

export default function HeroSlideshow() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % heroData.length);
        }, 6000); // 6 seconds per slide

        return () => clearInterval(timer);
    }, []);

    const currentSlide = heroData[currentIndex];

    // Split title by periods for individual animations
    const titleParts = currentSlide.title.split('. ').map(s => s.replace('.', ''));

    return (
        <section className="relative h-screen w-full overflow-hidden bg-midnight">
            {/* Background Images */}
            <AnimatePresence mode="popLayout">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0 z-0"
                >
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url('/images/hero/${currentSlide.image}')` }}
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-midnight/60 via-midnight/40 to-midnight" />
                </motion.div>
            </AnimatePresence>

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 max-w-5xl mx-auto">

                {/* Fixed Header/Tagline */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-gold text-sm md:text-base font-bold uppercase tracking-[0.3em] mb-6"
                >
                    The Zoey Appleton Universe
                </motion.p>

                {/* Animated Dynamic Title */}
                <div className="flex flex-wrap justify-center gap-x-4 md:gap-x-6 mb-8">
                    <AnimatePresence mode="wait">
                        <div key={currentIndex} className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
                            {titleParts.map((part, i) => (
                                <motion.h1
                                    key={`${currentIndex}-${i}`}
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{
                                        duration: 0.8,
                                        delay: 0.2 + (i * 0.15),
                                        ease: [0.22, 1, 0.36, 1]
                                    }}
                                    className="text-6xl md:text-8xl font-serif font-bold text-white tracking-tight leading-none"
                                >
                                    {part}<span className="text-blood-rose">.</span>
                                </motion.h1>
                            ))}
                        </div>
                    </AnimatePresence>
                </div>

                {/* Subtitle */}
                <AnimatePresence mode="wait">
                    <motion.p
                        key={currentIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="text-xl md:text-2xl text-gray-300 font-light max-w-3xl mx-auto mb-12"
                    >
                        {currentSlide.subtitle}
                    </motion.p>
                </AnimatePresence>

                {/* Call to Actions - Fixed */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="flex flex-col sm:flex-row gap-6 justify-center"
                >
                    <Link
                        href="/books"
                        className="bg-blood-rose hover:bg-red-800 text-white px-10 py-4 rounded-sm uppercase tracking-widest text-sm font-bold transition-all duration-300 shadow-lg hover:shadow-blood-rose/20"
                    >
                        Start Reading
                    </Link>
                    <Link
                        href="/characters"
                        className="bg-transparent border border-gold text-gold hover:bg-gold hover:text-midnight px-10 py-4 rounded-sm uppercase tracking-widest text-sm font-bold transition-all duration-300"
                    >
                        Meet the Players
                    </Link>
                </motion.div>

                {/* Progress Indicators */}
                <div className="absolute bottom-12 flex gap-3">
                    {heroData.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={`h-1 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-8 bg-gold' : 'w-2 bg-gray-600 hover:bg-gray-400'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
