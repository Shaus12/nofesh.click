import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "חיפוש נכסים",
  description:
    "חפש צימרים, וילות ובקתות נופש בישראל לפי אזור, תאריכים ומספר אורחים.",
  robots: { index: true, follow: true },
};

export default function SearchLayout({
  children,
}: { children: React.ReactNode }) {
  return children;
}
