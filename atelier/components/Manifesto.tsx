"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { ManifestoContent } from "@/lib/siteContent";

export default function Manifesto({ content }: { content: ManifestoContent }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.2"],
  });
  const reveal = useTransform(scrollYProgress, [0, 1], ["100%", "0%"]);

  return (
    <section id="studio" className="relative border-t border-line bg-ground py-28 sm:py-36">
      <div className="mx-auto max-w-[1600px] px-6 sm:px-10">
        <div className="mb-16 flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest2 text-stonemuted">
          <span className="h-1.5 w-1.5 rounded-full bg-brass" />
          Studio Note
        </div>

        <div ref={ref} className="relative overflow-hidden">
          <motion.div
            style={{ clipPath: useTransform(reveal, (v) => `inset(0 ${v} 0 0)`) }}
          >
            <p className="max-w-5xl font-display text-3xl leading-[1.25] text-stone sm:text-5xl sm:leading-[1.2]">
              {content.intro}
            </p>
          </motion.div>
        </div>

        <div className="mt-20 grid grid-cols-2 gap-x-6 gap-y-12 border-t border-line pt-12 sm:grid-cols-4">
          {content.stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="font-display text-4xl text-stone sm:text-5xl">
                {s.value}
              </div>
              <div className="mt-2 font-mono text-[11px] uppercase tracking-widest2 text-stonemuted">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
