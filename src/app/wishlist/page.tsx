"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useState } from "react";

export default function WishlistPage() {
    const [favorites, setFavorites] = useState([1, 3]);

    const listings = [
        {
            id: 1,
            title: "סוויטת יוקרה גלילית",
            location: "ראש פינה",
            rating: 4.92,
            price: "₪1,200",
            image: "https://images.unsplash.com/photo-1571896349842-68c894913d3e?q=80&w=2070&auto=format&fit=crop"
        },
        {
            id: 3,
            title: "בקתה במדבר",
            location: "מצפה רמון",
            rating: 4.88,
            price: "₪850",
            image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop"
        }
    ];

    const removeFavorite = (id: number) => {
        setFavorites(favorites.filter(fid => fid !== id));
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />

            <main className="container mx-auto px-6 pt-32 pb-20">
                <div className="max-w-5xl mx-auto">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">המועדפים שלי</h1>

                    {listings.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {listings.filter(item => favorites.includes(item.id)).map((item) => (
                                <div key={item.id} className="group bg-card bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200">
                                    <Link href={`/room/1`} className="block">
                                        <div className="relative aspect-[4/3] overflow-hidden">
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                            {/* Heart icon - filled */}
                                            <button
                                                onClick={(e) => { e.preventDefault(); e.stopPropagation(); removeFavorite(item.id); }}
                                                className="absolute top-3 left-3 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-transform"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-red-500">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                                </svg>
                                            </button>
                                            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full flex items-center gap-1 text-sm font-semibold">
                                                <span className="text-yellow-500">★</span>
                                                <span>{item.rating}</span>
                                            </div>
                                        </div>
                                    </Link>
                                    <div className="p-5">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-bold text-lg text-gray-900">{item.title}</h3>
                                        </div>
                                        <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                            </svg>
                                            <span>{item.location}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <span className="text-primary font-bold text-lg">{item.price}</span>
                                                <span className="text-gray-400 text-sm"> / לילה</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <h2 className="text-xl text-gray-500">עדיין אין לך פריטים ברשימת המועדפים.</h2>
                            <Link href="/" className="text-primary hover:underline mt-4 inline-block">חזור לדף הבית</Link>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}
