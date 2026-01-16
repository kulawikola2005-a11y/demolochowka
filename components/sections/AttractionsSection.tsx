"use client";

import { site } from "@/data/site";
import { motion } from "framer-motion";

export default function AttractionsSection() {
  return (
    <section id="okolica" className="mx-auto max-w-6xl px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold">Atrakcje w okolicy</h2>
        <p className="mt-2 text-gray-600">Kilka rzeczy, które warto zobaczyć.</p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {site.attractions.map((x) => (
            <div key={x.name} className="rounded-2xl border p-5">
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-medium">{x.name}</h3>
                <span className="text-sm text-gray-600">{x.time}</span>
              </div>
              <p className="mt-2 text-sm text-gray-600">{x.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
