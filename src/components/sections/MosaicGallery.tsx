"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { site } from "@/data/site";

export default function MosaicGallery() {
  const [index, setIndex] = useState(-1);

  const gallery = site.gallery ?? [];
  const slides = useMemo(() => gallery.map((src) => ({ src })), [gallery]);

  return (
    <section id="galeria" className="mx-auto w-full max-w-none px-3 sm:max-w-6xl sm:px-6 lg:px-8 section-pad">
      <h2 className="section-title">Galeria</h2>

      <div className="mt-6 grid grid-cols-2 min-[420px]:grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-4 lg:grid-cols-5">
        {gallery.slice(0, 6).map((src, i) => (
          <button
            key={src}
            onClick={() => setIndex(i)}
            className="relative overflow-hidden rounded-none border"
            style={{ borderColor: "var(--border)" }}
            aria-label={`Otwórz zdjęcie ${i + 1}`}
          >
            {/* stały ratio, wszystkie kafelki równe */}
            <div className="relative w-full aspect-square sm:aspect-[4/3]">
              <Image src={src} alt={`Zdjęcie ${i + 1}`} fill className="object-cover" />
            </div>
          </button>
        ))}
      </div>

      <Lightbox open={index >= 0} close={() => setIndex(-1)} index={index} slides={slides} />
    </section>
  );
}
