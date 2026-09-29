"use client";

import { useEffect, useState } from "react";
import styles from "./Intro.module.css";
import { buildTimeline } from "./typing";

export const INTRO_SEEN_KEY = "intro-seen";

/**
 * Runs before first paint (see layout.tsx). Flags that script is available
 * (so hero pieces may start hidden for their entrance) and hides the intro for
 * visitors who already watched it this session, so the overlay never flashes.
 */
export const introBootScript = `document.documentElement.classList.add("js");try{if(sessionStorage.getItem("${INTRO_SEEN_KEY}")==="1")document.documentElement.setAttribute("data-intro","off")}catch(e){}`;

/** Fired once the overlay is gone, so the hero can start its entrance. */
export const INTRO_DONE_EVENT = "intro:done";

function dismiss() {
  const root = document.documentElement;
  if (root.getAttribute("data-intro") === "off") return;
  root.setAttribute("data-intro", "off");
  window.dispatchEvent(new Event(INTRO_DONE_EVENT));
}

type Phase = "idle" | "typing" | "done" | "leaving";

type Props = {
  /** Text typed on screen. */
  text: string;
  /** Small line that fades in below once typing finishes. */
  tagline?: string;
  /** Random source for keystroke timing; inject a seeded one for tests. */
  rng?: () => number;
};

/**
 * Full-screen overlay: a lone cursor blinks three times, the text is typed
 * at a human pace, then the overlay fades away to reveal the site.
 */
export function Intro({ text, tagline, rng }: Props) {
  const [typed, setTyped] = useState(0);
  const [phase, setPhase] = useState<Phase>("idle");

  useEffect(() => {
    try {
      sessionStorage.setItem(INTRO_SEEN_KEY, "1");
    } catch {
      // Storage can be blocked; the intro just plays again next time.
    }

    const root = document.documentElement;
    if (root.getAttribute("data-intro") === "off") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      dismiss();
      return;
    }

    const { keys, typingStart, leaveAt, endAt } = buildTimeline(text, rng);
    const timers = [
      window.setTimeout(() => setPhase("typing"), typingStart),
      ...keys.map((at, i) =>
        window.setTimeout(() => {
          setTyped(i + 1);
          if (i === keys.length - 1) setPhase("done");
        }, at),
      ),
      window.setTimeout(() => setPhase("leaving"), leaveAt),
      window.setTimeout(dismiss, endAt),
    ];

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      timers.forEach(window.clearTimeout);
      window.removeEventListener("keydown", onKey);
    };
  }, [text, rng]);

  return (
    <div className={`${styles.intro} ${styles[phase]}`} data-testid="intro" data-phase={phase}>
      <div className={styles.stage} aria-hidden="true">
        <p className={styles.line}>
          <span className={styles.text}>{text.slice(0, typed)}</span>
          <span className={styles.cursor} />
        </p>
        {tagline ? (
          <p
            className={styles.tagline}
            data-visible={phase === "done" || phase === "leaving"}
          >
            {tagline}
          </p>
        ) : null}
      </div>
      <button type="button" className={styles.skip} onClick={dismiss}>
        Skip intro
      </button>
    </div>
  );
}
