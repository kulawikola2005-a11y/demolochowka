"use client";

import { site } from "@/data/site";
import { motion } from "framer-motion";
import { Home, Wifi, Car, Mountain, Flame, CookingPot } from "lucide-react";

const icons = [Home, Flame, CookingPot, Wifi, Car, Mountain];

export default function AmenitiesSection() {
  return (
    <section id="udogodnienia" className="mx-auto max-w-6xl px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold">Udogodnienia</h2>
        <p className="mt-2 text-gray-600">Wszystko, co potrzebne na wygodny pobyt.</p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {site.amenities.map((a, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <div key={a.title} className="rounded-2xl border p-5">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl border p-2">
                    <Icon />
                  </div>
                  <div>
                    <h3 className="font-medium">{a.title}</h3>
                    <p className="text-sm text-gray-600">{a.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
