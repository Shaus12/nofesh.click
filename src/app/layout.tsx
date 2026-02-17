import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin", "hebrew"],
});

export const metadata: Metadata = {
  title: "Nofesh Click BNB - חופשות יוקרה וצימרים",
  description: "החופש שלך מתחיל בטבע. גלה את האוסף הנבחר של הצימרים, הוילות ובקתות האירוח היפות ביותר בישראל.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body
        className={`${rubik.variable} antialiased font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
