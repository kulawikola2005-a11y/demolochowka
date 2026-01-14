"use client";

import { useMemo, useState } from "react";
import { site } from "@/data/site";

export default function GonnaAbout() {
  const [open, setOpen] = useState(false);

  // Weź tekst "o domu" z site (dopasuj klucz, jeśli u Ciebie nazywa się inaczej)
  const aboutText =
    (site as any).aboutTextShort ??
    (site as any).aboutText ??
    (site as any).about ??
    (site as any).description ??
    "";

  const { shortText, longText } = useMemo(() => {
    const raw = String(aboutText || "").trim();

    // Podział na akapity (podwójna nowa linia albo pojedyncza)
    const paragraphs = raw
      .split(/\n\s*\n/g)
      .map((p) => p.trim())
      .filter(Boolean);

    if (paragraphs.length <= 2) {
      return { shortText: raw, longText: "" };
    }

    const short = paragraphs.slice(0, 2).join("\n\n");
    const rest = paragraphs.slice(2).join("\n\n");
    return { shortText: short, longText: rest };
  }, [aboutText]);

  return (
    <section id="o-domu" className="py-10 md:py-14">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <h2 className="section-title">O domu</h2>
        </div>

        <div className="mt-6 card-soft p-6 md:p-8">
          <p className="text-muted whitespace-pre-line">{shortText}</p>

          {longText ? (
            <>
              {open ? (
                <p className="mt-4 text-muted whitespace-pre-line">{longText}</p>
              ) : null}

              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="mt-6 btn-ghost"
              >
                {open ? "Zwiń" : "Więcej"}
              </button>
            </>
          ) : null}
        </div>
      </div>
    </section>
  );
}
