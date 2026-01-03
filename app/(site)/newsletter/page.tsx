import { Crown, Sparkles } from 'lucide-react';

export const metadata = {
    title: 'Fan Club | Zoey Appleton',
    description: 'Join the Zoey Appleton Fan Club - Coming Soon.',
};

export default function NewsletterPage() {
    return (
        <div className="min-h-screen bg-midnight text-cream pt-32 pb-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center">
            <div className="max-w-2xl mx-auto">
                <div className="relative inline-block mb-8">
                    <Crown className="w-24 h-24 text-gold animate-pulse" />
                    <Sparkles className="w-8 h-8 text-blood-rose absolute -top-2 -right-4 animate-bounce" />
                </div>

                <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
                    Zoey Appleton Fan Club
                </h1>

                <div className="w-24 h-1 bg-blood-rose mx-auto mb-8"></div>

                <h2 className="text-2xl text-gold font-medium mb-6 uppercase tracking-widest">
                    Under Construction
                </h2>

                <p className="text-xl text-gray-300 leading-relaxed mb-8">
                    We are building the ultimate sanctuary for the true fans.
                    Exclusive content, early access, and behind-the-scenes secrets are coming your way.
                </p>

                <p className="text-gray-400 italic">
                    &quot;Good things come to those who wait... but bad boys are worth the patience.&quot;
                </p>
            </div>
        </div>
    );
}
