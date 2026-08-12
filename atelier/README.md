# Verrant — Cinematic Interior Studio Frontend

A fully working Next.js 15 + React 18 + TypeScript site: fullscreen 3D hero
(React Three Fiber), a scroll-driven "blueprint becomes building" reveal,
GSAP ScrollTrigger + Lenis smooth scroll, a filterable portfolio, services,
process timeline, testimonials marquee, and a consultation form.

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:3000. `npm run build` produces a verified
production build (already tested — compiles clean, 4 static pages).

## What's real vs. what's scoped out

This delivers the **cinematic front-end experience** from the brief —
the hardest part to get visually right, and the part that actually
differentiates the site. It does **not** include the enterprise CMS,
multi-tenant architecture, Prisma/PostgreSQL database, auth, or the 3D
room configurator described in the full brief — that's a genuinely
large, separate backend project (weeks of work on its own), and bolting
on fake versions of it would just leave you with the same amount of
work, hidden.

**Included:**
- 3D villa built procedurally in Three.js (no external `.glb` needed) —
  wireframe-to-solid morph driven by scroll, orbiting camera, parallax
  mouse look, swaying trees, dust particles, soft contact shadows
- Lenis smooth scroll + GSAP ScrollTrigger scene sync
- Framer Motion reveals throughout
- Filterable portfolio grid, services panel, sequential process timeline,
  infinite testimonials marquee
- Consultation form (client-side only — see below)
- Fully responsive, respects `prefers-reduced-motion`

**Deliberately left as clear extension points:**
- `components/canvas/VillaScene.tsx` — swap the procedural geometry for a
  real `.glb` villa model (drop it in `/public/models` and load with
  `useGLTF` from drei)
- `components/Consultation.tsx` — the form currently only sets local
  state on submit. Point it at a real `/api/consultations` route (Prisma
  + PostgreSQL) to actually persist bookings
- Fonts: swap the system-font fallback stacks in `tailwind.config.ts`
  for `next/font/google` (Fraunces / Inter / IBM Plex Mono) once you have
  network access to fetch them — this sandbox couldn't reach
  fonts.googleapis.com to bundle them
- Images: portfolio and service "photography" are CSS gradient swatches
  by design (no stock photography was available to license here) —
  drop real project photography into `/public` and swap the `swatch`
  background for an `<Image>` per project

## Where a CMS/admin layer would plug in

The component boundaries are already CMS-shaped: `Hero`, `Manifesto`,
`Services`, `Portfolio`, `Process`, `Testimonials`, `Consultation` each
take their content from local arrays at the top of the file. Moving
those arrays to a database call (`await prisma.project.findMany()`, etc.)
is the whole migration — no restructuring needed.

## Stack

Next.js 15 · React 18 · TypeScript · Tailwind CSS · React Three Fiber ·
drei · Three.js · GSAP + ScrollTrigger · Framer Motion · Lenis
