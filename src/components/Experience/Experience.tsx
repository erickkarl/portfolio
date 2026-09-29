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
      {role.summary ? <p className={styles.summary}>{role.summary}</p> : null}
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
    <div className={styles.wrap}>
      <div className={styles.track} data-trajectory-track>
        {/* The rail is always visible; the lit line draws over it on scroll. */}
        <span className={styles.rail} aria-hidden="true" />
        <span className={styles.line} aria-hidden="true" data-trajectory />

        {jobs.map((job) => {
          const single = job.roles.length === 1;
          return (
            <article
              key={job.company}
              className={`${styles.job} ${job.current ? styles.current : ""}`}
              data-reveal
            >
              <span className={styles.node} aria-hidden="true" />
              <div className={styles.when}>
                <span className={styles.dates}>{job.dates}</span>
                <span>{job.place}</span>
              </div>
              <div className={styles.body}>
                {single ? (
                  <>
                    <h3 className={styles.title}>
                      {job.roles[0].title} <span className={styles.at}>{job.company}</span>
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
                  <ul className={styles.tags} aria-label="Technologies">
                    {job.tags.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </article>
          );
        })}
      </div>

      {footnotes.length ? (
        <dl className={styles.footnotes} data-reveal>
          {footnotes.map(({ label, line }) => (
            <div key={label} className={styles.footnote}>
              <dt>{label}</dt>
              <dd>
                <span className={styles.footDates}>{line.dates}</span>
                {line.text}
              </dd>
            </div>
          ))}
        </dl>
      ) : null}
    </div>
  );
}
