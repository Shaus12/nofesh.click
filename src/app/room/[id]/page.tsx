"use client";

import { use, useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ALL_ROOMS: Record<string, {
    id: string; title: string; location: string; price: number; rating: number; reviews: number;
    description: string; images: string[];
    amenities: { icon: string; label: string }[];
}> = {
    "1": {
        id: "1", title: "אחוזת היער", location: "אמירים, גליל עליון", price: 1200, rating: 4.98, reviews: 124,
        description: "חופשה חלומית בלב הטבע. הבקתה שלנו ממוקמת בקצה הישוב אמירים, מוקפת בחורש טבעי ומשקיפה לכנרת. המקום עוצב בקפידה כדי להעניק לאורחים חוויה של שקט, רוגע ויוקרה. מתאים לזוגות המחפשים רומנטיקה או למשפחות קטנות.",
        images: [
            "https://images.unsplash.com/photo-1587061949409-02df41d5e562?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=600&auto=format&fit=crop",
        ],
        amenities: [
            { icon: "wifi", label: "אינטרנט אלחוטי" }, { icon: "pool", label: "בריכה פרטית" },
            { icon: "ac", label: "מיזוג אוויר" }, { icon: "tv", label: "טלוויזיה חכמה" },
            { icon: "parking", label: "חניה חינם" }, { icon: "kitchen", label: "מטבח מאובזר" },
            { icon: "hottub", label: "ג׳קוזי" }, { icon: "view", label: "נוף להרים" },
        ],
    },
    "2": {
        id: "2", title: "נוף לחרמון", location: "נווה אטי״ב", price: 1500, rating: 4.85, reviews: 87,
        description: "וילה מפנקת עם נוף ישירות להר חרמון. הסוויטה הרומנטית כוללת ג׳קוזי חיצוני, מטבח מאובזר, וסלון מרווח עם קמין. מיקום מושלם לחופשת סקי בחורף או טיולי טבע מרהיבים בקיץ.",
        images: [
            "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1587061949409-02df41d5e562?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=600&auto=format&fit=crop",
        ],
        amenities: [
            { icon: "wifi", label: "אינטרנט אלחוטי" }, { icon: "ac", label: "מיזוג אוויר" },
            { icon: "tv", label: "טלוויזיה חכמה" }, { icon: "parking", label: "חניה חינם" },
            { icon: "kitchen", label: "מטבח מאובזר" }, { icon: "hottub", label: "ג׳קוזי" },
            { icon: "view", label: "נוף להרים" }, { icon: "fireplace", label: "קמין" },
        ],
    },
    "3": {
        id: "3", title: "Desert Soul", location: "מצפה רמון", price: 950, rating: 4.92, reviews: 63,
        description: "בקתה ייחודית בלב המדבר, עם נוף לעין פני המכתש הגדול. עיצוב מינימליסטי עם חומרים טבעיים, מרפסת פרטית לצפייה בכוכבים, ושקט מוחלט. חוויה שלא תשכחו.",
        images: [
            "https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1587061949409-02df41d5e562?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=600&auto=format&fit=crop",
        ],
        amenities: [
            { icon: "wifi", label: "אינטרנט אלחוטי" }, { icon: "ac", label: "מיזוג אוויר" },
            { icon: "parking", label: "חניה חינם" }, { icon: "view", label: "נוף למדבר" },
            { icon: "terrace", label: "מרפסת פרטית" }, { icon: "kitchen", label: "מטבחון" },
        ],
    },
    "4": {
        id: "4", title: "וילה בכרם", location: "זכרון יעקב", price: 2200, rating: 4.95, reviews: 156,
        description: "וילת יוקרה מרהיבה מוקפת בכרמים. הנכס כולל בריכה פרטית מחוממת, גינה מטופחת, 3 חדרי שינה מרווחים, סלון עם נוף פנורמי, ומטבח שף מאובזר. מושלם לחופשות משפחתיות או קבוצות חברים.",
        images: [
            "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1587061949409-02df41d5e562?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=600&auto=format&fit=crop",
        ],
        amenities: [
            { icon: "wifi", label: "אינטרנט אלחוטי" }, { icon: "pool", label: "בריכה מחוממת" },
            { icon: "ac", label: "מיזוג אוויר" }, { icon: "tv", label: "טלוויזיה חכמה" },
            { icon: "parking", label: "חניה חינם" }, { icon: "kitchen", label: "מטבח שף" },
            { icon: "hottub", label: "ג׳קוזי" }, { icon: "view", label: "נוף לכרמים" },
        ],
    },
    "5": {
        id: "5", title: "הבקתה הכפרית", location: "רמת הגולן", price: 850, rating: 4.76, reviews: 42,
        description: "בקתת עץ חמימה בסגנון כפרי מסורתי, שוכנת בלב הטבע הירוק של רמת הגולן. המקום מציע אווירה אינטימית, מרפסת עם ערסלים, וקרבה למסלולי טיול ואתרי טבע.",
        images: [
            "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1587061949409-02df41d5e562?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=600&auto=format&fit=crop",
        ],
        amenities: [
            { icon: "wifi", label: "אינטרנט אלחוטי" }, { icon: "ac", label: "מיזוג אוויר" },
            { icon: "parking", label: "חניה חינם" }, { icon: "kitchen", label: "מטבחון" },
            { icon: "view", label: "נוף לטבע" }, { icon: "terrace", label: "מרפסת עם ערסלים" },
        ],
    },
    "6": {
        id: "6", title: "סוויטה רומנטית", location: "ראש פינה", price: 1100, rating: 4.88, reviews: 95,
        description: "סוויטת בוטיק רומנטית במושבה ההיסטורית ראש פינה. עיצוב מקורי המשלב ישן וחדש, מיטה יוקרתית, ג׳קוזי פנימי, ומרפסת מרווחה עם נוף עוצר נשימה לעמק החולה. אידיאלי לזוגות.",
        images: [
            "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1587061949409-02df41d5e562?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=600&auto=format&fit=crop",
        ],
        amenities: [
            { icon: "wifi", label: "אינטרנט אלחוטי" }, { icon: "ac", label: "מיזוג אוויר" },
            { icon: "tv", label: "טלוויזיה חכמה" }, { icon: "parking", label: "חניה חינם" },
            { icon: "hottub", label: "ג׳קוזי פנימי" }, { icon: "view", label: "נוף לעמק" },
            { icon: "terrace", label: "מרפסת" }, { icon: "kitchen", label: "מטבחון" },
        ],
    },
};

function getTomorrow() {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
}
function getDayAfterTomorrow() {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split("T")[0];
}

export default function RoomPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const { id } = resolvedParams;

    const [showGallery, setShowGallery] = useState(false);
    const [galleryIndex, setGalleryIndex] = useState(0);
    const [checkIn, setCheckIn] = useState(getTomorrow());
    const [checkOut, setCheckOut] = useState(getDayAfterTomorrow());
    const [guests, setGuests] = useState(2);
    const [guestDropdownOpen, setGuestDropdownOpen] = useState(false);
    const [bookingSuccess, setBookingSuccess] = useState(false);

    const room = ALL_ROOMS[id] || ALL_ROOMS["1"];

    const nights = useMemo(() => {
        const d1 = new Date(checkIn);
        const d2 = new Date(checkOut);
        const diff = Math.round((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
        return diff > 0 ? diff : 1;
    }, [checkIn, checkOut]);

    const subtotal = room.price * nights;
    const cleaningFee = 250;
    const total = subtotal + cleaningFee;

    const handleBooking = () => {
        setBookingSuccess(true);
        setTimeout(() => setBookingSuccess(false), 4000);
    };

    return (
        <div className="min-h-screen bg-background font-sans" dir="rtl">
            <Navbar />

            {/* Full-screen Gallery Modal */}
            {showGallery && (
                <div className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center">
                    <button
                        onClick={() => setShowGallery(false)}
                        className="absolute top-6 left-6 text-white bg-white/10 hover:bg-white/20 rounded-full w-10 h-10 flex items-center justify-center text-xl transition-colors z-10"
                    >
                        ✕
                    </button>
                    <button
                        onClick={() => setGalleryIndex((prev) => (prev > 0 ? prev - 1 : room.images.length - 1))}
                        className="absolute right-6 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/20 rounded-full w-12 h-12 flex items-center justify-center text-2xl transition-colors"
                    >
                        ‹
                    </button>
                    <img
                        src={room.images[galleryIndex]}
                        alt={`תמונה ${galleryIndex + 1}`}
                        className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
                    />
                    <button
                        onClick={() => setGalleryIndex((prev) => (prev < room.images.length - 1 ? prev + 1 : 0))}
                        className="absolute left-6 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/20 rounded-full w-12 h-12 flex items-center justify-center text-2xl transition-colors"
                    >
                        ›
                    </button>
                    <div className="absolute bottom-6 text-white/70 text-sm">
                        {galleryIndex + 1} / {room.images.length}
                    </div>
                </div>
            )}

            {/* Booking Success Toast */}
            {bookingSuccess && (
                <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white px-8 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <span className="font-bold">ההזמנה התקבלה בהצלחה! ניצור איתך קשר בקרוב.</span>
                </div>
            )}

            <main className="container mx-auto px-4 py-8 mt-16">

                {/* Header Section */}
                <div className="mb-6">
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">{room.title}</h1>
                    <div className="flex items-center gap-4 text-sm md:text-base text-muted-foreground">
                        <span className="flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                            </svg>
                            {room.location}
                        </span>
                        <span className="flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-yellow-500">
                                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                            </svg>
                            <span className="font-semibold text-foreground">{room.rating}</span>
                            <span>({room.reviews} חוות דעת)</span>
                        </span>
                    </div>
                </div>

                {/* Image Gallery */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-[400px] md:h-[500px] mb-10 rounded-2xl overflow-hidden shadow-sm">
                    <div className="md:col-span-2 h-full relative cursor-pointer group" onClick={() => { setGalleryIndex(0); setShowGallery(true); }}>
                        <img src={room.images[0]} alt="Main view" className="w-full h-full object-cover group-hover:brightness-90 transition-all" />
                    </div>
                    <div className="md:col-span-1 grid grid-rows-2 gap-2 h-full">
                        <div className="relative h-full cursor-pointer group" onClick={() => { setGalleryIndex(1); setShowGallery(true); }}>
                            <img src={room.images[1]} alt="View 2" className="w-full h-full object-cover group-hover:brightness-90 transition-all" />
                        </div>
                        <div className="relative h-full cursor-pointer group" onClick={() => { setGalleryIndex(2); setShowGallery(true); }}>
                            <img src={room.images[2]} alt="View 3" className="w-full h-full object-cover group-hover:brightness-90 transition-all" />
                        </div>
                    </div>
                    <div className="md:col-span-1 grid grid-rows-2 gap-2 h-full">
                        <div className="relative h-full cursor-pointer group" onClick={() => { setGalleryIndex(3); setShowGallery(true); }}>
                            <img src={room.images[3]} alt="View 4" className="w-full h-full object-cover group-hover:brightness-90 transition-all" />
                        </div>
                        <div
                            className="relative h-full bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors"
                            onClick={() => { setGalleryIndex(0); setShowGallery(true); }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-500 ml-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
                            </svg>
                            <span className="font-semibold text-gray-600">הצג את כל התמונות</span>
                        </div>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

                    {/* Details Column */}
                    <div className="md:col-span-2 space-y-10">
                        <div>
                            <h2 className="text-2xl font-bold mb-4">אודות המקום</h2>
                            <p className="text-muted-foreground leading-relaxed text-lg">{room.description}</p>
                        </div>

                        <div className="border-t border-border pt-8">
                            <h2 className="text-2xl font-bold mb-6">מה במקום?</h2>
                            <div className="grid grid-cols-2 gap-4">
                                {room.amenities.map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-3 text-foreground/80">
                                        <div className="w-6 h-6 flex items-center justify-center text-primary">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                            </svg>
                                        </div>
                                        <span>{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="border-t border-border pt-8">
                            <h2 className="text-2xl font-bold mb-4">מיקום</h2>
                            <div className="h-64 bg-gray-200 rounded-xl flex items-center justify-center text-muted-foreground">
                                📍 {room.location} — מפה תופיע כאן (Google Maps Integration)
                            </div>
                        </div>
                    </div>

                    {/* Booking Sidebar */}
                    <div className="md:col-span-1">
                        <div className="sticky top-24 bg-card border border-border rounded-2xl p-6 shadow-lg">
                            <div className="flex justify-between items-end mb-6">
                                <div>
                                    <span className="text-2xl font-bold text-foreground">₪{room.price.toLocaleString()}</span>
                                    <span className="text-muted-foreground mr-1">/ לילה</span>
                                </div>
                                <div className="flex items-center gap-1 text-sm bg-primary/5 px-2 py-1 rounded-md">
                                    <span className="text-yellow-600 font-bold">★ {room.rating}</span>
                                </div>
                            </div>

                            {/* Interactive Date & Guest Pickers */}
                            <div className="grid grid-cols-2 border border-gray-300 rounded-lg overflow-hidden mb-4">
                                <div className="p-3 border-l border-gray-300">
                                    <label htmlFor="checkin" className="block text-xs font-bold text-gray-500 uppercase mb-1">צ׳ק-אין</label>
                                    <input
                                        id="checkin"
                                        type="date"
                                        value={checkIn}
                                        min={new Date().toISOString().split("T")[0]}
                                        onChange={(e) => {
                                            setCheckIn(e.target.value);
                                            if (e.target.value >= checkOut) {
                                                const next = new Date(e.target.value);
                                                next.setDate(next.getDate() + 1);
                                                setCheckOut(next.toISOString().split("T")[0]);
                                            }
                                        }}
                                        className="w-full text-sm font-medium bg-transparent border-none outline-none cursor-pointer"
                                    />
                                </div>
                                <div className="p-3">
                                    <label htmlFor="checkout" className="block text-xs font-bold text-gray-500 uppercase mb-1">צ׳ק-אאוט</label>
                                    <input
                                        id="checkout"
                                        type="date"
                                        value={checkOut}
                                        min={checkIn}
                                        onChange={(e) => setCheckOut(e.target.value)}
                                        className="w-full text-sm font-medium bg-transparent border-none outline-none cursor-pointer"
                                    />
                                </div>
                                <div className="col-span-2 p-3 border-t border-gray-300 relative">
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">אורחים</label>
                                    <button
                                        onClick={() => setGuestDropdownOpen(!guestDropdownOpen)}
                                        className="w-full text-sm font-medium text-right flex items-center justify-between"
                                    >
                                        <span>{guests} אורחים</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`w-4 h-4 transition-transform ${guestDropdownOpen ? "rotate-180" : ""}`}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                        </svg>
                                    </button>

                                    {/* Guest Dropdown */}
                                    {guestDropdownOpen && (
                                        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-xl mt-1 z-20 p-4 space-y-3">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-medium">מבוגרים</span>
                                                <div className="flex items-center gap-3">
                                                    <button
                                                        onClick={() => setGuests(Math.max(1, guests - 1))}
                                                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-lg hover:border-primary hover:text-primary transition-colors disabled:opacity-30"
                                                        disabled={guests <= 1}
                                                    >
                                                        −
                                                    </button>
                                                    <span className="text-sm font-bold w-4 text-center">{guests}</span>
                                                    <button
                                                        onClick={() => setGuests(Math.min(10, guests + 1))}
                                                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-lg hover:border-primary hover:text-primary transition-colors disabled:opacity-30"
                                                        disabled={guests >= 10}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => setGuestDropdownOpen(false)}
                                                className="w-full text-center text-sm font-bold text-primary hover:underline pt-2"
                                            >
                                                סגור
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <button
                                className="w-full bg-primary text-white py-3.5 rounded-xl font-bold text-lg hover:bg-primary/90 transition-transform active:scale-95 shadow-md mb-4"
                                onClick={handleBooking}
                            >
                                הזמן חופשה
                            </button>

                            <div className="text-center text-sm text-muted-foreground mb-6">
                                לא תחויב עדיין
                            </div>

                            <div className="space-y-3 pt-4 border-t border-dashed border-gray-200">
                                <div className="flex justify-between text-muted-foreground">
                                    <span>₪{room.price.toLocaleString()} x {nights} לילות</span>
                                    <span>₪{subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-muted-foreground">
                                    <span>דמי ניקיון</span>
                                    <span>₪{cleaningFee}</span>
                                </div>
                                <div className="flex justify-between text-muted-foreground">
                                    <span>דמי שירות</span>
                                    <span>₪0</span>
                                </div>
                                <div className="flex justify-between font-bold text-lg text-foreground pt-3 border-t border-gray-200">
                                    <span>סה״כ</span>
                                    <span>₪{total.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
}
