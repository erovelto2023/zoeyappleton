"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, BookOpen, Heart, Users, Map, Crown } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
    { name: "Books", href: "/books", icon: BookOpen },
    { name: "Characters", href: "/characters", icon: Users },
    { name: "World", href: "/world", icon: Map },
    { name: "Blog", href: "/blog", icon: Heart },
    { name: "VIP Lounge", href: "/vip", icon: Crown },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-midnight/95 text-cream fixed w-full z-50 backdrop-blur-sm border-b border-charcoal">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                                    className="hover:text-gold transition-colors duration-300 px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2"
                                >
                                    <item.icon className="w-4 h-4" />
                                    {item.name}
                                </Link>
                            ))}
                            <Link
                                href="/newsletter"
                                className="bg-blood-rose hover:bg-red-900 text-white px-4 py-2 rounded-sm text-sm font-medium transition-colors duration-300"
                            >
                                Join VIP
                            </Link>
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
            <div className={cn("md:hidden", isOpen ? "block" : "hidden")}>
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-midnight border-b border-charcoal">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="text-cream hover:text-gold block px-3 py-2 rounded-md text-base font-medium flex items-center gap-2"
                            onClick={() => setIsOpen(false)}
                        >
                            <item.icon className="w-4 h-4" />
                            {item.name}
                        </Link>
                    ))}
                    <Link
                        href="/newsletter"
                        className="bg-blood-rose text-white block px-3 py-2 rounded-md text-base font-medium mt-4 text-center"
                        onClick={() => setIsOpen(false)}
                    >
                        Join VIP
                    </Link>
                </div>
            </div>
        </nav>
    );
}
