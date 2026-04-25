

import Link from "next/link";
import { cn } from "@/lib/utils";

interface CharacterProps {
    id: string;
    name: string;
    image: string;
    tagline?: string;
    coreIdentity?: {
        role: string;
        status?: string;
    };
    book?: string;
}

export default function CharacterCard({ character }: { character: CharacterProps }) {
    return (
        <Link href={`/characters/${character.id}`} className="block w-full">
            <div className="group relative w-full aspect-[3/4] overflow-hidden rounded-xl border border-white/10 glass-dark transition-all duration-500 hover:shadow-[0_0_30px_rgba(212,175,55,0.2)] hover:border-gold/50">
                {/* Image Background */}
                <div className="absolute inset-0 w-full h-full">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={character.image}
                        alt={character.name}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    {/* Role Badge */}
                    <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-gold/10 backdrop-blur-md border border-gold/20 text-gold text-[10px] uppercase tracking-[0.2em] font-bold rounded-full">
                            {character.coreIdentity?.role || "Mystery"}
                        </span>
                    </div>

                    {/* Resting State: Name & Tagline */}
                    <div className="transform transition-all duration-500 group-hover:-translate-y-4">
                        <h3 className="text-2xl md:text-3xl font-serif text-white font-bold mb-2 group-hover:text-gold transition-colors duration-300">{character.name}</h3>
                        <p className="text-gray-400 italic font-light text-sm line-clamp-2 opacity-80 group-hover:opacity-100 transition-opacity">
                            &quot;{character.tagline || "A mysterious figure in Sterling City..."}&quot;
                        </p>
                    </div>

                    {/* Hover State: Status */}
                    <div className="max-h-0 overflow-hidden opacity-0 group-hover:max-h-20 group-hover:opacity-100 transition-all duration-500 ease-in-out">
                        <div className="pt-4 border-t border-white/10 mt-4 flex items-center justify-between">
                            <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Current Status</span>
                            <span className={cn(
                                "text-[10px] uppercase tracking-[0.15em] font-bold px-2 py-0.5 rounded",
                                character.coreIdentity?.status === "Deceased" 
                                    ? "bg-blood-rose/20 text-blood-rose border border-blood-rose/30" 
                                    : "bg-green-500/10 text-green-400 border border-green-500/20"
                            )}>
                                {character.coreIdentity?.status || "Active"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
