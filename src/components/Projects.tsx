import Image from "next/image";
import type { Translation } from "@/lib/i18n/types";

const projectLinks = [
  {
    link: "https://chromewebstore.google.com/detail/screenshot-youtube-maker/nipmbloenddjdljjalhmcbaefpmfkgad",
    logo: "/yt-screenshot-logo.png",
  },
  {
    link: "https://chromewebstore.google.com/detail/your-qr-code-generator/ampkcjdaobkjgigighjomgfcmomhgpnk",
    logo: "/qr-logo.png",
  },
  {
    link: "https://recapz.app/",
    logo: "/recapz-logo.png",
  },
];

interface ProjectsProps {
  translations: Translation;
}

export default function Projects({ translations: t }: ProjectsProps) {
  return (
    <section id="projects" className="py-24 px-6 bg-foreground/[0.02]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-accent text-sm font-medium tracking-wide uppercase mb-4 block">
            {t.projects.sectionLabel}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            {t.projects.sectionTitle}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 [&>*:last-child:nth-child(odd)]:md:col-span-2 [&>*:last-child:nth-child(odd)]:md:max-w-[calc(50%-12px)] [&>*:last-child:nth-child(odd)]:md:mx-auto">
          {t.projects.items.map((project, index) => (
            <article
              key={index}
              className="group bg-background border border-border rounded-2xl p-6 hover:border-accent/30 transition-all duration-300 flex flex-col h-full"
            >
              <div className="flex items-start gap-4 mb-4">
                <Image
                  src={projectLinks[index].logo}
                  alt={`${project.title} logo`}
                  width={48}
                  height={48}
                  className="rounded-xl"
                />
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                </div>
                <a
                  href={projectLinks[index].link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 -m-2 text-muted hover:text-foreground transition-colors"
                  aria-label={`View ${project.title}`}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>

              <p className="text-muted leading-relaxed flex-grow">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 bg-foreground/5 text-muted text-xs font-medium rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
