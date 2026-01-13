import Link from "next/link";
import { site } from "@/data/site";

export default function CTASection() {
  return (
    <section className="full-bleed">
      <div
        className="w-full py-12 md:py-16"
        style={{
          background:
            "linear-gradient(180deg, rgba(47,71,55,.22) 0%, rgba(47,71,55,.12) 100%)",
          borderTop: "1px solid rgba(47,71,55,.30)",
          borderBottom: "1px solid rgba(47,71,55,.30)",
        }}
      >
        <div className="container-page">
          <div className="card-soft p-8 md:p-12">
            <div className="grid gap-6 md:grid-cols-2 md:items-center">
              <div>
                <h2 className="section-title">Zarezerwuj już teraz</h2>
                <p className="mt-3 text-muted">
                  Sprawdź dostępność i wyślij zapytanie — potwierdzimy termin mailowo.
                </p>
              </div>

              <div className="flex gap-3 md:justify-end flex-wrap">
                <Link href="/rezerwacja" className="btn-primary">
                  Sprawdź dostępność
                </Link>
                <a href="#kontakt" className="btn-ghost">
                  Kontakt
                </a>
              </div>
            </div>

            <div className="mt-8 divider" />

            <div className="mt-6 text-sm text-muted">
              Lokalizacja: <span className="text-accent">{site.location}</span> · {site.addressLabel}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
