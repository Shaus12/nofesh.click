import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import { getBaseUrl } from "@/lib/site";
import "./globals.css";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin", "hebrew"],
});

const baseUrl = getBaseUrl();

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Nofesh Click BNB - חופשות יוקרה וצימרים",
    template: "%s | nofesh.click",
  },
  description:
    "החופש שלך מתחיל בטבע. גלה את האוסף הנבחר של הצימרים, הוילות ובקתות האירוח היפות ביותר בישראל.",
  keywords: [
    "צימרים",
    "וילות נופש",
    "בקתות",
    "חופשות בישראל",
    "השכרת צימרים",
    "נופש בצפון",
    "צימרים בגליל",
    "וילות יוקרה",
  ],
  authors: [{ name: "nofesh.click", url: baseUrl }],
  creator: "nofesh.click",
  publisher: "nofesh.click",
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: "website",
    locale: "he_IL",
    url: baseUrl,
    siteName: "nofesh.click",
    title: "Nofesh Click BNB - חופשות יוקרה וצימרים",
    description:
      "החופש שלך מתחיל בטבע. גלה את האוסף הנבחר של הצימרים, הוילות ובקתות האירוח היפות ביותר בישראל.",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "nofesh.click - צימרים ווילות נופש בישראל",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nofesh Click BNB - חופשות יוקרה וצימרים",
    description:
      "החופש שלך מתחיל בטבע. גלה צימרים, וילות ובקתות אירוח בישראל.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: { canonical: baseUrl },
  verification: {
    // Uncomment and set when you have them:
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "nofesh.click",
  url: baseUrl,
  description:
    "הפלטפורמה המובילה להזמנת צימרים, וילות ובקתות נופש בישראל.",
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: `${baseUrl}/?location={search_term_string}` },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body className={`${rubik.variable} antialiased font-sans`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
