import type { Metadata } from "next";
import Link from "next/link";

const TITLE = "Decider — Privacy Policy";
const DESCRIPTION = "How the Decider app handles your data. Short version: it never leaves your device.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/decider/privacy" },
};

export default function DeciderPrivacyPage() {
  return (
    <>
      <h1>Decider — Privacy Policy</h1>
      <p className="text-sm">Last updated: 15 August 2026</p>

      <p>
        Decider is made by Sponom Dev (&ldquo;we&rdquo;, &ldquo;us&rdquo;). We
        do not run servers, we have no user accounts, and we do not collect,
        sell, or share your data with anyone.
      </p>

      <p>
        For context: Decider is a game that shows you one of your own options
        at random. It does not decide anything for you, it gives no advice, and
        you remain responsible for whatever you choose to do — see the{" "}
        <Link href="/decider/terms/">Terms of Use</Link>.
      </p>

      <h2>What the app stores</h2>
      <p>
        Your questions, options, history, and settings are kept in local storage
        on your device. That data never leaves the device and is never
        transmitted to us. It may be included in your own iCloud or iTunes
        device backup, which Apple manages under Apple&rsquo;s terms, not ours.
      </p>
      <p>
        Deleting the app deletes that data. We cannot recover it for you,
        because we never had it.
      </p>

      <h2>What we do not collect</h2>
      <ul>
        <li>No accounts, sign-ups, email addresses, or passwords.</li>
        <li>No analytics, tracking, advertising, or profiling SDKs.</li>
        <li>No location, contacts, photos, microphone, or camera access.</li>
        <li>No device identifiers used for tracking across apps or websites.</li>
      </ul>

      <h2>Crash and usage reports from Apple</h2>
      <p>
        If you have enabled &ldquo;Share With App Developers&rdquo; in your iOS
        privacy settings, Apple may provide us with aggregated, anonymised crash
        logs and usage statistics through App Store Connect. We cannot identify
        individual users from this data, and you can turn it off at any time in
        iOS Settings.
      </p>

      <h2>Children</h2>
      <p>
        Decider is not directed at children under 13, and because the app
        collects no personal data at all, we do not knowingly collect anything
        from children.
      </p>

      <h2>Your rights</h2>
      <p>
        All app data lives on your device, so you already have full access to it
        and can erase it by deleting the app. There is nothing on our side to
        request, export, or delete.
      </p>

      <h2>Changes</h2>
      <p>
        If this policy changes, we will update the date above and publish the
        new version on this page.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about privacy in Decider:{" "}
        <a href="mailto:sponom.dev@gmail.com">sponom.dev@gmail.com</a>.
      </p>
    </>
  );
}
