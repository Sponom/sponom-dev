# The Decider — On-Site Prototype Spec

The interactive prototype that lives on the marketing site at `/[lang]/decider`. It renders the full app concept inside a realistic iPhone frame — a self-contained, playable preview of The Decider running right in the browser, so visitors can feel the product before it ships to mobile.

See also: [`README.md`](./README.md) · [`landing.md`](./landing.md)

---

## What it is

A high-fidelity iPhone mockup with a working app inside it. The prototype demonstrates **all four** decision engines (not just one), a hub to pick a life bucket, a satisfying result reveal, and a "coming soon / notify me" screen. It has synth sound effects (Web Audio, no files) and haptic buzzes on supported devices.

The prototype was authored as a standalone, framework-free HTML/CSS/JS artifact (imperative DOM code, everything scoped under `#the-decider`). It is embedded into the Next.js site rather than rewritten in React — see "Where it lives in code" below.

---

## Screens & flow

```
[ Enter ]  ─►  [ Hub ]  ─►  [ Engine ]  ─►  [ Result ]  ─►  [ Coming soon ]
 launch        pick a       one of 4        winner +        feature list +
 screen        bucket       engines runs    confetti        optional email
```

1. **Enter** — animated logo, "Deciding, made easy.", a "Break the loop" button.
2. **Hub** — three life buckets: **What to eat**, **Where to go**, **What to do**. Tapping one seeds a random subset of that bucket's option pool and drops into an engine.
3. **Engine** — the four engines are cycled in the order `blind → bracket → weighted → gut` (most engaging first) across successive plays:
   - **Gut-Check** — options listed; "Spin it" flashes through them, lands on one, then a 3-second countdown with a "Nope — not that" redo that strikes the option and re-spins.
   - **Bracket** — two options head-to-head; tap the winner, it advances against the next contender until one remains.
   - **Blind Elimination** — face-down cards; tap to rule one out (it flips, then tosses); last card left is the answer, with a chance to grab back one you tossed.
   - **Weighted Marbles** — 10 tokens to distribute across options with +/− steppers; "Let it roll" runs a weighted random landing.
4. **Result** — medallion, the winning option in big type, confetti, a win chime, plus "Go again" and "I'd use this app".
5. **Coming soon** — a short feature list (Match Mode, saved lists, themed packs, location-aware lists) and an optional email capture (client-side only — no data leaves the device; there is no backend).

---

## Design

The phone UI keeps its own dark, tactile "app" aesthetic (charcoal screen, blue/warm gradients, Bricolage Grotesque + Inter). The **page around it** matches the rest of the site: light `#fafafa` background, the shared `Header`/`Footer`, an accent-blue eyebrow, and a title + description introducing the prototype. The dark phone sits centered as the showcase object.

---

## Scope boundaries (what this prototype does NOT do)

- No real persistence — reloading resets it.
- The email field is inert (no network, no storage) — it's a validation-signal placeholder for a future waitlist.
- No haptics/gyroscope/Bluetooth beyond the browser's `navigator.vibrate` buzzes; Match Mode, geofencing, and saved lists are described on the "coming soon" screen but not implemented.

---

## Where it lives in code

- Route: `src/app/[lang]/decider/page.tsx` — server component; light wrapper (title + description + centered phone), reuses `Header`/`Footer`, and loads the Bricolage Grotesque + Inter web fonts via a page-scoped `<link>` (intentionally per-page; ESLint's `no-page-custom-font` is disabled on that line).
- Prototype: `src/components/DeciderPhone.tsx` (`"use client"`) — renders the static phone shell as JSX and runs the imperative game logic inside a `useEffect` scoped to the component's own `#view` node, with full timer/AudioContext cleanup on unmount.
- Styles: `src/components/decider-phone.css` — the prototype's stylesheet, entirely scoped under `#the-decider` so it can't clash with the site. (The standalone artifact's preview-only `body{}` centering rule was dropped; the page wrapper handles layout.)
- Strings: the `decider` block in `src/lib/i18n/types.ts` and `src/locales/*.json` supply the surrounding page copy (English canonical; other locales fall back to English for now). The in-phone UI text lives in `DeciderPhone.tsx` itself and is English-only.
