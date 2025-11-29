import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";

export default function Hero() {
    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-midnight">
            {/* Background Overlay - Placeholder for City Skyline */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2613&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/80 to-transparent"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h1 className="text-5xl md:text-7xl font-serif font-bold text-cream mb-6 tracking-tight drop-shadow-lg">
                    The Billionaire&apos;s <span className="text-blood-rose italic">Forbidden</span> Desires
                </h1>

                <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto font-light leading-relaxed">
                    He built empires with code. She built survival into a razor. <br className="hidden md:block" />
                    In Sterling City, desire always has a price.
                </p>

                <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                    <Link
                        href="/books/1"
                        className="group bg-blood-rose hover:bg-red-900 text-white px-8 py-4 rounded-sm text-lg font-medium transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-red-900/50"
                    >
                        Read Chapter One
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <Link
                        href="/newsletter"
                        className="group bg-transparent border-2 border-gold text-gold hover:bg-gold hover:text-midnight px-8 py-4 rounded-sm text-lg font-medium transition-all duration-300 shadow-lg"
                    >
                        Claim Free Epilogue
                    </Link>

                    <button className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors px-6 py-4">
                        <div className="w-10 h-10 rounded-full border border-gray-400 group-hover:border-white flex items-center justify-center transition-colors">
                            <Play className="w-4 h-4 fill-current" />
                        </div>
                        <span className="text-sm font-medium uppercase tracking-widest">Watch Trailer</span>
                    </button>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                <div className="w-6 h-10 border-2 border-gray-500 rounded-full flex justify-center">
                    <div className="w-1 h-2 bg-gray-500 rounded-full mt-2"></div>
                </div>
            </div>
        </div>
    );
}
