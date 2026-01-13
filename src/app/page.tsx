import SiteHeader from "@/components/SiteHeader";
import { site } from "@/data/site";
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
    <main className="bg-stone-50">
      <SiteHeader />
      <GonnaHero />
      <GonnaAbout />
      <MosaicGallery />
      <StarReviews />
      <CTASection />
      <GonnaContact />
      <MapSection />

      <FooterSection />
    </main>
  );
}
