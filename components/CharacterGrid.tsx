"use client";

import { useState, useMemo } from "react";
import CharacterCard from "./CharacterCard";

interface Character {
    _id: string;
    name: string;
    image: string;
    tagline?: string;
    coreIdentity?: {
        role: string;
        archetype?: string;
        status?: string;
    };
    book?: {
        _id: string;
        title: string;
        series?: string;
    };
}

interface CharacterGridProps {
    characters: Character[];
    seriesList: string[];
}

export default function CharacterGrid({ characters, seriesList }: CharacterGridProps) {
    const [selectedSeries, setSelectedSeries] = useState<string>("All");
    const [selectedRole, setSelectedRole] = useState<string>("All");
    const [selectedArchetype, setSelectedArchetype] = useState<string>("All");

    const roles = ["All", "Protagonist", "Antagonist", "Supporting"];
    // Extract unique archetypes from characters
    const archetypes = useMemo(() => {
        const unique = new Set(characters.map(c => c.coreIdentity?.archetype).filter(Boolean));
        return ["All", ...Array.from(unique).sort()];
    }, [characters]);

    const filteredCharacters = characters.filter(char => {
        const matchesSeries = selectedSeries === "All" || char.book?.series === selectedSeries || char.book?.title === selectedSeries;
        // Simple role matching - allows partial match e.g. "Protagonist" matches "Protagonist / Anti-Hero"
        const matchesRole = selectedRole === "All" || char.coreIdentity?.role.toLowerCase().includes(selectedRole.toLowerCase());
        const matchesArchetype = selectedArchetype === "All" || char.coreIdentity?.archetype === selectedArchetype;

        return matchesSeries && matchesRole && matchesArchetype;
    });

    return (
        <div>
            {/* Sticky Filter Bar */}
            <div className="sticky top-0 z-40 bg-midnight/95 backdrop-blur-sm border-b border-gray-800 py-4 mb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap gap-4 items-center justify-center md:justify-between">
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto no-scrollbar">
                        <span className="text-gold text-xs font-bold uppercase tracking-widest whitespace-nowrap">Filter By:</span>

                        {/* Series Filter */}
                        <select
                            value={selectedSeries}
                            onChange={(e) => setSelectedSeries(e.target.value)}
                            className="bg-charcoal text-cream text-sm rounded-sm border-none focus:ring-1 focus:ring-gold py-1 px-3 cursor-pointer"
                        >
                            <option value="All">All Series</option>
                            {seriesList.map(series => (
                                <option key={series} value={series}>{series}</option>
                            ))}
                        </select>

                        {/* Role Filter */}
                        <select
                            value={selectedRole}
                            onChange={(e) => setSelectedRole(e.target.value)}
                            className="bg-charcoal text-cream text-sm rounded-sm border-none focus:ring-1 focus:ring-gold py-1 px-3 cursor-pointer"
                        >
                            {roles.map(role => (
                                <option key={role} value={role}>{role}</option>
                            ))}
                        </select>

                        {/* Archetype Filter */}
                        <select
                            value={selectedArchetype}
                            onChange={(e) => setSelectedArchetype(e.target.value)}
                            className="bg-charcoal text-cream text-sm rounded-sm border-none focus:ring-1 focus:ring-gold py-1 px-3 cursor-pointer"
                        >
                            <option value="All">All Archetypes</option>
                            {archetypes.map(arch => (
                                <option key={arch as string} value={arch as string}>{arch}</option>
                            ))}
                        </select>
                    </div>

                    <div className="text-gray-400 text-xs uppercase tracking-widest hidden md:block">
                        Showing {filteredCharacters.length} Characters
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {filteredCharacters.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-gray-400 text-lg">No characters found matching your criteria.</p>
                        <button
                            onClick={() => { setSelectedSeries("All"); setSelectedRole("All"); setSelectedArchetype("All"); }}
                            className="mt-4 text-gold hover:text-white underline"
                        >
                            Reset Filters
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredCharacters.map((char) => (
                            <CharacterCard
                                key={char._id}
                                character={{
                                    id: char._id,
                                    name: char.name,
                                    image: char.image,
                                    tagline: char.tagline,
                                    coreIdentity: char.coreIdentity,
                                    book: char.book?._id
                                }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
