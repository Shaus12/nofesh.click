import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "רשום את הנכס",
  description: "השכר את הנכס שלך דרך nofesh.click - הצטרף למאות מארחים שמרוויחים מהשכרת צימרים ווילות.",
  robots: { index: true, follow: true },
};

export default function ListPropertyLayout({
  children,
}: { children: React.ReactNode }) {
  return children;
}
