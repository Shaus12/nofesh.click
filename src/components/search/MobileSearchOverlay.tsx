"use client";

import { useState, useEffect } from "react";
import { DayPicker, DateRange } from "react-day-picker";
import { format } from "date-fns";
import { he } from "date-fns/locale";
import "react-day-picker/dist/style.css";

interface Guests {
    adults: number;
    children: number;
    infants: number;
    pets: number;
}

interface MobileSearchOverlayProps {
    isOpen: boolean;
    onClose: () => void;
    onSearch: (location: string, dateRange: DateRange | undefined, guests: Guests) => void;
    initialLocation: string;
    initialDateRange: DateRange | undefined;
    initialGuests: Guests;
}

export default function MobileSearchOverlay({
    isOpen,
    onClose,
    onSearch,
    initialLocation,
    initialDateRange,
    initialGuests
}: MobileSearchOverlayProps) {
    const [step, setStep] = useState<"location" | "dates" | "guests">("location");
    const [location, setLocation] = useState(initialLocation);
    const [dateRange, setDateRange] = useState<DateRange | undefined>(initialDateRange);
    const [guests, setGuests] = useState<Guests>(initialGuests);

    // Reset state when opening
    useEffect(() => {
        if (isOpen) {
            setLocation(initialLocation);
            setDateRange(initialDateRange);
            setGuests(initialGuests);
            setStep("location");
        }
    }, [isOpen, initialLocation, initialDateRange, initialGuests]);

    if (!isOpen) return null;

    const handleSearch = () => {
        onSearch(location, dateRange, guests);
        onClose();
    };

    const updateGuests = (type: keyof Guests, delta: number) => {
        setGuests({
            ...guests,
            [type]: Math.max(0, guests[type] + delta)
        });
    };

    const counters = [
        { key: 'adults', label: 'מבוגרים', sub: 'גיל 13 ומעלה' },
        { key: 'children', label: 'ילדים', sub: 'גילאים 2-12' },
        { key: 'infants', label: 'תינוקות', sub: 'מתחת לגיל 2' },
        { key: 'pets', label: 'חיות מחמד', sub: 'חיות שירות מתקבלות בברכה' },
    ] as const;

    const formatDateRange = () => {
        if (!dateRange?.from) return "הוסף תאריכים";
        if (!dateRange.to) return format(dateRange.from, "d בMMM", { locale: he });
        return `${format(dateRange.from, "d בMMM", { locale: he })} - ${format(dateRange.to, "d בMMM", { locale: he })}`;
    };

    const formatGuests = () => {
        const total = guests.adults + guests.children;
        if (total === 0) return "הוסף אורחים";
        return `${total} אורחים`;
    };

    return (
        <div className="fixed inset-0 z-50 bg-[#F7F7F7] flex flex-col animate-in slide-in-from-bottom duration-300">
            {/* Header */}
            <div className="bg-white px-4 py-4 flex items-center justify-between shadow-sm relative z-10">
                <button
                    onClick={onClose}
                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 border border-gray-200"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <div className="flex gap-4 text-sm font-semibold">
                    <button onClick={() => setStep("location")} className={step === "location" ? "text-gray-900 border-b-2 border-gray-900 pb-1" : "text-gray-500"}>יעדים</button>
                    <button onClick={() => setStep("dates")} className={step === "dates" ? "text-gray-900 border-b-2 border-gray-900 pb-1" : "text-gray-500"}>תאריכים</button>
                    <button onClick={() => setStep("guests")} className={step === "guests" ? "text-gray-900 border-b-2 border-gray-900 pb-1" : "text-gray-500"}>אורחים</button>
                </div>
                <div className="w-8" /> {/* Spacer for centering */}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">

                {/* Location Section */}
                <div className={`bg-white rounded-2xl p-5 shadow-sm transition-all duration-300 ${step === "location" ? "ring-2 ring-black" : ""}`} onClick={() => setStep("location")}>
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-bold text-gray-500">לאן?</span>
                        {step !== "location" && <span className="text-sm font-semibold">{location || "גמיש"}</span>}
                    </div>
                    {step === "location" && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
                            <input
                                type="text"
                                placeholder="חיפוש יעדים"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg p-3 text-lg font-semibold focus:outline-none focus:border-black"
                                autoFocus
                            />
                            <div className="space-y-2 mt-4">
                                <div className="text-xs font-bold text-gray-500 uppercase mb-2">יעדים פופולריים</div>
                                {["תל אביב", "אילת", "ירושלים", "צפון", "דרום"].map((loc) => (
                                    <button
                                        key={loc}
                                        onClick={(e) => { e.stopPropagation(); setLocation(loc); setStep("dates"); }}
                                        className="flex items-center gap-3 w-full p-2 hover:bg-gray-50 rounded-lg transition-colors"
                                    >
                                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-gray-600">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                            </svg>
                                        </div>
                                        <span className="font-medium text-gray-700">{loc}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Dates Section */}
                <div className={`bg-white rounded-2xl p-5 shadow-sm transition-all duration-300 ${step === "dates" ? "ring-2 ring-black" : ""}`} onClick={() => setStep("dates")}>
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-bold text-gray-500">מתי?</span>
                        {step !== "dates" && <span className="text-sm font-semibold">{formatDateRange()}</span>}
                    </div>
                    {step === "dates" && (
                        <div className="animate-in fade-in slide-in-from-top-2 flex justify-center">
                            <DayPicker
                                mode="range"
                                selected={dateRange}
                                onSelect={setDateRange}
                                locale={he}
                                numberOfMonths={1}
                                disabled={{ before: new Date() }}
                                classNames={{
                                    selected: "bg-primary text-white hover:bg-primary/90 rounded-md",
                                    range_middle: "bg-primary/20 text-primary hover:bg-primary/30 rounded-none",
                                    range_start: "bg-primary text-white hover:bg-primary/90 rounded-l-md rounded-r-none",
                                    range_end: "bg-primary text-white hover:bg-primary/90 rounded-r-md rounded-l-none",
                                    today: "font-bold text-primary",
                                    chevron: "fill-primary",
                                    root: "w-full",
                                    month: "space-y-4 w-full",
                                    caption: "flex justify-center pt-1 relative items-center mb-4",
                                    caption_label: "text-lg font-bold text-gray-900",
                                    nav: "flex items-center",
                                    nav_button: "h-8 w-8 bg-transparent hover:bg-gray-100 p-1 rounded-md transition-colors",
                                    nav_button_previous: "absolute left-1",
                                    nav_button_next: "absolute right-1",
                                    table: "w-full border-collapse",
                                    head_row: "flex w-full justify-between mb-2",
                                    head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
                                    row: "flex w-full justify-between mt-2",
                                    cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                                    day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-gray-100 rounded-md transition-colors",
                                    day_range_end: "day-range-end",
                                    day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                                    day_today: "bg-accent text-accent-foreground",
                                    day_outside: "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
                                    day_disabled: "text-muted-foreground opacity-50",
                                }}
                            />
                        </div>
                    )}
                </div>

                {/* Guests Section */}
                <div className={`bg-white rounded-2xl p-5 shadow-sm transition-all duration-300 ${step === "guests" ? "ring-2 ring-black" : ""}`} onClick={() => setStep("guests")}>
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-bold text-gray-500">מי?</span>
                        {step !== "guests" && <span className="text-sm font-semibold">{formatGuests()}</span>}
                    </div>
                    {step === "guests" && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-top-2 pt-2">
                            {counters.map((counter) => (
                                <div key={counter.key} className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                                    <div>
                                        <div className="font-bold text-gray-800">{counter.label}</div>
                                        <div className="text-sm text-gray-500">{counter.sub}</div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); updateGuests(counter.key, -1); }}
                                            disabled={guests[counter.key] === 0}
                                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-gray-800 hover:text-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                        >
                                            -
                                        </button>
                                        <span className="w-4 text-center font-medium">{guests[counter.key]}</span>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); updateGuests(counter.key, 1); }}
                                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-gray-800 hover:text-gray-800 transition-colors"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Sticky Footer */}
            <div className="bg-white p-4 border-t border-gray-200 flex justify-between items-center shrink-0">
                <button
                    onClick={() => {
                        setLocation("");
                        setDateRange(undefined);
                        setGuests(initialGuests);
                    }}
                    className="font-bold text-gray-900 underline text-sm"
                >
                    נקה הכל
                </button>
                <button
                    onClick={handleSearch}
                    className="bg-primary hover:bg-primary/90 text-white font-bold px-8 py-3 rounded-lg flex items-center gap-2 transition-colors shadow-lg"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                    <span>חיפוש</span>
                </button>
            </div>
        </div>
    );
}
