import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  getPropertyById,
  getPublishedPropertyIds,
  getMainImageUrl,
  type PropertyWithRelations,
  type UnitRow,
} from "@/lib/properties";
import { getBaseUrl } from "@/lib/site";
import LeadBookingForm from "./LeadBookingForm";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const property = await getPropertyById(id);
  const baseUrl = getBaseUrl();

  if (!property) {
    return { title: "נכס לא נמצא" };
  }

  const title = `${property.name} - צימר ב${property.city}`;
  const description =
    (property.description_short ?? property.description_full ?? "").slice(0, 155) + "…";
  const canonical = `${baseUrl}/room/${id}`;
  const image = getMainImageUrl(property.media ?? []);

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "nofesh.click",
      images: image ? [{ url: image, width: 1200, height: 630, alt: `${property.name} - ${property.city}` }] : [],
      locale: "he_IL",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : [],
    },
    robots: { index: true, follow: true },
  };
}

export async function generateStaticParams() {
  return getPublishedPropertyIds();
}

function PropertyJsonLd({ property, id }: { property: PropertyWithRelations; id: string }) {
  const baseUrl = getBaseUrl();
  const image = getMainImageUrl(property.media ?? []);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "@id": `${baseUrl}/room/${id}#lodging`,
    name: property.name,
    description: property.description_short ?? property.description_full ?? "",
    url: `${baseUrl}/room/${id}`,
    image: image ? [image] : [],
    address: {
      "@type": "PostalAddress",
      addressLocality: property.city,
      streetAddress: property.address ?? undefined,
      addressRegion: "Israel",
      addressCountry: "IL",
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

function UnitCard({ unit }: { unit: UnitRow }) {
  const capacity = (unit.max_adults ?? 0) + (unit.max_children ?? 0);
  const price = unit.price_weekend ?? unit.price_midweek ?? 0;
  return (
    <div className="bg-card border border-border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
      <h3 className="font-bold text-lg text-foreground mb-2">{unit.name}</h3>
      <ul className="space-y-1 text-sm text-muted-foreground mb-3">
        <li>{unit.bedroom_count} חדרי שינה</li>
        <li>עד {capacity} אורחים</li>
      </ul>
      <p className="text-primary font-bold text-lg">
        ₪{price.toLocaleString()}
        <span className="text-muted-foreground font-normal text-sm mr-1">/ לילה (סוף שבוע)</span>
      </p>
    </div>
  );
}

export default async function RoomPage({ params }: Props) {
  const { id } = await params;
  const property = await getPropertyById(id);

  if (!property) notFound();

  const mainImage = getMainImageUrl(property.media ?? []);
  const units = (property.units ?? []) as UnitRow[];

  return (
    <div className="min-h-screen bg-background font-sans" dir="rtl">
      <PropertyJsonLd property={property} id={id} />
      <Navbar />

      <main className="container mx-auto px-4 py-8 mt-16">
        {/* Header */}
        <header className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            {property.name}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-muted-foreground">
            <span className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
              {property.city}
              {property.address && ` · ${property.address}`}
            </span>
            {property.is_kosher && (
              <span className="inline-flex items-center gap-1 bg-primary/10 text-primary px-2.5 py-1 rounded-full text-sm font-medium">
                כשר
              </span>
            )}
          </div>
        </header>

        {/* Hero image */}
        <div className="rounded-2xl overflow-hidden shadow-sm mb-10 aspect-[21/9] max-h-[400px] bg-muted">
          {mainImage ? (
            <img
              src={mainImage}
              alt={property.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              אין תמונה
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Content column */}
          <div className="md:col-span-2 space-y-10">
            {/* About */}
            <section aria-labelledby="about-heading">
              <h2 id="about-heading" className="text-2xl font-bold mb-4">
                אודות המקום
              </h2>
              <div
                className="text-muted-foreground leading-relaxed text-lg whitespace-pre-line"
              >
                {property.description_full || property.description_short || "אין תיאור."}
              </div>
            </section>

            {/* Check-in / Check-out */}
            {(property.check_in_time || property.check_out_time) && (
              <section aria-labelledby="times-heading" className="border-t border-border pt-8">
                <h2 id="times-heading" className="text-2xl font-bold mb-4">
                  זמני כניסה ויציאה
                </h2>
                <ul className="space-y-2 text-muted-foreground">
                  {property.check_in_time && (
                    <li>צ׳ק-אין: {property.check_in_time}</li>
                  )}
                  {property.check_out_time && (
                    <li>צ׳ק-אאוט: {property.check_out_time}</li>
                  )}
                </ul>
              </section>
            )}

            {/* Units */}
            {units.length > 0 && (
              <section aria-labelledby="units-heading" className="border-t border-border pt-8">
                <h2 id="units-heading" className="text-2xl font-bold mb-6">
                  יחידות אירוח
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {units.map((unit) => (
                    <UnitCard key={unit.id} unit={unit} />
                  ))}
                </div>
              </section>
            )}

            {/* Location placeholder */}
            <section aria-labelledby="location-heading" className="border-t border-border pt-8">
              <h2 id="location-heading" className="text-2xl font-bold mb-4">
                מיקום
              </h2>
              <div className="h-64 bg-gray-200 rounded-xl flex items-center justify-center text-muted-foreground">
                📍 {property.city}
                {property.address && ` · ${property.address}`}
              </div>
            </section>
          </div>

          {/* Sidebar: Lead form */}
          <div className="md:col-span-1">
            <LeadBookingForm propertyId={Number(property.id)} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
