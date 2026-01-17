"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { site } from "@/data/site";

export default function GonnaHero() {
  const slides = useMemo<string[]>(() => {
    const g = site.gallery ?? [];
    const arr = Array.isArray(g) ? (g as string[]) : [];
    return arr.length ? arr : [site.heroImage];
  }, []);

  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const t = setInterval(() => setIdx((x) => (x + 1) % slides.length), 4500);
    return () => clearInterval(t);
  }, [slides]);

  return (
    <section className="w-full max-w-none px-0 pt-0">
      <div className="relative overflow-hidden rounded-none sm:rounded-3xl border-0 sm:border">
        <div className="relative h-[78svh] sm:h-[calc(100svh-6rem)] min-h-[440px]">
          {slides.map((src, i) => (
            <div
              key={`${src}-${i}`}
              className="absolute inset-0"
              style={{ opacity: i === idx ? 1 : 0, transition: "opacity 900ms ease" }}
            >
              <Image
                src={src}
                alt="Domek w Krynicy-Zdroju"
                fill
                className="object-cover opacity-95"
                priority={i === 0}
              />
            </div>
          ))}

          {/* warstwa na zdjęciu = czytelność tekstu */}
          <div className="absolute inset-0 bg-black/60" />

          {/* środek: sam tekst na zdjęciu */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full px-4 sm:px-6 md:px-10 text-center">
              <p className="text-base sm:text-lg uppercase tracking-[0.18em] text-white/85 drop-shadow-[0_6px_14px_rgba(0,0,0,0.45)]">
                Witamy w
              </p>

              <h1 className="mt-2 text-4xl sm:text-5xl md:text-6xl font-semibold text-white drop-shadow-[0_10px_22px_rgba(0,0,0,0.55)]">
                Lochówka
              </h1>

              <p className="mt-3 text-lg sm:text-xl md:text-2xl text-white/90 drop-shadow-[0_6px_14px_rgba(0,0,0,0.45)]">
                Domek w Krynicy-Zdroju
              </p>

              <div className="mt-6 flex flex-wrap gap-3 justify-center">
                <Link href="/rezerwacja" className="btn-primary">
                  REZERWUJ
                </Link>

                <a
                  href="#galeria"
                  className="rounded-xl border border-white/50 bg-black/25 backdrop-blur px-5 sm:px-6 py-3 text-sm font-medium text-white hover:bg-black/35"
                >
                  Zobacz zdjęcia
                </a>
              </div>
            </div>
          </div>

          {/* kropki na samym dole */}
          {slides.length > 1 && (
            <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2">
              <div className="flex w-fit gap-1.5 rounded-full border border-white/30 bg-black/25 backdrop-blur px-3 py-1.5">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setIdx(i)}
                    className="h-2 w-2 rounded-full"
                    style={{
                      background: i === idx ? "var(--accent)" : "rgba(255,255,255,.55)",
                      border: "1px solid rgba(0,0,0,.18)",
                    }}
                    aria-label={`Pokaż zdjęcie ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
