"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export default function Newsletter() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus("loading");
        setMessage("");

        try {
            const res = await fetch("/api/newsletter", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.message || "Something went wrong");

            setStatus("success");
            setMessage("Welcome to the inner circle. Check your inbox for the secret chapter.");
            setEmail("");
        } catch (error: any) {
            setStatus("error");
            setMessage(error.message || "Failed to subscribe. Please try again.");
        }
    };

    return (
        <div className="w-full max-w-lg mx-auto">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                <div className="relative w-full">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your email address"
                        disabled={status === "loading" || status === "success"}
                        className={cn(
                            "w-full px-6 py-4 bg-midnight/80 border text-white focus:outline-none focus:ring-1 rounded-sm placeholder-gray-500 transition-all duration-300",
                            status === "error"
                                ? "border-blood-rose focus:border-blood-rose focus:ring-blood-rose"
                                : "border-gray-600 focus:border-gold focus:ring-gold",
                            status === "success" && "border-green-500 text-green-500"
                        )}
                    />
                    {status === "loading" && (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2">
                            <div className="w-5 h-5 border-2 border-gold border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    )}
                </div>
                <button
                    type="submit"
                    disabled={status === "loading" || status === "success"}
                    className={cn(
                        "px-8 py-4 rounded-sm font-bold uppercase tracking-widest transition-all duration-300 whitespace-nowrap",
                        status === "success"
                            ? "bg-green-600 text-white cursor-default"
                            : "bg-gold hover:bg-yellow-500 text-midnight"
                    )}
                >
                    {status === "success" ? "Joined" : "Get Access"}
                </button>
            </form>

            {/* Feedback Message */}
            <div className={cn(
                "mt-4 text-center text-sm transition-all duration-500 overflow-hidden",
                status === "idle" ? "max-h-0 opacity-0" : "max-h-20 opacity-100"
            )}>
                <p className={cn(
                    status === "error" ? "text-blood-rose" : "text-green-400"
                )}>
                    {message}
                </p>
            </div>

            <p className="mt-6 text-xs text-gray-500 uppercase tracking-widest text-center">
                No spam. Unsubscribe at any time.
            </p>
        </div>
    );
}
