"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/data/site";

export default function SiteHeader() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const textTop = "text-neutral-900/90 hover:text-neutral-900";
  const textSolid = "text-neutral-900 hover:text-neutral-900";

  const barClass = solid
    ? "bg-white/85 backdrop-blur-md border-b border-black/10"
    : "bg-transparent";

  const pillClass = solid
    ? "backdrop-blur-md bg-neutral-900/5 border border-neutral-900/10"
    : "backdrop-blur-md bg-white/50 border border-white/40";

  const brand = (site as any)?.logoText ?? "LOCHÓWKA";

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className={barClass}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-4 flex items-center gap-3">
          <Link
            href="/"
            className="font-semibold tracking-tight text-xl text-neutral-900"
            style={{ letterSpacing: "0.02em" }}
          >
            <span className="text-neutral-900">{brand}</span>
          </Link>

          <nav className="flex-1 flex justify-center">
            <div className="hidden md:flex items-center gap-9 text-[12px] tracking-[0.22em] uppercase">
              <Link
                href="/"
                className={[
                  "px-6 py-2 rounded-full transition",
                  pillClass,
                  solid ? textSolid : textTop,
                ].join(" ")}
              >
                Strona główna
              </Link>

              <Link
                href="/historia"
                className={["transition", solid ? textSolid : textTop].join(" ")}
              >
                O nas <span className="opacity-80">▾</span>
              </Link>

              <a
                href="/#o-domu"
                className={["transition", solid ? textSolid : textTop].join(" ")}
              >
                Dom <span className="opacity-80">▾</span>
              </a>

              <Link
                href="/atrakcje"
                className={["transition", solid ? textSolid : textTop].join(" ")}
              >
                Atrakcje
              </Link>

              <a
                href="/#kontakt"
                className={["transition", solid ? textSolid : textTop].join(" ")}
              >
                Kontakt
              </a>
            </div>
          </nav>

          {/* MOBILE: hamburger */}
          <button
            type="button"
            className="md:hidden rounded-xl border border-black/10 bg-white/80 backdrop-blur px-3 py-2 text-sm"
            onClick={() => setOpen((v) => !v)}
            aria-label="Otwórz menu"
          >
            {open ? "Zamknij" : "Menu"}
          </button>

          <div className="w-[120px] hidden md:block" />
        </div>

        {/* MOBILE: panel */}
        {open && (
          <div className="md:hidden border-t border-black/10 bg-white/90 backdrop-blur">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 py-4 grid gap-3 text-sm">
              <Link href="/" onClick={() => setOpen(false)} className="py-2">
                Strona główna
              </Link>
              <Link href="/historia" onClick={() => setOpen(false)} className="py-2">
                O nas
              </Link>
              <a href="/#o-domu" onClick={() => setOpen(false)} className="py-2">
                Dom
              </a>
              <Link href="/atrakcje" onClick={() => setOpen(false)} className="py-2">
                Atrakcje
              </Link>
              <a href="/#kontakt" onClick={() => setOpen(false)} className="py-2">
                Kontakt
              </a>

              <Link
                href="/rezerwacja"
                onClick={() => setOpen(false)}
                className="mt-2 btn-primary text-center"
              >
                Rezerwuj
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
