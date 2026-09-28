import { CharacteristicsTable } from "@/components/CharacteristicsTable/CharacteristicsTable";
import { Pinout } from "@/components/Pinout/Pinout";
import { RevisionHistory } from "@/components/RevisionHistory/RevisionHistory";
import { SectionHeading } from "@/components/SectionHeading/SectionHeading";
import { profile } from "@/content/profile";
import styles from "./page.module.css";

export default function Home() {
  const linkedinHandle = profile.linkedin.replace("https://www.", "");

  return (
    <div className={styles.sheet}>
      <header className={styles.strip}>
        <span className={`eyebrow ${styles.stripLead}`}>{profile.partNo}</span>
        <span className="eyebrow">Senior Software Engineer · Datasheet</span>
      </header>

      <main>
        <div className={styles.title}>
          <div className={styles.partNo}>
            <span className="eyebrow">
              Part no. <b>{profile.partNo}</b>
            </span>
            <span className="eyebrow">Package: remote / hybrid</span>
            <span className="eyebrow">Rev. {profile.revision}</span>
          </div>
          <h1 className={styles.name}>{profile.name}</h1>
          <p className={styles.lede}>{profile.headline}</p>
          <div className={styles.facts}>
            {profile.facts.map((f) => (
              <span key={f.k}>
                <span className={styles.k}>{f.k}</span>
                <span className={styles.v}>{f.v}</span>
              </span>
            ))}
            <a className={styles.btn} href={profile.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn profile ↗
            </a>
          </div>
        </div>

        <div className={styles.cols}>
          <section className={styles.section} aria-labelledby="h-features">
            <SectionHeading n={1} id="h-features" title="Features" />
            <ul className={styles.features}>
              {profile.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </section>

          <section className={styles.section} aria-labelledby="h-apps">
            <SectionHeading n={2} id="h-apps" title="Applications" />
            <ul className={styles.apps}>
              {profile.applications.map((a) => (
                <li key={a.what}>
                  <span>{a.what}</span>
                  <span>{a.where}</span>
                </li>
              ))}
            </ul>
            <SectionHeading n={3} id="h-desc" title="General description" />
            <div className={styles.desc}>
              {profile.description.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </section>
        </div>

        <section className={styles.section} aria-labelledby="h-pins">
          <SectionHeading
            n={4}
            id="h-pins"
            title="Pin configuration"
            sub="Core skills. Select a pin for details."
          />
          <Pinout pins={profile.pins} partNo={profile.partNo} />
        </section>

        <section className={styles.section} aria-labelledby="h-char">
          <SectionHeading
            n={5}
            id="h-char"
            title="Key characteristics"
            sub="Figures taken from the work history below."
          />
          <CharacteristicsTable rows={profile.characteristics} />
        </section>

        <section className={styles.section} aria-labelledby="h-rev">
          <SectionHeading n={6} id="h-rev" title="Revision history" sub="Experience, newest first." />
          <RevisionHistory revisions={profile.revisions} />
        </section>

        <section className={styles.section} aria-labelledby="h-contact">
          <SectionHeading n={7} id="h-contact" title="Contact" />
          <div className={styles.contact}>
            <p>Based in São Paulo and working remotely. The fastest way to reach Erick is on LinkedIn.</p>
            <span className={styles.addr}>{linkedinHandle}</span>
            <div className={styles.links}>
              <a className={styles.btn} href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                Message on LinkedIn ↗
              </a>
              <a href={profile.github} target="_blank" rel="noopener noreferrer">
                GitHub ↗
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <span className="eyebrow">
          {profile.partNo} · Rev. {profile.revision} · {profile.issued}
        </span>
        <span className="eyebrow">Built with Next.js · Deployed by GitHub Actions</span>
      </footer>
    </div>
  );
}
