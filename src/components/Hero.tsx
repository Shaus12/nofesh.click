"use client";

import SearchComponent from "./search/SearchComponent";

export default function Hero() {

    return (
        <div className="relative h-screen min-h-[700px] flex flex-col items-center justify-center text-center px-4">
            {/* Video Background */}
            <div className="absolute inset-0 z-0 overflow-hidden">
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

            <div className="relative z-20 max-w-5xl mx-auto space-y-8 mt-10 w-full">
                <h1 className="text-5xl md:text-[72px] leading-tight font-bold text-white tracking-tight drop-shadow-lg">
                    החופש שלך מתחיל בטבע
                </h1>
                <p className="text-xl md:text-2xl text-white/95 max-w-2xl mx-auto font-medium drop-shadow-sm">
                    גלה את האוסף הנבחר של הצימרים, הוילות ובקתות האירוח היפות ביותר בישראל.
                </p>

                {/* Search Box Component */}
                <div className="mt-12 w-full flex justify-center px-4">
                    <SearchComponent redirectToSearchPage hideDates />
                </div>
            </div>
        </div>
    );
}
