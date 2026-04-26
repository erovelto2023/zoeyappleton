"use client";

import { useState, useEffect } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function GlossaryClient() {
    const [terms, setTerms] = useState<any[]>([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    
    const [searchQuery, setSearchQuery] = useState("");
    const [activeLetter, setActiveLetter] = useState<string | null>("All");
    const [isLoading, setIsLoading] = useState(true);

    const fetchTerms = async (currentPage: number, query: string, letter: string | null) => {
        setIsLoading(true);
        try {
            const params = new URLSearchParams();
            params.set("page", currentPage.toString());
            params.set("limit", "12");
            if (query) params.set("search", query);
            if (letter && letter !== "All") params.set("letter", letter);

            const res = await fetch(`/api/glossary/search?${params.toString()}`);
            if (res.ok) {
                const data = await res.json();
                setTerms(data.terms);
                setTotal(data.total);
                setTotalPages(data.totalPages);
            }
        } catch (error) {
            console.error("Failed to fetch terms:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        // Reset to page 1 when filters change
        setPage(1);
        fetchTerms(1, searchQuery, activeLetter);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchQuery, activeLetter]);

    useEffect(() => {
        // Fetch when page changes, but skip initial load (handled above)
        if (page > 1 || (!searchQuery && activeLetter === "All")) {
            fetchTerms(page, searchQuery, activeLetter);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        if (e.target.value) setActiveLetter(null); // Clear letter filter when searching
        else setActiveLetter("All");
    };

    const handleLetterClick = (letter: string) => {
        setActiveLetter(letter);
        setSearchQuery(""); // Clear search when clicking a letter
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto -mt-20 mb-12 relative z-20">
                <div className="relative glass-dark rounded-full p-2 flex items-center border border-gold/30 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                    <Search className="w-5 h-5 text-gold ml-4" />
                    <Input 
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Search by term, definition, or concept..." 
                        className="border-0 bg-transparent text-white placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 text-lg"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Left Sidebar: A-Z Filter */}
                <div className="lg:col-span-1">
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sticky top-24 shadow-sm">
                        <h3 className="text-sm font-bold tracking-widest uppercase mb-6 text-slate-900 dark:text-white flex items-center">
                            <span className="w-4 h-4 bg-gold rounded-sm mr-3"></span>
                            A-Z Filter
                        </h3>
                        <div className="grid grid-cols-4 gap-2">
                            <button
                                onClick={() => handleLetterClick("All")}
                                className={`aspect-square flex items-center justify-center rounded-full text-sm font-bold transition-all ${
                                    activeLetter === "All" 
                                    ? "bg-gold text-slate-900 shadow-md" 
                                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                                }`}
                            >
                                All
                            </button>
                            {ALPHABET.map((letter) => (
                                <button
                                    key={letter}
                                    onClick={() => handleLetterClick(letter)}
                                    className={`aspect-square flex items-center justify-center rounded-full text-sm font-bold transition-all ${
                                        activeLetter === letter 
                                        ? "bg-gold text-slate-900 shadow-md" 
                                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                                    }`}
                                >
                                    {letter}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Side: Results */}
                <div className="lg:col-span-3 min-h-[500px]">
                    {isLoading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : terms.length === 0 ? (
                        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-16 text-center shadow-sm">
                            <Search className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
                            <h3 className="text-2xl font-serif font-bold text-slate-900 dark:text-white mb-2">No results found</h3>
                            <p className="text-slate-500 mb-6">
                                {searchQuery 
                                    ? `No terms found for "${searchQuery}"` 
                                    : `No terms found starting with "${activeLetter}"`}
                            </p>
                            <Button 
                                variant="outline" 
                                onClick={() => handleLetterClick("All")}
                                className="text-gold border-gold hover:bg-gold/10"
                            >
                                Clear Filters
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {terms.map((term) => (
                                    <Link key={term.slug} href={`/glossary/${term.slug}`} className="group h-full">
                                        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 h-full flex flex-col transition-all hover:border-gold hover:shadow-[0_10px_30px_rgba(212,175,55,0.1)] hover:-translate-y-1">
                                            <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-gold transition-colors line-clamp-1">{term.keyword}</h4>
                                            <p className="text-sm text-gold/90 italic mb-4 line-clamp-2">"{term.hook}"</p>
                                            <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-3 mb-6 flex-grow">{term.definition}</p>
                                            
                                            <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs">
                                                <span className="text-slate-500 flex items-center font-medium">
                                                    Read More <ChevronRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                                                </span>
                                                {term.heatLevel && (
                                                    <span className="text-slate-400">🔥 {term.heatLevel}</span>
                                                )}
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex justify-center items-center gap-4 pt-8">
                                    <Button 
                                        variant="outline" 
                                        size="icon"
                                        onClick={() => setPage(p => Math.max(1, p - 1))}
                                        disabled={page === 1}
                                    >
                                        <ChevronLeft className="w-4 h-4" />
                                    </Button>
                                    <span className="text-sm text-slate-600 dark:text-slate-400">
                                        Page <span className="font-bold text-slate-900 dark:text-white">{page}</span> of {totalPages}
                                    </span>
                                    <Button 
                                        variant="outline" 
                                        size="icon"
                                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                        disabled={page === totalPages}
                                    >
                                        <ChevronRight className="w-4 h-4" />
                                    </Button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
