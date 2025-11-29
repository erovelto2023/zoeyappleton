import Link from 'next/link';

export const metadata = {
    title: 'About Zoey Appleton | Romance Author',
    description: 'Meet Zoey Appleton, the architect of the Zoey Appleton Universe. Learn about her books, her inspiration, and her life.',
};

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-midnight text-cream pt-24 pb-20">
            {/* Hero Section */}
            <div className="relative py-20 mb-16 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-midnight/80 via-midnight/90 to-midnight"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-gold text-sm font-bold uppercase tracking-widest mb-4">The Architect of the Universe</p>
                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 tracking-tight">
                        Zoey Appleton
                    </h1>
                    <div className="w-24 h-1 bg-blood-rose mx-auto mb-8"></div>
                    <p className="text-xl md:text-2xl text-gray-300 font-light tracking-wide max-w-3xl mx-auto italic">
                        "Live, Laugh, Love hard, and Read."
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Left Column: Image & Personal */}
                    <div className="space-y-12">
                        <div className="relative aspect-[3/4] w-full rounded-sm overflow-hidden border border-gray-800 shadow-2xl group">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="/images/zoey.png"
                                alt="Zoey Appleton"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-midnight via-transparent to-transparent opacity-40"></div>
                        </div>

                        <div className="bg-charcoal p-8 rounded-sm border border-gray-800">
                            <h3 className="text-2xl font-serif text-white mb-6 flex items-center gap-4">
                                <span className="w-8 h-0.5 bg-gold"></span>
                                Beyond the Pages
                            </h3>
                            <p className="text-gray-300 leading-relaxed mb-6">
                                When she isn’t orchestrating the next great escape or penning a heart-stopping confession, Zoey indulges her artistic soul through painting and exploring the globe for new inspiration.
                            </p>
                            <p className="text-gray-300 leading-relaxed">
                                She shares her home—and her heart—with her family and her two cherished female cats.
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Bio */}
                    <div className="space-y-8">
                        <div className="space-y-6 text-lg text-gray-300 leading-relaxed font-light">
                            <p>
                                <span className="text-gold font-bold text-xl">Zoey Appleton doesn’t just write romance;</span> she builds empires of emotion and suspense.
                            </p>
                            <p>
                                As the architect of the Zoey Appleton Universe, Zoey captivates readers by walking the razor's edge between danger and desire. Her stories transport you from the high-stakes boardrooms of <span className="text-white italic">Claimed By My Boss</span> to the shadowed secrets of <span className="text-white italic">Shadows of the Knight</span>, creating a world where ruthless billionaires meet their match in resilient heroines, and where love is the only weapon strong enough to defeat the Syndicate.
                            </p>
                            <p>
                                Known for her <span className="text-blood-rose font-medium">"touch-her-and-you-die"</span> energy and irresistible witty banter, Zoey weaves tales of redemption and scorching chemistry that keep you on the edge of your seat. She specializes in the kind of breathtaking twists that leave you yearning for more, proving that even in the darkest shadows, love always finds a way to shine.
                            </p>
                            <p>
                                If you seek a romance that ignites passion and demands to be felt, welcome to the world of Zoey Appleton. <span className="text-white font-medium">Prepare to be enthralled.</span>
                            </p>
                        </div>

                        <div className="pt-8 border-t border-gray-800">
                            <h3 className="text-2xl font-serif text-white mb-6">Start Your Journey</h3>
                            <div className="flex flex-wrap gap-4">
                                <Link
                                    href="/books"
                                    className="bg-gold hover:bg-yellow-500 text-midnight px-8 py-3 rounded-sm uppercase tracking-widest text-sm font-bold transition-colors"
                                >
                                    Explore Books
                                </Link>
                                <Link
                                    href="/characters"
                                    className="bg-transparent border border-gold text-gold hover:bg-gold hover:text-midnight px-8 py-3 rounded-sm uppercase tracking-widest text-sm font-bold transition-colors"
                                >
                                    Meet the Characters
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
