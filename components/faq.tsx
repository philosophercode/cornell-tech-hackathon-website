"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn, StaggerContainer, StaggerItem } from "./fade-in";

const faqs = [
  {
    q: "Who can participate?",
    a: "The hackathon is open to graduate and advanced undergraduate students from Cornell Tech, Columbia, NYU, Yale, Princeton, and other top programs. We review applications to ensure a high-quality cohort of builders.",
  },
  {
    q: "What's the team size?",
    a: "Teams of 3–5 people. You can register with a pre-formed team or sign up solo and join our team matching session on Day 1.",
  },
  {
    q: "Do I need to attend in person?",
    a: "Days 1 and 2 (March 20–21) are virtual. Day 3 (March 22) is in-person at Cornell Tech on Roosevelt Island, NYC. You must attend in person on Day 3 to present and be eligible for prizes.",
  },
  {
    q: "What will teams build?",
    a: "Teams will prototype agentic AI solutions. The specific problem areas will be announced at the Day 1 kickoff. The theme is intentionally broad to encourage the strongest ideas across real-world workflows.",
  },
  {
    q: "What tools and APIs are provided?",
    a: "We're working with sponsors to provide API credits and cloud compute for participants. Details will be shared closer to the event.",
  },
  {
    q: "Is there a cost to participate?",
    a: "No. The hackathon is completely free for accepted participants. Meals on Day 3 are provided.",
  },
  {
    q: "How are projects judged?",
    a: "Projects are evaluated on demo quality, technical depth, product thinking, and real-world applicability. Judging is done by a panel of industry leaders and faculty.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border-subtle">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-6 text-left group"
      >
        <span className="text-text-primary text-base md:text-lg font-medium pr-8 group-hover:text-white transition-colors">
          {q}
        </span>
        <span
          className={`text-text-muted text-xl shrink-0 transition-transform duration-300 ${
            open ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <p className="text-text-secondary text-sm md:text-base leading-relaxed pb-6 pr-12">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ() {
  return (
    <section id="faq" className="relative py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <FadeIn>
          <p className="text-xs tracking-[0.3em] uppercase text-text-muted mb-4 font-medium">
            FAQ
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-text-primary mb-12 leading-[1.1]">
            Questions<span className="text-cornell-red">?</span>
          </h2>
        </FadeIn>

        <StaggerContainer staggerDelay={0.08}>
          {faqs.map((faq) => (
            <StaggerItem key={faq.q}>
              <FAQItem q={faq.q} a={faq.a} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
