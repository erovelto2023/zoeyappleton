

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
            <div className="group relative w-full aspect-[2/3] overflow-hidden rounded-sm border border-gray-800 hover:border-gold transition-colors duration-300">
                {/* Image Background */}
                <div className="absolute inset-0 w-full h-full">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={character.image}
                        alt={character.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/40 to-transparent opacity-90"></div>
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    {/* Resting State: Name & Tagline */}
                    <div className="transform transition-transform duration-300 group-hover:-translate-y-2">
                        <h3 className="text-2xl md:text-3xl font-serif text-white font-bold mb-1">{character.name}</h3>
                        <p className="text-gray-300 italic font-light text-sm md:text-base">
                            &quot;{character.tagline || "A mysterious figure..."}&quot;
                        </p>
                    </div>

                    {/* Hover State: Role & Status */}
                    <div className="h-0 overflow-hidden opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-300 delay-75">
                        <div className="pt-4 border-t border-gold/30 mt-4 space-y-2">
                            <div className="flex justify-between items-center text-xs uppercase tracking-widest">
                                <span className="text-gold font-bold">Role</span>
                                <span className="text-white">{character.coreIdentity?.role || "Unknown"}</span>
                            </div>
                            <div className="flex justify-between items-center text-xs uppercase tracking-widest">
                                <span className="text-gold font-bold">Status</span>
                                <span className={cn(
                                    "font-medium",
                                    character.coreIdentity?.status === "Deceased" ? "text-blood-rose" : "text-green-400"
                                )}>
                                    {character.coreIdentity?.status || "Unknown"}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
