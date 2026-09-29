import type { CSSProperties } from "react";
import { Icon } from "@/components/Icon/Icon";
import type { TechGroup } from "@/content/profile";
import styles from "./TechStack.module.css";

type Props = {
  groups: TechGroup[];
};

export function TechStack({ groups }: Props) {
  return (
    <div className={styles.groups}>
      {groups.map((group) => (
        <div key={group.title} className={styles.group} data-reveal>
          <h3 className={styles.groupTitle}>
            {group.title}
            <span className={styles.count} aria-hidden="true">
              {String(group.items.length).padStart(2, "0")}
            </span>
          </h3>
          <ul className={styles.grid}>
            {group.items.map((tech) => (
              <li
                key={tech.name}
                className={styles.card}
                style={{ "--brand": tech.color } as CSSProperties}
              >
                <span className={styles.mark}>
                  {/* Decorative: the name is printed right below it. */}
                  <Icon name={tech.logo} size={44} />
                </span>
                <span className={styles.text}>
                  <span className={styles.name}>{tech.name}</span>
                  <span className={styles.where}>{tech.where}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
