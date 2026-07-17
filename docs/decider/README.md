# The Decider

> A digital circuit-breaker for thought loops.

**The Decider** is a privacy-first, non-AI mobile app that breaks decision paralysis. Instead of a bigger menu or a smarter algorithm, it turns everyday choices into short, tactile micro-games that make the decision feel effortless — and it runs entirely on-device.

## The one-paragraph pitch

Chronic overthinkers don't struggle because they lack options — they struggle because processing many options at once is exhausting. The Decider removes that mental weight by reframing a choice as a fast, physical interaction: a sudden-death bracket, a blind card elimination, a gut-check countdown. No accounts, no cloud, no tracking, no machine learning guessing your life. Pick a bucket, let physics decide, get on with your evening.

## Positioning (anti-AI, privacy-native)

- **100% deterministic** — no machine learning guessing your thoughts.
- **100% offline & private** — your choices stay on your device.
- **Zero cloud bloat** — opens instantly, resolves a choice in ~3 seconds.

Target persona: busy professionals, creators, and chronic overthinkers who have exhausted their decision-making willpower by 6 PM and have nothing left for "what's for dinner."

## The four decision engines (full app)

The full concept ships four interchangeable decision frameworks. This repo currently prototypes **only the first one**.

1. **Binary Bracket Tournament** — reduces a list to a series of simple A-or-B taps. Winner advances until one remains. ← **prototyped on the site**
2. **Gut-Check Reverse Trick** — picks a winner, then a 3-second countdown with a big REDO button; a flash of disappointment reveals what you actually wanted.
3. **Blind Elimination** — options are shuffled face-down; you eliminate cards by intuition until one is left, then it flips over.
4. **Weighted Marbles** — allocate tokens across options by how you feel; the app builds a probability wheel from those weights.

## Docs in this folder

- [`landing.md`](./landing.md) — landing-page positioning, copy blocks, and the "Coming soon" banner spec.
- [`prototype.md`](./prototype.md) — spec for the on-site Binary Bracket prototype at `/[lang]/decider`.
- [`validation.md`](./validation.md) — the 4-step, ~2-week idea-validation plan and the scorecard of expected results.

## Source

The raw, unabridged concept lives in `The Decider.md` at the repo root. These docs distill the parts relevant to the current site work; the source stays as the full record.
