# Cornell x Columbia AI Hackathon 2026

Landing page for the Cornell x Columbia AI Hackathon — a highly selective event bringing together 120 graduate builders from Cornell Tech, Columbia, NYU, Yale, and Princeton for a weekend of prototyping agentic AI solutions.

**March 20–22, 2026 | Cornell Tech, Roosevelt Island, NYC**

## Stack

- [Next.js 16](https://nextjs.org) (App Router)
- [Tailwind CSS v4](https://tailwindcss.com)
- [Framer Motion](https://motion.dev) for scroll-triggered animations
- [Vercel](https://vercel.com) for hosting (auto-deploys on push to `main`)

## Development

```bash
npm install
npm run dev
```

Open [localhost:3000](http://localhost:3000).

## Deployment

Pushes to `main` automatically deploy to production via Vercel.

To deploy manually:

```bash
vercel --prod
```

## Project Structure

```
app/
  layout.tsx        # Fonts (Instrument Serif + DM Sans), metadata
  page.tsx          # Page composition
  globals.css       # Design system, animations, custom effects
components/
  hero.tsx          # Animated hero with countdown
  about.tsx         # Stats with animated counters
  schedule.tsx      # 3-day tabbed timeline
  sponsors.tsx      # Gold/Silver sponsorship tiers
  faq.tsx           # Collapsible accordion
  footer.tsx        # Links and organizing info
  nav.tsx           # Sticky nav with glass blur
  fade-in.tsx       # Reusable animation primitives
  countdown.tsx     # Live countdown timer
public/
  logo-white.png    # Cornell Tech AI Society logo (white/transparent)
```

## Links

- [Event Page (Luma)](https://luma.com/8dbisemh)
- Sponsor inquiries: ctsg@cornell.edu

## Organized By

**Cornell Tech Student Government** & **Cornell Tech AI Society**
