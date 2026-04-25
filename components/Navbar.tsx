"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, BookOpen, Heart, Users, Map, Crown, Youtube } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
    { name: "Books", href: "/books", icon: BookOpen },
    { name: "Characters", href: "/characters", icon: Users },
    { name: "Blog", href: "/blog", icon: Heart },
    { name: "VIP Lounge", href: "/vip", icon: Crown },
    { name: "YouTube", href: "https://www.youtube.com/@ZoeyAppleton", icon: Youtube },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50 glass-dark rounded-2xl border-white/5 transition-all duration-300">
            <div className="mx-auto px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="text-2xl font-serif font-bold text-gold tracking-wider">
                            ZOEY APPLETON
                        </Link>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    target={item.href.startsWith("http") ? "_blank" : undefined}
                                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                    className="hover:text-gold transition-colors duration-300 px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2"
                                >
                                    <item.icon className="w-4 h-4" />
                                    {item.name}
                                </Link>
                            ))}

                        </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-cream hover:text-gold focus:outline-none"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <div className={cn("md:hidden transition-all duration-300 ease-in-out overflow-hidden", isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0")}>
                <div className="px-4 pt-2 pb-6 space-y-2 border-t border-white/5">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            target={item.href.startsWith("http") ? "_blank" : undefined}
                            rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                            className="text-white/70 hover:text-gold block px-3 py-3 rounded-xl text-base font-medium flex items-center gap-3 hover:bg-white/5 transition-all"
                            onClick={() => setIsOpen(false)}
                        >
                            <item.icon className="w-5 h-5 text-gold/70" />
                            {item.name}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
}
