"use client";

import { motion } from "framer-motion";
import type { ProcessStepContent } from "@/lib/siteContent";

export default function Process({ content }: { content: ProcessStepContent[] }) {
  return (
    <section id="process" className="relative border-t border-line py-28 sm:py-36">
      <div className="mx-auto max-w-[1600px] px-6 sm:px-10">
        <div className="mb-16 flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest2 text-stonemuted">
          <span className="h-1.5 w-1.5 rounded-full bg-brass" />
          How a Project Runs
        </div>

        <div className="relative border-l border-line pl-8 sm:pl-12">
          {content.map((s, i) => (
            <motion.div
              key={s.stage}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="relative border-b border-line py-10 last:border-none"
            >
              <span className="absolute -left-[41px] top-11 h-2.5 w-2.5 rounded-full bg-brass sm:-left-[57px]" />
              <div className="grid gap-3 sm:grid-cols-[100px_1fr_1fr] sm:items-baseline sm:gap-8">
                <span className="font-mono text-[11px] uppercase tracking-widest2 text-brass">
                  {s.weeks}
                </span>
                <h3 className="font-display text-2xl text-stone sm:text-3xl">
                  {s.stage}
                </h3>
                <p className="max-w-md font-body text-sm leading-relaxed text-stonemuted">
                  {s.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
