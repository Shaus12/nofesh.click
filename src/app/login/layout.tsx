import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "התחברות",
  description: "התחבר לחשבונך ב-nofesh.click כדי לנהל הזמנות, מועדפים ורשימת נכסים.",
  robots: { index: true, follow: true },
};

export default function LoginLayout({
  children,
}: { children: React.ReactNode }) {
  return children;
}
