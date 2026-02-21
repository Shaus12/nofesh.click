"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { he } from "date-fns/locale";
import DateRangePicker from "./DateRangePicker";
import GuestSelector from "./GuestSelector";
import LocationCombobox from "./LocationCombobox";
import MobileSearchOverlay from "./MobileSearchOverlay";

export type SearchComponentProps = {
    /** When true, submitting search navigates to /search with query params */
    redirectToSearchPage?: boolean;
    /** When true, hide the dates field (e.g. hero section) */
    hideDates?: boolean;
    initialLocation?: string;
    initialDateRange?: DateRange | undefined;
    initialGuests?: { adults: number; children: number; infants: number; pets: number };
};

export default function SearchComponent({
    redirectToSearchPage = false,
    hideDates = false,
    initialLocation = "",
    initialDateRange,
    initialGuests = { adults: 0, children: 0, infants: 0, pets: 0 },
}: SearchComponentProps = {}) {
    const router = useRouter();
    const [location, setLocation] = useState(initialLocation);
    const [dateRange, setDateRange] = useState<DateRange | undefined>(initialDateRange);
    const [guests, setGuests] = useState(initialGuests);

    const [activeTab, setActiveTab] = useState<"location" | "dates" | "guests" | null>(null);
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);

    // Sync from URL/initial when on search page (use primitives to avoid infinite loop from new object refs)
    useEffect(() => {
        setLocation(initialLocation);
        setDateRange(initialDateRange);
        setGuests(initialGuests);
    }, [
        initialLocation,
        initialDateRange?.from?.getTime(),
        initialDateRange?.to?.getTime(),
        initialGuests.adults,
        initialGuests.children,
        initialGuests.infants,
        initialGuests.pets,
    ]);

    // Close popovers when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setActiveTab(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSearch = () => {
        setActiveTab(null);
        if (redirectToSearchPage) {
            const params = new URLSearchParams();
            if (location.trim()) params.set("location", location.trim());
            if (dateRange?.from) params.set("checkIn", format(dateRange.from, "yyyy-MM-dd"));
            if (dateRange?.to) params.set("checkOut", format(dateRange.to, "yyyy-MM-dd"));
            const totalGuests = guests.adults + guests.children;
            params.set("guests", String(totalGuests > 0 ? totalGuests : 1));
            router.push(`/search?${params.toString()}`);
            return;
        }
        const section = document.getElementById("recommended");
        if (section) section.scrollIntoView({ behavior: "smooth" });
    };

    const handleMobileSearchSubmit = (newLocation: string, newDateRange: DateRange | undefined, newGuests: { adults: number; children: number; infants: number; pets: number }) => {
        setLocation(newLocation);
        setDateRange(newDateRange);
        setGuests(newGuests);
        setActiveTab(null);
        if (redirectToSearchPage) {
            const params = new URLSearchParams();
            if (newLocation.trim()) params.set("location", newLocation.trim());
            if (newDateRange?.from) params.set("checkIn", format(newDateRange.from, "yyyy-MM-dd"));
            if (newDateRange?.to) params.set("checkOut", format(newDateRange.to, "yyyy-MM-dd"));
            const totalGuests = newGuests.adults + newGuests.children;
            params.set("guests", String(totalGuests > 0 ? totalGuests : 1));
            router.push(`/search?${params.toString()}`);
            return;
        }
        const section = document.getElementById("recommended");
        if (section) section.scrollIntoView({ behavior: "smooth" });
    };

    const formatDateRange = () => {
        if (!dateRange?.from) return "הוסף תאריכים";
        if (!dateRange.to) return format(dateRange.from, "d בMMM", { locale: he });
        return `${format(dateRange.from, "d בMMM", { locale: he })} - ${format(dateRange.to, "d בMMM", { locale: he })}`;
    };

    const formatGuests = () => {
        const total = guests.adults + guests.children;
        if (total === 0) return "הוסף אורחים";
        let text = `${total} אורחים`;
        if (guests.infants > 0) text += `, ${guests.infants} תינוקות`;
        if (guests.pets > 0) text += `, ${guests.pets} חיות מחמד`;
        return text;
    };

    return (
        <>
            <div ref={containerRef} className="bg-white rounded-full shadow-2xl border border-gray-200 p-0 max-w-4xl w-full mx-auto relative z-30">

                {/* Mobile Trigger Button (Overlay trigger) */}
                <button
                    className="md:hidden w-full flex items-center p-3 rounded-full"
                    onClick={() => setIsMobileSearchOpen(true)}
                >
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center ml-3 text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </div>
                    <div className="flex-1 text-right">
                        <div className="text-sm font-bold text-gray-900">{location || "אזור / יישוב"}</div>
                        <div className="text-xs text-gray-500 flex gap-1">
                            {!hideDates && (
                                <>
                                    <span>{dateRange?.from ? formatDateRange() : "תאריכים"}</span>
                                    <span>•</span>
                                </>
                            )}
                            <span>{guests.adults + guests.children > 0 ? formatGuests() : "הרכב אורחים"}</span>
                        </div>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-full px-3 py-1 flex items-center gap-2 text-xs font-bold shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                        </svg>
                    </div>
                </button>

                {/* Desktop Search Bar (Existing Implementation) */}
                <div className="hidden md:flex flex-col md:flex-row h-auto md:h-16 relative">

                    {/* Location: Popover/Command dropdown (אזורים מבוקשים) */}
                    <div className="flex-1 relative">
                        <LocationCombobox
                            value={location}
                            onSelect={setLocation}
                            open={activeTab === "location"}
                            onOpenChange={(open) => setActiveTab(open ? "location" : null)}
                            placeholder="אזור או יישוב"
                            label="אזור / יישוב"
                            variant="inline"
                        />
                    </div>

                    {!hideDates && (
                        <>
                            <div className="hidden md:block w-px bg-gray-200 my-3" />
                            <div
                                onClick={() => setActiveTab("dates")}
                                className={`flex-1 relative px-8 py-3 rounded-full cursor-pointer transition-colors group ${activeTab === "dates" ? "bg-gray-100 shadow-sm" : "hover:bg-gray-50"}`}
                            >
                                <label className="block text-xs font-bold text-gray-800 mb-0.5 group-hover:text-primary transition-colors">תאריכים (אופציונלי)</label>
                                <div className={`text-sm font-medium truncate ${!dateRange?.from ? "text-gray-400" : "text-gray-700"}`}>
                                    {formatDateRange()}
                                </div>
                                {activeTab === "dates" && (
                                    <div className="absolute top-full right-0 md:right-auto md:left-1/2 md:-translate-x-1/2 mt-4 z-50 animate-in fade-in zoom-in-95 duration-200">
                                        <DateRangePicker
                                            dateRange={dateRange}
                                            setDateRange={setDateRange}
                                            onClose={() => setActiveTab(null)}
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="hidden md:block w-px bg-gray-200 my-3" />
                        </>
                    )}

                    {/* Guests Input */}
                    <div
                        onClick={() => setActiveTab("guests")}
                        className={`flex-1 relative px-8 py-3 rounded-full cursor-pointer transition-colors group ${activeTab === "guests" ? "bg-gray-100 shadow-sm" : "hover:bg-gray-50"
                            }`}
                    >
                        <div className="flex justify-between items-center h-full">
                            <div className="flex-1 overflow-hidden">
                                <label className="block text-xs font-bold text-gray-800 mb-0.5 group-hover:text-primary transition-colors">הרכב אורחים</label>
                                <div className={`text-sm font-medium truncate ${guests.adults + guests.children === 0 ? "text-gray-400" : "text-gray-700"}`}>
                                    {formatGuests()}
                                </div>
                            </div>
                            {/* Search Button (inside the input area for desktop) */}
                            <div className="pr-2">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleSearch();
                                    }}
                                    className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-lg hover:bg-primary/90 active:scale-95"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Guest Selector Popover */}
                        {activeTab === "guests" && (
                            <div className="absolute top-full left-0 mt-4 z-50">
                                <GuestSelector
                                    guests={guests}
                                    setGuests={setGuests}
                                    onClose={() => setActiveTab(null)}
                                />
                            </div>
                        )}
                    </div>

                </div>

            </div>

            {/* Mobile Search Overlay */}
            <MobileSearchOverlay
                isOpen={isMobileSearchOpen}
                onClose={() => setIsMobileSearchOpen(false)}
                onSearch={handleMobileSearchSubmit}
                initialLocation={location}
                initialDateRange={dateRange}
                initialGuests={guests}
                hideDates={hideDates}
            />
        </>
    );
}
