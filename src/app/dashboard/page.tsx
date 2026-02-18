"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function DashboardPage() {
    // Mock data for bookings
    const upcomingTrips = [
        {
            id: 1,
            title: "סוויטת יוקרה גלילית",
            location: "ראש פינה",
            image: "https://images.unsplash.com/photo-1571896349842-68c894913d3e?q=80&w=2070&auto=format&fit=crop",
            dates: "15-18 מרץ 2026",
            guests: "זוג + 2 ילדים",
            price: "₪4,500",
            status: "approved"
        }
    ];

    const pastTrips = [
        {
            id: 2,
            title: "בקתה במדבר",
            location: "מצפה רמון",
            image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop",
            dates: "10-12 פברואר 2026",
            guests: "זוג",
            price: "₪2,200",
            status: "completed"
        }
    ];

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />

            <main className="container mx-auto px-6 pt-32 pb-20">
                <div className="max-w-5xl mx-auto">

                    {/* Header */}
                    <div className="mb-10">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">שלום, שי</h1>
                        <p className="text-gray-600">ברוך שובך! הנה סיכום החופשות שלך.</p>
                    </div>

                    {/* Stats/Quick Actions */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                            <div>
                                <div className="text-3xl font-bold text-primary">1</div>
                                <div className="text-sm font-medium text-gray-500">חופשות קרובות</div>
                            </div>
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0h18M5.25 12h13.5h-13.5Zm0 3.75h9.75h-9.75Z" />
                                </svg>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                            <div>
                                <div className="text-3xl font-bold text-gray-800">12</div>
                                <div className="text-sm font-medium text-gray-500">מועדפים</div>
                            </div>
                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                </svg>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                            <div>
                                <div className="text-3xl font-bold text-gray-800">0</div>
                                <div className="text-sm font-medium text-gray-500">הודעות חדשות</div>
                            </div>
                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Upcoming Trips */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">חופשות קרובות</h2>
                        <div className="space-y-4">
                            {upcomingTrips.map((trip) => (
                                <div key={trip.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden flex flex-col md:flex-row hover:shadow-md transition-shadow">
                                    <div className="relative w-full md:w-64 h-48 md:h-auto">
                                        <img src={trip.image} alt={trip.title} className="w-full h-full object-cover" />
                                        <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                            מאושר
                                        </div>
                                    </div>
                                    <div className="p-6 flex-1 flex flex-col justify-between">
                                        <div>
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <h3 className="text-xl font-bold text-gray-900">{trip.title}</h3>
                                                    <p className="text-gray-500">{trip.location}</p>
                                                </div>
                                                <div className="text-lg font-bold text-primary">{trip.price}</div>
                                            </div>
                                            <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-600">
                                                <div className="flex items-center gap-1">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0h18M5.25 12h13.5h-13.5Zm0 3.75h9.75h-9.75Z" />
                                                    </svg>
                                                    {trip.dates}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                                    </svg>
                                                    {trip.guests}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-6 flex gap-3">
                                            <Link href={`/room/1`} className="bg-gray-900 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                                                פרטי הזמנה
                                            </Link>
                                            <button className="text-gray-600 px-5 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors border border-gray-200">
                                                צור קשר עם המארח
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Past Trips (Collapsible or simpler list) */}
                    <div>
                        <h2 className="text-xl font-bold text-gray-800 mb-4 opacity-70">היסטוריית חופשות</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 opacity-70 hover:opacity-100 transition-opacity">
                            {pastTrips.map((trip) => (
                                <div key={trip.id} className="bg-white border border-gray-200 rounded-xl p-4 flex gap-4">
                                    <img src={trip.image} alt={trip.title} className="w-20 h-20 object-cover rounded-lg" />
                                    <div>
                                        <h4 className="font-bold text-gray-900">{trip.title}</h4>
                                        <p className="text-sm text-gray-500 mb-1">{trip.dates}</p>
                                        <span className="inline-block bg-gray-100 text-gray-600 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full">
                                            הושלם
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </main>
            <Footer />
        </div>
    );
}
