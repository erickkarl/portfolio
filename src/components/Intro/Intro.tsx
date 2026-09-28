"use client";

import { useEffect } from "react";
import styles from "./Intro.module.css";

export const INTRO_SEEN_KEY = "intro-seen";

/**
 * Runs before first paint (see layout.tsx). Hides the intro for visitors who
 * already watched it this session, so there is no flash of the overlay.
 */
export const introBootScript = `try{if(sessionStorage.getItem("${INTRO_SEEN_KEY}")==="1")document.documentElement.setAttribute("data-intro","off")}catch(e){}`;

function dismiss() {
  document.documentElement.setAttribute("data-intro", "off");
}

type Props = {
  name: string;
  role: string;
};

/**
 * Full-screen overlay that writes the name by hand, then lifts away.
 * The whole timeline is CSS, so it plays and ends even before hydration;
 * script only remembers the visit and powers the skip button.
 */
export function Intro({ name, role }: Props) {
  useEffect(() => {
    try {
      sessionStorage.setItem(INTRO_SEEN_KEY, "1");
    } catch {
      // Storage can be blocked; the intro just plays again next time.
    }
  }, []);

  return (
    <div
      className={styles.intro}
      data-testid="intro"
      onAnimationEnd={(e) => {
        if (e.target === e.currentTarget) dismiss();
      }}
    >
      <div className={styles.stage}>
        <svg className={styles.signature} viewBox="0 0 1000 240" aria-hidden="true">
          <defs>
            <mask id="intro-reveal" maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="240">
              <rect className={styles.sweep} x="0" y="0" width="1000" height="240" fill="white" />
            </mask>
          </defs>
          <text
            className={styles.ink}
            x="500"
            y="160"
            textAnchor="middle"
            mask="url(#intro-reveal)"
          >
            {name}
          </text>
          <path className={styles.flourish} d="M250 196 C 420 180, 600 212, 760 188" />
        </svg>
        <p className={styles.role}>{role}</p>
      </div>
      <button type="button" className={styles.skip} onClick={dismiss}>
        Skip intro
      </button>
    </div>
  );
}
