"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import styles from "./CopyEmail.module.css";

type Props = {
  email: string;
  /** Icons are rendered on the server and passed in, so no icon data ships here. */
  copyIcon: ReactNode;
  doneIcon: ReactNode;
};

/**
 * The address as a mail link plus a copy button. Copy confirms with
 * "Copied" for a moment; if the clipboard is unavailable, it selects the
 * address so it can be copied by hand.
 */
export function CopyEmail({ email, copyIcon, doneIcon }: Props) {
  const [copied, setCopied] = useState(false);
  const textRef = useRef<HTMLAnchorElement>(null);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 1800);
    } catch {
      const selection = window.getSelection();
      const range = document.createRange();
      if (selection && textRef.current) {
        range.selectNodeContents(textRef.current);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  };

  return (
    <div className={styles.row}>
      <a ref={textRef} className={styles.address} href={`mailto:${email}`}>
        {email}
      </a>
      <button type="button" className={styles.copy} onClick={copy} aria-label={`Copy ${email}`}>
        {copied ? doneIcon : copyIcon}
        <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
      </button>
    </div>
  );
}
