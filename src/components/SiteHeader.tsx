"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function SiteHeader() {
  const pathname = usePathname();
  const onHome = pathname === "/";

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // na podstronach zawsze solid (żeby nie było “czarnego/transparentnego” na treści)
  const solid = !onHome || scrolled;

  const textTop = "text-neutral-900/90 hover:text-neutral-900";
  const textSolid = "text-neutral-800 hover:text-[color:var(--accent)]";

  const activePillTop = "bg-neutral-900/5 border border-neutral-900/10 text-neutral-900";
  const activePillSolid = "bg-white/70 border border-[color:var(--border)] text-neutral-900";

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div
        className={solid ? "backdrop-blur bg-white/60" : "bg-transparent"}
        style={{
          borderBottom: solid ? "1px solid var(--border)" : "1px solid transparent",
        }}
      >
        <div className="mx-auto max-w-6xl px-6 py-5 flex items-center">
          <Link
            href="/"
            className={[
              "font-semibold tracking-tight text-xl",
              "text-neutral-900",
            ].join(" ")}
            style={{ letterSpacing: "0.02em" }}
          >
            <span className="text-neutral-900">LOCHÓWKA</span>
          </Link>

          <nav className="flex-1 flex justify-center">
            <div className="hidden md:flex items-center gap-9 text-[12px] tracking-[0.22em] uppercase">
              <a
                href="/"
                className={[
                  "px-6 py-2 rounded-full transition backdrop-blur-md",
                  solid ? activePillSolid : activePillTop,
                ].join(" ")}
              >
                Strona główna
              </a>

              <Link
                href="/historia"
                className={["transition", solid ? textSolid : textTop].join(" ")}
              >
                O nas <span className="opacity-80">▾</span>
              </Link>

              <a href="/#o-domu" className={["transition", solid ? textSolid : textTop].join(" ")}>
                Dom <span className="opacity-80">▾</span>
              </a>

              <a href="/#galeria" className={["transition", solid ? textSolid : textTop].join(" ")}>
                Atrakcje
              </a>

              <a href="/#kontakt" className={["transition", solid ? textSolid : textTop].join(" ")}>
                Kontakt
              </a>
            </div>
          </nav>

          <div className="w-[120px] hidden md:block" />
        </div>
      </div>
    </header>
  );
}
