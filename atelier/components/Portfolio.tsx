"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { ProjectContent } from "@/lib/siteContent";

const CATEGORIES = ["All", "Luxury Villa", "Apartment", "Office", "Kitchen", "Commercial"];

export default function Portfolio({ content }: { content: ProjectContent[] }) {
  const [filter, setFilter] = useState("All");

  const filtered = useMemo(
    () => (filter === "All" ? content : content.filter((p) => p.category === filter)),
    [filter]
  );

  return (
    <section id="portfolio" className="relative border-t border-line py-28 sm:py-36">
      <div className="mx-auto max-w-[1600px] px-6 sm:px-10">
        <div className="mb-12 flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
          <div>
            <div className="mb-4 flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest2 text-stonemuted">
              <span className="h-1.5 w-1.5 rounded-full bg-brass" />
              Selected Work
            </div>
            <h2 className="font-display text-4xl text-stone sm:text-6xl">
              A portfolio,<br className="hidden sm:block" /> not a catalogue.
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`border px-4 py-2 font-mono text-[11px] uppercase tracking-widest2 transition-colors ${
                  filter === c
                    ? "border-brass bg-brass text-ground"
                    : "border-line text-stonemuted hover:border-brass hover:text-brasslight"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => (
            <motion.a
              href="#consultation"
              key={p.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group relative aspect-[4/5] overflow-hidden bg-ground"
            >
              <div
                className="absolute inset-0 scale-110 transition-transform duration-700 ease-out group-hover:scale-100"
                style={{ background: p.swatch }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ground via-ground/10 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-70" />

              <div className="absolute left-5 top-5 font-mono text-[11px] uppercase tracking-widest2 text-stone/80">
                {p.category}
              </div>

              <div className="absolute inset-x-5 bottom-5 translate-y-2 transition-transform duration-500 group-hover:translate-y-0">
                <h3 className="font-display text-2xl text-stone">{p.name}</h3>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-widest2 text-stonemuted">
                  {p.location} — {p.year}
                </p>
              </div>

              <div className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-stone/30 text-stone opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                ↗
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
