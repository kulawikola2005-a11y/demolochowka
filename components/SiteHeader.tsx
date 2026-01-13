"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "sticky top-0 z-50 backdrop-blur",
        scrolled ? "bg-white/80 border-b" : "bg-white/50",
      ].join(" ")}
    >
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-semibold">
          Domek w Krynicy
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-700">
          <a href="#galeria" className="hover:text-black">Galeria</a>
          <a href="#udogodnienia" className="hover:text-black">Udogodnienia</a>
          <a href="#okolica" className="hover:text-black">Okolica</a>
          <a href="#opinie" className="hover:text-black">Opinie</a>
          <a href="#cennik" className="hover:text-black">Cennik</a>
        </nav>

        <Link
          href="/rezerwacja"
          className="rounded-xl bg-black text-white px-4 py-2 text-sm"
        >
          Rezerwuj
        </Link>
      </div>
    </header>
  );
}
