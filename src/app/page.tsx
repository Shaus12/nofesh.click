import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import { getBaseUrl } from "@/lib/site";
import { getPublishedProperties } from "@/lib/properties";

export const metadata = {
  title: "Nofesh Click BNB - חופשות יוקרה וצימרים",
  description:
    "החופש שלך מתחיל בטבע. גלה את האוסף הנבחר של הצימרים, הוילות ובקתות האירוח היפות ביותר בישראל.",
  openGraph: {
    title: "Nofesh Click BNB - חופשות יוקרה וצימרים",
    description:
      "החופש שלך מתחיל בטבע. גלה את האוסף הנבחר של הצימרים, הוילות ובקתות האירוח היפות ביותר בישראל.",
    url: getBaseUrl(),
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "nofesh.click",
  url: getBaseUrl(),
  description:
    "החופש שלך מתחיל בטבע. גלה צימרים, וילות ובקתות אירוח בישראל.",
  inLanguage: "he",
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: `${getBaseUrl()}/?location={search_term_string}` },
    "query-input": "required name=search_term_string",
  },
};

export default async function Home() {
  const listings = await getPublishedProperties();
  return (
    <main className="min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <Navbar />
      <Hero />
      <Features listings={listings} />
      <Footer />
    </main>
  );
}
