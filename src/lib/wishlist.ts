const WISHLIST_STORAGE_KEY = "nofesh-wishlist-ids";

export function getStoredFavoriteIds(): number[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(WISHLIST_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? parsed.filter((x) => Number.isInteger(x)) : [];
  } catch {
    return [];
  }
}

export function setStoredFavoriteIds(ids: number[]) {
  try {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // ignore
  }
}
