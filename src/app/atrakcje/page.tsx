import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";

type Attraction = {
  name: string;
  desc?: string;
  time?: string;
  query?: string;
  image?: string;
};

export default function AtrakcjePage() {
  const items = (((site as any).attractions ?? []) as Attraction[]);

  // fallback zdjęcia (masz je w public/atrakcje/)
  const fallbackImages = [
    "/atrakcje/deptak.jpg",
    "/atrakcje/gora-parkowa.jpg",
    "/atrakcje/jaworzyna.jpg",
    "/atrakcje/slotwiny.jpg",
    "/atrakcje/muszyna.jpg",
    "/atrakcje/hero.jpg",
  ];

  const heroImage = "/atrakcje/hero.jpg";

  return (
    <main className="bg-stone-50">
      {/* HERO jak wcześniej (bez “vlog”) */}
      <section className="w-full max-w-none px-0 pt-0">
        <div className="relative overflow-hidden rounded-3xl border bg-black">
          <div className="relative h-[calc(70svh-6rem)] min-h-[520px]">
            <Image src={heroImage} alt="Atrakcje Krynicy" fill unoptimized className="object-cover opacity-90" priority />
            <div className="absolute inset-0 bg-black/40" />
          </div>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="card-soft p-6 md:p-10 max-w-3xl mx-auto text-center backdrop-blur-sm">
              <h1 className="text-4xl md:text-5xl font-semibold">Atrakcje Krynicy-Zdroju i okolicy</h1>
              <p className="mt-4 text-neutral-800/80">
                Konkretna lista miejsc — krótkie opisy, orientacyjny czas i szybki link do Google Maps.
              </p>

              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <a href="#lista" className="btn-ghost">
                  Zobacz atrakcje
                </a>
                <Link href="/rezerwacja" className="btn-primary">
                  Rezerwuj pobyt
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LISTA w “ładnym” układzie (jak wcześniej), ale bez rozdziałów */}
      <section id="lista" className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-12 md:gap-14">
          {items.map((a, idx) => {
            const reverse = idx % 2 === 1;
            const img = a.image ?? fallbackImages[idx % fallbackImages.length];
            const q = encodeURIComponent(a.query ?? `${a.name}, Krynica-Zdrój`);
            const maps = `https://www.google.com/maps/search/?api=1&query=${q}`;

            return (
              <div
                key={`${a.name}-${idx}`}
                className={[
                  "grid gap-8 md:gap-10 md:grid-cols-2 md:items-center",
                  reverse ? "md:[&>*:first-child]:order-2" : "",
                ].join(" ")}
              >
                {/* TEKST */}
                <div>
                  <h2 className="text-3xl md:text-4xl font-semibold" style={{ fontFamily: "var(--font-serif)" }}>
                    {a.name}
                  </h2>

                  {a.time ? (
                    <div className="mt-3">
                      <span
                        className="inline-flex rounded-full border px-3 py-1 text-xs text-neutral-700"
                        style={{ borderColor: "var(--border)" }}
                      >
                        {a.time}
                      </span>
                    </div>
                  ) : null}

                  {a.desc ? <p className="mt-4 text-neutral-800/80 leading-relaxed">{a.desc}</p> : null}

                  <div className="mt-6 flex flex-wrap gap-3">
                    <a className="btn-ghost" href={maps} target="_blank" rel="noreferrer">
                      Otwórz w Google Maps
                    </a>
                    <Link className="btn-ghost" href="/rezerwacja">
                      Rezerwuj pobyt
                    </Link>
                  </div>
                </div>

                {/* ZDJĘCIE */}
                <div className="relative">
                  <div
                    className="relative w-full overflow-hidden rounded-[36px] border"
                    style={{ borderColor: "var(--border)", boxShadow: "var(--shadow)" }}
                  >
                    <div className="relative w-full aspect-[4/3] md:aspect-[4/5] bg-black">
                      <Image src={img} alt={a.name} fill unoptimized className="object-cover opacity-95" />
                      <div className="absolute inset-0 bg-black/10" />
                    </div>
                  </div>

                  <div
                    className="pointer-events-none absolute -inset-6 -z-10 rounded-[48px]"
                    style={{ background: "rgba(47,71,55,.06)" }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA na końcu */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="card-soft p-7 md:p-10 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold">Masz ochotę zobaczyć to na żywo?</h2>
          <p className="mt-3 text-neutral-800/75">Zarezerwuj pobyt i zrób sobie idealną bazę wypadową w Krynicy.</p>
          <div className="mt-6 flex justify-center gap-3 flex-wrap">
            <Link href="/kontakt" className="btn-ghost">
              Kontakt
            </Link>
            <Link href="/rezerwacja" className="btn-primary">
              Rezerwuj
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
