"use client";

import { useState, useEffect } from "react";
import type { UnitRow } from "@/lib/properties";

type UnitDetailsModalProps = {
  unit: UnitRow;
  unitPhotos: string[];
  onClose: () => void;
};

const AMENITIES = [
  { label: "Wi-Fi", icon: "wifi" },
  { label: "מיזוג אוויר", icon: "snow" },
  { label: "טלוויזיה", icon: "tv" },
  { label: "מייבש שיער", icon: "dryer" },
  { label: "פינת עבודה", icon: "desk" },
  { label: "פריטים חיוניים", icon: "basket" },
];

function Icon({ name }: { name: string }) {
  const c = "w-5 h-5 text-gray-600 shrink-0";
  if (name === "wifi")
    return (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={c}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M3.124 7.5A8.969 8.969 0 0 1 12 6c2.767 0 5.36.72 7.676 1.876M12 20.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
      </svg>
    );
  if (name === "snow")
    return (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={c}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
      </svg>
    );
  if (name === "tv")
    return (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={c}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125Z" />
      </svg>
    );
  if (name === "dryer")
    return (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={c}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
      </svg>
    );
  if (name === "desk")
    return (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={c}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
      </svg>
    );
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={c}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
    </svg>
  );
}

export default function UnitDetailsModal({ unit, unitPhotos, onClose }: UnitDetailsModalProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const adults = unit.max_adults ?? 0;
  const children = unit.max_children ?? 0;
  const totalGuests = adults + children;
  const price = unit.price_weekend ?? unit.price_midweek ?? 0;
  const mainImage = unitPhotos[selectedImageIndex] ?? unitPhotos[0];

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" dir="rtl" aria-modal="true" role="dialog">
      {/* Backdrop */}
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        aria-label="סגור"
      />
      {/* Modal */}
      <div className="relative w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-3xl bg-white shadow-2xl flex flex-col md:flex-row">
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 left-4 z-10 w-10 h-10 rounded-full bg-white/90 shadow-md flex items-center justify-center hover:bg-white transition-colors"
          aria-label="סגור"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Right column - Gallery (RTL) */}
        <div className="w-full md:w-1/2 flex flex-col gap-2 p-4 md:p-6 bg-gray-50">
          <div className="relative rounded-2xl overflow-hidden bg-gray-200 aspect-[4/3]">
            {mainImage ? (
              <img src={mainImage} alt={unit.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-16 h-16">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
              </div>
            )}
          </div>
          {unitPhotos.length > 1 && (
            <>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {unitPhotos.slice(0, 6).map((url, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSelectedImageIndex(i)}
                    className={`shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-colors ${selectedImageIndex === i ? "border-primary" : "border-transparent opacity-80 hover:opacity-100"}`}
                  >
                    <img src={url} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
              {unitPhotos.length > 2 && (
                <div className="grid grid-cols-2 gap-2">
                  {unitPhotos.slice(1, 3).map((url, i) => (
                    <div key={i} className="rounded-xl overflow-hidden bg-gray-200 aspect-video">
                      <img src={url} alt="" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Left column - Info (RTL) */}
        <div className="w-full md:w-1/2 flex flex-col p-6 md:p-8 overflow-y-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{unit.name}</h2>
          <p className="text-gray-600 text-base mb-6">
            {unit.bedroom_count} חדרי שינה · עד {totalGuests} אורחים ({adults} מבוגרים{children > 0 ? `, ${children} ילדים` : ""})
          </p>

          {/* מה כלול בחדר הזה */}
          <h3 className="text-lg font-bold text-gray-900 mb-3">מה כלול בחדר הזה</h3>
          <div className="grid grid-cols-2 gap-x-4 gap-y-3 mb-6">
            {AMENITIES.map((a) => (
              <div key={a.label} className="flex items-center gap-3">
                <Icon name={a.icon} />
                <span className="text-gray-700 text-sm">{a.label}</span>
              </div>
            ))}
          </div>
          <p className="text-primary text-sm font-medium mb-6">הצגת כל השירותים לאורחים</p>

          {/* מידע על החדר + מחיר */}
          <h3 className="text-lg font-bold text-gray-900 mb-3">מידע על החדר</h3>
          <div className="mb-6">
            <p className="text-3xl font-bold text-gray-900">₪{price.toLocaleString()} <span className="text-lg font-normal text-gray-500">סה"כ</span></p>
            <p className="text-gray-500 text-sm mt-1">/ לילה (סוף שבוע)</p>
          </div>

          <a
            href="#booking-form"
            onClick={onClose}
            className="mt-auto w-full py-4 rounded-xl bg-primary text-white text-center font-bold text-lg hover:bg-primary/90 transition-colors shadow-lg"
          >
            ביצוע הזמנה
          </a>
        </div>
      </div>
    </div>
  );
}
