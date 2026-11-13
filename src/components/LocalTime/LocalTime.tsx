"use client";

import { useSyncExternalStore } from "react";

type Props = {
  /** IANA zone, e.g. "America/Bahia". */
  timeZone: string;
};

/** Re-render often enough that the minute never reads stale. */
function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, 10_000);
  return () => window.clearInterval(id);
}

/** Wall-clock time in a zone as "HH:MM". */
export function formatTime(date: Date, timeZone: string): string {
  return new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone }).format(date);
}

/**
 * The current time somewhere else, ticking. The server can't know when the
 * page will be read, so it renders a placeholder of the same width.
 */
export function LocalTime({ timeZone }: Props) {
  const time = useSyncExternalStore(
    subscribe,
    () => formatTime(new Date(), timeZone),
    () => null,
  );
  return <time suppressHydrationWarning>{time ?? "--:--"}</time>;
}
