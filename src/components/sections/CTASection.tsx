import Link from "next/link";

export default function CTASection() {
  return (
    <section className="w-full">
      {/* pasek na całą szerokość */}
      <div className="w-full bg-white/85 backdrop-blur-md border-y border-black/10">
        {/* treść w środku, ładnie wyśrodkowana */}
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
          <div className="grid gap-6 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="section-title">Zarezerwuj już teraz</h2>
              <p className="mt-2 text-neutral-700">
                Sprawdź dostępność i wyślij zapytanie — potwierdzimy termin mailowo.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 md:justify-end">
              <Link href="/rezerwacja" className="btn-primary">
                Sprawdź dostępność
              </Link>
              <a href="/#kontakt" className="btn-ghost">
                Kontakt
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
