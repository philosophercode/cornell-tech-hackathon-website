"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "./fade-in";

interface ScheduleEvent {
  time: string;
  title: string;
  description?: string;
  fullDescription?: string;
  location?: string;
  highlight?: boolean;
  parallel?: {
    title: string;
    location: string;
  };
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
        time: "4:00 – 4:30 PM",
        title: "Day 1 Kickoff",
        description: "Logistics, theme reveal, judge introduction",
        location: "Zoom",
      },
      {
        time: "4:30 – 6:00 PM",
        title: "Online Team Matching and Networking Session",
        location: "Zoom: Breakout Rooms by Theme",
      },
      {
        time: "6:00 PM – EOD",
        title: "Build Time for Teams",
        location: "Async",
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
        time: "10:00 – 11:00 AM",
        title: "Day 2 Kickoff",
        description: "Logistics and submission details",
        location: "Zoom",
      },
      {
        time: "11:00 AM – EOD",
        title: "Build Time for Teams",
        location: "Async",
      },
    ],
  },
  {
    date: "March 22",
    label: "Sunday",
    tag: "In-Person",
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
        title: "AI Agents from First Principles",
        description: "Pranav Dhingra, MEng '26",
        fullDescription: "Having a hard time understanding WTF is going on? Transformers, LLMs, Codex, OpenClaw, GPT, Opus, Gemini, MCP, CLI, Skills, Orchestration, Evals — there's just too much jargon out there to understand. Don't worry. In this workshop, we'll equip you with a mental model for how to understand all the technology out there and keep up with new releases, starting from the tiniest transformer block, all the way to multi-agent orchestrated systems. We'll also demystify the jargon for you! Come ready to learn.",
        location: "Bloomberg Auditorium (131)",
      },
      {
        time: "11:30 AM – 12:30 PM",
        title: "Building Agent Teams — Practical Tools for AI-First Development",
        description: "Isaac Steinberg, MBA '26",
        fullDescription: "Learn how to turn team meetings and discussions into AI agent tasks that can be executed and shipped. Go from zero to shipping at velocity — how to orchestrate AI agents at scale, what an agent control plane is, and how to build one. A practical, tools-first approach to running AI development teams.",
        location: "Bloomberg Auditorium (131)",
      },
      {
        time: "12:30 – 2:00 PM",
        title: "Networking Hour + Lunch",
        location: "Bloomberg 161/165 · Overflow Room 061",
      },
      {
        time: "2:00 – 3:00 PM",
        title: "Keynote Speaker Panel + AMA",
        location: "Bloomberg Auditorium",
      },
      {
        time: "3:00 PM",
        title: "Submissions Due",
        highlight: true,
      },
      {
        time: "3:00 – 4:00 PM",
        title: "Networking Hour for Attendees",
        location: "Bloomberg 161/165",
      },
      {
        time: "4:00 – 5:00 PM",
        title: "Finalist Demos, Awards, Closing Remarks",
        location: "Bloomberg Auditorium",
      },
    ],
  },
];

// Date string for each day index: "2026-03-20", "2026-03-21", "2026-03-22"
const DAY_DATES = ["2026-03-20", "2026-03-21", "2026-03-22"];

/**
 * Parse a time like "4:00 PM", "11:30 AM", or "4:00 – 4:30 PM" (returns start time)
 * into a Date object on the given day in NYC timezone.
 */
function parseEventStart(timeStr: string, dayIndex: number): Date {
  // Take just the start time (before any "–")
  const start = timeStr.split("–")[0].trim();
  // Extract hours, minutes, and AM/PM
  // Handle cases like "4:00 PM" or "11:30 AM" or "6:00 PM" or just "3:00 PM"
  const match = start.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i)
    ?? timeStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!match) return new Date(0);

  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const ampm = match[3].toUpperCase();

  if (ampm === "PM" && hours !== 12) hours += 12;
  if (ampm === "AM" && hours === 12) hours = 0;

  // EDT = UTC-4
  const dateStr = DAY_DATES[dayIndex];
  return new Date(`${dateStr}T${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00-04:00`);
}

/**
 * Returns the index of the current or next-upcoming event for a given day.
 * Returns 0 if before all events, last index if past all events on that day.
 */
function getCurrentEventIndex(dayIndex: number, events: ScheduleEvent[]): number {
  const now = Date.now();
  // Find the last event whose start time has passed
  let activeIndex = 0;
  for (let i = 0; i < events.length; i++) {
    const eventStart = parseEventStart(events[i].time, dayIndex);
    if (eventStart.getTime() <= now) {
      activeIndex = i;
    }
  }
  return activeIndex;
}

