import MosaicGallery from "@/components/sections/MosaicGallery";

export default function GalleryPage() {
  return (
    <main className="bg-stone-50 min-h-screen">
      <MosaicGallery />

      <footer className="container-page pb-10 text-sm text-neutral-500">
        © {new Date().getFullYear()} Domek w Krynicy
      </footer>
    </main>
  );
}
