import { site } from "@/data/site";

type Attraction = {
  name: string;
  desc?: string;
  time?: string;
  query?: string; // do google maps
};

const DEFAULT_ATTRACTIONS: Attraction[] = [
  { name: "Deptak i Pijalnia Główna", desc: "Spacer, wody mineralne i klimat uzdrowiska.", time: "5–10 min" },
  { name: "Muzeum Nikifora", desc: "Sztuka i historia Krynicy.", time: "5–10 min" },
  { name: "Góra Parkowa", desc: "Widoki i klasyczny spacer (możliwa kolejka).", time: "10–15 min" },
  { name: "Jaworzyna Krynicka (gondola)", desc: "Panoramy i szlaki latem, narty zimą.", time: "15–20 min" },
  { name: "Słotwiny Arena – wieża widokowa", desc: "Skywalk wśród drzew, super zdjęcia.", time: "10–15 min" },
  { name: "Park Zdrojowy", desc: "Spokojny spacer i odpoczynek w zieleni.", time: "5–10 min" },
  { name: "Szlaki piesze", desc: "Od lekkich spacerów po dłuższe wyjścia w góry.", time: "zależnie" },
  { name: "Tylicz", desc: "Szybki wypad obok Krynicy, fajny na rodzinny plan.", time: "15–20 min" },
  { name: "Muszyna – Ogrody Sensoryczne", desc: "Bardzo przyjemnie na pół dnia.", time: "25–35 min" },
];

export default function AttractionsSection() {
  const title = (site as any).attractionsTitle ?? "Atrakcje w Krynicy i okolicy";
  const fromSite = ((site as any).attractions ?? []) as Attraction[];
  const items = fromSite.length ? fromSite : DEFAULT_ATTRACTIONS;

  return (
    <section id="okolica" className="mx-auto max-w-6xl px-4 py-10">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <p className="mt-2 text-muted">Co warto zobaczyć w Krynicy-Zdroju i okolicy.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((a, i) => {
          const q = encodeURIComponent(a.query ?? `${a.name}, Krynica-Zdrój`);
          const maps = `https://www.google.com/maps/search/?api=1&query=${q}`;

          return (
            <div key={i} className="card-soft p-5">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-base font-semibold">{a.name}</h3>
                {a.time ? (
                  <span
                    className="rounded-full border px-2.5 py-1 text-xs text-neutral-700"
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
          );
        })}
      </div>
    </section>
  );
}
