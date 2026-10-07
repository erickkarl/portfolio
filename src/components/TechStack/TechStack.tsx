import type { CSSProperties } from "react";
import { Icon } from "@/components/Icon/Icon";
import type { Tech, TechGroup } from "@/content/profile";
import { Marquee } from "./Marquee";
import styles from "./TechStack.module.css";

type Props = {
  groups: TechGroup[];
};

/** Each loop needs at least this many pills so short groups still fill the row. */
const MIN_PER_LOOP = 12;

function Pill({ tech, hidden }: { tech: Tech; hidden?: boolean }) {
  return (
    <li
      className={styles.pill}
      style={{ "--brand": tech.color } as CSSProperties}
      aria-hidden={hidden || undefined}
    >
      <Icon name={tech.logo} size={22} className={styles.logo} />
      <span>{tech.name}</span>
    </li>
  );
}

/**
 * Technologies as slowly drifting rows, one per group, that can be dragged or
 * swiped sideways. The row is a seamless loop: the list is repeated until it
 * is wide enough, then doubled, and the track wraps at exactly half its width.
 * Assistive technology hears each technology once; every repeat is hidden.
 */
export function TechStack({ groups }: Props) {
  return (
    <div className={styles.rows}>
      {groups.map((group, g) => {
        const repeats = Math.max(1, Math.ceil(MIN_PER_LOOP / group.items.length));
        const loop = Array.from({ length: repeats }, (_, r) => r);
        return (
          <div key={group.title} className={styles.row} data-reveal>
            <h3 className={styles.label}>{group.title}</h3>
            <Marquee duration={group.items.length * repeats * 3.2} reverse={g % 2 === 1} label={group.title}>
              {[0, 1].map((half) => (
                <ul key={half} className={styles.set} aria-hidden={half === 1 || undefined}>
                  {loop.map((r) =>
                    group.items.map((tech) => (
                      <Pill key={`${r}-${tech.name}`} tech={tech} hidden={half === 0 && r > 0} />
                    )),
                  )}
                </ul>
              ))}
            </Marquee>
          </div>
        );
      })}
    </div>
  );
}
