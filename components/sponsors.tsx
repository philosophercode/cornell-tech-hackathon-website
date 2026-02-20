"use client";

import { FadeIn, StaggerContainer, StaggerItem } from "./fade-in";

const tiers = [
  {
    name: "Gold",
    price: "$10,000",
    borderClass: "gold-border",
    accent: "text-amber-400",
    benefits: [
      "Headline branding on all event materials",
      "Input on theme / problem statement",
      "Sponsor-defined challenge track (optional)",
      "Brand mentions across event & social media",
      "Access to resume book & LinkedIn list",
      "Workshop or keynote speaking slot",
    ],
  },
  {
    name: "Silver",
    price: "$5,000",
    borderClass: "silver-border",
    accent: "text-gray-300",
    benefits: [
      "Brand mentions across event & social media",
      "Access to resume book & LinkedIn list",
      "Logo on event website & materials",
      "Table at in-person sponsor fair",
    ],
  },
];

export function Sponsors() {
  return (
    <section id="sponsors" className="relative py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <p className="text-xs tracking-[0.3em] uppercase text-text-muted mb-4 font-medium">
            Sponsors
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-text-primary mb-4 leading-[1.1]">
            Partner with us<span className="text-cornell-red">.</span>
          </h2>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="text-text-secondary text-lg max-w-2xl mb-6">
            Get direct access to 120+ graduate-level engineers and researchers
            from Cornell, Columbia, NYU, Yale, and Princeton&mdash;building live
            in a high-signal, competitive environment.
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <p className="text-text-secondary text-base max-w-2xl mb-16">
            Sponsors receive recruiting access, brand visibility, and the option
            to shape challenge tracks. Your support funds venue, catering, and
            prizes for the best student builders in NYC.
          </p>
        </FadeIn>

        {/* Tier cards */}
        <StaggerContainer
          className="grid md:grid-cols-2 gap-6 mb-16"
          staggerDelay={0.2}
        >
          {tiers.map((tier) => (
            <StaggerItem key={tier.name}>
              <div
                className={`gradient-border ${tier.borderClass} p-8 md:p-10 h-full flex flex-col`}
              >
                <div className="mb-8">
                  <span
                    className={`text-xs font-semibold tracking-[0.25em] uppercase ${tier.accent}`}
                  >
                    {tier.name}
                  </span>
                  <div className="text-4xl md:text-5xl font-semibold text-text-primary mt-2">
                    {tier.price}
                  </div>
                </div>

                <ul className="space-y-4 flex-1">
                  {tier.benefits.map((benefit) => (
                    <li
                      key={benefit}
                      className="flex items-start gap-3 text-text-secondary text-sm leading-relaxed"
                    >
                      <span className="mt-1.5 block w-1 h-1 rounded-full bg-text-muted shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* CTA */}
        <FadeIn>
          <div className="text-center">
            <p className="text-text-muted text-sm mb-6">
              Interested in sponsoring? We&rsquo;d love to chat.
            </p>
            <a
              href="mailto:ctsg@cornell.edu,na553@cornell.edu,cd698@cornell.edu?subject=Cornell%20x%20Columbia%20AI%20Hackathon%20%E2%80%93%20Sponsorship%20Inquiry"
              className="inline-block px-8 py-3.5 rounded-full bg-cornell-red text-white text-sm font-medium tracking-wide hover:bg-cornell-red-hover transition-all duration-300 shadow-[0_0_30px_rgba(179,27,27,0.3)] hover:shadow-[0_0_50px_rgba(179,27,27,0.5)]"
            >
              Get in Touch
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
