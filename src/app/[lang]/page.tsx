import { type Locale } from "@/lib/i18n/config";
import HomePage from "@/components/HomePage";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return <HomePage lang={lang as Locale} />;
}
