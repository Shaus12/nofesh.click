import { supabase } from "@/lib/supabase";

export type MediaRow = { file_url: string; is_main: boolean; unit_id?: number | null };
export type UnitRow = {
  id: number;
  name: string;
  max_adults: number;
  max_children: number;
  bedroom_count: number;
  price_midweek: number | null;
  price_weekend: number | null;
};

export type PropertyRow = {
  id: number;
  host_id: number;
  region_id: number;
  name: string;
  slug: string | null;
  description_short: string | null;
  description_full: string | null;
  city: string;
  address: string | null;
  check_in_time: string | null;
  check_out_time: string | null;
  is_kosher: boolean;
  status: string;
};

export type PropertyWithRelations = PropertyRow & {
  media: MediaRow[];
  units: UnitRow[];
};

export type HomePageProperty = {
  id: number;
  name: string;
  city: string;
  image: string;
  priceFrom: number;
};

/**
 * Fetch all published properties for the home page ("כל הצימרים").
 * Table: properties. Filter: status = 'published'.
 * Image: media where is_main, else media[0]. Price: min(units.price_weekend).
 */
export async function getPublishedProperties(): Promise<HomePageProperty[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("properties")
    .select("id, name, city, description_short, media(file_url, is_main), units(price_weekend)")
    .eq("status", "published");

  if (error) {
    console.error("getPublishedProperties error:", error);
    return [];
  }

  if (!data || !Array.isArray(data)) return [];

  return data.map((row: Record<string, unknown>) => {
    const id = Number(row.id);
    const name = String(row.name ?? "");
    const city = String(row.city ?? "");
    const media = (row.media as MediaRow[]) ?? [];
    const units = (row.units as { price_weekend: number | null }[]) ?? [];
    const mainMedia = media.find((m) => m.is_main) ?? media[0];
    const image = mainMedia?.file_url ?? "";
    const prices = units
      .map((u) => (u as { price_weekend: number | null }).price_weekend)
      .filter((p): p is number => p != null)
      .map(Number);
    const priceFrom = prices.length > 0 ? Math.min(...prices) : 0;
    return { id, name, city, image, priceFrom };
  });
}

/**
 * Fetch a single property by id with media and units for the room page.
 */
export async function getPropertyById(
  id: string
): Promise<PropertyWithRelations | null> {
  if (!supabase) return null;
  const numId = parseInt(id, 10);
  if (Number.isNaN(numId)) return null;

  const { data, error } = await supabase
    .from("properties")
    .select("*, media(*), units(*)")
    .eq("id", numId)
    .single();

  if (error || !data) {
    if (error?.code === "PGRST116") return null; // no rows
    console.error("getPropertyById error:", error);
    return null;
  }

  return data as unknown as PropertyWithRelations;
}

/**
 * Get main image URL from property media array.
 */
export function getMainImageUrl(media: MediaRow[]): string {
  const main = media?.find((m) => m.is_main) ?? media?.[0];
  return main?.file_url ?? "";
}

/**
 * Fetch published property ids for generateStaticParams and sitemap.
 */
export async function getPublishedPropertyIds(): Promise<{ id: string }[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("properties")
    .select("id")
    .eq("status", "published");
  if (error || !data) return [];
  return data.map((row: { id: number }) => ({ id: String(row.id) }));
}

export type SearchPropertyResult = {
  id: string;
  name: string;
  city: string;
  image: string;
  price: number;
};

/**
 * Search published properties (for search results page).
 * Filters by city (location) if provided, and by capacity (units can accommodate guests).
 * No date filtering (lead-based flow).
 */
export async function getSearchProperties(params: {
  location?: string;
  guests?: number;
}): Promise<SearchPropertyResult[]> {
  if (!supabase) return [];
  let query = supabase
    .from("properties")
    .select("id, name, city, media(file_url, is_main), units(price_weekend, max_adults, max_children)")
    .eq("status", "published");

  const location = params.location?.trim();
  if (location) {
    query = query.or(`city.ilike.%${location}%,name.ilike.%${location}%`);
  }

  const { data, error } = await query;
  if (error) {
    console.error("getSearchProperties error:", error);
    return [];
  }
  if (!data || !Array.isArray(data)) return [];

  const minGuests = Math.max(0, params.guests ?? 0);
  type UnitRow = { price_weekend: number | null; max_adults: number; max_children: number };

  return data
    .map((row: Record<string, unknown>) => {
      const id = String(row.id);
      const name = String(row.name ?? "");
      const city = String(row.city ?? "");
      const media = (row.media as MediaRow[]) ?? [];
      const units = (row.units as UnitRow[]) ?? [];
      const mainMedia = media.find((m) => m.is_main) ?? media[0];
      const image = mainMedia?.file_url ?? "";
      const prices = units
        .map((u) => u?.price_weekend)
        .filter((p): p is number => p != null)
        .map(Number);
      const price = prices.length > 0 ? Math.min(...prices) : 0;
      const maxCapacity = units.reduce(
        (sum, u) => Math.max(sum, (u.max_adults ?? 0) + (u.max_children ?? 0)),
        0
      );
      return { id, name, city, image, price, maxCapacity };
    })
    .filter((p) => minGuests === 0 || p.maxCapacity >= minGuests)
    .map(({ maxCapacity: _c, ...rest }) => rest);
}

/**
 * Fetch published properties by ids (e.g. for wishlist).
 */
export async function getPropertiesByIds(
  ids: number[]
): Promise<HomePageProperty[]> {
  if (!supabase || ids.length === 0) return [];
  const { data, error } = await supabase
    .from("properties")
    .select("id, name, city, media(file_url, is_main), units(price_weekend)")
    .eq("status", "published")
    .in("id", ids);

  if (error || !data || !Array.isArray(data)) return [];

  return data.map((row: Record<string, unknown>) => {
    const id = Number(row.id);
    const name = String(row.name ?? "");
    const city = String(row.city ?? "");
    const media = (row.media as MediaRow[]) ?? [];
    const units = (row.units as { price_weekend: number | null }[]) ?? [];
    const mainMedia = media.find((m) => m.is_main) ?? media[0];
    const image = mainMedia?.file_url ?? "";
    const prices = units
      .map((u) => (u as { price_weekend: number | null }).price_weekend)
      .filter((p): p is number => p != null)
      .map(Number);
    const priceFrom = prices.length > 0 ? Math.min(...prices) : 0;
    return { id, name, city, image, priceFrom };
  });
}
