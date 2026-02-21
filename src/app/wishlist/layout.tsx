import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "מועדפים",
  description: "רשימת הצימרים והוילות המועדפים שלך ב-nofesh.click.",
  robots: { index: false, follow: true },
};

export default function WishlistLayout({
  children,
}: { children: React.ReactNode }) {
  return children;
}
