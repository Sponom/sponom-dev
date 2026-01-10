import Image from "next/image";
import type { Translation } from "@/lib/i18n/types";

interface AboutProps {
  translations: Translation;
}

export default function About({ translations: t }: AboutProps) {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
          {/* Left Column - About */}
          <div>
            <span className="text-accent text-sm font-medium tracking-wide uppercase mb-4 block">
              {t.about.sectionLabel}
            </span>
            <div className="flex items-center gap-4 mb-6">
              <Image
                src="/avatar.png"
                alt={t.about.name}
                width={64}
                height={64}
                className="rounded-full"
              />
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  {t.about.name}
                </h2>
                <p className="text-muted">{t.about.role}</p>
              </div>
            </div>
            <div className="space-y-4 text-muted leading-relaxed">
              {t.about.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Right Column - Values */}
          <div className="bg-foreground/[0.02] border border-border rounded-2xl p-8">
            <h3 className="text-lg font-semibold mb-6">{t.about.valuesTitle}</h3>
            <div className="space-y-6">
              {t.about.values.map((value, index) => (
                <div key={index}>
                  <h4 className="font-medium mb-1">{value.title}</h4>
                  <p className="text-sm text-muted">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
