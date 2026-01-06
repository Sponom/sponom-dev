export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 px-6 border-t border-border">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted">
          {currentYear} sponom.dev. All rights reserved.
        </p>
        <nav className="flex items-center gap-6">
          <a
            href="#about"
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            About
          </a>
          <a
            href="#projects"
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            Products
          </a>
          <a
            href="#contact"
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            Contact
          </a>
        </nav>
      </div>
    </footer>
  );
}
