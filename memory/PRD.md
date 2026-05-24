# Barka Royal Homes & Consults Ltd (BRHC) — Landing Site PRD

## Original Problem Statement
Build a premium, modern, enterprise-grade landing page for **Barka Royal Homes and Consults Ltd (BRHC)** — a Nigerian real estate development, construction, architectural design and consultancy firm. Tagline: "Living As You Are Pleased". Required: hero, about (vision/mission + core values), services (6), filterable projects portfolio (6), why-choose-us, testimonials, CTA, contact (info + form), footer with newsletter. Premium brand feel; blue (#1E3A8A) + gold (#D4AF37); responsive; framer-motion animations.

## User Personas
- **Prospective homeowners** in Nigeria evaluating BRHC for residential builds
- **Commercial / institutional clients** sourcing a Nigerian developer
- **Investors** screening real estate operators for capital deployment
- **Recruiters / partners** assessing brand credibility

## Architecture
- **Frontend**: React 19 + CRA/CRACO, Tailwind, framer-motion, lucide-react, sonner toasts
  - Pages: `/` → `pages/Landing.jsx`
  - Components: `components/site/{Navbar,Hero,About,Services,Projects,WhyChooseUs,Testimonials,CTA,Contact,Footer}.jsx`
  - Static content: `lib/site-data.js`
- **Backend**: FastAPI + Motor + MongoDB
  - `POST/GET /api/contact` → `contact_submissions`
  - `POST/GET /api/newsletter` → `newsletter_subscribers` (idempotent on email)
- **Design system**: Playfair Display headings + Outfit body; deep navy `#0b1120`, royal blue `#1E3A8A`, gold `#D4AF37`, linen `#F6F1E7`; sharp 0-radius corners; editorial/Swiss aesthetic.

## Implemented (Dec 2025)
- All 9 sections including filterable projects portfolio with detail modal
- Contact form persists to MongoDB; success/error toasts
- Newsletter signup with email idempotency
- Sticky navbar with scroll-triggered styling + mobile hamburger
- Framer-motion scroll-triggered fades & staggered reveals
- Full responsive layout (mobile / tablet / desktop)
- All interactive elements carry unique `data-testid`
- Backend pytest suite (8/8) + frontend Playwright flows (100%) passing

## Backlog (P0 / P1 / P2)
- **P1**: Booking-calendar integration on "Schedule Consultation" (e.g., Cal.com / Calendly embed)
- **P1**: WhatsApp click-to-chat float button (Nigerian buyer norm)
- **P1**: Lead-routing email notification to BRHC inbox (Resend/SendGrid) when /api/contact fires
- **P2**: Project gallery with multiple images per project + lightbox
- **P2**: Blog / Insights section for SEO + market commentary
- **P2**: Admin dashboard to review leads + export CSV
- **P2**: i18n (English / Hausa / Yoruba / Igbo)

## Test Credentials
None — no auth in this build.
