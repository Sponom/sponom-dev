export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        {/* Gradient mesh background */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-accent/5" />
        <div className="absolute inset-0 bg-gradient-to-tl from-blue-500/5 via-transparent to-cyan-500/5" />

        {/* Animated gradient blob */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-1/3 -right-32 w-96 h-96 bg-cyan-400/15 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-blue-400/15 rounded-full blur-3xl animate-blob animation-delay-4000" />

        {/* Decorative rings */}
        <div className="absolute top-[20%] right-[10%] w-32 h-32 border border-accent/20 rounded-full animate-spin-slow" />
        <div className="absolute bottom-[25%] left-[8%] w-24 h-24 border border-accent/15 rounded-full animate-spin-slow animation-delay-2000" />

        {/* Floating dots */}
        <div className="absolute top-[15%] left-[15%] w-2 h-2 bg-accent/40 rounded-full animate-float" />
        <div className="absolute top-[30%] right-[20%] w-3 h-3 bg-accent/30 rounded-full animate-float-delayed" />
        <div className="absolute bottom-[35%] left-[25%] w-2 h-2 bg-accent/35 rounded-full animate-float" />
        <div className="absolute bottom-[20%] right-[15%] w-2.5 h-2.5 bg-accent/30 rounded-full animate-float-delayed" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="max-w-3xl mx-auto text-center relative">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
          Apps that simplify
          <br />
          your <span className="text-accent">everyday life</span>
        </h1>

        <p className="text-lg sm:text-xl text-muted max-w-2xl mx-auto mb-10 leading-relaxed">
          Browser extensions and web apps designed for real people.
          Simple, useful, and focused on what matters to you.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#projects"
            className="w-full sm:w-auto px-8 py-3 bg-accent text-white font-medium rounded-full hover:bg-accent-light transition-colors"
          >
            Products
          </a>
          <a
            href="#contact"
            className="w-full sm:w-auto px-8 py-3 border border-border font-medium rounded-full hover:bg-foreground/5 transition-colors"
          >
            Get in Touch
          </a>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 hidden md:block">
          <div className="w-6 h-10 border-2 border-muted/30 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-muted/50 rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
