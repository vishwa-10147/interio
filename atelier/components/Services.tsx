"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ServiceContent } from "@/lib/siteContent";

export default function Services({ content }: { content: ServiceContent[] }) {
  const [active, setActive] = useState(0);

  return (
    <section id="services" className="relative border-t border-line py-28 sm:py-36">
      <div className="mx-auto max-w-[1600px] px-6 sm:px-10">
        <div className="mb-16 flex items-end justify-between gap-6">
          <div>
            <div className="mb-4 flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest2 text-stonemuted">
              <span className="h-1.5 w-1.5 rounded-full bg-brass" />
              What We Do
            </div>
            <h2 className="font-display text-4xl text-stone sm:text-6xl">
              Five disciplines,<br className="hidden sm:block" /> one drawing set.
            </h2>
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div className="border-t border-line">
            {content.map((s, i) => (
              <button
                key={s.code}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className={`group flex w-full items-center justify-between gap-6 border-b border-line py-6 text-left transition-colors ${
                  active === i ? "text-stone" : "text-stonemuted"
                }`}
              >
                <span className="flex items-center gap-6">
                  <span className="font-mono text-xs text-brass">{s.code}</span>
                  <span className="font-display text-2xl sm:text-3xl">
                    {s.name}
                  </span>
                </span>
                <span
                  className={`hidden font-mono text-lg transition-transform sm:block ${
                    active === i ? "translate-x-1 text-brass" : ""
                  }`}
                >
                  →
                </span>
              </button>
            ))}
          </div>

          <div className="corner-tick relative min-h-[280px] overflow-hidden border border-line">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0"
                style={{ background: content[active].swatch }}
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-ground/90 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <p className="font-mono text-[11px] uppercase tracking-widest2 text-ground/80">
                Service {content[active].code}
              </p>
              <p className="mt-3 max-w-xs font-body text-sm leading-relaxed text-ground">
                {content[active].desc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
