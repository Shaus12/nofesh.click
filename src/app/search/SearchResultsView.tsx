"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { DateRange } from "react-day-picker";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchComponent from "@/components/search/SearchComponent";
import type { SearchPropertyResult } from "@/lib/properties";

function parseSearchParamsFromRecord(
  params: Record<string, string | string[] | undefined>
): {
  initialLocation: string;
  initialDateRange: DateRange | undefined;
  initialGuests: { adults: number; children: number; infants: number; pets: number };
  locationDisplay: string;
} {
  const get = (k: string) => {
    const v = params[k];
    return Array.isArray(v) ? v[0] : v ?? "";
  };
  const location = get("location");
  const checkIn = get("checkIn");
  const checkOut = get("checkOut");
  const totalGuests = Math.max(0, parseInt(get("guests"), 10)) || 1;
  const adults = totalGuests;
  const children = 0;
  let initialDateRange: DateRange | undefined;
  if (checkIn) {
    initialDateRange = { from: new Date(checkIn) };
    if (checkOut) initialDateRange.to = new Date(checkOut);
  }
  return {
    initialLocation: location,
    initialDateRange,
    initialGuests: { adults, children, infants: 0, pets: 0 },
    locationDisplay: location,
  };
}

type SearchResultsViewProps = {
  results: SearchPropertyResult[];
  searchParams: Record<string, string | string[] | undefined>;
};

export default function SearchResultsView({
  results,
  searchParams,
}: SearchResultsViewProps) {
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const parsed = useMemo(
    () => parseSearchParamsFromRecord(searchParams),
    [searchParams]
  );

  const filteredByPrice = useMemo(() => {
    return results.filter((p) => {
      if (priceMin && p.price < parseInt(priceMin, 10)) return false;
      if (priceMax && p.price > parseInt(priceMax, 10)) return false;
      return true;
    });
  }, [results, priceMin, priceMax]);

  return (
    <div className="min-h-screen bg-background font-sans" dir="rtl">
      <Navbar />
      <main className="container mx-auto px-4 py-8 mt-16">
        <div className="max-w-4xl w-full mx-auto mb-10">
          <SearchComponent
            redirectToSearchPage
            initialLocation={parsed.initialLocation}
            initialDateRange={parsed.initialDateRange}
            initialGuests={parsed.initialGuests}
          />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
          תוצאות חיפוש
          {parsed.locationDisplay && (
            <span className="text-primary font-normal mr-2">
              — {parsed.locationDisplay}
            </span>
          )}
        </h1>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 min-w-0">
            {filteredByPrice.length === 0 ? (
              <div className="bg-card rounded-2xl border border-border p-12 text-center">
                <p className="text-muted-foreground text-lg mb-4">
                  לא נמצאו נכסים התואמים את החיפוש.
                </p>
                <p className="text-muted-foreground text-sm">
                  נסה לשנות את המיקום או את המסננים.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {filteredByPrice.map((property) => (
                  <Link
                    key={property.id}
                    href={`/room/${property.id}`}
                    className="group bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-border"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={
                          property.image ||
                          "https://images.unsplash.com/photo-1587061949409-02df41d5e562?q=80&w=600&auto=format&fit=crop"
                        }
                        alt={property.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5">
                      <h2 className="font-bold text-lg text-foreground mb-1 group-hover:text-primary transition-colors">
                        {property.name}
                      </h2>
                      <p className="text-muted-foreground text-sm mb-3 flex items-center gap-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                        </svg>
                        {property.city}
                      </p>
                      <p className="text-primary font-bold text-lg">
                        החל מ- ₪{property.price.toLocaleString()}
                        <span className="text-muted-foreground font-normal text-sm mr-1">
                          ללילה
                        </span>
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <aside className="lg:w-72 shrink-0">
            <div className="sticky top-24 bg-card border border-border rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-foreground mb-4">
                סינון תוצאות
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    מחיר מינימלי (₪)
                  </label>
                  <input
                    type="number"
                    min="0"
                    placeholder="0"
                    value={priceMin}
                    onChange={(e) => setPriceMin(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    מחיר מקסימלי (₪)
                  </label>
                  <input
                    type="number"
                    min="0"
                    placeholder="ללא הגבלה"
                    value={priceMax}
                    onChange={(e) => setPriceMax(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setPriceMin("");
                    setPriceMax("");
                  }}
                  className="w-full text-sm font-medium text-primary hover:underline"
                >
                  נקה מסננים
                </button>
              </div>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}
