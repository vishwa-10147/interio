"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import type { ConsultationContent } from "@/lib/siteContent";

export default function Consultation({ content }: { content: ConsultationContent }) {
  const [submitted, setSubmitted] = useState(false);
  const [propertyType, setPropertyType] = useState(content.propertyTypes[0]);
  const [budget, setBudget] = useState(content.budgets[0]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // In production this posts to /api/consultations, which the CMS
    // Admin Panel's Bookings module would read from.
    setSubmitted(true);
  }

  return (
    <section id="consultation" className="relative border-t border-line py-28 sm:py-36">
      <div className="mx-auto max-w-[1600px] px-6 sm:px-10">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <div className="mb-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest2 text-stonemuted">
              <span className="h-1.5 w-1.5 rounded-full bg-brass" />
              {content.eyebrow}
            </div>
            <h2 className="max-w-md font-display text-4xl text-stone sm:text-6xl">
              {content.heading}
            </h2>
            <p className="mt-6 max-w-sm font-body text-sm leading-relaxed text-stonemuted">
              {content.description}
            </p>
          </div>

          <div className="corner-tick border border-line p-6 sm:p-10">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex h-full min-h-[320px] flex-col items-center justify-center text-center"
              >
                <p className="font-display text-3xl text-stone">Request received.</p>
                <p className="mt-3 max-w-xs font-body text-sm text-stonemuted">
                  A designer will reach out shortly to schedule your consultation.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="grid gap-6 sm:grid-cols-2">
                <label className="flex flex-col gap-2 sm:col-span-1">
                  <span className="font-mono text-[11px] uppercase tracking-widest2 text-stonemuted">Name</span>
                  <input required name="name" className="border-b border-line bg-transparent py-2 font-body text-stone outline-none transition-colors focus:border-brass" />
                </label>
                <label className="flex flex-col gap-2 sm:col-span-1">
                  <span className="font-mono text-[11px] uppercase tracking-widest2 text-stonemuted">Email</span>
                  <input required type="email" name="email" className="border-b border-line bg-transparent py-2 font-body text-stone outline-none transition-colors focus:border-brass" />
                </label>

                <label className="flex flex-col gap-2 sm:col-span-1">
                  <span className="font-mono text-[11px] uppercase tracking-widest2 text-stonemuted">Property type</span>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="border-b border-line bg-transparent py-2 font-body text-stone outline-none transition-colors focus:border-brass"
                  >
                    {content.propertyTypes.map((t) => (
                      <option key={t} value={t} className="bg-surface">{t}</option>
                    ))}
                  </select>
                </label>

                <label className="flex flex-col gap-2 sm:col-span-1">
                  <span className="font-mono text-[11px] uppercase tracking-widest2 text-stonemuted">Budget range</span>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="border-b border-line bg-transparent py-2 font-body text-stone outline-none transition-colors focus:border-brass"
                  >
                    {content.budgets.map((b) => (
                      <option key={b} value={b} className="bg-surface">{b}</option>
                    ))}
                  </select>
                </label>

                <label className="flex flex-col gap-2 sm:col-span-2">
                  <span className="font-mono text-[11px] uppercase tracking-widest2 text-stonemuted">A little about the project</span>
                  <textarea name="message" rows={3} className="resize-none border-b border-line bg-transparent py-2 font-body text-stone outline-none transition-colors focus:border-brass" />
                </label>

                <button
                  type="submit"
                  className="mt-2 inline-flex w-fit items-center gap-3 border border-brass px-6 py-3 font-mono text-[11px] uppercase tracking-widest2 text-brasslight transition-colors hover:bg-brass hover:text-ground sm:col-span-2"
                >
                  {content.submitLabel} →
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
