"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface CharacterProfileProps {
    character: any; // Using any for flexibility with the complex schema, but ideally should be typed
}

export default function CharacterProfile({ character }: CharacterProfileProps) {
    const [showSpoilers, setShowSpoilers] = useState(false);
    const [activeTab, setActiveTab] = useState<"dossier" | "journey" | "connections">("dossier");

    const SpoilerText = ({ text, className }: { text: string; className?: string }) => (
        <span className={cn(
            "transition-all duration-500",
            !showSpoilers ? "blur-sm select-none bg-gray-800/50 text-transparent" : "blur-0 text-gray-300",
            className
        )}>
            {text}
        </span>
    );

    return (
        <div className="min-h-screen bg-midnight text-cream pt-24 pb-20">
            {/* Spoiler Toggle (Fixed or Sticky) */}
            <div className="fixed top-24 right-4 z-50 flex items-center gap-3 bg-charcoal/90 backdrop-blur border border-gold/30 px-4 py-2 rounded-full shadow-xl">
                <span className="text-xs font-bold uppercase tracking-widest text-gold">Spoilers</span>
                <button
                    onClick={() => setShowSpoilers(!showSpoilers)}
                    className={cn(
                        "w-12 h-6 rounded-full relative transition-colors duration-300",
                        showSpoilers ? "bg-gold" : "bg-gray-600"
                    )}
                >
                    <div className={cn(
                        "absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-300",
                        showSpoilers ? "translate-x-6" : "translate-x-0"
                    )}></div>
                </button>
            </div>

            {/* Split-Screen Hero Header */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left: Portrait */}
                    <div className="relative aspect-[2/3] w-full max-w-md mx-auto lg:max-w-none rounded-sm overflow-hidden border border-gray-800 shadow-2xl">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={character.image}
                            alt={character.name}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-transparent to-transparent opacity-60"></div>
                    </div>

                    {/* Right: Core Identity */}
                    <div className="space-y-8">
                        <div>
                            <div className="flex flex-wrap gap-2 mb-4">
                                <span className="bg-gold/10 text-gold border border-gold/30 px-3 py-1 text-xs font-bold uppercase tracking-widest rounded-sm">
                                    {character.coreIdentity?.role}
                                </span>
                                {character.coreIdentity?.affiliation && (
                                    <span className="bg-charcoal text-gray-400 border border-gray-700 px-3 py-1 text-xs font-bold uppercase tracking-widest rounded-sm">
                                        {character.coreIdentity.affiliation}
                                    </span>
                                )}
                            </div>
                            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-4 leading-tight">
                                {character.name}
                            </h1>
                            <p className="text-xl md:text-2xl text-gold italic font-light border-l-4 border-gold pl-6 py-2">
                                &quot;{character.tagline || "A mysterious figure..."}&quot;
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="bg-charcoal/50 p-4 rounded-sm border border-gray-800">
                                <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Archetype</p>
                                <p className="text-lg text-white font-serif">{character.coreIdentity?.archetype || "Unknown"}</p>
                            </div>
                            <div className="bg-charcoal/50 p-4 rounded-sm border border-gray-800">
                                <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Status</p>
                                <p className={cn(
                                    "text-lg font-serif",
                                    character.coreIdentity?.status === "Deceased" ? "text-blood-rose" : "text-green-400"
                                )}>
                                    {character.coreIdentity?.status || "Unknown"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="sticky top-0 z-40 bg-midnight/95 backdrop-blur border-b border-gray-800 mb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center gap-8">
                    {["dossier", "journey", "connections"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab as any)}
                            className={cn(
                                "py-4 text-sm font-bold uppercase tracking-widest border-b-2 transition-colors",
                                activeTab === tab
                                    ? "border-gold text-gold"
                                    : "border-transparent text-gray-500 hover:text-gray-300"
                            )}
                        >
                            {tab === "dossier" ? "The Dossier" : tab === "journey" ? "Narrative Arc" : "Web of Connections"}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Sections */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[400px]">

                {/* THE DOSSIER */}
                {activeTab === "dossier" && (
                    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <section>
                            <h3 className="text-2xl font-serif text-white mb-6 flex items-center gap-4">
                                <span className="w-8 h-0.5 bg-gold"></span>
                                Personality Profile
                            </h3>
                            <div className="bg-charcoal p-8 rounded-sm border border-gray-800 space-y-8">
                                <div>
                                    <p className="text-gold font-bold uppercase tracking-widest text-xs mb-3">Demeanor</p>
                                    <p className="text-lg text-gray-300 leading-relaxed font-light">
                                        {character.personality?.demeanor || "No data available."}
                                    </p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div>
                                        <p className="text-gold font-bold uppercase tracking-widest text-xs mb-3">Strengths</p>
                                        <ul className="space-y-2">
                                            {character.personality?.strengths?.map((s: string) => (
                                                <li key={s} className="flex items-center gap-2 text-gray-300">
                                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                                                    {s}
                                                </li>
                                            )) || <li className="text-gray-500">N/A</li>}
                                        </ul>
                                    </div>
                                    <div>
                                        <p className="text-gold font-bold uppercase tracking-widest text-xs mb-3">Weaknesses</p>
                                        <ul className="space-y-2">
                                            {character.personality?.weaknesses?.map((w: string) => (
                                                <li key={w} className="flex items-center gap-2 text-gray-300">
                                                    <span className="w-1.5 h-1.5 bg-blood-rose rounded-full"></span>
                                                    {w}
                                                </li>
                                            )) || <li className="text-gray-500">N/A</li>}
                                        </ul>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-gold font-bold uppercase tracking-widest text-xs mb-3">Motivation</p>
                                    <p className="text-white font-medium">
                                        {character.personality?.motivation}
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h3 className="text-2xl font-serif text-white mb-6 flex items-center gap-4">
                                <span className="w-8 h-0.5 bg-gold"></span>
                                Background & Secrets
                            </h3>
                            <div className="bg-charcoal p-8 rounded-sm border border-gray-800 space-y-6">
                                <div>
                                    <p className="text-gold font-bold uppercase tracking-widest text-xs mb-2">Origin</p>
                                    <p className="text-gray-300">{character.background?.origin}</p>
                                </div>
                                <div className="bg-midnight/50 p-6 border-l-2 border-blood-rose">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-blood-rose font-bold uppercase tracking-widest text-xs">Classified Secret</span>
                                        {!showSpoilers && <span className="text-xs text-gray-600">(Toggle spoilers to view)</span>}
                                    </div>
                                    <SpoilerText text={character.background?.secrets || "No secrets revealed."} />
                                </div>
                            </div>
                        </section>
                    </div>
                )}

                {/* NARRATIVE ARC */}
                {activeTab === "journey" && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="relative border-l-2 border-gray-800 ml-4 space-y-12 pb-4">
                            {/* Beginning */}
                            <div className="relative pl-8">
                                <div className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-gray-600 border-4 border-midnight"></div>
                                <h3 className="text-xl font-serif text-white mb-2">The Beginning</h3>
                                <p className="text-gray-400 leading-relaxed">{character.narrativeArc?.beginning}</p>
                            </div>

                            {/* Turning Point */}
                            <div className="relative pl-8">
                                <div className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-gold border-4 border-midnight"></div>
                                <h3 className="text-xl font-serif text-gold mb-2">The Turning Point</h3>
                                <p className="text-gray-400 leading-relaxed">{character.narrativeArc?.turningPoint}</p>
                            </div>

                            {/* Climax (Spoiler) */}
                            <div className="relative pl-8">
                                <div className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-blood-rose border-4 border-midnight"></div>
                                <h3 className="text-xl font-serif text-blood-rose mb-2">The Climax</h3>
                                <div className="relative">
                                    <SpoilerText text={character.narrativeArc?.climax || "N/A"} />
                                </div>
                            </div>

                            {/* Resolution (Spoiler) */}
                            <div className="relative pl-8">
                                <div className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-white border-4 border-midnight"></div>
                                <h3 className="text-xl font-serif text-white mb-2">The Resolution</h3>
                                <div className="relative">
                                    <SpoilerText text={character.narrativeArc?.resolution || "N/A"} />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* CONNECTIONS */}
                {activeTab === "connections" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {character.relationships?.map((rel: any, idx: number) => (
                            <div key={idx} className="bg-charcoal p-6 rounded-sm border border-gray-800 hover:border-gold transition-colors group">
                                <h4 className="text-lg font-serif text-white font-bold group-hover:text-gold transition-colors">{rel.name}</h4>
                                <p className="text-sm text-gray-400 mt-2">{rel.description}</p>
                            </div>
                        ))}
                        {(!character.relationships || character.relationships.length === 0) && (
                            <p className="text-gray-500 italic">No known associates.</p>
                        )}
                    </div>
                )}
            </div>

            {/* Footer CTA */}
            {character.book && (
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 pt-12 border-t border-gray-800 text-center">
                    <h3 className="text-2xl font-serif text-white mb-6">Read Their Story</h3>
                    <div className="inline-flex flex-col items-center gap-6 bg-charcoal p-8 rounded-sm border border-gray-800">
                        <div className="w-32 shadow-xl">
                            {/* Placeholder for book cover if available, or just title */}
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={character.book.coverImage || "https://placehold.co/200x300"} alt={character.book.title} className="w-full h-auto" />
                        </div>
                        <div>
                            <p className="text-gold text-sm font-bold uppercase tracking-widest mb-2">Featured In</p>
                            <h4 className="text-xl font-bold text-white mb-4">{character.book.title}</h4>
                            <Link
                                href={`/books/${character.book._id}`}
                                className="inline-block bg-blood-rose hover:bg-red-700 text-white px-8 py-3 rounded-sm uppercase tracking-widest text-sm font-bold transition-colors"
                            >
                                View Book Details
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
