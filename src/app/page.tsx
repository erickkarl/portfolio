import { Experience } from "@/components/Experience/Experience";
import { Intro } from "@/components/Intro/Intro";
import { SectionHeading } from "@/components/SectionHeading/SectionHeading";
import { TechStack } from "@/components/TechStack/TechStack";
import { profile } from "@/content/profile";
import styles from "./page.module.css";

const nav = [
  { href: "#about", label: "About" },
  { href: "#stack", label: "Stack" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export default function Home() {
  const linkedinHandle = profile.linkedin.replace("https://www.", "");

  return (
    <>
      <Intro text={profile.intro.text} tagline={profile.intro.tagline} />

      <div className={styles.page}>
        <header className={styles.header}>
          <a href="#top" className={styles.signature} aria-label={`${profile.name}, back to top`}>
            <span className={styles.prompt}>&gt;</span> {profile.firstName.toLowerCase()}
            <span className={styles.caret} aria-hidden="true" />
          </a>
          <nav aria-label="Sections">
            <ul className={styles.nav}>
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        </header>

        <main id="top">
          <section className={styles.hero} aria-labelledby="name">
            <p className="eyebrow">
              {profile.role} · {profile.location}
            </p>
            <h1 id="name" className={styles.name}>
              {profile.name}
            </h1>
            <p className={styles.lede}>{profile.headline}</p>
            <div className={styles.actions}>
              <a className={styles.btn} href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn ↗
              </a>
              <a className={styles.btnGhost} href={profile.github} target="_blank" rel="noopener noreferrer">
                GitHub ↗
              </a>
              <span className={styles.now}>
                <span className={styles.dot} aria-hidden="true" />
                Now at {profile.company}
              </span>
            </div>
          </section>

          <section id="about" className={styles.section} aria-labelledby="h-about">
            <SectionHeading eyebrow="About" id="h-about" title="Products people rely on every day" />
            <div className={styles.aboutGrid}>
              <div className={styles.prose}>
                {profile.about.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
                <ul className={styles.domains}>
                  {profile.domains.map((d) => (
                    <li key={d.what}>
                      <span>{d.what}</span>
                      <span>{d.where}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className={styles.subhead}>What I do</h3>
                <ul className={styles.focus}>
                  {profile.focus.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section id="stack" className={styles.section} aria-labelledby="h-stack">
            <SectionHeading eyebrow="Stack" id="h-stack" title="Technologies I work with" />
            <TechStack groups={profile.stack} />
          </section>

          <section id="experience" className={styles.section} aria-labelledby="h-exp">
            <SectionHeading eyebrow="Experience" id="h-exp" title="Where I've shipped" />
            <Experience
              jobs={profile.experience}
              footnotes={[
                { label: "Earlier", line: profile.earlier },
                { label: "Education", line: profile.education },
              ]}
            />
          </section>

          <section id="contact" className={styles.section} aria-labelledby="h-contact">
            <SectionHeading eyebrow="Contact" id="h-contact" title="Let's talk" />
            <div className={styles.contact}>
              <p>Based in {profile.location} and working remotely. The fastest way to reach me is on LinkedIn.</p>
              <span className={styles.addr}>{linkedinHandle}</span>
              <div className={styles.actions}>
                <a className={styles.btn} href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                  Message me on LinkedIn ↗
                </a>
                <a className={styles.btnGhost} href={profile.github} target="_blank" rel="noopener noreferrer">
                  GitHub ↗
                </a>
              </div>
            </div>
          </section>
        </main>

        <footer className={styles.footer}>
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <span>Built with Next.js · Deployed by GitHub Actions</span>
        </footer>
      </div>
    </>
  );
}
