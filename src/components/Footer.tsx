export const Footer = () => {
  return (
    <footer className="bg-forest-green text-primary-foreground py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo */}
          <div>
            <h3 className="text-2xl font-serif font-bold">Certainly Cooperative</h3>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap justify-center gap-6">
            <a href="#" className="hover:text-primary-foreground/80 transition-colors">
              Home
            </a>
            <a href="#services" className="hover:text-primary-foreground/80 transition-colors">
              Services
            </a>
            <a href="#stories" className="hover:text-primary-foreground/80 transition-colors">
              Stories
            </a>
            <a href="#contact" className="hover:text-primary-foreground/80 transition-colors">
              Contact
            </a>
          </nav>

          {/* Social Links */}
          <div className="flex gap-4">
            <a 
              href="https://www.linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-primary-foreground/80 transition-colors"
              aria-label="LinkedIn"
            >
              LinkedIn
            </a>
            <a 
              href="https://www.youtube.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-primary-foreground/80 transition-colors"
              aria-label="YouTube"
            >
              YouTube
            </a>
          </div>
        </div>

        {/* Legal */}
        <div className="mt-8 pt-8 border-t border-primary-foreground/20 text-center text-sm text-primary-foreground/70">
          <p>
            © 2025 Certainly Cooperative — 
            <a href="#" className="hover:text-primary-foreground/90 ml-1">Privacy Policy</a> — 
            <a href="#" className="hover:text-primary-foreground/90 ml-1">Terms of Use</a>
          </p>
        </div>
      </div>
    </footer>
  );
};
