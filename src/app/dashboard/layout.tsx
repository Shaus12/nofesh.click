import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "החופשות שלי",
  description: "ניהול החופשות וההזמנות שלך ב-nofesh.click.",
  robots: { index: false, follow: true },
};

export default function DashboardLayout({
  children,
}: { children: React.ReactNode }) {
  return children;
}
