export type HeroContent = {
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  subtitle: string;
  cta: string;
};

export type ManifestoContent = {
  intro: string;
  stats: Array<{ value: string; label: string }>;
};

export type ServiceContent = {
  code: string;
  name: string;
  desc: string;
  swatch: string;
};

export type ProjectContent = {
  name: string;
  category: string;
  location: string;
  year: string;
  swatch: string;
};

export type ProcessStepContent = {
  stage: string;
  weeks: string;
  desc: string;
};

export type TestimonialContent = {
  text: string;
  who: string;
};

export type ConsultationContent = {
  eyebrow: string;
  heading: string;
  description: string;
  submitLabel: string;
  propertyTypes: string[];
  budgets: string[];
};

export type SiteContent = {
  hero: HeroContent;
  manifesto: ManifestoContent;
  services: ServiceContent[];
  projects: ProjectContent[];
  process: ProcessStepContent[];
  testimonials: TestimonialContent[];
  consultation: ConsultationContent;
};

export const defaultSiteContent: SiteContent = {
  hero: {
    eyebrow: "Interior Architecture & Spatial Design — Hyderabad / Worldwide",
    titleLine1: "We draw rooms",
    titleLine2: "before we build them.",
    subtitle:
      "Verrant is a small studio working across residences, offices and hospitality — from the first sketch through to the last light fixture. Scroll to watch the drawing take form.",
    cta: "Book a Consultation",
  },
  manifesto: {
    intro:
      "Most interiors are decorated after the fact. Ours are drawn first — light studied before furniture, sightlines fixed before finishes. A room that is planned this way doesn’t date, because it was never fashionable to begin with; it was only ever correct for the people in it.",
    stats: [
      { value: "142", label: "Residences delivered" },
      { value: "19", label: "Years in practice" },
      { value: "6", label: "Cities" },
      { value: "94%", label: "Clients who return" },
    ],
  },
  services: [
    {
      code: "01",
      name: "Residential Interiors",
      desc: "Full-home planning from spatial layout through to furniture, lighting and joinery detailing.",
      swatch: "linear-gradient(135deg, #6B5335 0%, #B08D57 45%, #D9B77F 100%)",
    },
    {
      code: "02",
      name: "Architectural Concept",
      desc: "Massing, volume and daylight studies at the earliest stage, before a single finish is chosen.",
      swatch: "linear-gradient(135deg, #23221A 0%, #3A382E 55%, #55523F 100%)",
    },
    {
      code: "03",
      name: "Material Direction",
      desc: "Stone, timber, plaster and metal palettes curated and sourced against budget and climate.",
      swatch: "linear-gradient(135deg, #8A7A5E 0%, #C9BBA0 50%, #EDE7DA 100%)",
    },
    {
      code: "04",
      name: "Lighting Design",
      desc: "Layered natural and artificial lighting plans, modelled scene by scene, hour by hour.",
      swatch: "linear-gradient(135deg, #3B2E1A 0%, #B08D57 50%, #FFE8C2 100%)",
    },
    {
      code: "05",
      name: "Turnkey Delivery",
      desc: "Site supervision, vendor coordination and final styling through to handover.",
      swatch: "linear-gradient(135deg, #1E1D17 0%, #4A4638 50%, #8A7A5E 100%)",
    },
  ],
  projects: [
    { name: "Jubilee Hills Residence", category: "Luxury Villa", location: "Hyderabad", year: "2025", swatch: "linear-gradient(160deg,#2A2820,#6B5335,#B08D57)" },
    { name: "The Almora Loft", category: "Apartment", location: "Bengaluru", year: "2024", swatch: "linear-gradient(160deg,#1E1D17,#3A382E,#8A7A5E)" },
    { name: "Meridian Workspace", category: "Office", location: "Hyderabad", year: "2024", swatch: "linear-gradient(160deg,#23221A,#55523F,#C9BBA0)" },
    { name: "Casa Linhares", category: "Luxury Villa", location: "Goa", year: "2023", swatch: "linear-gradient(160deg,#2E2A1C,#B08D57,#EDE7DA)" },
    { name: "Kondapur Kitchen Study", category: "Kitchen", location: "Hyderabad", year: "2023", swatch: "linear-gradient(160deg,#1C1B15,#4A4638,#D9B77F)" },
    { name: "Northlight Pavilion", category: "Commercial", location: "Pune", year: "2022", swatch: "linear-gradient(160deg,#181712,#3A382E,#A69C87)" },
  ],
  process: [
    { stage: "Discovery", weeks: "Week 1–2", desc: "Site survey, brief, budget and how you actually intend to live in the space." },
    { stage: "Concept", weeks: "Week 3–5", desc: "Massing, spatial planning and material direction, presented as drawings and studies." },
    { stage: "Development", weeks: "Week 6–10", desc: "Detailed drawings, furniture and lighting plans, vendor quotes, final sign-off." },
    { stage: "Execution", weeks: "Week 11–20", desc: "Site supervision, procurement and build, with weekly walkthroughs." },
    { stage: "Handover", weeks: "Week 21", desc: "Styling, snag list closure, and a maintenance guide built for your materials." },
  ],
  testimonials: [
    { text: "They planned the light before they planned the furniture. It shows every evening.", who: "R. Chandrasekhar, Jubilee Hills" },
    { text: "The drawings were so precise our contractor never once had to ask us a question.", who: "A. Iyer, Kondapur" },
    { text: "Nineteen years of practice and it still feels like a small studio that answers the phone.", who: "M. Reddy, Gachibowli" },
    { text: "Our office finally looks like the culture we're trying to build.", who: "S. Rao, Meridian Workspace" },
  ],
  consultation: {
    eyebrow: "Start a Project",
    heading: "Tell us about the space.",
    description:
      "We take on a small number of projects each quarter. Share a few details and a designer will get back to you within two working days with next steps and a proposed site visit.",
    submitLabel: "Request Consultation",
    propertyTypes: ["Residence", "Apartment", "Office", "Retail / Hospitality"],
    budgets: ["₹10L – 25L", "₹25L – 60L", "₹60L – 1.5Cr", "₹1.5Cr+"],
  },
};
