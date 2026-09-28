import styles from "./SectionHeading.module.css";

type Props = {
  eyebrow: string;
  title: string;
  id?: string;
};

export function SectionHeading({ eyebrow, title, id }: Props) {
  return (
    <div className={styles.heading}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 id={id} className={styles.title}>
        {title}
      </h2>
    </div>
  );
}
