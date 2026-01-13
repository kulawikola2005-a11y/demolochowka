import Link from "next/link";
import { site } from "@/data/site";

export default function FooterSection() {
  const waDigits = (site.whatsapp || "").replace(/\D/g, "");

  return (
    <footer className="full-bleed mt-10">
      <div
        className="w-full pt-12 pb-10"
        style={{
          background: "var(--accent)",
          color: "rgba(255,255,255,.92)",
        }}
      >
        <div className="container-page">
          <div className="grid gap-10 md:grid-cols-3">
            {/* Brand */}
            <div>
              <div className="text-xl font-semibold tracking-tight">{site.name}</div>
              <p className="mt-3 text-sm" style={{ color: "rgba(255,255,255,.78)" }}>
                {site.location} · na zboczu, na skraju lasu
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <Link
                  href="/rezerwacja"
                  className="rounded-2xl px-5 py-3 text-sm font-medium"
                  style={{
                    background: "rgba(255,255,255,.92)",
                    color: "var(--accent)",
                  }}
                >
                  Sprawdź dostępność
                </Link>
                <a
                  href="#kontakt"
                  className="rounded-2xl px-5 py-3 text-sm font-medium"
                  style={{
                    border: "1px solid rgba(255,255,255,.35)",
                    color: "rgba(255,255,255,.92)",
                  }}
                >
                  Kontakt
                </a>
              </div>
            </div>

            {/* Links */}
            <div>
              <div className="text-sm font-semibold uppercase tracking-wider" style={{ color: "rgba(255,255,255,.75)" }}>
                Na skróty
              </div>
              <div className="mt-4 grid gap-2 text-sm">
                <a href="#o-domu" className="hover:opacity-90">O domu</a>
                <a href="#galeria" className="hover:opacity-90">Galeria</a>
                <a href="#opinie" className="hover:opacity-90">Opinie</a>
                <a href="#kontakt" className="hover:opacity-90">Kontakt</a>
                <Link href="/historia" className="hover:opacity-90">Nasza historia</Link>
              </div>

              <div className="mt-6 text-sm" style={{ color: "rgba(255,255,255,.75)" }}>
                Dokumenty
              </div>
              <div className="mt-3 grid gap-2 text-sm">
                <Link href="/regulamin" className="hover:opacity-90">Regulamin</Link>
                <Link href="/polityka-prywatnosci" className="hover:opacity-90">Polityka prywatności</Link>
                <Link href="/kontakt" className="hover:opacity-90">Kontakt (strona)</Link>
              </div>
            </div>

            {/* Contact */}
            <div>
              <div className="text-sm font-semibold uppercase tracking-wider" style={{ color: "rgba(255,255,255,.75)" }}>
                Kontakt
              </div>

              <div className="mt-4 text-sm space-y-2">
                <div style={{ color: "rgba(255,255,255,.85)" }}>
                  <span style={{ color: "rgba(255,255,255,.70)" }}>Email:</span>{" "}
                  <a className="underline underline-offset-4" href={`mailto:${site.email}`}>{site.email}</a>
                </div>

                <div style={{ color: "rgba(255,255,255,.85)" }}>
                  <span style={{ color: "rgba(255,255,255,.70)" }}>WhatsApp:</span>{" "}
                  <a
                    className="underline underline-offset-4"
                    href={waDigits ? `https://wa.me/${waDigits}` : "#"}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {site.whatsapp}
                  </a>
                </div>

                <div style={{ color: "rgba(255,255,255,.75)" }}>
                  {site.addressLabel}
                </div>
              </div>

              <div
                className="mt-6 rounded-3xl p-5 text-sm"
                style={{
                  background: "rgba(255,255,255,.10)",
                  border: "1px solid rgba(255,255,255,.18)",
                }}
              >
                Potwierdzenie rezerwacji wysyłamy mailowo. Dokładny adres podajemy po potwierdzeniu terminu.
              </div>
            </div>
          </div>

          <div className="mt-10" style={{ height: 1, background: "rgba(255,255,255,.18)" }} />

          <div className="mt-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between text-sm">
            <div style={{ color: "rgba(255,255,255,.75)" }}>
              © {new Date().getFullYear()} {site.name}
            </div>
            <div style={{ color: "rgba(255,255,255,.65)" }}>
              Krynica-Zdrój · {site.location}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
