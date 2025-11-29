import Link from 'next/link';

export const metadata = {
    title: 'Privacy Policy | Zoey Appleton',
    description: 'Privacy Policy for Zoey Appleton, Romance Author.',
};

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-midnight text-cream pt-32 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-8">Privacy Policy</h1>
                <div className="w-24 h-1 bg-blood-rose mb-12"></div>

                <div className="prose prose-invert prose-lg max-w-none text-gray-300">
                    <p className="lead text-xl text-gold mb-8">
                        Your privacy is important to us. This policy outlines how we collect, use, and protect your personal information.
                    </p>

                    <h2 className="text-2xl font-serif font-bold text-white mt-12 mb-6">1. Information We Collect</h2>
                    <p>
                        We may collect personal information such as your name and email address when you sign up for our newsletter, contact us, or purchase books through our affiliate links.
                    </p>

                    <h2 className="text-2xl font-serif font-bold text-white mt-12 mb-6">2. How We Use Your Information</h2>
                    <p>
                        We use your information to:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mb-6">
                        <li>Send you newsletters, updates, and exclusive content (if you have subscribed).</li>
                        <li>Respond to your inquiries and messages.</li>
                        <li>Improve our website and user experience.</li>
                    </ul>

                    <h2 className="text-2xl font-serif font-bold text-white mt-12 mb-6">3. Third-Party Services</h2>
                    <p>
                        We may use third-party services such as email marketing platforms (e.g., Mailchimp, ConvertKit) and analytics tools. These services may collect and process your data in accordance with their own privacy policies.
                    </p>

                    <h2 className="text-2xl font-serif font-bold text-white mt-12 mb-6">4. Cookies</h2>
                    <p>
                        Our website may use cookies to enhance your browsing experience. You can choose to disable cookies in your browser settings, but this may affect the functionality of the site.
                    </p>

                    <h2 className="text-2xl font-serif font-bold text-white mt-12 mb-6">5. Affiliate Links</h2>
                    <p>
                        This website contains affiliate links to retailers such as Amazon. If you click on these links and make a purchase, we may earn a small commission at no extra cost to you.
                    </p>

                    <h2 className="text-2xl font-serif font-bold text-white mt-12 mb-6">6. Contact Us</h2>
                    <p>
                        If you have any questions about this Privacy Policy, please contact us at{' '}
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
