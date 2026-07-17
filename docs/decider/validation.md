# The Decider — Idea Validation Plan

A zero-code plan to validate The Decider **before** committing to full development. The goal is to prove two things:

1. **Core interest** — do people suffer from decision fatigue enough to want (and pay for) an app?
2. **Tactile value** — does the specific interaction model actually relieve their stress?

Timeline: ~2 weeks, four steps. The landing page (already in progress) is **Step 3** of this plan — it is not the whole plan on its own.

See also: [`README.md`](./README.md) · [`landing.md`](./landing.md) · [`prototype.md`](./prototype.md)

---

## Step 1 — Interactive prototype (Days 1–3)

Build a high-fidelity, clickable prototype in **Figma** — no Swift/Kotlin.

- Design the main dashboard with the 3 core blocks (*What to Eat, Where to Go, What to Do*).
- Map out at least one engine's screens — the **Binary Bracket** or the **Gut-Check Reverse Trick**.
- Use Figma smart-animate to fake the physics (swipe down → wheel spins → snaps to a winner).
- Test pacing on a real device via the **Figma Mirror** app (Figma can't fire real haptics on a link — you're validating visual/timing feel, not vibration).

**Why it matters for marketing:** the prototype is the raw material for the Step 2 video. Nothing to film without it.

> Note: this repo already ships a working **on-site Binary Bracket prototype** (see [`prototype.md`](./prototype.md)). That web demo can partially stand in for the Figma prototype for the landing page, but a Figma version is still what you screen-record for short-form video with overlaid ASMR sound.

---

## Step 2 — The "ASMR / Satisfaction" smoke test (Days 4–6)

This is the **primary distribution step** — the main thing needed beyond the landing page.

**1. Video asset (15 seconds)**
- Screen-record the prototype in motion.
- Overlay crisp, satisfying sound (fast mechanical watch tick → heavy metallic *clunk* when the choice locks in).
- On-screen hook text: *"POV: You and your partner have spent 30 minutes arguing about dinner. We built a digital circuit-breaker for your brain loops. No AI, no tracking, just pure physics."*
- CTA → link to the landing page in bio.

**2. Distribution channels**
- **Short-form video** — TikTok / Instagram Reels / YouTube Shorts. Macro-lens ASMR of a finger spinning the interface; emphasize crisp sound and fluid responsiveness.
- **Product Hunt / tech & design communities** — position as a minimalist UX/UI masterclass (the "Linear / Clear / Crouton" crowd).
- **Subreddits** — r/digitaldetox, r/minimalism, r/adhd, r/overthinking. Frame entirely around breaking analysis paralysis; these communities are strict about ads, so use a native, non-salesy tone.

**Marketing message to lean on in the video:** the Match Mode viral loop — only **one** person pays, the partner joins free. End on two phones lighting up simultaneously with "IT'S A MATCH: TACOS".

---

## Step 3 — Minimalist landing page (Days 7–9) — *in progress*

A single, ultra-clean page (Framer / Webflow / Carrd — or, here, the `sponom.dev` static site).

- **Hero:** the looping video asset inside a phone frame.
- **Anti-AI manifesto**, three bullets: *100% deterministic · 100% offline & private · zero cloud bloat*.
- **Validation CTA:** a prominent "Join the TestFlight Beta" / "Get Notified on Launch" email capture.

Copy blocks are documented in [`landing.md`](./landing.md).

> **Gap on the current site:** it's a static export with **no email capture / no backend**, so today's CTA points to the on-site prototype, not a waitlist. To measure the Step-3 conversion metric below, you need an actual email-capture form (e.g. an embedded form service, or a Framer/Carrd page for the validation push).

---

## Step 4 — 5-user "friction" interviews (Days 10–12)

Find 5 people in the target audience (stressed professionals, chronic overthinkers, couples who bicker over plans) and watch them use the concept.

- **The test:** hand them the phone with the Figma prototype open. Don't explain it. Just say: *"You're trying to figure out what to do tonight. Use this."*
- **Watch for:** Do they instinctively swipe/drag? Do they smile or show relief when choices get cut down? Do they wish the phone was vibrating?
- **The ultimate validation question (intent to pay):** *"We're releasing the premium version for a one-time $3.99 to unlock custom tactile sounds and couple's matching mode. Would you pay for that right now to be on the priority list?"*

Intent to pay is the truest validation metric.

---

## What's expected — the validation scorecard

Do **not** move into development until these benchmarks are cleared:

| Metric | Minimum success threshold |
| --- | --- |
| **Video engagement** | 1,000+ organic views, with comments where people tag/share their partner |
| **Landing-page conversion** | **15–20%** email signup rate from unique visitors |
| **User feedback** | 4 out of 5 interviewees complete the loop without instruction |
| **Intent to pay** | Interviewees say yes to the one-time $3.99 upgrade prompt |

If interest and tactile value both clear these bars, the concept is validated and full development is justified.

---

## Checklist — what's still needed beyond the landing page

- [ ] Figma high-fidelity prototype (3 blocks + ≥1 engine with faked physics)
- [ ] 15-second ASMR video asset (screen recording + sound overlay + hook text + CTA)
- [ ] Video posted to TikTok / Reels / Shorts
- [ ] Product Hunt / design-community launch
- [ ] Native posts in the 4 target subreddits
- [ ] Email capture added to the landing page (required to measure conversion)
- [ ] 5 user "friction" interviews with the intent-to-pay question
- [ ] Track all 4 scorecard metrics before deciding to build

---

## Source

Distilled from the "Idea Validation" and "Marketing Model" sections of `The Decider.md` at the repo root, which holds the full unabridged concept.
