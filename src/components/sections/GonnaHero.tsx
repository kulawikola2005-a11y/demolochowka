"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { site } from "@/data/site";

export default function GonnaHero() {
  // jawne typowanie -> koniec "unknown"
  const slides: string[] = useMemo(() => {
    const g = (site.gallery ?? []) as unknown;
    const arr = Array.isArray(g) ? (g as string[]) : [];
    return arr.length ? arr : [site.heroImage];
  }, []);

  const [idx, setIdx] = useState(0);

  // auto-rotacja co 4.5s
  useEffect(() => {
    if (slides.length <= 1) return;
    const t = setInterval(() => setIdx((x) => (x + 1) % slides.length), 4500);
    return () => clearInterval(t);
  }, [slides.length]);

  return (
    <section className="mx-auto max-w-6xl px-4 pt-8">
      <div className="relative overflow-hidden rounded-3xl border bg-black">
        <div className="relative h-[520px]">
          {slides.map((src, i) => (
            <div
              key={src}
              className="absolute inset-0"
              style={{ opacity: i === idx ? 1 : 0, transition: "opacity 900ms ease" }}
            >
              <Image src={src} alt={site.name} fill className="object-cover opacity-90" priority={i === 0} />
            </div>
          ))}
          <div className="absolute inset-0 bg-black/45" />
        </div>

        <div className="absolute inset-0 flex items-end">
          <div className="p-6 md:p-10 w-full">
            <div className="card-soft p-6 md:p-8 max-w-3xl">
              <p className="text-sm uppercase tracking-wider text-muted">{site.welcome}</p>
              <h1 className="mt-2 text-4xl md:text-5xl font-semibold">{site.name}</h1>
              <p className="mt-2 text-muted">{site.location}</p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/rezerwacja" className="btn-primary">
                  REZERWUJ
                </Link>
                <a href="#galeria" className="btn-ghost">
                  Zobacz zdjęcia
                </a>
              </div>
            </div>

            {slides.length > 1 && (
              <div className="mt-4 flex gap-2">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIdx(i)}
                    className="h-2.5 w-2.5 rounded-full"
                    style={{
                      background: i === idx ? "var(--accent)" : "rgba(255,255,255,.55)",
                      border: "1px solid rgba(255,255,255,.35)",
                    }}
                    aria-label={`Pokaż zdjęcie ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
