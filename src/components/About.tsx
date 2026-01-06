import Image from "next/image";

const values = [
  { title: "User-First", description: "Every product starts with understanding real user needs" },
  { title: "Simplicity", description: "Clean design and intuitive interfaces for everyone" },
  { title: "Quality", description: "Crafted with care and attention to detail" },
  { title: "Privacy", description: "Your data belongs to you, always" },
];

export default function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
          {/* Left Column - About */}
          <div>
            <span className="text-accent text-sm font-medium tracking-wide uppercase mb-4 block">
              About
            </span>
            <div className="flex items-center gap-4 mb-6">
              <Image
                src="/avatar.png"
                alt="Sergei Ponomarev"
                width={64}
                height={64}
                className="rounded-full"
              />
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  Sergei Ponomarev
                </h2>
                <p className="text-muted">Solo Entrepreneur</p>
              </div>
            </div>
            <div className="space-y-4 text-muted leading-relaxed">
              <p>
                I create software that solves real problems for real people.
                My products are designed to be intuitive, reliable, and
                genuinely useful in your daily life.
              </p>
              <p>
                From browser extensions that save you time to apps that help
                you grow personally, I focus on building things that make
                a meaningful difference.
              </p>
              <p>
                I believe great software should be accessible to everyone,
                not just tech experts. That&apos;s why I prioritize simplicity
                and user experience in everything I build.
              </p>
            </div>
          </div>

          {/* Right Column - Values */}
          <div className="bg-foreground/[0.02] border border-border rounded-2xl p-8">
            <h3 className="text-lg font-semibold mb-6">My Values</h3>
            <div className="space-y-6">
              {values.map((value) => (
                <div key={value.title}>
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
