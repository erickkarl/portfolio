"use client";

import { useState } from "react";
import type { Pin } from "@/content/profile";
import { pinLabel, pinPosition } from "@/lib/pinout";
import styles from "./Pinout.module.css";

type Props = {
  pins: Pin[];
  partNo: string;
  /** Pin selected on first render, so the detail panel is never empty. */
  initialPin?: number;
};

export function Pinout({ pins, partNo, initialPin = 1 }: Props) {
  const [active, setActive] = useState(initialPin);
  const total = pins.length;
  const selected = pins.find((p) => p.n === active) ?? pins[0];
  const clientSide = pinPosition(selected.n, total).side === "left";

  return (
    <div className={styles.wrap}>
      <div>
        <div
          className={styles.pinout}
          style={{ gridTemplateRows: `repeat(${total / 2}, var(--pin-row))` }}
          role="group"
          aria-label={`Skills shown as pins on a ${total}-pin chip`}
        >
          {pins.map((pin) => {
            const { side, row } = pinPosition(pin.n, total);
            const on = pin.n === active;
            const left = side === "left";
            return [
              <button
                key={`label-${pin.n}`}
                type="button"
                className={`${styles.label} ${left ? styles.labelLeft : styles.labelRight}`}
                style={{ gridRow: row, gridColumn: left ? 1 : 5 }}
                aria-pressed={on}
                aria-label={`Pin ${pin.n}: ${pin.name}`}
                onClick={() => setActive(pin.n)}
                onMouseEnter={() => setActive(pin.n)}
                onFocus={() => setActive(pin.n)}
              >
                {pin.name}
              </button>,
              <span
                key={`leg-${pin.n}`}
                className={`${styles.leg} ${on ? styles.on : ""}`}
                style={{ gridRow: row, gridColumn: left ? 2 : 4 }}
                aria-hidden="true"
              />,
            ];
          })}

          <div
            className={styles.chip}
            style={{ gridTemplateRows: `repeat(${total / 2}, 1fr)` }}
            aria-hidden="true"
          >
            <span className={styles.dot} />
            {pins.map((pin) => {
              const { side, row } = pinPosition(pin.n, total);
              return (
                <span
                  key={pin.n}
                  className={`${styles.num} ${side === "left" ? styles.numLeft : styles.numRight} ${
                    pin.n === active ? styles.on : ""
                  }`}
                  style={{ gridRow: row }}
                >
                  {pinLabel(pin.n)}
                </span>
              );
            })}
            <span className={styles.mark}>
              {partNo.split("-")[0]}
              <br />
              {partNo.split("-")[1]}
              <small>DIP-{total}</small>
            </span>
          </div>
        </div>
        <p className={styles.legend}>
          DIP-{total}, top view. Pins 1–{total / 2}: client side. Pins {total / 2 + 1}–{total}:
          server, data and delivery.
        </p>
      </div>

      <div className={styles.detail} aria-live="polite">
        <span className="eyebrow">
          Pin {pinLabel(selected.n)} · {clientSide ? "client side" : "server, data, delivery"}
        </span>
        <span className={styles.detailName}>{selected.name}</span>
        <span className={styles.detailWhere}>{selected.where}</span>
        <p className={styles.detailNote}>{selected.note}</p>
      </div>
    </div>
  );
}