function getTodayIndex(): number {
  // Get current date in NYC timezone
  const nyc = new Date().toLocaleDateString("en-US", { timeZone: "America/New_York" });
  const nycDate = new Date(nyc);
  const month = nycDate.getMonth() + 1; // 1-indexed
  const day = nycDate.getDate();

  if (month === 3 && day === 20) return 0; // Friday
  if (month === 3 && day === 21) return 1; // Saturday
  if (month === 3 && day === 22) return 2; // Sunday
  // Default to Sunday (the most content-rich day)
  return 2;
}

function ExpandableDescription({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  const truncLength = 80;
  const needsTruncation = text.length > truncLength;

  return (
    <p className="text-neutral-300 text-sm leading-relaxed">
      {expanded || !needsTruncation
        ? text
        : text.slice(0, truncLength).trimEnd() + "… "}
      {needsTruncation && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-neutral-400 hover:text-white text-xs ml-1 transition-colors"
        >
          {expanded ? "show less" : "show more"}
        </button>
      )}
    </p>
  );
}

export function Schedule() {
  const [activeDay, setActiveDay] = useState(getTodayIndex);
  const [activeEventIndex, setActiveEventIndex] = useState(0);

  useEffect(() => {
    function update() {
      setActiveEventIndex(getCurrentEventIndex(activeDay, days[activeDay].events));
    }
    update();
    const interval = setInterval(update, 30_000); // refresh every 30s
    return () => clearInterval(interval);
  }, [activeDay]);

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
                    : "text-neutral-400 hover:text-white hover:bg-white/[0.04]"
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

            {/* Timeline + sidebar */}
            <div className="relative flex gap-8">
            <div className="relative flex-1 min-w-0">
              {/* Vertical line */}
              <div className="absolute left-[7px] top-3 bottom-3 w-px bg-border-subtle" />

              <div className="space-y-0">
                {days[activeDay].events.map((event, i) => (
                  <div key={i} className="relative flex gap-6 group">
                    {/* Dot */}
                    <div className="relative z-10 mt-[22px]">
                      <div
                        className={`w-[15px] h-[15px] rounded-full border-2 transition-colors duration-300 ${
                          i === activeEventIndex
                            ? "border-cornell-red bg-cornell-red/20"
                            : "border-border-medium bg-bg-primary group-hover:border-text-muted"
                        }`}
                      />
                    </div>

                    {/* Content */}
                    <div className="pb-8 flex-1">
                      <p className={`text-xs tracking-wide mb-1 font-medium tabular-nums ${event.highlight ? "text-cornell-red" : "text-neutral-400"}`}>
                        {event.time}
                      </p>
                      {event.parallel ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="rounded-lg border border-border-subtle bg-white/[0.03] p-3">
                            <h3 className="text-white text-lg font-medium mb-1">
                              {event.title}
                            </h3>
                            {event.description && (
                              <p className="text-neutral-300 text-sm leading-relaxed">
                                {event.description}
                              </p>
                            )}
                            {event.location && (
                              <p className="text-neutral-400 text-xs mt-1 tracking-wide">
                                {event.location}
                              </p>
                            )}
                          </div>
                          <div className="rounded-lg border border-border-subtle bg-white/[0.03] p-3">
                            <h3 className="text-white text-lg font-medium mb-1">
                              {event.parallel.title}
                            </h3>
                            <p className="text-neutral-400 text-xs mt-1 tracking-wide">
                              {event.parallel.location}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <>
                          <h3 className={`text-lg font-medium mb-1 ${event.highlight ? "text-white font-semibold drop-shadow-[0_0_20px_rgba(255,255,255,0.7)]" : "text-white"}`}>
                            {event.title}
                          </h3>
                          {event.description && (
                            <p className="text-neutral-300 text-sm leading-relaxed">
                              {event.description}
                            </p>
                          )}
                          {event.fullDescription && (
                            <ExpandableDescription text={event.fullDescription} />
                          )}
                          {event.location && (
                            <p className="text-neutral-400 text-xs mt-1 tracking-wide">
                              {event.location}
                            </p>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Build space sidebar — Sunday only */}
            {activeDay === 2 && (
              <div className="hidden lg:block w-64 flex-shrink-0">
                <div className="sticky top-32 rounded-xl border border-cornell-red/20 bg-cornell-red/[0.04] p-5">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-cornell-red font-semibold mb-3">
                    Build Space
                  </p>
                  <p className="text-white text-sm font-medium mb-2">
                    Open all day for teams
                  </p>
                  <p className="text-neutral-300 text-xs leading-relaxed mb-3">
                    Come and go as you like — hack between sessions, workshops, and talks.
                  </p>
                  <div className="border-t border-white/[0.06] pt-3">
                    <p className="text-neutral-400 text-[11px] tracking-wide mb-1">Bloomberg 161/165</p>
                    <p className="text-neutral-400 text-[11px] tracking-wide">Overflow Room 061</p>
                  </div>
                </div>
              </div>
            )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
