# Barokah Group Premium Rebuild

Premium rebuild of the Barokah Group website for Vercel.

## Stack
- Next.js App Router
- TypeScript
- Tailwind CSS v4 (compiled with PostCSS)
- Vercel Analytics + Speed Insights
- Lucide icons

## Local development
```bash
npm install
npm run dev
```

The `predev` and `prebuild` scripts copy the existing legacy brochure files (`i-1.jpg` ... `i-5.jpg`) from the repository root into `public/brochures/` so the binary assets do not need to be duplicated during migration.

## Environment
Copy `.env.example` to `.env.local` and set the production site URL if needed.

The canonical WhatsApp admin number is configured as `201515311259` and the official WhatsApp group URL is included in `.env.example`.

## Important content note
The testimonial cards are explicitly labeled placeholder/demo content. Replace them with real consented testimonials before treating them as public social proof.

No legal/licensing claims are included because none were supplied for publication.
