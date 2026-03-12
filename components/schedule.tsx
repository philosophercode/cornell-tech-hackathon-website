"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "./fade-in";

interface ScheduleEvent {
  time: string;
  title: string;
  description?: string;
  location?: string;
}

interface Day {
  date: string;
  label: string;
  tag: string;
  tagColor: string;
  events: ScheduleEvent[];
}

const days: Day[] = [
  {
    date: "March 20",
    label: "Friday",
    tag: "Online",
    tagColor: "text-accent-blue border-accent-blue/30 bg-accent-blue/5",
    events: [
      {
        time: "4:00 – 5:00 PM",
        title: "Day 1 Kickoff",
        description: "General logistics, topic announcement, awards sections",
        location: "Zoom / Slack",
      },
      {
        time: "5:00 – 6:00 PM",
        title: "Online Team Matching / Networking Session",
        location: "Slack",
      },
      {
        time: "6:00 PM – EOD",
        title: "Build Time for Teams",
        location: "Slack",
      },
    ],
  },
  {
    date: "March 21",
    label: "Saturday",
    tag: "Online",
    tagColor: "text-accent-blue border-accent-blue/30 bg-accent-blue/5",
    events: [
      {
        time: "9:00 – 10:00 AM",
        title: "Day 2 Kickoff",
        description: "Presentation logistics, topic reminder, awards sections",
        location: "Zoom / Slack",
      },
      {
        time: "10:00 AM – EOD",
        title: "Build Time for Teams",
        location: "Slack",
      },
    ],
  },
  {
    date: "March 22",
    label: "Sunday",
    tag: "In-Person (Tentative)",
    tagColor: "text-cornell-red border-cornell-red/30 bg-cornell-red/5",
    events: [
      {
        time: "9:00 – 10:00 AM",
        title: "Check-In and Breakfast",
        location: "Bloomberg 161/165",
      },
      {
        time: "10:00 – 10:30 AM",
        title: "Day 3 Kickoff",
        location: "Bloomberg Auditorium",
      },
      {
        time: "10:30 – 11:30 AM",
        title: "Optional Workshop 1a – AI Society",
        location: "Bloomberg Auditorium",
      },
      {
        time: "10:30 – 11:30 AM",
        title: "Optional Workshop 1b",
        location: "Bloomberg 081",
      },
      {
        time: "11:30 AM – 12:30 PM",
        title: "Optional Workshop 2a – AI Society",
        location: "Bloomberg Auditorium",
      },
      {
        time: "11:30 AM – 12:30 PM",
        title: "Optional Workshop 2b",
        location: "Bloomberg 081",
      },
      {
        time: "10:30 AM – 12:30 PM",
        title: "Build Session for Teams",
        location: "Bloomberg 161/165",
      },
      {
        time: "12:30 – 2:30 PM",
        title: "Sponsor Fair + Lunch",
        description: "Overlapping with build time",
        location: "Bloomberg 161/165",
      },
      { time: "3:00 – 5:00 PM", title: "Demos & Judging" },
      { time: "5:00 – 6:00 PM", title: "Dinner" },
      { time: "6:00 – 6:30 PM", title: "Closing Remarks & Awards" },
    ],
  },
];

export function Schedule() {
  const [activeDay, setActiveDay] = useState(2);

  return (
    <section id="schedule" className="relative py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <p className="text-xs tracking-[0.3em] uppercase text-text-muted mb-4 font-medium">
            Schedule
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-text-primary mb-4 leading-[1.1]">
            Three days<span className="text-cornell-red">,</span>
            <br />
            <span className="italic text-text-secondary">one mission</span>
          </h2>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="text-text-secondary text-lg max-w-2xl mb-12">
            Two days of virtual building, one day of in-person demos, workshops,
            and judging at Cornell Tech.
          </p>
        </FadeIn>

        {/* Day tabs */}
        <FadeIn delay={0.3}>
          <div className="flex gap-2 mb-10">
            {days.map((day, i) => (
              <button
                key={day.date}
                onClick={() => setActiveDay(i)}
                className={`relative px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeDay === i
                    ? "bg-white/[0.07] text-text-primary border border-border-medium"
                    : "text-text-muted hover:text-text-secondary hover:bg-white/[0.02]"
                }`}
              >
                <span className="block">{day.date}</span>
                <span className="text-xs opacity-60">{day.label}</span>
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Day content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDay}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            {/* Tag */}
            <span
              className={`inline-block text-xs font-medium tracking-wider uppercase px-3 py-1 rounded-full border mb-8 ${days[activeDay].tagColor}`}
            >
              {days[activeDay].tag}
            </span>

            {/* Timeline */}
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-[7px] top-3 bottom-3 w-px bg-border-subtle" />

              <div className="space-y-0">
                {days[activeDay].events.map((event, i) => (
                  <div key={i} className="relative flex gap-6 group">
                    {/* Dot */}
                    <div className="relative z-10 mt-[22px]">
                      <div
                        className={`w-[15px] h-[15px] rounded-full border-2 transition-colors duration-300 ${
                          i === 0
                            ? "border-cornell-red bg-cornell-red/20"
                            : "border-border-medium bg-bg-primary group-hover:border-text-muted"
                        }`}
                      />
                    </div>

                    {/* Content */}
                    <div className="pb-8 flex-1">
                      <p className="text-xs text-text-muted tracking-wide mb-1 font-medium tabular-nums">
                        {event.time}
                      </p>
                      <h3 className="text-text-primary text-lg font-medium mb-1">
                        {event.title}
                      </h3>
                      {event.description && (
                        <p className="text-text-secondary text-sm leading-relaxed">
                          {event.description}
                        </p>
                      )}
                      {event.location && (
                        <p className="text-text-muted text-xs mt-1 tracking-wide">
                          {event.location}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
