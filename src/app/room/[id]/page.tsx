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
  type MediaRow,
} from "@/lib/properties";
import { getBaseUrl } from "@/lib/site";
import LeadBookingForm from "./LeadBookingForm";
import UnitsSectionWithModal from "./UnitsSectionWithModal";

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

/** Property-level media: cover (is_main) + general (unit_id == null). */
function getPropertyLevelMedia(media: MediaRow[]): MediaRow[] {
  return (media ?? []).filter((m) => m.unit_id == null);
}

/** Order: cover first (is_main), then rest. Return up to 5 URLs for hero gallery. */
function getGalleryImages(media: MediaRow[]): string[] {
  const propertyMedia = getPropertyLevelMedia(media);
  if (!propertyMedia.length) return [];
  const main = propertyMedia.find((m) => m.is_main) ?? propertyMedia[0];
  const rest = propertyMedia.filter((m) => m.file_url !== main?.file_url);
  const ordered = [main!.file_url, ...rest.map((m) => m.file_url)];
  return ordered.slice(0, 5);
}

/** Unit-specific photos: media where unit_id matches. */
function getUnitMedia(media: MediaRow[], unitId: number): MediaRow[] {
  return (media ?? []).filter((m) => m.unit_id === unitId);
}

function ImageGallery({
  images,
  propertyName,
  totalPropertyPhotos = 0,
}: {
  images: string[];
  propertyName: string;
  totalPropertyPhotos?: number;
}) {
  const hasMorePhotos = totalPropertyPhotos > 5;

  if (images.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 mt-24 mb-8">
        <div className="h-[450px] rounded-3xl bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center text-gray-400 shadow-sm">
          <div className="text-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-16 h-16 mx-auto mb-3 opacity-40">
              <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
            <p className="text-sm">אין תמונות זמינות</p>
          </div>
        </div>
      </div>
    );
  }

  if (images.length === 1) {
    return (
      <div className="max-w-7xl mx-auto px-6 mt-24 mb-8">
        <div className="h-[450px] rounded-3xl overflow-hidden shadow-lg">
          <img
            src={images[0]}
            alt={propertyName}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
          />
        </div>
      </div>
    );
  }

  const mainUrl = images[0];
  const gridUrls = images.slice(1, 5);

  return (
    <div className="max-w-7xl mx-auto px-6 mt-24 mb-8">
      {/* RTL: cover on right (biggest), 2x2 on left — like Airbnb */}
      <div
        className="grid grid-cols-1 md:grid-cols-5 gap-2 h-[400px] md:h-[50vh] min-h-[350px] max-h-[550px]"
        dir="rtl"
      >
        {/* Cover picture — right side, biggest (~60%); full rounded on mobile */}
        <div className="md:col-span-3 row-span-2 rounded-3xl md:rounded-l-none md:rounded-r-3xl overflow-hidden bg-gray-100 group relative">
          <img
            src={mainUrl}
            alt={propertyName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        {/* Other photos — left side, 2x2 grid (~40%) */}
        <div className="hidden md:grid grid-cols-2 grid-rows-2 gap-2 md:col-span-2 row-span-2">
          <div className="overflow-hidden bg-gray-100 group relative">
            {gridUrls[0] ? (
              <>
                <img src={gridUrls[0]} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </>
            ) : (
              <div className="w-full h-full bg-gray-200" />
            )}
          </div>
          <div className="rounded-tl-3xl overflow-hidden bg-gray-100 group relative">
            {gridUrls[1] ? (
              <>
                <img src={gridUrls[1]} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </>
            ) : (
              <div className="w-full h-full bg-gray-200" />
            )}
          </div>
          <div className="overflow-hidden bg-gray-100 group relative">
            {gridUrls[2] ? (
              <>
                <img src={gridUrls[2]} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </>
            ) : (
              <div className="w-full h-full bg-gray-200" />
            )}
          </div>
          <div className="rounded-bl-3xl overflow-hidden bg-gray-100 group relative">
            {gridUrls[3] ? (
              <>
                <img src={gridUrls[3]} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </>
            ) : (
              <div className="w-full h-full bg-gray-200" />
            )}
            {/* "Show all photos" overlay — bottom-left tile */}
            {hasMorePhotos && (
              <a
                href="#gallery"
                className="absolute bottom-3 right-3 left-3 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-black/60 hover:bg-black/75 text-white text-sm font-medium transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
                </svg>
                <span>להצגת כל התמונות</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function RoomPage({ params }: Props) {
  const { id } = await params;
  const property = await getPropertyById(id);

  if (!property) notFound();

  const media = (property.media ?? []) as MediaRow[];
  const galleryImages = getGalleryImages(media);
  const units = (property.units ?? []) as UnitRow[];
  const minPrice =
    units.length > 0
      ? Math.min(
          ...units.map((u) => u.price_weekend ?? u.price_midweek ?? Infinity).filter((p) => p !== Infinity)
        )
      : 0;

  return (
    <div className="min-h-screen bg-background font-sans" dir="rtl">
      <PropertyJsonLd property={property} id={id} />
      <Navbar />

      {/* 1. Top Image Gallery — cover + general property photos only (unit_id null) */}
      <ImageGallery
        images={galleryImages}
        propertyName={property.name}
        totalPropertyPhotos={getPropertyLevelMedia(media).length}
      />

      {/* 2. Main content vs sidebar */}
      <main className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-16 pb-20">
        {/* 3. Right column - Content (lg:col-span-2) */}
        <div className="lg:col-span-2 space-y-12">
          {/* Header */}
          <header className="space-y-4">
            <div className="flex flex-wrap items-start gap-4">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight flex-1">
                {property.name}
              </h1>
              {property.is_kosher && (
                <span className="inline-flex items-center gap-2 bg-gradient-to-br from-primary/20 to-primary/10 text-primary px-4 py-2 rounded-2xl text-sm font-bold border border-primary/20 shadow-sm">
                  <span className="text-lg">✡️</span>
                  <span>כשר</span>
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
              <span className="text-base">
                {property.city}
                {property.address ? ` · ${property.address}` : ""}
              </span>
            </div>
          </header>

          <div className="h-px bg-gradient-to-l from-transparent via-gray-200 to-transparent" />

          {/* About - על המקום */}
          <section aria-labelledby="about-heading" className="space-y-4">
            <h2 id="about-heading" className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <span className="w-1.5 h-8 bg-primary rounded-full" />
              על המקום
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="whitespace-pre-line leading-relaxed text-gray-700 text-lg">
                {property.description_full || property.description_short || "אין תיאור זמין כרגע."}
              </p>
            </div>
          </section>

          {/* Units - יחידות אירוח */}
          {units.length > 0 && (
            <section aria-labelledby="units-heading" className="space-y-6">
              <h2 id="units-heading" className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <span className="w-1.5 h-8 bg-primary rounded-full" />
                יחידות אירוח
              </h2>
              <UnitsSectionWithModal
                units={units}
                unitPhotosMap={Object.fromEntries(units.map((u) => [u.id, getUnitMedia(media, u.id).map((m) => m.file_url)]))}
              />
            </section>
          )}

          {/* Policies - נהלי המקום */}
          {(property.check_in_time || property.check_out_time) && (
            <section aria-labelledby="policies-heading" className="space-y-6">
              <h2 id="policies-heading" className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <span className="w-1.5 h-8 bg-primary rounded-full" />
                נהלי המקום
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {property.check_in_time && (
                  <div className="flex items-start gap-4 p-5 bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl hover:shadow-md transition-shadow">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">כניסה</p>
                      <p className="text-gray-600 text-lg font-medium">{property.check_in_time}</p>
                    </div>
                  </div>
                )}
                {property.check_out_time && (
                  <div className="flex items-start gap-4 p-5 bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl hover:shadow-md transition-shadow">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">יציאה</p>
                      <p className="text-gray-600 text-lg font-medium">{property.check_out_time}</p>
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}
        </div>

        {/* 4. Left column - Sticky Sidebar (lg:col-span-1) */}
        <div id="booking-form" className="lg:col-span-1 scroll-mt-28">
          <div className="sticky top-28">
            <div className="rounded-3xl border border-gray-200 bg-white shadow-2xl overflow-hidden backdrop-blur-sm">
              {minPrice > 0 && (
                <div className="p-8 bg-gradient-to-br from-primary/5 to-transparent border-b border-gray-100">
                  <p className="text-sm text-gray-600 mb-2 font-medium">מחיר התחלתי</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-gray-900">₪{minPrice.toLocaleString()}</span>
                    <span className="text-gray-500 text-base">/ לילה</span>
                  </div>
                </div>
              )}
              <div className="p-6">
                <LeadBookingForm propertyId={Number(property.id)} />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
