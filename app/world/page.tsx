import { Construction } from 'lucide-react';

export const metadata = {
    title: 'World Map | Zoey Appleton',
    description: 'Explore the world of Zoey Appleton\'s books.',
};

export default function WorldPage() {
    return (
        <div className="min-h-screen bg-midnight text-cream pt-32 pb-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
            <div className="text-center max-w-2xl mx-auto">
                <Construction className="w-24 h-24 text-gold mx-auto mb-8 animate-pulse" />
                <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">Under Construction</h1>
                <div className="w-24 h-1 bg-blood-rose mx-auto mb-8"></div>
                <p className="text-xl text-gray-300 leading-relaxed">
                    The cartographers are currently mapping the dangerous streets of Sterling City and the hidden islands of the Syndicate.
                </p>
                <p className="mt-4 text-gray-400">
                    Check back soon to explore the world where danger and desire collide.
                </p>
            </div>
        </div>
    );
}
