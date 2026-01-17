"use client";

import Image from "next/image";
import { site } from "@/data/site";
import { motion } from "framer-motion";

export default function StorySection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid gap-6 md:grid-cols-2 md:items-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <h2 className="text-3xl font-semibold">{site.story.name}</h2>
          <p className="mt-4 text-neutral-700 leading-relaxed">{site.story.text}</p>

          <div className="mt-6 grid grid-cols-2 gap-3 text-sm text-neutral-700">
            {site.quickFacts.map((f) => (
              <div key={f.k} className="rounded-2xl border bg-white/60 p-4">
                <div className="text-neutral-500">{f.k}</div>
                <div className="font-medium">{f.v}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="relative h-[360px] overflow-hidden rounded-3xl border"
        >
          <Image src={site.story.image} alt="Wnętrze domku" fill className="object-cover" />
        </motion.div>
      </div>
    </section>
  );
}
