import MosaicGallery from "@/components/sections/MosaicGallery";

export default function GalleryPage() {
  return (
    <main className="bg-stone-50 min-h-screen">
      <MosaicGallery />
      <footer className="mx-auto w-full max-w-none px-3 sm:max-w-6xl sm:px-6 lg:px-8 pb-10 text-sm text-neutral-500">
        © {new Date().getFullYear()} Domek w Krynicy
      </footer>
    </main>
  );
}
