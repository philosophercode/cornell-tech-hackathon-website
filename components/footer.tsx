import Image from "next/image";

export function Footer() {
  return (
    <footer className="relative py-16 px-6 border-t border-border-subtle">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
          {/* Left: Logo + info */}
          <div className="flex items-start gap-4">
            <Image
              src="/logo_ctais_white.png"
              alt="Cornell Tech AI Society"
              width={112}
              height={112}
              className="opacity-50 mt-0.5"
            />
            <div>
              <p className="text-text-primary font-medium text-sm mb-1">
                Cornell x Columbia AI Hackathon 2026
              </p>
              <p className="text-text-muted text-xs leading-relaxed">
                Organized by Cornell Tech Student Government
                <br />
                &amp; Cornell Tech AI Society
              </p>
            </div>
          </div>

          {/* Right: Links */}
          <div className="flex gap-12">
            <div>
              <p className="text-text-muted text-xs uppercase tracking-[0.2em] mb-3">
                Event
              </p>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#about"
                    className="text-text-secondary text-sm hover:text-text-primary transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#schedule"
                    className="text-text-secondary text-sm hover:text-text-primary transition-colors"
                  >
                    Schedule
                  </a>
                </li>
                <li>
                  <a
                    href="#faq"
                    className="text-text-secondary text-sm hover:text-text-primary transition-colors"
                  >
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-text-muted text-xs uppercase tracking-[0.2em] mb-3">
                Connect
              </p>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://luma.com/8dbisemh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-secondary text-sm hover:text-text-primary transition-colors"
                  >
                    Apply on Luma
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:ctsg@cornell.edu?subject=Cornell%20x%20Columbia%20AI%20Hackathon%20Inquiry"
                    className="text-text-secondary text-sm hover:text-text-primary transition-colors"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="https://aisocietycornell.tech/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-secondary text-sm hover:text-text-primary transition-colors"
                  >
                    CT AI Society
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-border-subtle flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-text-muted text-xs">
            March 20&ndash;22, 2026 &middot; Cornell Tech, Roosevelt Island, NYC
          </p>
          <p className="text-text-muted text-xs">
            &copy; 2026 Cornell Tech AI Society
          </p>
        </div>
      </div>
    </footer>
  );
}
