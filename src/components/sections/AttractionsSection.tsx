import { site } from "@/data/site";

type Attraction = { name: string; desc?: string; time?: string };

export default function AttractionsSection() {
  const title = (site as any).attractionsTitle ?? "Atrakcje w okolicy";
  const items = ((site as any).attractions ?? []) as Attraction[];

  return (
    <section id="okolica" className="mx-auto max-w-6xl px-4 py-10">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <p className="mt-2 text-muted">Najciekawsze miejsca na spacer, widoki i szybki plan dnia.</p>

      {items.length === 0 ? (
        <div className="mt-6 card-soft p-5">
          <p className="text-sm text-neutral-800/75">
            Brak atrakcji do wyświetlenia — dodaj je w <code>src/data/site.ts</code> jako <code>attractions</code>.
          </p>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((a, i) => (
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
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
