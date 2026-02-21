"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { getStoredFavoriteIds } from "@/lib/wishlist";
import { useState, useEffect } from "react";

export default function DashboardPage() {
  const [favoriteCount, setFavoriteCount] = useState(0);

  useEffect(() => {
    setFavoriteCount(getStoredFavoriteIds().length);
  }, []);

  const upcomingTrips: never[] = [];
  const pastTrips: never[] = [];

  return (
    <div className="bg-gray-50 min-h-screen" dir="rtl">
      <Navbar />
      <main className="container mx-auto px-6 pt-32 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              הדשבורד שלי
            </h1>
            <p className="text-gray-600">
              כאן תוכל לראות את החופשות וההזמנות שלך (לאחר התחברות).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-primary">0</div>
                <div className="text-sm font-medium text-gray-500">חופשות קרובות</div>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0h18M5.25 12h13.5h-13.5Zm0 3.75h9.75h-9.75Z" />
                </svg>
              </div>
            </div>
            <Link href="/wishlist" className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="text-3xl font-bold text-gray-800">{favoriteCount}</div>
                <div className="text-sm font-medium text-gray-500">מועדפים</div>
              </div>
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                </svg>
              </div>
            </Link>
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

          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">חופשות קרובות</h2>
            {upcomingTrips.length === 0 ? (
              <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center">
                <p className="text-muted-foreground mb-4">אין חופשות קרובות.</p>
                <Link href="/search" className="text-primary font-medium hover:underline">
                  חפש נכסים
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {upcomingTrips.map(() => null)}
              </div>
            )}
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4 opacity-70">
              היסטוריית חופשות
            </h2>
            {pastTrips.length === 0 ? (
              <p className="text-muted-foreground text-sm">אין היסטוריה עדיין.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 opacity-70 hover:opacity-100 transition-opacity">
                {pastTrips.map(() => null)}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
