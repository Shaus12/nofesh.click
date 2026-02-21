"use client";

import { useState, useEffect, useRef } from "react";
import { filterRegionsByQuery } from "./popularRegions";

type LocationComboboxProps = {
  value: string;
  onSelect: (region: string) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  placeholder?: string;
  label?: string;
  /** Desktop: popover aligns under trigger. RTL-aware. */
  className?: string;
  /** When true, use compact styling for inline bar (e.g. desktop search bar) */
  variant?: "default" | "inline";
};

export default function LocationCombobox({
  value,
  onSelect,
  open,
  onOpenChange,
  placeholder = "אזור / יישוב",
  label = "אזור / יישוב",
  className = "",
  variant = "inline",
}: LocationComboboxProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = filterRegionsByQuery(query);

  useEffect(() => {
    if (open) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open, onOpenChange]);

  const handleSelect = (region: string) => {
    onSelect(region);
    onOpenChange(false);
  };

  return (
    <div className={`relative ${className}`} dir="rtl">
      {/* Trigger: shows current value or placeholder */}
      <button
        type="button"
        onClick={() => onOpenChange(true)}
        className={`w-full text-right rounded-full transition-colors group ${
          variant === "inline"
            ? "px-8 py-3 hover:bg-gray-50"
            : "p-3 rounded-2xl border border-gray-200 hover:border-gray-300"
        } ${open ? "bg-gray-100 shadow-sm" : ""}`}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <span className="block text-xs font-bold text-gray-800 mb-0.5 group-hover:text-primary transition-colors">
          {label}
        </span>
        <span
          className={`block text-sm font-medium truncate ${
            value ? "text-gray-700" : "text-gray-400"
          }`}
        >
          {value || placeholder}
        </span>
      </button>

      {/* Popover: Command-style dropdown */}
      {open && (
        <div
          className="absolute top-full mt-2 w-full min-w-[280px] max-w-[min(100%,400px)] bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200"
          role="listbox"
        >
          <div className="p-2 border-b border-gray-100">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="חפש אזור..."
              className="w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm"
              dir="rtl"
            />
          </div>
          <div className="py-1 max-h-[280px] overflow-y-auto">
            <div className="px-3 py-2 text-xs font-bold text-gray-500 uppercase tracking-wide">
              אזורים מבוקשים
            </div>
            {filtered.length === 0 ? (
              <div className="px-4 py-6 text-center text-gray-500 text-sm">
                לא נמצאו אזורים
              </div>
            ) : (
              <ul className="pb-2">
                {filtered.map((region) => (
                  <li key={region}>
                    <button
                      type="button"
                      onClick={() => handleSelect(region)}
                      className={`flex items-center gap-3 w-full px-4 py-3 text-right hover:bg-gray-50 transition-colors text-sm font-medium ${
                        value === region ? "bg-primary/10 text-primary" : "text-gray-800"
                      }`}
                      role="option"
                      aria-selected={value === region}
                    >
                      <span className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="w-5 h-5 text-gray-500"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 0 1 15 0Z"
                          />
                        </svg>
                      </span>
                      <span>{region}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
