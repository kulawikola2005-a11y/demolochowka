import GonnaHero from "@/components/sections/GonnaHero";
import GonnaAbout from "@/components/sections/GonnaAbout";
import MosaicGallery from "@/components/sections/MosaicGallery";
import StarReviews from "@/components/sections/StarReviews";
import CTASection from "@/components/sections/CTASection";
import GonnaContact from "@/components/sections/GonnaContact";
import MapSection from "@/components/sections/MapSection";
import FooterSection from "@/components/sections/FooterSection";

export default function Home() {
  return (
    <div className="bg-stone-50">
      {/* Hero full-width */}
      <GonnaHero />

      {/* Reszta w kontenerze */}
      <main className="mx-auto max-w-6xl px-4">
        <GonnaAbout />
        <MosaicGallery />
        <StarReviews />
        <CTASection />
        <GonnaContact />
        <MapSection />
      </main>

      {/* Footer zwykle full-width */}
      <FooterSection />
    </div>
  );
}
