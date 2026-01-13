import SiteHeader from "@/components/SiteHeader";
import HeroSection from "@/components/sections/HeroSection";
import GallerySection from "@/components/sections/GallerySection";
import AmenitiesSection from "@/components/sections/AmenitiesSection";
import AttractionsSection from "@/components/sections/AttractionsSection";
import ReviewsSection from "@/components/sections/ReviewsSection";

export default function Home() {
  return (
    <main>
      <SiteHeader />
      <HeroSection />
      <GallerySection />
      <AmenitiesSection />
      <AttractionsSection />
      <ReviewsSection />

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="rounded-3xl border p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold">Gotowa na rezerwację?</h3>
            <p className="text-gray-600 mt-1">Sprawdź terminy i wyślij zapytanie w 30 sekund.</p>
          </div>
          <a
            href="/rezerwacja"
            className="rounded-xl bg-black text-white px-5 py-3 text-sm font-medium"
          >
            Rezerwuj termin
          </a>
        </div>
      </section>
    </main>
  );
}
