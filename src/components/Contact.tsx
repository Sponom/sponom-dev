export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <span className="text-accent text-sm font-medium tracking-wide uppercase mb-4 block">
          Contact
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">
          Get in Touch
        </h2>
        <p className="text-lg text-muted mb-10 max-w-xl mx-auto">
          Have questions about my products or want to say hi?
          I&apos;d love to hear from you.
        </p>

        <a
          href="mailto:sponom.dev@gmail.com"
          className="inline-block px-8 py-4 bg-accent text-white font-medium rounded-full hover:bg-accent-light transition-colors"
        >
          Send me an email
        </a>
      </div>
    </section>
  );
}
