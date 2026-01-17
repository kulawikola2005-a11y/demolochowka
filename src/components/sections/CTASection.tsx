import Link from "next/link";

export default function CTASection() {
  return (
    <section className="w-full">
      {/* pasek na całą szerokość - wyraźny */}
      <div
        className="w-full border-y"
        style={{
          background:
            "radial-gradient(900px 500px at 20% 0%, rgba(47,71,55,.16), transparent 60%), rgba(47,71,55,.08)",
          borderColor: "rgba(21,19,16,.12)",
        }}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
          <div className="grid gap-6 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="section-title">Zarezerwuj już teraz</h2>
              <p className="mt-2 text-neutral-800/80">
                Sprawdź dostępność i wyślij zapytanie — potwierdzimy termin mailowo.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 md:justify-end">
              <Link href="/rezerwacja" className="btn-primary">
                Sprawdź dostępność
              </Link>
              <a
                href="/#kontakt"
                className="rounded-2xl border px-5 sm:px-6 py-3 text-sm font-medium hover:bg-black/5"
                style={{ borderColor: "rgba(21,19,16,.18)" }}
              >
                Kontakt
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
