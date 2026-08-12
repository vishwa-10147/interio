"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { HeroContent } from "@/lib/siteContent";
import VillaScene from "./canvas/VillaScene";

gsap.registerPlugin(ScrollTrigger);

export default function Hero({ content }: { content: HeroContent }) {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollProgress = useRef(0);
  const pointer = useRef({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const el = sectionRef.current;
    if (!el) return;

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        scrollProgress.current = self.progress;
      },
    });

    const onMove = (e: MouseEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove);

    return () => {
      st.kill();
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-[180vh] w-full"
      aria-label="Verrant — interior architecture studio"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* 3D scene */}
        <div className="absolute inset-0">
          {mounted ? (
            <VillaScene scrollProgress={scrollProgress} pointer={pointer} />
          ) : null}
        </div>

        {/* blueprint grid + vignette overlay */}
        <div className="pointer-events-none absolute inset-0 blueprint-grid opacity-40" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ground via-transparent to-ground/60" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ground/70 via-transparent to-ground/40" />

        {/* eyebrow: drawing index, architectural label */}
        <div className="absolute left-6 top-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest2 text-stonemuted sm:left-10 sm:top-10">
          <span className="h-1.5 w-1.5 rounded-full bg-brass" />
          Dwg. No. 001 — Residence, Elevation A
        </div>

        <div className="absolute right-6 top-6 font-mono text-[11px] uppercase tracking-widest2 text-stonemuted sm:right-10 sm:top-10">
          Verrant
        </div>

        {/* headline */}
        <div className="absolute inset-x-0 bottom-0 px-6 pb-16 sm:px-10 sm:pb-20">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mb-4 max-w-md font-mono text-[11px] uppercase tracking-widest2 text-brasslight"
          >
            {content.eyebrow}
          </motion.p>

          <h1 className="max-w-4xl font-display text-[13vw] leading-[0.92] tracking-tight text-stone sm:text-[7.5vw]">
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {content.titleLine1}
            </motion.span>
            <motion.span
              className="block italic text-brass"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {content.titleLine2}
            </motion.span>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-wrap items-end justify-between gap-6 border-t border-line pt-6"
          >
            <p className="max-w-sm font-body text-sm leading-relaxed text-stonemuted">
              {content.subtitle}
            </p>
            <a
              href="#consultation"
              className="group relative inline-flex items-center gap-3 border border-brass px-6 py-3 font-mono text-[11px] uppercase tracking-widest2 text-brasslight transition-colors hover:bg-brass hover:text-ground"
            >
              {content.cta}
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
