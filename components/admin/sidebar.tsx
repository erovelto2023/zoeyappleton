"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Book, Users, PenTool, Home, MessageSquare, Mail } from "lucide-react";

const routes = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/admin",
    },
    {
        label: "Books",
        icon: Book,
        href: "/admin/books",
    },
    {
        label: "Characters",
        icon: Users,
        href: "/admin/characters",
    },
    {
        label: "Blog",
        icon: PenTool,
        href: "/admin/posts",
    },
    {
        label: "Messages",
        icon: MessageSquare,
        href: "/admin/messages",
    },
    {
        label: "Heartstrings",
        icon: Mail,
        href: "/admin/heartstrings",
    },
];

export function AdminSidebar() {
    const pathname = usePathname();

    return (
        <div className="space-y-4 py-4 flex flex-col h-full bg-slate-900 text-white border-r border-slate-800">
            <div className="px-3 py-2 flex-1">
                <Link href="/admin" className="flex items-center pl-3 mb-14">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
                        Zoey Admin
                    </h1>
                </Link>
                <div className="space-y-1">
                    {routes.map((route) => (
                        <Link
                            key={route.href}
                            href={route.href}
                            className={cn(
                                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                                pathname === route.href ? "text-white bg-white/10" : "text-zinc-400"
                            )}
                        >
                            <div className="flex items-center flex-1">
                                <route.icon className="h-5 w-5 mr-3" />
                                {route.label}
                            </div>
                        </Link>
                    ))}
                    <div className="pt-8">
                        <Link
                            href="/"
                            className={cn(
                                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition text-zinc-400"
                            )}
                        >
                            <div className="flex items-center flex-1">
                                <Home className="h-5 w-5 mr-3" />
                                Back to Site
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
