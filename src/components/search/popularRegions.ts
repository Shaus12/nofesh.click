/**
 * Predefined list of regions for the location combobox.
 * Maps to search/DB later (e.g. properties.city or region_id).
 */
export const POPULAR_REGIONS = [
  "כל הארץ",
  "צפון",
  "כנרת והעמקים",
  "רמת הגולן",
  "גליל עליון",
  "מרכז",
  "ירושלים והסביבה",
  "דרום",
  "הנגב",
  "מצפה רמון",
  "ים המלח",
  "אילת",
] as const;

export type PopularRegion = (typeof POPULAR_REGIONS)[number];

export function filterRegionsByQuery(query: string): string[] {
  const q = query.trim().toLowerCase();
  if (!q) return [...POPULAR_REGIONS];
  return POPULAR_REGIONS.filter((region) =>
    region.toLowerCase().includes(q)
  );
}
