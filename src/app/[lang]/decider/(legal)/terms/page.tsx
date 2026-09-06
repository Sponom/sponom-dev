import type { Metadata } from "next";
import Link from "next/link";
import { locales } from "@/lib/i18n/config";

const TITLE = "Decider — Terms of Use";
const DESCRIPTION = "The terms that apply when you use the Decider app.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/en/decider/terms" },
};

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function DeciderTermsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return (
    <>
      <h1>Decider — Terms of Use</h1>
      <p className="text-sm">Last updated: 15 August 2026</p>

      <p>
        These terms are an agreement between you and Sponom Dev
        (&ldquo;we&rdquo;, &ldquo;us&rdquo;) covering the Decider app. By
        installing or using Decider, you accept them. If you do not accept them,
        do not use the app.
      </p>

      <h2>What Decider is — and what it is not</h2>
      <p>
        Decider is a game. You give it a list of options, it plays a short
        round, and it shows you one of those options, chosen at random. That is
        the entire function of the app.
      </p>
      <p>
        The result is a prompt to get you moving. It is not a recommendation,
        an assessment, or advice. The app has no knowledge of you or your
        circumstances and makes no attempt to judge whether an option is safe,
        legal, affordable, healthy, or sensible for you. It cannot, and it does
        not try.
      </p>
      <p>
        <strong>The app does not decide anything. You do.</strong> Whatever
        appears on the screen, the choice to act on it is yours alone, and so is
        everything that follows from it. You are free to ignore any result, and
        ignoring one is a normal way to use the app. We accept no
        responsibility or liability for any decision you make, any action you
        take, or any outcome that follows a result the app displayed.
      </p>

      <h2>Do not use Decider for decisions that matter</h2>
      <p>
        Decider is built for low-stakes everyday choices — what to eat tonight,
        which film to put on, which chore to start with.
      </p>
      <p>
        Do not use Decider, or any result it produces, for medical, health,
        legal, financial, tax, insurance, employment, or safety decisions; for
        emergencies; for anything involving medication, alcohol, driving,
        weapons, or the care of children or dependants; for money you cannot
        afford to lose; or for any choice where a wrong outcome could cause
        harm, injury, or loss. For decisions like these, consult a qualified
        professional. You alone are responsible for judging whether a choice is
        low-stakes before you let a game settle it.
      </p>

      <h2>Licence</h2>
      <p>
        We grant you a personal, non-exclusive, non-transferable, revocable
        licence to use Decider on any Apple device that you own or control, as
        permitted by the App Store Terms of Service. You may not copy, sell,
        rent, sublicense, reverse-engineer, or modify the app, except where that
        restriction is prohibited by applicable law.
      </p>

      <h2>Acceptable use</h2>
      <p>
        Use the app lawfully and do not attempt to disrupt it or extract its
        source. That is the whole list.
      </p>

      <h2>Your content</h2>
      <p>
        Anything you type into Decider stays on your device and belongs to you.
        We do not receive it, claim it, or use it. See the{" "}
        <Link href={`/${lang}/decider/privacy/`}>Privacy Policy</Link> for details.
      </p>

      <h2>Price and changes</h2>
      <p>
        Decider is currently offered free of charge. We may change its features,
        add paid options, or stop distributing it at any time. If we ever
        introduce a purchase or subscription, the price and terms will be shown
        to you before you buy, and billing is handled by Apple under your App
        Store account settings.
      </p>

      <h2>No warranty</h2>
      <p>
        The app is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo;,
        without warranties of any kind, express or implied, including
        merchantability, fitness for a particular purpose, and
        non-infringement. We do not warrant that it will be uninterrupted,
        error-free, or that it will meet your expectations.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, we are not liable for any
        indirect, incidental, special, or consequential damages, or for lost
        data or lost profits, arising from your use of the app — including any
        loss, cost, injury, or damage arising from a decision you made or an
        action you took after the app displayed a result. Nothing here limits
        liability that cannot be limited by law, including liability for
        death or personal injury caused by negligence. Your statutory consumer
        rights are unaffected.
      </p>

      <h2>Apple</h2>
      <p>
        Apple is not a party to these terms and has no responsibility for
        Decider. Apple has no obligation to provide maintenance or support for
        it. If the app fails to conform to any applicable warranty, you may
        notify Apple and Apple will refund the purchase price, if any; to the
        maximum extent permitted by law, Apple has no other warranty obligation.
        We, not Apple, are responsible for addressing any claim relating to the
        app, including product liability, legal-compliance, and
        intellectual-property claims. Apple and its subsidiaries are third-party
        beneficiaries of these terms and may enforce them against you.
      </p>

      <h2>Termination</h2>
      <p>
        These terms apply until terminated by you or by us. They end
        automatically when you delete the app from your devices.
      </p>

      <h2>Changes to these terms</h2>
      <p>
        We may update these terms. The updated version is published on this page
        with a new date, and continuing to use the app after that means you
        accept it.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms:{" "}
        <a href="mailto:sponom.dev@gmail.com">sponom.dev@gmail.com</a>.
      </p>
    </>
  );
}
