import Link from "next/link";
import { ArrowLeft, Gamepad2, Lock } from "lucide-react";

export default function VipPage() {
    return (
        <div className="min-h-screen bg-midnight text-cream p-8">
            <Link href="/" className="inline-flex items-center text-gray-400 hover:text-gold mb-8">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
            </Link>

            <div className="max-w-4xl mx-auto text-center mb-16">
                <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4">VIP Lounge</h1>
                <p className="text-xl text-gray-400">Exclusive access for the inner circle.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {/* Casino Card */}
                <Link href="/vip/casino" className="group relative block bg-charcoal rounded-lg overflow-hidden border border-gray-700 hover:border-gold transition-all duration-300">
                    <div className="aspect-video bg-[url('/images/background-1.png')] bg-cover bg-center opacity-70 group-hover:opacity-100 transition-opacity"></div>
                    <div className="p-6">
                        <div className="flex items-center gap-3 mb-2">
                            <Gamepad2 className="w-6 h-6 text-gold" />
                            <h3 className="text-2xl font-serif font-bold text-white group-hover:text-gold">Zoey&apos;s Casino</h3>
                        </div>
                        <p className="text-gray-400">Play Solitaire with the cast of Sterling City. High stakes, no risk.</p>
                    </div>
                </Link>

                {/* Future Content Placeholder */}
                <div className="group relative block bg-charcoal/50 rounded-lg overflow-hidden border border-gray-800">
                    <div className="aspect-video bg-black/50 flex items-center justify-center">
                        <Lock className="w-12 h-12 text-gray-600" />
                    </div>
                    <div className="p-6 opacity-50">
                        <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-2xl font-serif font-bold text-white">Coming Soon</h3>
                        </div>
                        <p className="text-gray-400">More exclusive apps and content unlocking soon.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
