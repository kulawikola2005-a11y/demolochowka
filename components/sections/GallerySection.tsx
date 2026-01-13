"use client";

import { site } from "@/data/site";
import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function GallerySection() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [index, setIndex] = useState<number>(-1);

  const slides = useMemo(() => site.gallery.map((src) => ({ src })), []);

  function scrollBy(px: number) {
    scrollerRef.current?.scrollBy({ left: px, behavior: "smooth" });
  }

  return (
    <section id="galeria" className="mx-auto max-w-6xl px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex items-end justify-between gap-4"
      >
        <div>
          <h2 className="text-2xl font-semibold">Galeria</h2>
          <p className="mt-2 text-gray-600">
            Kliknij zdjęcie, żeby otworzyć w pełnym ekranie.
          </p>
        </div>

        <div className="hidden md:flex gap-2">
          <button
            onClick={() => scrollBy(-420)}
            className="rounded-xl border p-2"
            aria-label="Poprzednie"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={() => scrollBy(420)}
            className="rounded-xl border p-2"
            aria-label="Następne"
          >
            <ChevronRight />
          </button>
        </div>
      </motion.div>

      <div
        ref={scrollerRef}
        className="mt-6 flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory"
      >
        {site.gallery.map((src, i) => (
          <button
            key={src}
            onClick={() => setIndex(i)}
            className="snap-start shrink-0 relative w-[280px] h-[200px] md:w-[420px] md:h-[280px] overflow-hidden rounded-2xl border"
            aria-label={`Otwórz zdjęcie ${i + 1}`}
          >
            <Image src={src} alt={`Zdjęcie ${i + 1}`} fill className="object-cover" />
          </button>
        ))}
      </div>

      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        index={index}
        slides={slides}
      />
    </section>
  );
}
