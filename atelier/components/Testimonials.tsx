"use client";

import type { TestimonialContent } from "@/lib/siteContent";

export default function Testimonials({ content }: { content: TestimonialContent[] }) {
  const loop = [...content, ...content];

  return (
    <section className="relative overflow-hidden border-t border-line py-20 sm:py-28">
      <div className="mb-12 px-6 sm:px-10">
        <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest2 text-stonemuted">
          <span className="h-1.5 w-1.5 rounded-full bg-brass" />
          Client Notes
        </div>
      </div>

      <div className="group relative flex overflow-hidden">
        <div className="flex shrink-0 animate-[marquee_38s_linear_infinite] gap-16 pr-16 group-hover:[animation-play-state:paused]">
          {loop.map((q, i) => (
            <div key={i} className="flex w-[420px] shrink-0 flex-col justify-between border border-line p-8">
              <p className="font-display text-xl leading-snug text-stone">
                &ldquo;{q.text}&rdquo;
              </p>
              <p className="mt-8 font-mono text-[11px] uppercase tracking-widest2 text-stonemuted">
                {q.who}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
