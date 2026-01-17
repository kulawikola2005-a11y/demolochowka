import Link from "next/link";

export default function CTASection() {
  return (
    <section className="w-full py-12">
      {/* pełna szerokość "paska" */}
      <div className="w-full px-3 sm:px-6 lg:px-8">
        {/* duża karta na całą szerokość viewportu (z paddingiem) */}
        <div className="card-soft w-full p-7 sm:p-9 md:p-10">
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

          <div className="divider my-8" />

          <p className="text-sm text-neutral-600">
            Lokalizacja: Krynica-Zdrój · (adres po potwierdzeniu)
          </p>
        </div>
      </div>
    </section>
  );
}
