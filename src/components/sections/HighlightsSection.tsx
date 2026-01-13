"use client";

import { site } from "@/data/site";
import { motion } from "framer-motion";

export default function HighlightsSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        className="grid gap-4 md:grid-cols-3"
      >
        {site.highlights.map((h) => (
          <div key={h.title} className="card-soft p-6">
            <h3 className="text-xl font-semibold">{h.title}</h3>
            <p className="mt-2 text-sm text-neutral-600">{h.desc}</p>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
