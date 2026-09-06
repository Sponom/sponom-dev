import { type Locale } from "@/lib/i18n/config";
import DeciderLanding, { deciderMetadata } from "@/components/DeciderLanding";

export const metadata = deciderMetadata;

export default async function DeciderPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return <DeciderLanding locale={lang as Locale} />;
}
