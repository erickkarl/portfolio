import Image from "next/image";
import type { TechGroup } from "@/content/profile";
import styles from "./TechStack.module.css";

type Props = {
  groups: TechGroup[];
};

export function TechStack({ groups }: Props) {
  return (
    <div className={styles.groups}>
      {groups.map((group) => (
        <div key={group.title} className={styles.group}>
          <h3 className={styles.groupTitle}>{group.title}</h3>
          <ul className={styles.grid}>
            {group.items.map((tech) => (
              <li key={tech.name} className={styles.tile}>
                <span className={styles.logo}>
                  {/* Decorative: the name is printed right next to it. */}
                  <Image src={tech.logo} alt="" width={36} height={36} unoptimized />
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
