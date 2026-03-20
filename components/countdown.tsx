"use client";

import { useState, useEffect } from "react";

// All times in America/New_York (EDT = UTC-4)
const MILESTONES = [
  { label: "Kickoff", date: new Date("2026-03-20T16:00:00-04:00") },
  { label: "Submissions Due", date: new Date("2026-03-22T15:00:00-04:00") },
  { label: "Closing Ceremony", date: new Date("2026-03-22T17:00:00-04:00") },
];

interface CountdownState {
  label: string;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  finished: boolean;
}

function calcCountdown(): CountdownState {
  const now = Date.now();

  for (const milestone of MILESTONES) {
    const diff = milestone.date.getTime() - now;
    if (diff > 0) {
      return {
        label: milestone.label,
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
        finished: false,
      };
    }
  }

  return { label: "", days: 0, hours: 0, minutes: 0, seconds: 0, finished: true };
}

function Segment({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="font-sans text-2xl md:text-3xl font-semibold tabular-nums text-text-primary tracking-tight">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-[10px] uppercase tracking-[0.2em] text-text-muted mt-1">
        {label}
      </span>
    </div>
  );
}

function Separator() {
  return (
    <span className="text-text-muted text-2xl md:text-3xl font-light mx-1 animate-pulse-glow">
      :
    </span>
  );
}

export function CountdownTimer() {
  const [state, setState] = useState<CountdownState | null>(null);

  useEffect(() => {
    setState(calcCountdown());
    const interval = setInterval(() => setState(calcCountdown()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (!state) {
    return <div className="h-16" />;
  }

  if (state.finished) {
    return (
      <div className="py-6 text-center">
        <span className="text-text-primary text-lg font-medium">
          Thanks for hacking with us!
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-2 py-6">
      <span className="text-xs uppercase tracking-[0.25em] text-text-muted font-medium">
        {state.label}
      </span>
      <div className="flex items-center justify-center gap-2 md:gap-3">
        {state.days > 0 && (
          <>
            <Segment value={state.days} label="Days" />
            <Separator />
          </>
        )}
        <Segment value={state.hours} label="Hours" />
        <Separator />
        <Segment value={state.minutes} label="Min" />
        <Separator />
        <Segment value={state.seconds} label="Sec" />
      </div>
    </div>
  );
}
