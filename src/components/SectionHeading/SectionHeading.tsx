import { SplitWords } from "@/components/SplitWords/SplitWords";
import styles from "./SectionHeading.module.css";

type Props = {
  eyebrow: string;
  title: string;
  id?: string;
};

export function SectionHeading({ eyebrow, title, id }: Props) {
  return (
    <div className={styles.heading}>
      <span className="eyebrow" data-reveal>
        {eyebrow}
      </span>
      <h2 id={id} className={styles.title} data-reveal-heading>
        <SplitWords text={title} />
      </h2>
    </div>
  );
}
