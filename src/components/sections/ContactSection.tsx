import { site } from "@/data/site";
import Link from "next/link";

export default function ContactSection() {
  return (
    <section id="kontakt" className="mx-auto max-w-6xl px-4 py-12">
      <div className="rounded-[32px] border bg-white/60 p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h2 className="text-3xl font-semibold">Sprawdź termin</h2>
          <p className="mt-2 text-neutral-700">
            Wyślij zapytanie rezerwacyjne — potwierdzimy dostępność mailem.
          </p>

          <div className="mt-4 text-sm text-neutral-700 space-y-1">
            <div><b>Email:</b> {site.contact.email}</div>
            <div><b>Telefon:</b> {site.contact.phone}</div>
            <div className="text-neutral-500">{site.contact.address}</div>
          </div>
        </div>

        <div className="flex gap-3">
          <Link
            href="/rezerwacja"
            className="btn-primary"
          >
            {site.ctaPrimary.label}
          </Link>
          <a href="#galeria" className="rounded-2xl border px-6 py-3 text-sm font-medium">
            Galeria
          </a>
        </div>
      </div>
    </section>
  );
}
