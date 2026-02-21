"use server";

import { getPropertiesByIds } from "@/lib/properties";
import type { HomePageProperty } from "@/lib/properties";

export async function getWishlistProperties(
  ids: number[]
): Promise<HomePageProperty[]> {
  if (ids.length === 0) return [];
  return getPropertiesByIds(ids);
}
