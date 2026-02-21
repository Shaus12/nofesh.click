/** Base URL for canonical links, OG images, sitemap. Set in production. */
export function getBaseUrl(): string {
  if (typeof process.env.NEXT_PUBLIC_SITE_URL === "string" && process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  return "https://nofesh.click";
}

export const SITE_NAME = "nofesh.click";
export const DEFAULT_DESCRIPTION =
  "החופש שלך מתחיל בטבע. גלה את האוסף הנבחר של הצימרים, הוילות ובקתות האירוח היפות ביותר בישראל.";
export const DEFAULT_TITLE = "Nofesh Click BNB - חופשות יוקרה וצימרים";
