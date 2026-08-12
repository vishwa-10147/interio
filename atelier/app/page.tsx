"use client";

import { useEffect, useState } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import Consultation from "@/components/Consultation";
import Footer from "@/components/Footer";
import { defaultSiteContent, type SiteContent } from "@/lib/siteContent";

const STORAGE_KEY = "verrant-site-content";

export default function Home() {
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

  return (
    <SmoothScroll>
      <div className="grain" />
      <Nav />
      <main>
        <Hero content={content.hero} />
        <Manifesto content={content.manifesto} />
        <Services content={content.services} />
        <Portfolio content={content.projects} />
        <Process content={content.process} />
        <Testimonials content={content.testimonials} />
        <Consultation content={content.consultation} />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
