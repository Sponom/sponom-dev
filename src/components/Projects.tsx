import Image from 'next/image';

const projects = [
  {
    title: 'Screenshot YouTube Maker',
    description:
      'Chrome extension that lets you capture perfect screenshots from any YouTube video. Save moments and create thumbnails instantly.',
    tags: ['Chrome Extension', 'YouTube', 'Screenshots'],
    link: 'https://chromewebstore.google.com/detail/screenshot-youtube-maker/nipmbloenddjdljjalhmcbaefpmfkgad',
    logo: '/yt-screenshot-logo.png',
  },
  {
    title: 'Your QR Code Generator',
    description:
      'Create QR codes instantly from any URL or text. Simple, fast, and always accessible right from your browser.',
    tags: ['Chrome Extension', 'QR Codes', 'Productivity'],
    link: 'https://chromewebstore.google.com/detail/your-qr-code-generator/ampkcjdaobkjgigighjomgfcmomhgpnk',
    logo: '/qr-logo.png',
  },
  {
    title: 'Recapz',
    description:
      'A quiet place for your days. Capture how you feel as it happens. See your day as it really was, not as memory rewrites it.',
    tags: ['Web', 'Reflection', 'Journaling'],
    link: 'https://recapz.app/',
    logo: '/recapz-logo.png',
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 bg-foreground/[0.02]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-accent text-sm font-medium tracking-wide uppercase mb-4 block">
            Products
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Products
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 [&>*:last-child:nth-child(odd)]:md:col-span-2 [&>*:last-child:nth-child(odd)]:md:max-w-[calc(50%-12px)] [&>*:last-child:nth-child(odd)]:md:mx-auto">
          {projects.map((project, index) => (
            <article
              key={index}
              className="group bg-background border border-border rounded-2xl p-6 hover:border-accent/30 transition-all duration-300 flex flex-col h-full"
            >
              <div className="flex items-start gap-4 mb-4">
                <Image
                  src={project.logo}
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
                  href={project.link}
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
