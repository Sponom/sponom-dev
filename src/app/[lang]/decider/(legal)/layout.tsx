import Link from "next/link";
import { Literata, Onest } from "next/font/google";

/*
 * Decider's legal pages live inside the product's own world rather than the
 * site's, because that is where the visitor arrives from. The route group
 * keeps this wrapper off the landing page itself.
 */

const display = Literata({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const body = Onest({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export default async function DeciderLegalLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return (
    <div
      className={`dc-page relative isolate min-h-dvh overflow-x-clip scheme-dark font-dc-body text-dc-label ${display.variable} ${body.variable}`}
    >
      <div
        aria-hidden
        className="fixed inset-0 z-0 pointer-events-none bg-linear-to-b from-dc-sky-0 via-dc-sky-2 to-dc-sky-3"
      />

      <main className="relative z-1 max-w-2xl mx-auto px-6 py-16 sm:py-24">
        <Link
          href={`/${lang}/decider/`}
          className="dc-eyebrow inline-block mb-12 hover:text-dc-label transition-colors"
        >
          ← Decider
        </Link>

        <article className="dc-prose">{children}</article>

        <p className="mt-16 text-sm text-dc-label-2">
          <Link
            href={`/${lang}/decider/privacy/`}
            className="hover:text-dc-label transition-colors"
          >
            Privacy
          </Link>
          <span className="mx-3 opacity-40">·</span>
          <Link
            href={`/${lang}/decider/terms/`}
            className="hover:text-dc-label transition-colors"
          >
            Terms
          </Link>
        </p>
      </main>
    </div>
  );
}
