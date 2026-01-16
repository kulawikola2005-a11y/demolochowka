import AttractionsSection from "@/components/sections/AttractionsSection";

export default function AtrakcjePage() {
  return (
    <main className="bg-stone-50">
      <div className="mx-auto max-w-6xl px-4 pt-10">
        <h1 className="text-3xl font-semibold">Atrakcje</h1>
        <p className="mt-2 text-muted">Krynica-Zdrój i okolice — co warto zobaczyć.</p>
      </div>
      <AttractionsSection />
    </main>
  );
}
