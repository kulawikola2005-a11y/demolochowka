"use client";

import { site } from "@/data/site";
import { motion } from "framer-motion";

export default function ReviewsSection() {
  return (
    <section id="opinie" className="mx-auto max-w-6xl px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold">Opinie</h2>
        <p className="mt-2 text-gray-600">Krótko i prawdziwie.</p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {site.reviews.map((r) => (
            <div key={r.name} className="rounded-2xl border p-5">
              <p className="text-gray-700">“{r.text}”</p>
              <p className="mt-3 text-sm text-gray-600">— {r.name}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
