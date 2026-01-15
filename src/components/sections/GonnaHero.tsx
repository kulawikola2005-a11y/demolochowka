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
  }, [slides.length, slides]);

  return (
    <section className="w-full max-w-none px-0 pt-0">
      <div className="relative overflow-hidden rounded-3xl border bg-black">
        <div className="relative h-[calc(100svh-6rem)] min-h-[520px]">
          {slides.map((src, i) => (
            <div
              key={`${src}-${i}`}
              className="absolute inset-0"
              style={{ opacity: i === idx ? 1 : 0, transition: "opacity 900ms ease" }}
            >
              <Image src={src} alt={site.name} fill className="object-cover opacity-90" priority={i === 0} />
            </div>
          ))}

          <div className="absolute inset-0 bg-black/30" />

          {/* Wszystko na środku */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="p-6 md:p-10 w-full">
              <div className="mx-auto max-w-3xl text-center rounded-3xl border border-white/20 bg-white/10 backdrop-blur-md p-6 md:p-8 shadow-lg">
                <p className="text-sm uppercase tracking-wider text-neutral-900/60">{site.welcome}</p>
                <h1 className="mt-2 text-4xl md:text-5xl font-semibold">{site.name}</h1>
                <p className="mt-2 text-neutral-900/60">{site.location}</p>

                <div className="mt-6 flex flex-wrap gap-3 justify-center">
                  <Link href="/rezerwacja" className="btn-primary">
                    REZERWUJ
                  </Link>
                  <a href="#galeria" className="rounded-2xl border border-neutral-900/15 bg-white/40 px-6 py-3 text-sm font-medium text-neutral-900 hover:bg-white/60">
                    Zobacz zdjęcia
                  </a>
                </div>

                {/* Kropki na środku */}
                {slides.length > 1 && (
                  <div className="mt-5 flex justify-center gap-2">
                    {slides.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setIdx(i)}
                        className="h-3 w-3 rounded-full"
                        style={{
                          background: i === idx ? "var(--accent)" : "rgba(0,0,0,.25)",
                          border: "1px solid rgba(0,0,0,.15)",
                        }}
                        aria-label={`Pokaż zdjęcie ${i + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* /środek */}
        </div>
      </div>
    </section>
  );
}
