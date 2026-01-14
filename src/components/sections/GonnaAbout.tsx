import Link from "next/link";
import Image from "next/image";
import { site } from "@/data/site";

export default function GonnaAbout() {
  const img =
    (site as any).aboutImage ||
    (site as any).story?.image ||
    (site.gallery?.[2] ?? site.heroImage);

  const text = (site as any).aboutTextShort ?? (site as any).aboutText ?? "";

  return (
    <section id="o-domu" className="full-bleed">
      <div className="mx-auto max-w-7xl px-6 py-14 md:py-20">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-5xl md:text-6xl font-semibold" style={{ fontFamily: "var(--font-serif)" }}>
              {site.aboutTitle}
            </h2>

            <p className="mt-7 text-[16px] md:text-[18px] leading-relaxed text-neutral-800/80 max-w-2xl">
              {text}
            </p>

            <div className="mt-10 flex gap-3">
              <Link
                href="/historia"
                className="rounded-full border border-neutral-300 bg-white px-8 py-3 text-sm font-medium text-neutral-900 hover:bg-neutral-50"
              >
                Więcej
              </Link>
              <Link
                href="/rezerwacja"
                className="rounded-full bg-emerald-700 px-8 py-3 text-sm font-medium text-white hover:bg-emerald-800"
              >
                Rezerwuj
              </Link>
            </div>
          </div>

          <div className="relative">
            <div
              className="relative w-full overflow-hidden rounded-[36px] border"
              style={{ borderColor: "var(--border)", boxShadow: "var(--shadow)" }}
            >
              <div className="relative w-full aspect-[4/5] md:aspect-[3/4]">
                <Image src={img} alt="O domu" fill className="object-cover" />
              </div>
            </div>

            <div
              className="pointer-events-none absolute -inset-6 -z-10 rounded-[48px]"
              style={{ background: "rgba(47,71,55,.06)" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
