import Image from "next/image";
import { site } from "@/data/site";

type Attraction = {
  name: string;
  desc?: string;
  time?: string;
  query?: string;
  image?: string; // opcjonalnie w site.ts
};

export default function AtrakcjePage() {
  const items = (((site as any).attractions ?? []) as Attraction[]);

  // Zdjęcia fallback (masz je w public/atrakcje/)
  const fallbackImages = [
    "/atrakcje/hero.jpg",
    "/atrakcje/deptak.jpg",
    "/atrakcje/gora-parkowa.jpg",
    "/atrakcje/jaworzyna.jpg",
    "/atrakcje/slotwiny.jpg",
    "/atrakcje/muszyna.jpg",
  ];

  return (
    <main className="bg-stone-50">
      {/* Nagłówek */}
      <section className="mx-auto max-w-6xl px-4 pt-10 pb-6">
        <h1 className="text-4xl md:text-5xl font-semibold" style={{ fontFamily: "var(--font-serif)" }}>
          Atrakcje Krynicy-Zdroju i okolicy
        </h1>
        <p className="mt-3 text-neutral-800/75 max-w-3xl">
          Najciekawsze miejsca w Krynicy — z krótkimi opisami, czasem dojazdu i szybkim linkiem do Google Maps.
        </p>
      </section>

      {/* Kafelki */}
      <section className="mx-auto max-w-6xl px-4 pb-14">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((a, i) => {
            const q = encodeURIComponent(a.query ?? `${a.name}, Krynica-Zdrój`);
            const maps = `https://www.google.com/maps/search/?api=1&query=${q}`;
            const img = a.image ?? fallbackImages[i % fallbackImages.length];

            return (
              <div key={`${a.name}-${i}`} className="card-soft overflow-hidden">
                <div className="relative w-full aspect-[16/10] bg-black">
                  <Image src={img} alt={a.name} fill unoptimized className="object-cover opacity-95" />
                  <div className="absolute inset-0 bg-black/10" />
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-semibold">{a.name}</h3>
                    {a.time ? (
                      <span
                        className="shrink-0 rounded-full border px-2.5 py-1 text-xs text-neutral-700"
                        style={{ borderColor: "var(--border)" }}
                      >
                        {a.time}
                      </span>
                    ) : null}
                  </div>

                  {a.desc ? <p className="mt-2 text-sm text-neutral-800/75">{a.desc}</p> : null}

                  <div className="mt-4">
                    <a
                      href={maps}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm underline underline-offset-4"
                    >
                      Otwórz w Google Maps
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
