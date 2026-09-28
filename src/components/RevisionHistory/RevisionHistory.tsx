import type { Revision, Role } from "@/content/profile";
import styles from "./RevisionHistory.module.css";

type Props = {
  revisions: Revision[];
};

function RoleBody({ role }: { role: Role }) {
  return (
    <>
      {role.summary ? <p>{role.summary}</p> : null}
      {role.highlights?.length ? (
        <ul className={styles.list}>
          {role.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      ) : null}
    </>
  );
}

export function RevisionHistory({ revisions }: Props) {
  return (
    <div className={styles.revs}>
      {revisions.map((r) => {
        const single = r.roles.length === 1;
        return (
          <article key={r.rev} className={`${styles.rev} ${r.current ? styles.current : ""}`}>
            <div className={styles.id} aria-label={`Revision ${r.rev}`}>
              {r.rev}
            </div>
            <div className={styles.date}>
              <b>{r.dates}</b>
              {r.place}
            </div>
            <div className={styles.body}>
              {single ? (
                <>
                  <h3 className={styles.title}>
                    {r.roles[0].title} <span className={styles.at}>· {r.company}</span>
                  </h3>
                  <p className={styles.meta}>{r.meta}</p>
                  <RoleBody role={r.roles[0]} />
                </>
              ) : (
                <>
                  <h3 className={styles.title}>{r.company}</h3>
                  <p className={styles.meta}>{r.meta}</p>
                  <div className={styles.roles}>
                    {r.roles.map((role) => (
                      <div key={role.title} className={styles.subRole}>
                        <h4>{role.title}</h4>
                        <p className={`${styles.meta} ${styles.subDates}`}>{role.dates}</p>
                        <RoleBody role={role} />
                      </div>
                    ))}
                  </div>
                </>
              )}
              {r.tags.length ? (
                <div className={styles.tags}>
                  {r.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              ) : null}
            </div>
          </article>
        );
      })}
    </div>
  );
}
