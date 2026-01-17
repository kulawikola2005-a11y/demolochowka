import GonnaHero from "@/components/sections/GonnaHero";
import GonnaAbout from "@/components/sections/GonnaAbout";
import MosaicGallery from "@/components/sections/MosaicGallery";
import StarReviews from "@/components/sections/StarReviews";
import CTASection from "@/components/sections/CTASection";
import GonnaContact from "@/components/sections/GonnaContact";
import MapSection from "@/components/sections/MapSection";
import FooterSection from "@/components/sections/FooterSection";
import AttractionsSection from "@/components/sections/AttractionsSection";

export default function Home() {
  return (
    <div className="bg-stone-50">
      <GonnaHero />

      {/* sekcje w kontenerze */}
      <main className="mx-auto max-w-6xl">
        <GonnaAbout />
        <MosaicGallery />
        <AttractionsSection />
      </main>

      {/* FULL WIDTH pasek */}
      <StarReviews />

      {/* FULL WIDTH pasek */}
      <CTASection />

      {/* znowu kontener */}
      <main className="mx-auto max-w-6xl">
        <GonnaContact />
      </main>

      <MapSection />
      <FooterSection />
    </div>
  );
}
