"use client";

import { useState, useEffect } from "react";

const TARGET_DATE = new Date("2026-03-22T09:00:00-04:00");

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calcTimeLeft(): TimeLeft {
  const diff = TARGET_DATE.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
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
  const [time, setTime] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTime(calcTimeLeft());
    const interval = setInterval(() => setTime(calcTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (!time) {
    return <div className="h-16" />;
  }

  return (
    <div className="flex items-center justify-center gap-2 md:gap-3 py-6">
      <Segment value={time.days} label="Days" />
      <Separator />
      <Segment value={time.hours} label="Hours" />
      <Separator />
      <Segment value={time.minutes} label="Min" />
      <Separator />
      <Segment value={time.seconds} label="Sec" />
    </div>
  );
}
