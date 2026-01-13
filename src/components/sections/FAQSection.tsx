"use client";

import { site } from "@/data/site";
import { motion } from "framer-motion";

export default function FAQSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
      >
        <h2 className="text-3xl font-semibold">FAQ</h2>
        <div className="mt-6 grid gap-3">
          {site.faq.map((x) => (
            <details key={x.q} className="rounded-2xl border bg-white/60 p-5">
              <summary className="cursor-pointer font-medium">{x.q}</summary>
              <p className="mt-3 text-sm text-neutral-700">{x.a}</p>
            </details>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
