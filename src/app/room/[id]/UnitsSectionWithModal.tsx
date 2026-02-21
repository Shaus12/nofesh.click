"use client";

import { useState } from "react";
import type { UnitRow } from "@/lib/properties";
import UnitDetailsModal from "./UnitDetailsModal";

type UnitsSectionWithModalProps = {
  units: UnitRow[];
  unitPhotosMap: Record<number, string[]>;
};

function UnitCardButton({
  unit,
  unitPhotos,
  onClick,
}: {
  unit: UnitRow;
  unitPhotos: string[];
  onClick: () => void;
}) {
  const adults = unit.max_adults ?? 0;
  const children = unit.max_children ?? 0;
  const price = unit.price_weekend ?? unit.price_midweek ?? 0;
  const photoUrls = unitPhotos.slice(0, 4);

  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative w-full text-right bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
    >
      {photoUrls.length > 0 ? (
        <div className="flex gap-1 h-40 bg-gray-100 overflow-hidden">
          {photoUrls.map((url, i) => (
            <div key={i} className="flex-1 min-w-0 relative">
              <img
                src={url}
                alt=""
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="h-32 bg-gray-100 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-12 h-12 text-gray-300">
            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
          </svg>
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary">
              <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
          </div>
          <h3 className="font-bold text-xl text-foreground">{unit.name}</h3>
          {unitPhotos.length > 0 && (
            <span className="text-xs text-gray-500 font-medium">({unitPhotos.length} תמונות)</span>
          )}
        </div>
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>עד {adults + children} אורחים ({adults} מבוגרים, {children} ילדים)</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>{unit.bedroom_count} חדרי שינה</span>
          </div>
        </div>
        <div className="pt-4 border-t border-gray-100">
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold text-primary">₪{price.toLocaleString()}</span>
            <span className="text-gray-500 text-sm">/ לילה</span>
          </div>
        </div>
      </div>
    </button>
  );
}

export default function UnitsSectionWithModal({ units, unitPhotosMap }: UnitsSectionWithModalProps) {
  const [selectedUnit, setSelectedUnit] = useState<{ unit: UnitRow; photos: string[] } | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 gap-6">
        {units.map((unit) => (
          <UnitCardButton
            key={unit.id}
            unit={unit}
            unitPhotos={unitPhotosMap[unit.id] ?? []}
            onClick={() => setSelectedUnit({ unit, photos: unitPhotosMap[unit.id] ?? [] })}
          />
        ))}
      </div>
      {selectedUnit && (
        <UnitDetailsModal
          unit={selectedUnit.unit}
          unitPhotos={selectedUnit.photos}
          onClose={() => setSelectedUnit(null)}
        />
      )}
    </>
  );
}
