import styles from "./SectionHeading.module.css";

type Props = {
  n: number;
  title: string;
  id?: string;
  sub?: string;
};

export function SectionHeading({ n, title, id, sub }: Props) {
  return (
    <div className={styles.heading}>
      <span className={styles.n}>{n}</span>
      <h2 id={id} className={styles.title}>
        {title}
      </h2>
      {sub ? <span className={styles.sub}>{sub}</span> : null}
    </div>
  );
}
