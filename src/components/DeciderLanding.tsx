import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Literata, Onest } from "next/font/google";
import { localePath, type Locale } from "@/lib/i18n/config";

/**
 * TODO(owner): set to the App Store listing once the app is submitted.
 * `null` renders every CTA as a non-clickable "Coming soon".
 */
const APP_STORE_URL: string | null = null;
const CTA_LABEL = APP_STORE_URL ? "Download on the App Store" : "Coming soon to the App Store";
const CTA_LABEL_SHORT = APP_STORE_URL ? "Get the app" : "Coming soon";

const display = Literata({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const body = Onest({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const TITLE = "Decider — stop deciding. Start doing.";
const DESCRIPTION =
  "You know what you want. You just can't face deciding it. Decider makes the call for you in about three seconds. On iPhone.";

/** One English page served under every locale prefix; index only the bare one. */
export const deciderMetadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: "/decider" },
    openGraph: {
      type: "website",
      title: TITLE,
      description: DESCRIPTION,
      url: "https://sponom.dev/decider",
      siteName: "sponom.dev",
      images: [{ url: "/decider-og.png", width: 1024, height: 1024 }],
    },
    twitter: { card: "summary", title: TITLE, description: DESCRIPTION, images: ["/decider-og.png"] },
};

/* Four glyphs, one stroke grammar, drawn for this world. They exist only to
 * scatter across the sky behind the page, oversized and rotated. */
const GLYPHS = {
  eat: "M7 3v6a2 2 0 0 0 4 0V3M9 11v10M17 3c-1.4 1.9-2 3.9-2 5.8 0 1.6.6 2.4 2 2.4s2-.8 2-2.4c0-1.9-.6-3.9-2-5.8zM17 11.2V21",
  go: "M12 21.5c4.7-4.6 7-8.2 7-11a7 7 0 1 0-14 0c0 2.8 2.3 6.4 7 11zM12 12.6a2.7 2.7 0 1 0 0-5.4 2.7 2.7 0 0 0 0 5.4z",
  watch:
    "M4 8.5h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2zM8 3.5l4 4 4-4",
  spark: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM15.8 8.2l-2 5.6-5.6 2 2-5.6z",
};

/* Screenshot placeholders. Drop a 1179×2556 PNG into /public/decider/ and
 * pass it as `src`; nothing around the frame changes. */
function PhoneFrame({
  screen,
  src,
  alt,
}: {
  screen: string;
  src?: string;
  alt?: string;
}) {
  return (
    <div className="w-full max-w-[262px] aspect-[1179/2556] p-2.5 rounded-[46px] border border-white/14 bg-dc-glass/60 backdrop-blur-2xl">
      <div className="relative h-full rounded-[34px] overflow-hidden bg-linear-to-b from-dc-sky-1 to-dc-sky-3 before:content-[''] before:absolute before:top-2 before:left-1/2 before:-translate-x-1/2 before:w-[30%] before:h-[18px] before:rounded-full before:bg-[#0d0e13] before:z-2">
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt ?? screen}
            width={1179}
            height={2556}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-2.5 grid place-content-center gap-2 p-4 text-center rounded-[26px] border border-dashed border-white/20">
            <b className="dc-display text-sm font-medium">{screen}</b>
            <span className="text-[0.6875rem] tracking-wider text-dc-label-2">
              SCREENSHOT · 1179 × 2556
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

const SKY_STOPS =
  "bg-linear-to-b from-dc-sky-0 via-dc-sky-2 to-dc-sky-3";

/* The product's one button, in both weights. */
function Cta({
  href,
  variant = "solid",
  size = "md",
  className = "",
  children,
}: {
  href: string | null;
  variant?: "solid" | "ghost";
  size?: "md" | "sm";
  className?: string;
  children: React.ReactNode;
}) {
  const base =
    "inline-flex items-center rounded-full font-medium no-underline transition-[transform,filter,border-color] duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dc-glow";
  const skin =
    variant === "solid"
      ? // A label on the accent flips to the light scheme's primary label;
        // the dark one lands near 1.9:1 on this fill.
        "bg-dc-glow text-[#1e1d1f] font-semibold hover:brightness-107 hover:-translate-y-px active:translate-y-0"
      : "bg-dc-glass/55 border border-white/12 backdrop-blur-2xl text-dc-label hover:border-white/25";
  const scale =
    size === "sm"
      ? "gap-1.5 px-3.5 py-2 text-[0.8125rem] [&>svg]:w-[13px] [&>svg]:h-[15px]"
      : "gap-2.5 px-6 py-3.5 text-[0.9375rem]";
  const cls = `${base} ${skin} ${scale} ${className}`;
  return href ? (
    <a href={href} className={cls}>
      {children}
    </a>
  ) : (
    <span aria-disabled className={`${cls} cursor-default`}>
      {children}
    </span>
  );
}

function AppleMark() {
  return (
    <svg width="17" height="20" viewBox="0 0 17 20" fill="currentColor" aria-hidden>
      <path d="M14.02 10.6c-.02-2.2 1.8-3.26 1.88-3.31-1.02-1.5-2.61-1.7-3.18-1.72-1.35-.14-2.64.79-3.33.79-.69 0-1.74-.77-2.87-.75-1.47.02-2.83.86-3.59 2.17-1.53 2.66-.39 6.6 1.1 8.76.73 1.06 1.6 2.25 2.74 2.2 1.1-.04 1.52-.71 2.85-.71 1.33 0 1.7.71 2.86.69 1.18-.02 1.93-1.08 2.65-2.14.84-1.23 1.18-2.42 1.2-2.48-.03-.01-2.3-.88-2.31-3.5zM11.85 3.86c.6-.74 1.01-1.75.9-2.76-.87.04-1.93.58-2.55 1.31-.56.65-1.05 1.69-.92 2.68.97.08 1.96-.5 2.57-1.23z" />
    </svg>
  );
}

const FLIP =
  "[animation:dc-flip_0.42s_cubic-bezier(0.32,0.72,0.3,1)_var(--d)_backwards]";
const FACE = "[animation:dc-face_0.42s_ease-out_var(--d)_backwards]";
const BACK = "[animation:dc-back_0.42s_ease-out_var(--d)_backwards]";

/* A card on the hero board. Red where it sits means gone, green means kept —
   the app's own grammar, and the only motion on the page. */
function Card({
  label,
  stamp,
  delay,
  kept = false,
}: {
  label: string;
  stamp: string;
  delay: number;
  kept?: boolean;
}) {
  return (
    <div
      style={{ "--d": `${delay}s` } as React.CSSProperties}
      className={`relative flex flex-col justify-center gap-1.5 min-h-24 p-4 rounded-[20px] border motion-reduce:animate-none ${FLIP} ${
        kept
          ? "bg-dc-success/15 border-dc-success/40"
          : "bg-dc-danger/15 border-dc-danger/35"
      }`}
    >
      <span
        className={`font-medium motion-reduce:animate-none ${FACE} ${
          kept
            ? "text-lg text-dc-label"
            : "text-[0.9375rem] text-dc-danger/90 line-through decoration-[1.5px]"
        }`}
      >
        {label}
      </span>
      <span
        className={`text-[0.625rem] font-bold tracking-[0.1em] motion-reduce:animate-none ${FACE} ${
          kept ? "text-dc-success" : "text-dc-danger"
        }`}
      >
        {stamp}
      </span>
      <span
        aria-hidden
        className={`absolute inset-0 grid place-items-center rounded-[inherit] border border-white/12 bg-dc-glass/70 text-xl text-dc-label-2 opacity-0 motion-reduce:hidden ${BACK}`}
      >
        ?
      </span>
    </div>
  );
}

const BOARD = [
  { label: "Curry", stamp: "GONE." },
  { label: "Pizza", stamp: "NO TAKEBACKS." },
  { label: "Pho", stamp: "TOO LATE." },
  { label: "Tacos", stamp: "GONE." },
  { label: "Dumplings", stamp: "NO TAKEBACKS." },
];

const STEPS = [
  {
    n: "01",
    t: "Tap what you're stuck on",
    d: "Whatever you've been circling for the last ten minutes.",
  },
  {
    n: "02",
    t: "Play the round",
    d: "It's over before you can talk yourself out of it.",
  },
  { n: "03", t: "Go and do it", d: "One answer. No second-guessing." },
];

const RULED_OUT = [
  { thing: "An account", stamp: "GONE.", why: "Nothing to sign up for. Open it and play." },
  {
    thing: "The cloud",
    stamp: "NO TAKEBACKS.",
    why: "It all stays on your phone. Airplane mode changes nothing.",
  },
  {
    thing: "An algorithm",
    stamp: "TOO LATE.",
    why: "Nothing is learning your taste or guessing your mood.",
  },
  {
    thing: "Tracking",
    stamp: "GONE.",
    why: "Nothing collected, so there's nothing to sell.",
  },
  {
    thing: "Notifications",
    stamp: "TOO LATE.",
    why: "It never pings you. You open it when you're stuck, not because it asked.",
  },
];

const SCREENS = [
  "Screen 01",
  "Screen 02",
  "Screen 03",
  "Screen 04",
  "Screen 05",
  "Screen 06",
];

const FAQ = [
  {
    q: "How does it decide?",
    a: "It doesn't, really. It shuffles the options you gave it and plays a quick round. What comes out is a nudge to get you moving, not advice — the choice is still yours, and ignoring it is a perfectly good way to use the app.",
  },
  {
    q: "Does it need an internet connection?",
    a: "No. There is no server, no account and nothing to sync. Turn on airplane mode and nothing about it changes.",
  },
  {
    q: "What happens to what I type in?",
    a: "It stays on your phone. We never receive it, so there is nothing for us to store, share or sell. Delete the app and it goes with it.",
  },
  {
    q: "What if I don't like the answer?",
    a: "Then you have just learned something. That flicker of disappointment is the thing you actually wanted — go and do that instead.",
  },
  {
    q: "What do I need to run it?",
    a: "An iPhone on a recent version of iOS. Nothing else — no companion account, no other app, no setup.",
  },
];


export default function DeciderLanding({ locale }: { locale: Locale }) {
  return (
    <div
      className={`dc-page relative isolate min-h-dvh overflow-x-clip scheme-dark font-dc-body text-dc-label ${display.variable} ${body.variable}`}
    >
      <div
        aria-hidden
        className={`fixed inset-0 z-0 overflow-hidden pointer-events-none ${SKY_STOPS} [&>svg]:absolute [&>svg]:text-[#6e7ba8] [&>svg]:opacity-6 [&>svg]:overflow-visible after:content-[''] after:absolute after:inset-0 after:bg-[radial-gradient(70ch_60ch_at_18%_-8%,color-mix(in_srgb,var(--color-dc-peach)_13%,transparent),transparent_70%),radial-gradient(60ch_50ch_at_100%_22%,color-mix(in_srgb,var(--color-dc-glow)_9%,transparent),transparent_70%)]`}
      >
        <svg className="-top-[4vw] -left-[6vw] w-[34vw] rotate-[-18deg]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={0.6}>
          <path d={GLYPHS.eat} />
        </svg>
        <svg className="top-[34vh] -right-[8vw] w-[40vw] rotate-[24deg]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={0.6}>
          <path d={GLYPHS.go} />
        </svg>
        <svg className="bottom-[14vh] left-[4vw] w-[28vw] rotate-[11deg]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={0.6}>
          <path d={GLYPHS.watch} />
        </svg>
        <svg className="-bottom-[8vh] right-[18vw] w-[32vw] rotate-[-30deg]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={0.6}>
          <path d={GLYPHS.spark} />
        </svg>
      </div>

      <header className="relative z-1 max-w-6xl mx-auto px-6 pt-7 flex items-center justify-between gap-6">
        <span className="flex items-center gap-3 dc-display text-[1.75rem] sm:text-[2rem] tracking-tight">
          <Image
            src="/decider-icon.png"
            alt=""
            width={40}
            height={40}
            className="rounded-[10px]"
            priority
          />
          Decider
        </span>
        <nav className="flex items-center gap-5 sm:gap-7 text-[0.8125rem] text-dc-label-2">
          <a href="#faq" className="hidden sm:inline hover:text-dc-label transition-colors">
            FAQ
          </a>
          <Link
            href={localePath(locale)}
            className="hidden sm:inline hover:text-dc-label transition-colors"
          >
            Other products
          </Link>
          <Cta href={APP_STORE_URL} size="sm" className="hidden sm:inline-flex">
            <AppleMark />
            {CTA_LABEL_SHORT}
          </Cta>
        </nav>
      </header>

      <main className="relative z-1">
        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section className="max-w-6xl mx-auto px-6 pt-12 sm:pt-24 pb-16 sm:pb-24 grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center">
          <div>
            <p className="dc-eyebrow mb-5">For iPhone</p>
            <h1 className="dc-display text-[2.4rem] sm:text-[3.5rem] lg:text-[4rem] mb-7 max-w-[13ch]">
              You know what you want. You just can&rsquo;t face deciding it.
            </h1>
            <p className="dc-lede max-w-md mb-9">
              So don&rsquo;t. Decider makes the call for you — one quick game,
              about three seconds, and it&rsquo;s settled.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Cta href={APP_STORE_URL}>
                <AppleMark />
                {CTA_LABEL}
              </Cta>
              <span className="text-sm text-dc-label-2">
                No account · No tracking · Works offline
              </span>
            </div>
          </div>

          {/* The signature: one round, played once, in the page's own material. */}
          <figure className="p-4 sm:p-6 rounded-[20px] border border-white/10 bg-dc-glass/55 backdrop-blur-2xl backdrop-saturate-150">
            <figcaption className="dc-display text-lg mb-4">
              What&rsquo;s for dinner?
            </figcaption>
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
              {BOARD.map((c, i) => (
                <Card key={c.label} delay={0.9 + i * 0.55} label={c.label} stamp={c.stamp} />
              ))}
              <Card kept delay={3.9} label="Ramen" stamp="THAT’S THE CALL." />
            </div>
            <p className="mt-4 text-[0.8125rem] leading-relaxed text-dc-label-2">
              Five gone. One left standing. Off you go.
            </p>
          </figure>
        </section>

        {/* ── The loop ─────────────────────────────────────────────────── */}
        <section className="max-w-6xl mx-auto px-6 py-14 sm:py-20 border-t border-dc-hairline">
          <h2 className="dc-display text-3xl sm:text-4xl mb-12 max-w-xl">
            One tap in. One answer out.
          </h2>
          <ol className="grid sm:grid-cols-3 gap-8 sm:gap-10">
            {STEPS.map((s) => (
              <li key={s.n}>
                <span className="dc-eyebrow block mb-3 text-dc-peach">{s.n}</span>
                <h3 className="dc-display text-xl mb-2">{s.t}</h3>
                <p className="text-[0.9375rem] leading-relaxed text-dc-label-2">
                  {s.d}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* ── See it in action: a rail you scroll, not a grid you scan ─── */}
        <section className="py-14 sm:py-20 border-t border-dc-hairline">
          <div className="max-w-6xl mx-auto px-6 mb-12">
            <p className="dc-eyebrow mb-4">See it in action</p>
            <h2 className="dc-display text-3xl sm:text-[2.75rem] leading-[1.1] mb-6 max-w-3xl">
              Dinner. The film. The weekend. The thing you keep putting off.
            </h2>
            <p className="dc-lede max-w-lg">
              Whatever you&rsquo;ve been circling, put it in and let it go.
            </p>
          </div>
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex gap-4 sm:gap-6 overflow-x-auto overscroll-x-contain pt-2 pb-6">
              {SCREENS.map((s) => (
                <figure
                  key={s}
                  className="shrink-0 w-[min(262px,calc(100vw-6rem))]"
                >
                  <PhoneFrame screen={s} />
                  <figcaption className="mt-3.5 text-xs tracking-wider uppercase text-dc-label-2">
                    {s}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ── The ledger: the hero's mechanic at product scale ─────────── */}
        <section className="max-w-6xl mx-auto px-6 py-14 sm:py-20 border-t border-dc-hairline">
          <div className="max-w-2xl mb-12">
            <p className="dc-eyebrow mb-4">Ruled out</p>
            <h2 className="dc-display text-3xl sm:text-4xl mb-5">
              The best part is everything it doesn&rsquo;t do.
            </h2>
            <p className="dc-lede">
              An app that wants your email, your habits and a look at how you
              spend your evenings has missed the point entirely.
            </p>
          </div>
          <dl className="grid gap-2.5">
            {RULED_OUT.map((r) => (
              <div
                key={r.thing}
                className="grid sm:grid-cols-[8.5rem_1fr] gap-x-4 gap-y-2 items-baseline px-5 py-4 rounded-[20px] border border-dc-danger/20 bg-dc-danger/8"
              >
                <span className="sm:row-start-1 sm:self-center text-[0.6875rem] font-bold tracking-widest text-dc-danger whitespace-nowrap">
                  {r.stamp}
                </span>
                <dt className="dc-display text-lg text-dc-danger/85 line-through decoration-[1.5px] decoration-dc-danger/70">
                  {r.thing}
                </dt>
                <dd className="sm:col-start-2 text-[0.9375rem] leading-relaxed text-dc-label-2">
                  {r.why}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────── */}
        <section
          id="faq"
          className="max-w-6xl mx-auto px-6 py-14 sm:py-20 border-t border-dc-hairline scroll-mt-8"
        >
          <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16">
            <h2 className="dc-display text-3xl sm:text-4xl lg:sticky lg:top-10 lg:self-start">
              Questions people ask.
            </h2>
            <div>
              {FAQ.map((f) => (
                <details
                  key={f.q}
                  className="group border-b border-dc-hairline first:border-t first:border-dc-hairline"
                >
                  <summary className="flex items-baseline justify-between gap-6 py-5 cursor-pointer list-none dc-display text-lg hover:text-dc-glow transition-colors [&::-webkit-details-marker]:hidden after:content-['+'] after:shrink-0 after:text-xl after:leading-none after:text-dc-label-2 after:transition-transform group-open:after:rotate-45">
                    {f.q}
                  </summary>
                  <p className="pb-5 max-w-[56ch] leading-relaxed text-dc-label-2">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* The header CTA scrolls away on a phone; this one doesn't. */}
      <div className="sm:hidden fixed bottom-0 inset-x-0 z-10 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] border-t border-white/10 bg-dc-sky-3/90 backdrop-blur-2xl">
        <Cta href={APP_STORE_URL} className="w-full justify-center">
          <AppleMark />
          {CTA_LABEL}
        </Cta>
      </div>

      <footer className="relative z-1 max-w-6xl mx-auto px-6 py-12 sm:py-14 pb-28 sm:pb-14 border-t border-dc-hairline text-sm text-dc-label-2">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-[1.4fr_1fr_1fr]">
          <div className="col-span-2 sm:col-span-1">
            <p className="dc-display text-xl text-dc-label mb-3">Decider</p>
            <p className="max-w-xs leading-relaxed">
              Made so a small choice stops eating your evening.
            </p>
          </div>
          <nav className="flex flex-col gap-3">
            <span className="dc-eyebrow text-[0.625rem]">Legal</span>
            <Link
              href="/decider/privacy/"
              className="hover:text-dc-label transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/decider/terms/"
              className="hover:text-dc-label transition-colors"
            >
              Terms
            </Link>
            <a
              href="mailto:sponom.dev@gmail.com"
              className="hover:text-dc-label transition-colors"
            >
              Contact
            </a>
          </nav>
          <nav className="flex flex-col gap-3">
            <span className="dc-eyebrow text-[0.625rem]">More</span>
            <a href="#faq" className="hover:text-dc-label transition-colors">
              FAQ
            </a>
            <Link
              href={localePath(locale)}
              className="hover:text-dc-label transition-colors"
            >
              Other products
            </Link>
            {APP_STORE_URL && (
              <a
                href={APP_STORE_URL}
                className="hover:text-dc-label transition-colors"
              >
                App Store
              </a>
            )}
          </nav>
        </div>
        <p className="mt-12 pt-6 border-t border-white/6 text-[0.8125rem]">
          © {new Date().getFullYear()} Sponom Dev. No accounts, no cloud, no
          tracking.
        </p>
      </footer>
    </div>
  );
}
