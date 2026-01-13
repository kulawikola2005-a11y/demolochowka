"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { site } from "@/data/site";

export default function HeroSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-8 pb-10">
      <div className="relative overflow-hidden rounded-3xl border">
        <div className="relative h-[520px]">
          <Image
            src={site.heroImage}
            alt="Domek w Krynicy"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/35" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 flex items-end"
        >
          <div className="p-8 md:p-12 text-white max-w-3xl">
            <p className="text-sm uppercase tracking-wider opacity-90">
              {site.location}
            </p>
            <h1 className="mt-2 text-4xl md:text-5xl font-semibold">
              {site.name}
            </h1>
            <p className="mt-3 text-white/90 text-lg">
              {site.tagline}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={site.ctaPrimary.href}
                className="rounded-xl bg-white text-black px-5 py-3 text-sm font-medium"
              >
                {site.ctaPrimary.label}
              </Link>
              <a
                href={site.ctaSecondary.href}
                className="rounded-xl border border-white/60 px-5 py-3 text-sm font-medium"
              >
                {site.ctaSecondary.label}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
