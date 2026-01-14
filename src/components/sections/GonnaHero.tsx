"use client";

import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";
import { useEffect, useMemo, useState } from "react";

export default function GonnaHero() {
  const slides = useMemo(() => {
    const g = Array.isArray((site as any).gallery) ? (site as any).gallery : [];
    const base = site.heroImage ? [site.heroImage, ...g] : g;
    return Array.from(new Set(base)).filter(Boolean);
  }, []);

  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || slides.length <= 1) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % slides.length), 4500);
    return () => clearInterval(t);
  }, [paused, slides.length]);

  return (
    <section className="full-bleed pt-0">
      <div
        className="relative overflow-hidden border bg-black"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="relative h-[560px] md:h-[680px]">
          {slides.map((src, i) => (
            <div
              key={i}
              className="absolute inset-0"
              style={{ opacity: i === idx ? 1 : 0, transition: "opacity 900ms ease" }}
            >
              <Image src={src} alt={site.name} fill className="object-cover" priority={i === 0} />
            </div>
          ))}
          <div className="absolute inset-0 bg-black/45" />
        </div>

        {/* TREŚĆ NA ŚRODKU */}
        <div className="absolute inset-0 flex items-center">
          <div className="container-page w-full">
            <div className="flex justify-center">
              <div className="card-soft p-7 md:p-10 w-full max-w-3xl text-center">
                <div className="flex justify-center">
                  <span
                    className="text-xs md:text-sm uppercase tracking-[0.22em] px-4 py-2 rounded-full"
                    style={{
                      background: "rgba(47,71,55,.12)",
                      border: "1px solid rgba(47,71,55,.25)",
                      color: "var(--accent)",
                    }}
                  >
                    {site.welcome}
                  </span>
                </div>

                <h1 className="mt-4 text-4xl md:text-6xl font-semibold">{site.name}</h1>
                <p className="mt-3 text-muted text-base md:text-lg">{site.location}</p>

                <div className="mt-7 flex flex-wrap gap-3 justify-center">
                  <Link href="/rezerwacja" className="btn-primary">
                    REZERWUJ
                  </Link>
                  <a href="#galeria" className="btn-ghost">
                    Zobacz zdjęcia
                  </a>
                </div>

                {slides.length > 1 && (
                  <div className="mt-7 flex items-center justify-center gap-2">
                    {slides.slice(0, 6).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setIdx(i)}
                        aria-label={`Pokaż zdjęcie ${i + 1}`}
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: 999,
                          border: "1px solid rgba(47,71,55,.35)",
                          background: i === idx ? "var(--accent)" : "rgba(255,255,255,.65)",
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="divider" />
      </div>
    </section>
  );
}
