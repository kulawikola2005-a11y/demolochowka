"use client";

import { site } from "@/data/site";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export default function StarReviews() {
  const reviews = useMemo(() => site.reviews ?? [], []);
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  const total = reviews.length;

  useEffect(() => {
    if (paused || total <= 1) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % total), 4500);
    return () => clearInterval(t);
  }, [paused, total]);

  if (!total) return null;
  const r = reviews[idx];

  const prev = () => setIdx((i) => (i - 1 + total) % total);
  const next = () => setIdx((i) => (i + 1) % total);

  return (
    <section
      id="opinie"
      className="w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{
        background: "var(--accent)",          // <- NA 100% zielone
        paddingTop: "64px",
        paddingBottom: "64px",
      }}
    >
      <div className="container-page">
        <div className="text-center">
          <h2 className="section-title" style={{ color: "white" }}>
            Opinie
          </h2>
          <p className="mt-2" style={{ color: "rgba(255,255,255,.80)" }}>
            Jedna opinia na raz — zmieniają się automatycznie.
          </p>
        </div>

        <div className="mt-10 flex justify-center">
          <div className="card-soft p-7 md:p-10 w-full max-w-3xl text-center">
            <div className="flex items-center justify-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={18} style={{ color: "var(--accent)" }} />
              ))}
              <span className="ml-3 text-sm text-muted">
                {idx + 1}/{total}
              </span>
            </div>

            <p className="mt-5 text-lg md:text-xl text-neutral-900/90 leading-relaxed">
              “{r.text}”
            </p>

            <div className="mt-6 text-sm text-muted">
              <b className="text-neutral-900">{r.name}</b>
              {r.city ? ` · ${r.city}` : ""}
            </div>

            <div className="mt-7 flex items-center justify-center gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  aria-label={`Pokaż opinię ${i + 1}`}
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 999,
                    border: "1px solid rgba(47,71,55,.35)",
                    background: i === idx ? "var(--accent)" : "rgba(255,255,255,.75)",
                  }}
                />
              ))}
            </div>

            <div className="mt-6 flex items-center justify-center gap-2">
              <button onClick={prev} className="btn-ghost" aria-label="Poprzednia opinia" style={{ padding: ".6rem .9rem" }}>
                <ChevronLeft size={18} />
              </button>
              <button onClick={next} className="btn-ghost" aria-label="Następna opinia" style={{ padding: ".6rem .9rem" }}>
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-xs" style={{ color: "rgba(255,255,255,.75)" }}>
          Najedź myszką na blok, żeby zatrzymać auto-przewijanie.
        </p>
      </div>
    </section>
  );
}
