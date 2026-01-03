"use client";

import { useState } from "react";
import axios from "axios";
import { Mail, MessageSquare, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function ContactPage() {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            await axios.post("/api/messages", formData);
            toast.success("Message sent successfully!");
            setFormData({ name: "", email: "", message: "" });
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-cream mb-4">Get in Touch</h1>
                <div className="w-24 h-1 bg-blood-rose mx-auto"></div>
                <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
                    Have a question about the series? Want to inquire about rights or appearances? Or just want to say hi?
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-5xl mx-auto">
                {/* Contact Info */}
                <div>
                    <h2 className="text-2xl font-serif font-bold text-gold mb-6">Connect with Zoey</h2>
                    <p className="text-gray-300 mb-8 leading-relaxed">
                        I love hearing from readers! While I can&apos;t always reply to every message personally due to writing deadlines, I do read everything.
                    </p>

                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="bg-charcoal p-3 rounded-sm border border-gray-700">
                                <Mail className="w-6 h-6 text-blood-rose" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white mb-1">Email</h3>
                                <p className="text-gray-400">zoeyappleton1221@gmail.com</p>
                                <p className="text-gray-500 text-sm mt-1">For general inquiries and fan mail.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="bg-charcoal p-3 rounded-sm border border-gray-700">
                                <MessageSquare className="w-6 h-6 text-blood-rose" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white mb-1">Social Media</h3>
                                <p className="text-gray-400">@ZoeyAppletonWrites</p>
                                <p className="text-gray-500 text-sm mt-1">Follow for daily updates and teasers.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="bg-charcoal p-8 rounded-sm border border-gray-800">
                    <h2 className="text-2xl font-serif font-bold text-white mb-6">Send a Message</h2>
                    <form onSubmit={onSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                            <input
                                type="text"
                                id="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                disabled={loading}
                                className="w-full bg-midnight border border-gray-700 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors disabled:opacity-50"
                                placeholder="Your name"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                            <input
                                type="email"
                                id="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                disabled={loading}
                                className="w-full bg-midnight border border-gray-700 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors disabled:opacity-50"
                                placeholder="your@email.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                            <textarea
                                id="message"
                                rows={4}
                                required
                                value={formData.message}
                                onChange={handleChange}
                                disabled={loading}
                                className="w-full bg-midnight border border-gray-700 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors disabled:opacity-50"
                                placeholder="What's on your mind?"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blood-rose hover:bg-red-900 text-white font-medium py-3 rounded-sm transition-colors duration-300 uppercase tracking-widest text-sm flex items-center justify-center disabled:opacity-70"
                        >
                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Send Message"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
