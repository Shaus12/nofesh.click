"use client";

import { useState } from "react";

export default function Hero() {
    const [location, setLocation] = useState("");
    const [dates, setDates] = useState("");
    const [guests, setGuests] = useState("");

    const handleSearch = () => {
        const section = document.getElementById("recommended");
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="relative h-screen min-h-[700px] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
            {/* Video Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-black/30 z-10" />
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                    poster="https://images.unsplash.com/photo-1587061949409-02df41d5e562?q=80&w=2070&auto=format&fit=crop"
                >
                    <source src="https://videos.pexels.com/video-files/4253174/4253174-uhd_2560_1440_25fps.mp4" type="video/mp4" />
                </video>
            </div>

            <div className="relative z-20 max-w-5xl mx-auto space-y-8 mt-10">
                <h1 className="text-5xl md:text-[72px] leading-tight font-bold text-white tracking-tight drop-shadow-lg">
                    החופש שלך מתחיל בטבע
                </h1>
                <p className="text-xl md:text-2xl text-white/95 max-w-2xl mx-auto font-medium drop-shadow-sm">
                    גלה את האוסף הנבחר של הצימרים, הוילות ובקתות האירוח היפות ביותר בישראל.
                </p>

                {/* Search Box */}
                <div className="bg-white/90 backdrop-blur-xl shadow-[0_10px_40px_-10px_rgba(45,79,68,0.15)] rounded-full p-2 pl-2 pr-2 w-full max-w-4xl border border-white/50 mt-12 mx-auto">
                    <div className="flex flex-col md:flex-row items-center gap-0">

                        {/* Inputs */}
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-0 w-full">
                            <div className="relative px-6 py-3 md:border-l border-gray-200 text-right group cursor-pointer hover:bg-gray-50/50 rounded-full transition-colors">
                                <label className="block text-xs font-bold text-gray-800 mb-1 group-hover:text-primary transition-colors">מיקום</label>
                                <input
                                    type="text"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    placeholder="לאן תרצו לנסוע?"
                                    className="w-full bg-transparent border-none p-0 text-gray-600 placeholder:text-gray-400 focus:outline-none focus:ring-0 text-sm font-medium"
                                />
                            </div>
                            <div className="relative px-6 py-3 md:border-l border-gray-200 text-right group cursor-pointer hover:bg-gray-50/50 rounded-full transition-colors">
                                <label className="block text-xs font-bold text-gray-800 mb-1 group-hover:text-primary transition-colors">תאריכים</label>
                                <input
                                    type="text"
                                    value={dates}
                                    onChange={(e) => setDates(e.target.value)}
                                    placeholder="הוסף תאריכים"
                                    className="w-full bg-transparent border-none p-0 text-gray-600 placeholder:text-gray-400 focus:outline-none focus:ring-0 text-sm font-medium"
                                />
                            </div>
                            <div className="relative px-6 py-3 text-right group cursor-pointer hover:bg-gray-50/50 rounded-full transition-colors">
                                <label className="block text-xs font-bold text-gray-800 mb-1 group-hover:text-primary transition-colors">אורחים</label>
                                <input
                                    type="text"
                                    value={guests}
                                    onChange={(e) => setGuests(e.target.value)}
                                    placeholder="הוסף אורחים"
                                    className="w-full bg-transparent border-none p-0 text-gray-600 placeholder:text-gray-400 focus:outline-none focus:ring-0 text-sm font-medium"
                                />
                            </div>
                        </div>

                        {/* Search Button */}
                        <div className="flex-shrink-0 mr-2">
                            <button
                                onClick={handleSearch}
                                className="bg-primary text-white w-14 h-14 rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-lg hover:bg-primary/90 active:scale-95"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-8 h-8 opacity-60">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
                </svg>
            </div>
        </div>
    );
}
