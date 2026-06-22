# Market Capital Group — Design Requirements

Running log of design direction across all homepage variants. Each `/designN`
route is a self-contained alternative for comparison; `/` (Design 1) is the
current live homepage.

## Brand Positioning (source of truth)

Market Capital Group is a boutique, non-custodial Bitcoin risk management
advisory firm for serious long-term investors — not a retail crypto brand,
trading signal service, or influencer platform.

- Core message: *"Bitcoin created the opportunity. Risk management protects it."*
- Audience: accredited investors, $250K+ Bitcoin exposure, long-term wealth
  preservation focus.
- Primary CTA everywhere: *Request the MCG Bitcoin Risk Management Playbook*
  (gated behind a qualification step — never a direct "book a call" CTA).
- Tone: calm authority, disciplined, institutional. Never hype-driven,
  speculative, or "crypto casino."
- Brand colors: black / charcoal / dark graphite primary, Bitcoin orange +
  warm muted gold accents, white copy, clean sans-serif.

## Design Variants

**Design 1 — `/` (live homepage)**
Institutional charcoal + burnt-orange. Whale tail photo hero. Full
qualification-survey modal funnel (gate → 3 questions → email capture).

**Design 2 — `/design2`**
Replicates securitize.io's structure: light blue-gray sections, editorial
serif headlines (Playfair Display), black/white pill buttons, slate-blue
closing CTA band. No fabricated "trusted by" logos — used a values strip
instead since MCG has no real disclosed institutional partners.

**Design 3 — `/design3`**
Freeform "best design" flagship. Near-black canvas, Fraunces serif accents,
muted gold/orange duotone gradient used sparingly, alternating-row solution
section with large faint numerals, gold scroll-progress bar.

**Design 4 — `/design4`**
Fintech-SaaS-dashboard direction, built from design references (see below).
Dot-grid texture, glassmorphic cards, live Bitcoin price/chart dashboard
card in the hero (CoinGecko public API, with an illustrative static
fallback if the API is unreachable), more saturated molten orange→red glow
gradient than Design 3.

## Fintech Design Principles (added 2026-06-22)

Supplied directly by the client; apply across all future iterations:

- **Trust first** — transparent terms, no fabricated badges/certifications.
- **Simplify complexity** — visual explanations over walls of text.
- **Modern but not trendy** — aim for timeless, not a fad.
- **Mobile-first** — most users manage money on a phone.
- **Performance matters** — fast load times signal reliability.
- **Accessible** — must work for everyone regardless of ability.

## Visual Inspiration References

- [Fintech SaaS Landing Page Design (Vento)](https://dribbble.com/shots/27161998-Fintech-SaaS-Landing-Page-Design)
  — color scheme only: dark charcoal base + vivid molten orange-red glow,
  dotted texture, glassmorphic cards. (Layout not used — client specified
  "the color scheme is what you should consider," not the DeFi layout.)
- [Pantera Stock section](https://dribbble.com/shots/25913375-Pantera-Stock-section)
  — dashboard chart visual: big bold price number, green/red 24h change
  badge, thin line chart, segmented timeframe pills. Used as the basis for
  Design 4's live Bitcoin price card.
- [Modern Crypto Trading Platform UI/UX Design](https://dribbble.com/shots/27306126-Modern-Crypto-Trading-Platform-UI-UX-Design)
  — referenced for general inspiration; page did not fully load for review.
- [Blink.new — Nexus Analytics dashboard template](https://blink.new/templates/dashboard/nexus-analytics)
  — referenced for font style / large title header treatment; template is
  invite-gated and could not be viewed directly.

## Open Items

- Real photography for hero backgrounds (whale tail currently used on
  Designs 1–3; a city skyline dusk photo, `hero2.jpg`, is available and
  used on Design 3's hero).
- No real institutional partner logos exist yet — do not fabricate any
  "trusted by" claims until MCG has disclosed, real partnerships.
