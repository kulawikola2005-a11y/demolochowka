import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";

export default function HistoriaPage() {
  const photos = (site.gallery ?? []).filter(Boolean);
  const heroImg = photos[1] ?? photos[0] ?? "/gallery/02.jpg";
  const sideImg = photos[2] ?? "/gallery/03.jpg";
  const extra1 = photos[3] ?? "/gallery/04.jpg";
  const extra2 = photos[4] ?? "/gallery/05.jpg";

  return (
    <main className="w-full">
      {/* HERO / HEADLINE */}
      <section className="w-full max-w-none px-0 pt-0">
        <div className="relative overflow-hidden rounded-none sm:rounded-3xl border-0 sm:border">
          <div className="relative h-[52svh] sm:h-[60svh] min-h-[360px]">
            <Image
              src={heroImg}
              alt="Nasza historia — Lochówka"
              fill
              priority
              className="object-cover opacity-95"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/55" />

            <div className="absolute inset-0 flex items-end">
              <div className="w-full px-4 sm:px-6 md:px-10 pb-10 sm:pb-14">
                <p className="text-sm sm:text-base uppercase tracking-[0.18em] text-white/85 drop-shadow-[0_6px_14px_rgba(0,0,0,0.45)]">
                  Poznaj miejsce
                </p>
                <h1 className="mt-2 text-4xl sm:text-5xl md:text-6xl font-semibold text-white drop-shadow-[0_10px_22px_rgba(0,0,0,0.55)]">
                  Nasza historia
                </h1>
                <p className="mt-3 max-w-2xl text-base sm:text-lg md:text-xl text-white/90 drop-shadow-[0_6px_14px_rgba(0,0,0,0.45)]">
                  Kilka zdań o domku, klimacie i tym, dlaczego go pokochasz od pierwszego wejścia.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href="/rezerwacja" className="btn-primary">
                    Sprawdź dostępność
                  </Link>
                  <a
                    href="/#galeria"
                    className="rounded-xl border border-white/50 bg-black/25 backdrop-blur px-5 sm:px-6 py-3 text-sm font-medium text-white hover:bg-black/35"
                  >
                    Zobacz zdjęcia
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TREŚĆ + ZDJĘCIE */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-14">
        <div className="grid gap-10 md:grid-cols-2 md:items-start">
          <div>
            <h2 className="section-title">Skąd się wzięła Lochówka</h2>

            <div className="mt-6 space-y-5 text-neutral-800/80 leading-relaxed">
              <p>
                Lochówka to domek stworzony do odpoczynku: ciepłe wnętrza, cisza i natura tuż za oknem.
                Chcieliśmy, żeby od progu było „lżej” — bez pośpiechu, bez zgiełku.
              </p>
              <p>
                To miejsce jest idealne na weekend we dwoje, spokojny rodzinny wyjazd albo reset po intensywnym tygodniu.
                Blisko szlaków, blisko atrakcji, a jednocześnie z dala od tłumu.
              </p>
              <p>
                Jeśli lubisz poranki z kawą i widokiem na las, wieczory z planszówką i poczucie „tu jest dobrze” —
                to dokładnie ten klimat.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/rezerwacja" className="btn-primary">
                Zarezerwuj
              </Link>
              <a href="/#kontakt" className="btn-ghost">
                Zapytaj o termin
              </a>
            </div>
          </div>

          <div className="relative">
            <div
              className="relative w-full overflow-hidden rounded-[36px] border"
              style={{ borderColor: "var(--border)", boxShadow: "var(--shadow)" }}
            >
              <div className="relative w-full aspect-[4/5] md:aspect-[3/4]">
                <Image src={sideImg} alt="Lochówka" fill className="object-cover" sizes="(min-width: 768px) 45vw, 92vw" />
              </div>
            </div>
            <div
              className="pointer-events-none absolute -inset-6 -z-10 rounded-[48px]"
              style={{ background: "rgba(47,71,55,.06)" }}
            />
          </div>
        </div>

        {/* MINI ZDJĘCIA / DODATEK */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          <div
            className="relative overflow-hidden rounded-3xl border"
            style={{ borderColor: "var(--border)", boxShadow: "var(--shadow)" }}
          >
            <div className="relative w-full aspect-[16/10]">
              <Image src={extra1} alt="Lochówka — zdjęcie" fill className="object-cover" sizes="(min-width: 640px) 48vw, 92vw" />
            </div>
          </div>

          <div
            className="relative overflow-hidden rounded-3xl border"
            style={{ borderColor: "var(--border)", boxShadow: "var(--shadow)" }}
          >
            <div className="relative w-full aspect-[16/10]">
              <Image src={extra2} alt="Lochówka — zdjęcie" fill className="object-cover" sizes="(min-width: 640px) 48vw, 92vw" />
            </div>
          </div>
        </div>

        <p className="mt-10 text-sm text-neutral-600">
          Lokalizacja: {site.location} · (dokładny adres po potwierdzeniu)
        </p>
      </section>
    </main>
  );
}
