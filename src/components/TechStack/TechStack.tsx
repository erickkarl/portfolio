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
          <h3 className={styles.groupTitle}>{group.title}</h3>
          <ul className={styles.list}>
            {group.items.map((tech) => (
              <li key={tech.name} className={styles.item}>
                <span className={styles.mark}>
                  {/* Decorative: the name is printed right next to it. */}
                  <Icon name={tech.logo} size={24} />
                </span>
                <span className={styles.name}>{tech.name}</span>
                <span className={styles.where}>{tech.where}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
