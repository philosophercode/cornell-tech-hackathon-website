"use client";

import { FadeIn, StaggerContainer, StaggerItem } from "./fade-in";
import { useEffect, useRef, useState } from "react";

function AnimatedNumber({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 1800;
          const startTime = performance.now();

          function animate(now: number) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          }
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

const stats = [
  { value: 120, label: "Participants", suffix: "" },
  { value: 5, label: "Universities", suffix: "" },
  { value: 3, label: "Days", suffix: "" },
  { value: 24, label: "Hr Sprint", suffix: "" },
];

const universities = [
  "Cornell Tech",
  "Columbia",
  "NYU",
  "Yale",
  "Princeton",
];

export function About() {
  return (
    <section id="about" className="relative py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <p className="text-xs tracking-[0.3em] uppercase text-text-muted mb-4 font-medium">
            About the Event
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-text-primary mb-8 leading-[1.1]">
            Build what&rsquo;s next<span className="text-cornell-red">.</span>
          </h2>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="text-text-secondary text-lg md:text-xl leading-relaxed max-w-3xl mb-6">
            The Cornell x Columbia AI Hackathon 2026 brings together top student
            builders from five universities for a weekend of prototyping agentic
            AI solutions across real-world workflows. In collaboration with the{" "}
            <a
              href="https://aisocietycornell.tech/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cornell-red hover:underline"
            >
              Cornell Tech AI Society
            </a>
            .
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <p className="text-text-secondary text-lg md:text-xl leading-relaxed max-w-3xl mb-16">
            Teams will compete to showcase high-quality demos, practical
            engineering, and thoughtful product thinking&mdash;judged by
            industry leaders and faculty from top programs.
          </p>
        </FadeIn>

        {/* Stats */}
        <StaggerContainer
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          staggerDelay={0.15}
        >
          {stats.map((stat) => (
            <StaggerItem key={stat.label}>
              <div className="gradient-border p-6 md:p-8 text-center">
                <div className="text-4xl md:text-5xl font-semibold text-text-primary mb-2 tabular-nums">
                  <AnimatedNumber target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-xs tracking-[0.2em] uppercase text-text-muted">
                  {stat.label}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* University strip */}
        <FadeIn>
          <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-4">
            {universities.map((uni, i) => (
              <span
                key={uni}
                className="text-text-muted text-sm tracking-wide font-medium uppercase"
              >
                {uni}
                {i < universities.length - 1 && (
                  <span className="ml-10 text-border-medium hidden md:inline">
                    |
                  </span>
                )}
              </span>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
