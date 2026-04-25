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
                    transition={{ duration: 2 }}
                    className="absolute inset-0 z-0"
                >
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url('/images/hero/${currentSlide.image}')` }}
                    />
                    {/* Overlay: Multi-layer gradient for depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
                    <div className="absolute inset-0 bg-black/40 backdrop-brightness-75" />
                </motion.div>
            </AnimatePresence>

            {/* Content Container */}
            <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 max-w-7xl mx-auto">
                <div className="glass-dark p-8 md:p-10 rounded-[2rem] border-white/5 relative overflow-hidden group max-w-5xl w-full mx-auto">
                    {/* Animated Decorative Corners */}
                    <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-gold/30 rounded-tl-[2rem] transition-all duration-700 group-hover:w-24 group-hover:h-24 group-hover:border-gold"></div>
                    <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-gold/30 rounded-br-[2rem] transition-all duration-700 group-hover:w-24 group-hover:h-24 group-hover:border-gold"></div>

                    {/* Fixed Header/Tagline */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="mb-8"
                    >
                        <span className="px-6 py-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full text-gold text-xs md:text-sm font-bold uppercase tracking-[0.5em] shadow-2xl">
                            The Zoey Appleton Universe
                        </span>
                    </motion.div>

                    {/* Animated Dynamic Title */}
                    <div className="flex flex-wrap justify-center mb-8">
                        <AnimatePresence mode="wait">
                            <div key={currentIndex} className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
                                {titleParts.map((part, i) => (
                                    <motion.h1
                                        key={`${currentIndex}-${i}`}
                                        initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                        exit={{ opacity: 0, y: -20, filter: "blur(5px)" }}
                                        transition={{
                                            duration: 1,
                                            delay: 0.2 + (i * 0.2),
                                            ease: [0.22, 1, 0.36, 1]
                                        }}
                                        className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white tracking-tight leading-tight text-glow"
                                    >
                                        {part}<span className="text-gold">.</span>
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
                            transition={{ duration: 0.8, delay: 0.8 }}
                            className="text-base md:text-xl text-gray-300 font-light max-w-3xl mx-auto mb-8 leading-relaxed"
                        >
                            {currentSlide.subtitle}
                        </motion.p>
                    </AnimatePresence>

                    {/* Call to Actions */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2, duration: 0.8 }}
                        className="flex flex-col sm:flex-row gap-6 justify-center"
                    >
                        <Link
                            href="/books"
                            className="group/btn relative px-8 py-3 md:py-4 bg-gold text-midnight font-bold uppercase tracking-widest text-xs md:text-sm rounded-full overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_10px_20px_rgba(212,175,55,0.3)]"
                        >
                            <span className="relative z-10">Start Reading</span>
                            <div className="absolute inset-0 bg-white translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
                        </Link>
                        <Link
                            href="/characters"
                            className="px-8 py-3 md:py-4 bg-white/5 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-midnight font-bold uppercase tracking-widest text-xs md:text-sm rounded-full transition-all duration-500 hover:scale-105"
                        >
                            Meet the Players
                        </Link>
                    </motion.div>
                </div>

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
