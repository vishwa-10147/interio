"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { defaultSiteContent, type SiteContent } from "@/lib/siteContent";

const STORAGE_KEY = "verrant-site-content";

export default function AdminPage() {
  const [content, setContent] = useState<SiteContent>(defaultSiteContent);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as SiteContent;
        setContent(parsed);
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
  }, [content]);

  function updateHero(field: keyof SiteContent["hero"], value: string) {
    setContent((prev) => ({ ...prev, hero: { ...prev.hero, [field]: value } }));
  }

  function updateManifesto(field: "intro", value: string) {
    setContent((prev) => ({ ...prev, manifesto: { ...prev.manifesto, [field]: value } }));
  }

  function updateManifestoStat(index: number, field: "value" | "label", value: string) {
    setContent((prev) => {
      const stats = [...prev.manifesto.stats];
      stats[index] = { ...stats[index], [field]: value };
      return { ...prev, manifesto: { ...prev.manifesto, stats } };
    });
  }

  function updateService(index: number, field: keyof SiteContent["services"][number], value: string) {
    setContent((prev) => {
      const services = [...prev.services];
      services[index] = { ...services[index], [field]: value };
      return { ...prev, services };
    });
  }

  function updateProject(index: number, field: keyof SiteContent["projects"][number], value: string) {
    setContent((prev) => {
      const projects = [...prev.projects];
      projects[index] = { ...projects[index], [field]: value };
      return { ...prev, projects };
    });
  }

  function updateProcess(index: number, field: keyof SiteContent["process"][number], value: string) {
    setContent((prev) => {
      const process = [...prev.process];
      process[index] = { ...process[index], [field]: value };
      return { ...prev, process };
    });
  }

  function updateTestimonial(index: number, field: keyof SiteContent["testimonials"][number], value: string) {
    setContent((prev) => {
      const testimonials = [...prev.testimonials];
      testimonials[index] = { ...testimonials[index], [field]: value };
      return { ...prev, testimonials };
    });
  }

  function updateConsultation(field: keyof SiteContent["consultation"], value: string | string[]) {
    setContent((prev) => ({
      ...prev,
      consultation: { ...prev.consultation, [field]: value },
    }));
  }

  return (
    <main className="min-h-screen bg-ground text-stone">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-4 px-6 py-6 sm:px-10 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-widest2 text-brass">
            Admin Console
          </p>
          <h1 className="mt-2 font-display text-3xl text-stone sm:text-4xl">
            Edit the whole website from one place.
          </h1>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-3 border border-brass px-5 py-3 font-mono text-[11px] uppercase tracking-widest2 text-brasslight transition-colors hover:bg-brass hover:text-ground"
        >
          View Site
          <span aria-hidden="true">→</span>
        </Link>
      </div>

      <div className="mx-auto grid max-w-[1600px] gap-6 px-6 pb-16 sm:px-10 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-sm border border-line bg-surface/50 p-6">
          <h2 className="font-display text-2xl text-stone">Live Preview</h2>
          <p className="mt-2 text-sm text-stonemuted">Changes are saved in this browser automatically.</p>
          <div className="mt-6 rounded-sm border border-line bg-ground p-4 text-sm text-stonemuted">
            <p className="font-mono text-[11px] uppercase tracking-widest2 text-brass">Preview tip</p>
            <p className="mt-2">Open the site in another tab to see changes instantly as you edit.</p>
          </div>
        </section>

        <section className="space-y-6">
          <div className="rounded-sm border border-line bg-surface/50 p-6">
            <h3 className="font-display text-xl text-stone">Hero Section</h3>
            <label className="mt-4 flex flex-col gap-2 text-sm">
              <span className="font-mono text-[11px] uppercase tracking-widest2 text-stonemuted">Eyebrow</span>
              <input value={content.hero.eyebrow} onChange={(e) => updateHero("eyebrow", e.target.value)} className="border-b border-line bg-transparent py-2 outline-none" />
            </label>
            <label className="mt-3 flex flex-col gap-2 text-sm">
              <span className="font-mono text-[11px] uppercase tracking-widest2 text-stonemuted">Title Line 1</span>
              <input value={content.hero.titleLine1} onChange={(e) => updateHero("titleLine1", e.target.value)} className="border-b border-line bg-transparent py-2 outline-none" />
            </label>
            <label className="mt-3 flex flex-col gap-2 text-sm">
              <span className="font-mono text-[11px] uppercase tracking-widest2 text-stonemuted">Title Line 2</span>
              <input value={content.hero.titleLine2} onChange={(e) => updateHero("titleLine2", e.target.value)} className="border-b border-line bg-transparent py-2 outline-none" />
            </label>
            <label className="mt-3 flex flex-col gap-2 text-sm">
              <span className="font-mono text-[11px] uppercase tracking-widest2 text-stonemuted">Subtitle</span>
              <textarea value={content.hero.subtitle} onChange={(e) => updateHero("subtitle", e.target.value)} className="min-h-[90px] border-b border-line bg-transparent py-2 outline-none" />
            </label>
            <label className="mt-3 flex flex-col gap-2 text-sm">
              <span className="font-mono text-[11px] uppercase tracking-widest2 text-stonemuted">CTA</span>
              <input value={content.hero.cta} onChange={(e) => updateHero("cta", e.target.value)} className="border-b border-line bg-transparent py-2 outline-none" />
            </label>
          </div>

          <div className="rounded-sm border border-line bg-surface/50 p-6">
            <h3 className="font-display text-xl text-stone">Manifesto</h3>
            <label className="mt-4 flex flex-col gap-2 text-sm">
              <span className="font-mono text-[11px] uppercase tracking-widest2 text-stonemuted">Intro</span>
              <textarea value={content.manifesto.intro} onChange={(e) => updateManifesto("intro", e.target.value)} className="min-h-[120px] border-b border-line bg-transparent py-2 outline-none" />
            </label>
            {content.manifesto.stats.map((stat, index) => (
              <div key={stat.label} className="mt-4 grid gap-3 sm:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm">
                  <span className="font-mono text-[11px] uppercase tracking-widest2 text-stonemuted">Value {index + 1}</span>
                  <input value={stat.value} onChange={(e) => updateManifestoStat(index, "value", e.target.value)} className="border-b border-line bg-transparent py-2 outline-none" />
                </label>
                <label className="flex flex-col gap-2 text-sm">
                  <span className="font-mono text-[11px] uppercase tracking-widest2 text-stonemuted">Label {index + 1}</span>
                  <input value={stat.label} onChange={(e) => updateManifestoStat(index, "label", e.target.value)} className="border-b border-line bg-transparent py-2 outline-none" />
                </label>
              </div>
            ))}
          </div>

          <div className="rounded-sm border border-line bg-surface/50 p-6">
            <h3 className="font-display text-xl text-stone">Services</h3>
            {content.services.map((service, index) => (
              <div key={service.code} className="mt-4 rounded-sm border border-line/70 p-4">
                <label className="flex flex-col gap-2 text-sm">
                  <span className="font-mono text-[11px] uppercase tracking-widest2 text-stonemuted">Code</span>
                  <input value={service.code} onChange={(e) => updateService(index, "code", e.target.value)} className="border-b border-line bg-transparent py-2 outline-none" />
                </label>
                <label className="mt-3 flex flex-col gap-2 text-sm">
                  <span className="font-mono text-[11px] uppercase tracking-widest2 text-stonemuted">Name</span>
                  <input value={service.name} onChange={(e) => updateService(index, "name", e.target.value)} className="border-b border-line bg-transparent py-2 outline-none" />
                </label>
                <label className="mt-3 flex flex-col gap-2 text-sm">
                  <span className="font-mono text-[11px] uppercase tracking-widest2 text-stonemuted">Description</span>
                  <textarea value={service.desc} onChange={(e) => updateService(index, "desc", e.target.value)} className="min-h-[70px] border-b border-line bg-transparent py-2 outline-none" />
                </label>
                <label className="mt-3 flex flex-col gap-2 text-sm">
                  <span className="font-mono text-[11px] uppercase tracking-widest2 text-stonemuted">Swatch</span>
                  <input value={service.swatch} onChange={(e) => updateService(index, "swatch", e.target.value)} className="border-b border-line bg-transparent py-2 outline-none" />
                </label>
              </div>
            ))}
          </div>

          <div className="rounded-sm border border-line bg-surface/50 p-6">
            <h3 className="font-display text-xl text-stone">Portfolio</h3>
            {content.projects.map((project, index) => (
              <div key={project.name} className="mt-4 rounded-sm border border-line/70 p-4">
                <label className="flex flex-col gap-2 text-sm">
                  <span className="font-mono text-[11px] uppercase tracking-widest2 text-stonemuted">Name</span>
                  <input value={project.name} onChange={(e) => updateProject(index, "name", e.target.value)} className="border-b border-line bg-transparent py-2 outline-none" />
                </label>
                <label className="mt-3 flex flex-col gap-2 text-sm">
                  <span className="font-mono text-[11px] uppercase tracking-widest2 text-stonemuted">Category</span>
                  <input value={project.category} onChange={(e) => updateProject(index, "category", e.target.value)} className="border-b border-line bg-transparent py-2 outline-none" />
                </label>
                <label className="mt-3 flex flex-col gap-2 text-sm">
                  <span className="font-mono text-[11px] uppercase tracking-widest2 text-stonemuted">Location</span>
                  <input value={project.location} onChange={(e) => updateProject(index, "location", e.target.value)} className="border-b border-line bg-transparent py-2 outline-none" />
                </label>
                <label className="mt-3 flex flex-col gap-2 text-sm">
                  <span className="font-mono text-[11px] uppercase tracking-widest2 text-stonemuted">Year</span>
                  <input value={project.year} onChange={(e) => updateProject(index, "year", e.target.value)} className="border-b border-line bg-transparent py-2 outline-none" />
                </label>
                <label className="mt-3 flex flex-col gap-2 text-sm">
                  <span className="font-mono text-[11px] uppercase tracking-widest2 text-stonemuted">Swatch</span>
                  <input value={project.swatch} onChange={(e) => updateProject(index, "swatch", e.target.value)} className="border-b border-line bg-transparent py-2 outline-none" />
                </label>
              </div>
            ))}
          </div>

          <div className="rounded-sm border border-line bg-surface/50 p-6">
            <h3 className="font-display text-xl text-stone">Process</h3>
            {content.process.map((step, index) => (
              <div key={step.stage} className="mt-4 rounded-sm border border-line/70 p-4">
                <label className="flex flex-col gap-2 text-sm">
                  <span className="font-mono text-[11px] uppercase tracking-widest2 text-stonemuted">Stage</span>
                  <input value={step.stage} onChange={(e) => updateProcess(index, "stage", e.target.value)} className="border-b border-line bg-transparent py-2 outline-none" />
                </label>
                <label className="mt-3 flex flex-col gap-2 text-sm">
                  <span className="font-mono text-[11px] uppercase tracking-widest2 text-stonemuted">Timeline</span>
                  <input value={step.weeks} onChange={(e) => updateProcess(index, "weeks", e.target.value)} className="border-b border-line bg-transparent py-2 outline-none" />
                </label>
                <label className="mt-3 flex flex-col gap-2 text-sm">
                  <span className="font-mono text-[11px] uppercase tracking-widest2 text-stonemuted">Description</span>
                  <textarea value={step.desc} onChange={(e) => updateProcess(index, "desc", e.target.value)} className="min-h-[70px] border-b border-line bg-transparent py-2 outline-none" />
                </label>
              </div>
            ))}
          </div>

          <div className="rounded-sm border border-line bg-surface/50 p-6">
            <h3 className="font-display text-xl text-stone">Testimonials</h3>
            {content.testimonials.map((quote, index) => (
              <div key={quote.who} className="mt-4 rounded-sm border border-line/70 p-4">
                <label className="flex flex-col gap-2 text-sm">
                  <span className="font-mono text-[11px] uppercase tracking-widest2 text-stonemuted">Quote</span>
                  <textarea value={quote.text} onChange={(e) => updateTestimonial(index, "text", e.target.value)} className="min-h-[70px] border-b border-line bg-transparent py-2 outline-none" />
                </label>
                <label className="mt-3 flex flex-col gap-2 text-sm">
                  <span className="font-mono text-[11px] uppercase tracking-widest2 text-stonemuted">Author</span>
                  <input value={quote.who} onChange={(e) => updateTestimonial(index, "who", e.target.value)} className="border-b border-line bg-transparent py-2 outline-none" />
                </label>
              </div>
            ))}
          </div>

          <div className="rounded-sm border border-line bg-surface/50 p-6">
            <h3 className="font-display text-xl text-stone">Consultation</h3>
            <label className="mt-4 flex flex-col gap-2 text-sm">
              <span className="font-mono text-[11px] uppercase tracking-widest2 text-stonemuted">Eyebrow</span>
              <input value={content.consultation.eyebrow} onChange={(e) => updateConsultation("eyebrow", e.target.value)} className="border-b border-line bg-transparent py-2 outline-none" />
            </label>
            <label className="mt-3 flex flex-col gap-2 text-sm">
              <span className="font-mono text-[11px] uppercase tracking-widest2 text-stonemuted">Heading</span>
              <input value={content.consultation.heading} onChange={(e) => updateConsultation("heading", e.target.value)} className="border-b border-line bg-transparent py-2 outline-none" />
            </label>
            <label className="mt-3 flex flex-col gap-2 text-sm">
              <span className="font-mono text-[11px] uppercase tracking-widest2 text-stonemuted">Description</span>
              <textarea value={content.consultation.description} onChange={(e) => updateConsultation("description", e.target.value)} className="min-h-[90px] border-b border-line bg-transparent py-2 outline-none" />
            </label>
            <label className="mt-3 flex flex-col gap-2 text-sm">
              <span className="font-mono text-[11px] uppercase tracking-widest2 text-stonemuted">Submit Label</span>
              <input value={content.consultation.submitLabel} onChange={(e) => updateConsultation("submitLabel", e.target.value)} className="border-b border-line bg-transparent py-2 outline-none" />
            </label>
            <label className="mt-3 flex flex-col gap-2 text-sm">
              <span className="font-mono text-[11px] uppercase tracking-widest2 text-stonemuted">Property Types</span>
              <textarea value={content.consultation.propertyTypes.join("\n")} onChange={(e) => updateConsultation("propertyTypes", e.target.value.split("\n").filter(Boolean))} className="min-h-[90px] border-b border-line bg-transparent py-2 outline-none" />
            </label>
            <label className="mt-3 flex flex-col gap-2 text-sm">
              <span className="font-mono text-[11px] uppercase tracking-widest2 text-stonemuted">Budgets</span>
              <textarea value={content.consultation.budgets.join("\n")} onChange={(e) => updateConsultation("budgets", e.target.value.split("\n").filter(Boolean))} className="min-h-[90px] border-b border-line bg-transparent py-2 outline-none" />
            </label>
          </div>
        </section>
      </div>
    </main>
  );
}
