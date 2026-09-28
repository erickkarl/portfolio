import type { Job, Role } from "@/content/profile";
import styles from "./Experience.module.css";

type Line = { dates: string; text: string };

type Props = {
  jobs: Job[];
  /** One-line entries shown after the jobs, without detail. */
  footnotes?: { label: string; line: Line }[];
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

export function Experience({ jobs, footnotes = [] }: Props) {
  return (
    <div className={styles.timeline}>
      {jobs.map((job) => {
        const single = job.roles.length === 1;
        return (
          <article key={job.company} className={`${styles.job} ${job.current ? styles.current : ""}`}>
            <div className={styles.when}>
              <b>{job.dates}</b>
              <span>{job.place}</span>
            </div>
            <div className={styles.body}>
              {single ? (
                <>
                  <h3 className={styles.title}>
                    {job.roles[0].title} <span className={styles.at}>· {job.company}</span>
                  </h3>
                  <p className={styles.meta}>{job.meta}</p>
                  <RoleBody role={job.roles[0]} />
                </>
              ) : (
                <>
                  <h3 className={styles.title}>{job.company}</h3>
                  <p className={styles.meta}>{job.meta}</p>
                  <div className={styles.roles}>
                    {job.roles.map((role) => (
                      <div key={role.title} className={styles.subRole}>
                        <h4>{role.title}</h4>
                        <p className={styles.subDates}>{role.dates}</p>
                        <RoleBody role={role} />
                      </div>
                    ))}
                  </div>
                </>
              )}
              {job.tags.length ? (
                <div className={styles.tags}>
                  {job.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              ) : null}
            </div>
          </article>
        );
      })}

      {footnotes.length ? (
        <dl className={styles.footnotes}>
          {footnotes.map(({ label, line }) => (
            <div key={label} className={styles.footnote}>
              <dt>{label}</dt>
              <dd>
                <span className={styles.footDates}>{line.dates}</span> {line.text}
              </dd>
            </div>
          ))}
        </dl>
      ) : null}
    </div>
  );
}
