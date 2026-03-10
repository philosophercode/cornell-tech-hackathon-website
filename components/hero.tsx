"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CountdownTimer } from "./countdown";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[-25%] left-[-15%] w-[700px] h-[700px] rounded-full bg-cornell-red/[0.08] blur-[150px] animate-float" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-accent-blue/[0.06] blur-[140px] animate-float-delayed" />
        <div className="absolute top-[30%] left-[55%] w-[500px] h-[500px] rounded-full bg-accent-violet/[0.04] blur-[120px] animate-float-slow" />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-100" />

      {/* Radial fade at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-bg-primary to-transparent" />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Logos */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-10 flex items-center justify-center gap-4 md:gap-12"
        >
          <Image
            src="/ai-society-logo.png"
            alt="AI Society"
            width={100}
            height={100}
            className="object-contain h-auto w-auto max-w-[60px] md:max-w-[100px]"
            priority
          />
          <Image
            src="/empire-hacks-logo.png"
            alt="Empire Hacks"
            width={100}
            height={100}
            className="object-contain h-auto w-auto max-w-[60px] md:max-w-[100px]"
            priority
          />
          <Image
            src="/ai-club-columbia-logo.png"
            alt="AI Club Columbia"
            width={120}
            height={120}
            className="object-contain h-auto w-auto max-w-[80px] md:max-w-[120px]"
            priority
          />
        </motion.div>

        {/* Overline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-text-muted text-xs tracking-[0.35em] uppercase mb-6 font-sans font-medium"
        >
          Cornell Tech&ensp;&times;&ensp;Columbia
        </motion.p>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="font-serif text-[clamp(3rem,8vw,8rem)] leading-[0.9] tracking-tight mb-6"
        >
          <span className="block text-text-primary">Empire Hacks</span>
          <span className="block italic text-text-secondary mt-1">2026</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="text-text-secondary text-lg md:text-xl font-light max-w-xl mx-auto mb-2"
        >
          120 top graduate builders. One weekend. Agentic AI Hackathon.
        </motion.p>

        {/* Date & Location */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-text-muted text-sm tracking-wide mb-2"
        >
          March 20&ndash;22, 2026&ensp;&middot;&ensp;Cornell Tech, Roosevelt
          Island
        </motion.p>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.85 }}
        >
          <CountdownTimer />
        </motion.div>

        {/* Sponsor logos */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.95 }}
          className="flex items-center justify-center gap-8 mt-4 mb-6"
        >
          <p className="text-text-muted text-xs tracking-[0.2em] uppercase">Sponsored by</p>
          <Image
            src="/anthropic-logo.png"
            alt="Anthropic"
            width={120}
            height={40}
            className="object-contain h-auto w-auto"
          />
          <Image
            src="/lovable-logo.png"
            alt="Lovable"
            width={120}
            height={40}
            className="object-contain h-auto w-auto"
          />
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-2"
        >
          <a
            href="https://luma.com/8dbisemh"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-8 py-3.5 rounded-full bg-cornell-red text-white text-sm font-medium tracking-wide hover:bg-cornell-red-hover transition-all duration-300 shadow-[0_0_30px_rgba(179,27,27,0.3)] hover:shadow-[0_0_50px_rgba(179,27,27,0.5)]"
          >
            Apply Now
            <span className="inline-block ml-2 transition-transform duration-200 group-hover:translate-x-0.5">
              &rarr;
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
