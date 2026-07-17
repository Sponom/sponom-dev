# The Decider — Landing & Marketing

Landing-section documentation: how The Decider is positioned, the copy blocks a full landing page would use, and the "Coming soon" banner that currently ships on the `sponom.dev` home page.

See also: [`README.md`](./README.md) · [`prototype.md`](./prototype.md)

---

## Hook & positioning

- **Primary hook:** *"A digital circuit-breaker for thought loops."*
- **Anti-AI manifesto:** *"Your phone has enough algorithms trying to guess your life. The Decider uses raw physics, pure haptics, and basic psychology to clear your head in 3 seconds."*
- **Target persona:** high-achieving, decision-fatigued professionals and chronic overthinkers who can't summon the energy to pick dinner, a movie, or a weekend plan.

The whole brand promise is a *quiet, privacy-first, premium utility* — no intrusive ads, no data tracking, no algorithmic hooks.

---

## Full landing-page copy blocks

These are the copy blocks for a future standalone landing page (not all of it ships today — the current site only shows the banner + prototype).

### Hero
- **Headline:** The Anti-Fatigue Utility for Your Daily Life.
- **Subheadline:** Settle what to eat, where to go, and what to do in 3 seconds. Powered by pure physics, zero-cloud privacy, and addictive tactile haptics. No AI allowed.
- **Primary CTA:** Try the prototype (links to `/[lang]/decider`) — a waitlist/email capture comes later.

### The three problems it solves (3 columns)
- **🍔 What to Eat** — Stop doom-scrolling delivery apps. A countdown framework tricks your brain into revealing your true craving instantly.
- **🌍 Where to Go** — Reduce overwhelming travel and night-out choices into a rapid-fire binary bracket. Sift without the overload.
- **🎬 What to Do** — Break evening procrastination. Run a blind card elimination on your saved hobbies and let chance decide.

### "Why No AI?" manifesto (centered box)
- **Heading:** Your phone has enough algorithms.
- **Body:** Modern apps want to track your location, log your data, and use machine learning to keep you hooked. We believe tools should be tools. The Decider stores 100% of your data locally on your device. It does exactly what you tap, every time.

### Footer / social proof
- **Text:** Form follows function. Built for over-thinkers, digital minimalists, and tired minds.
- **Secondary CTA:** Enter email for early access (future — no email capture exists on the site yet).

---

## What ships on the site today

### Product card in the Products section (home page)
The Decider is shown as a 4th card inside the existing Products section on `/[lang]`, alongside the shipped products — with a **"Coming soon"** badge next to the title and a link that goes to the on-site prototype (`/[lang]/decider`) instead of an external store.

- **Title:** The Decider · badge "Coming soon"
- **Description:** A digital circuit-breaker for thought loops. Turn hard choices into fast, tactile micro-games — no AI, no tracking. Try the interactive prototype.
- **Tags:** Mobile App · Decision-making · Prototype
- **Logo:** `public/decider-logo.svg` (custom icon — two branches merging into one decision node, in the site's accent blue).
- **Link:** internal, `/[lang]/decider`.

Card rendering lives in `src/components/Projects.tsx` (the `projectLinks` array carries `internal` + `comingSoon` flags per card); the card copy is the 4th entry in `projects.items` in every `src/locales/*.json`.

### Prototype page
A working single-engine demo (Binary Bracket Tournament). Spec: [`prototype.md`](./prototype.md).

---

## CTA strategy

The site currently has **no email capture** (it's a static export with no backend). So the banner's call to action points at the live prototype instead of a waitlist. When a waitlist is added, the recommended validation threshold is a **15–20% email signup rate** from unique visitors before committing to full development.

---

## Marketing channels (reference)

- **Short-form video (TikTok / Reels / Shorts):** macro-lens ASMR of the interface responding, narrated around relatable friction ("40 minutes arguing about dinner").
- **Product Hunt / design communities:** position as a minimalist UX masterclass (the "Linear / Clear / Crouton" crowd).
- **Subreddits:** r/digitaldetox, r/minimalism, r/adhd, r/overthinking — framed around breaking analysis paralysis.
