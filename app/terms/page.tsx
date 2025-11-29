import Link from 'next/link';

export const metadata = {
    title: 'Terms of Service | Zoey Appleton',
    description: 'Terms of Service for Zoey Appleton, Romance Author.',
};

export default function TermsOfService() {
    return (
        <div className="min-h-screen bg-midnight text-cream pt-32 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-8">Terms of Service</h1>
                <div className="w-24 h-1 bg-blood-rose mb-12"></div>

                <div className="prose prose-invert prose-lg max-w-none text-gray-300">
                    <p className="lead text-xl text-gold mb-8">
                        Welcome to Zoey Appleton's website. By accessing or using this site, you agree to be bound by these terms.
                    </p>

                    <h2 className="text-2xl font-serif font-bold text-white mt-12 mb-6">1. Acceptance of Terms</h2>
                    <p>
                        By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using this websites particular services, you shall be subject to any posted guidelines or rules applicable to such services.
                    </p>

                    <h2 className="text-2xl font-serif font-bold text-white mt-12 mb-6">2. Intellectual Property</h2>
                    <p>
                        All content on this site, including text, graphics, logos, and images, is the property of Zoey Appleton and is protected by international copyright laws. You may not reproduce, distribute, or create derivative works from this content without express written permission.
                    </p>

                    <h2 className="text-2xl font-serif font-bold text-white mt-12 mb-6">3. User Conduct</h2>
                    <p>
                        You agree to use this website only for lawful purposes. You are prohibited from posting or transmitting any unlawful, threatening, libelous, defamatory, obscene, or profane material.
                    </p>

                    <h2 className="text-2xl font-serif font-bold text-white mt-12 mb-6">4. Disclaimer</h2>
                    <p>
                        This website is provided "as is" without any representations or warranties, express or implied. Zoey Appleton makes no representations or warranties in relation to this website or the information and materials provided on this website.
                    </p>

                    <h2 className="text-2xl font-serif font-bold text-white mt-12 mb-6">5. Limitation of Liability</h2>
                    <p>
                        Zoey Appleton will not be liable to you (whether under the law of contact, the law of torts or otherwise) in relation to the contents of, or use of, or otherwise in connection with, this website.
                    </p>

                    <h2 className="text-2xl font-serif font-bold text-white mt-12 mb-6">6. Changes to Terms</h2>
                    <p>
                        We reserve the right to modify these terms at any time. You should check this page regularly. Your continued use of the website after any changes constitutes your acceptance of the new terms.
                    </p>

                    <h2 className="text-2xl font-serif font-bold text-white mt-12 mb-6">7. Contact Information</h2>
                    <p>
                        If you have any questions about these Terms of Service, please contact us at{' '}
                        <a href="mailto:zoeyappleton1221@gmail.com" className="text-gold hover:text-white transition-colors">
                            zoeyappleton1221@gmail.com
                        </a>.
                    </p>

                    <p className="mt-12 text-sm text-gray-500">
                        Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                </div>
            </div>
        </div>
    );
}
