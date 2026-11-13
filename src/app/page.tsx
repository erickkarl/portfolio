import type { CSSProperties, ReactNode } from "react";
import { CopyEmail } from "@/components/CopyEmail/CopyEmail";
import { Experience } from "@/components/Experience/Experience";
import { Icon } from "@/components/Icon/Icon";
import { Intro } from "@/components/Intro/Intro";
import { LocalTime } from "@/components/LocalTime/LocalTime";
import { Motion } from "@/components/Motion/Motion";
import { Photo } from "@/components/Photo/Photo";
import { SpaceField } from "@/components/SpaceField/SpaceField";
import { SplitWords } from "@/components/SplitWords/SplitWords";
import { TechStack } from "@/components/TechStack/TechStack";
import { aurora, orbitalSunrise } from "@/content/media";
import { profile } from "@/content/profile";
import styles from "./page.module.css";

const nav = [
  { href: "#who", label: "Who I am" },
  { href: "#about", label: "What I do" },
  { href: "#stack", label: "Stack" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

/** Delay of a hero piece's entrance, in ms after the intro leaves. */
const after = (ms: number) => ({ "--d": ms }) as CSSProperties;

/**
 * A section of the page: its name sits in the margin column and stays in
 * view while the content beside it is read. `wide` content spans both
 * columns and lays out its own margin notes (see Experience).
 */
function Section({
  id,
  label,
  wide,
  children,
}: {
  id: string;
  label: string;
  wide?: boolean;
  children: ReactNode;
}) {
  return (
    <section id={id} className={styles.section} aria-labelledby={`h-${id}`}>
      <div className={styles.grid}>
        <h2 id={`h-${id}`} className={`mono ${styles.label}`}>
          {label}
        </h2>
        <div className={wide ? styles.wide : styles.content}>{children}</div>
      </div>
    </section>
  );
}

function External({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a className="link" href={href} target="_blank" rel="noopener noreferrer">
      {children} <Icon name="tabler:arrow-up-right" size="0.8em" />
    </a>
  );
}

export default function Home() {
  return (
    <>
      <Intro text={profile.intro.text} tagline={profile.intro.tagline} />
      <Motion />
      <SpaceField />

      <header className={styles.header}>
        <a href="#top" className={styles.brand} aria-label={`${profile.name}, back to top`}>
          <span className={styles.prompt}>&gt;</span>
          {profile.firstName.toLowerCase()}
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
        {/* Hero: the first moment of an orbital sunrise. */}
        <section className={styles.hero} aria-labelledby="name">
          {/* Earth's night side blocks the stars behind it. The shape traces the
              photo's horizon in the photo's own coordinates (slice = cover). */}
          <div className={styles.heroLayer} data-hero="media" aria-hidden="true">
            <div className={styles.heroParallax}>
              <svg viewBox="0 0 1000 562" preserveAspectRatio="xMidYMid slice" className={styles.earthSvg}>
                <path d="M0 374 Q430 336 1000 398 L1000 562 L0 562 Z" />
              </svg>
            </div>
          </div>
          <div className={`${styles.heroLayer} ${styles.heroMedia}`} data-hero="media">
            <div className={styles.heroParallax}>
              <Photo photo={orbitalSunrise} className={styles.heroImg} priority />
            </div>
          </div>

          <div className={styles.heroContent}>
            <h1 id="name" className={styles.name} data-hero="title">
              <SplitWords text={profile.name} />
            </h1>
            <p className={styles.lede} data-hero="lede" style={after(450)}>
              {profile.headline}
            </p>
            <p className={styles.links} data-hero="links" style={after(600)}>
              <a className="link" href="#contact">
                Get in touch
              </a>
              <External href={profile.linkedin}>LinkedIn</External>
              <External href={profile.github}>GitHub</External>
            </p>
          </div>

          <p className={`mono ${styles.heroFoot}`} data-hero="foot" style={after(1100)}>
            <span>{profile.place.coordinates}</span>
            <span>
              {profile.place.city}, <LocalTime timeZone={profile.place.timeZone} />
            </span>
          </p>
        </section>

        <Section id="who" label="Who I am">
          <p className={styles.statement} data-reveal>
            {profile.story.title}
          </p>
          <div className={styles.prose} data-reveal>
            {profile.story.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
          <div data-reveal>
            <h3 className={`mono ${styles.sublabel}`}>Things I love</h3>
            <ul className={styles.likes}>
              {profile.story.likes.map((like) => (
                <li key={like.label}>
                  <span aria-hidden="true">{like.emoji}</span> {like.label}
                </li>
              ))}
            </ul>
          </div>
        </Section>

        <Section id="about" label="What I do">
          <p className={styles.statement} data-reveal>
            {profile.statement}
          </p>
          <div className={styles.prose} data-reveal>
            {profile.about.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
          <div className={styles.lists}>
            <div data-reveal>
              <h3 className={`mono ${styles.sublabel}`}>Day to day</h3>
              <ul className={styles.rows}>
                {profile.focus.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
            <div data-reveal>
              <h3 className={`mono ${styles.sublabel}`}>Where it runs</h3>
              <dl className={styles.rows}>
                {profile.domains.map((d) => (
                  <div key={d.what}>
                    <dt>{d.what}</dt>
                    <dd className="mono">{d.where}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Section>

        <Section id="stack" label="Stack" wide>
          <div data-reveal>
            <TechStack groups={profile.stack} />
          </div>
        </Section>

        <Section id="experience" label="Experience" wide>
          <Experience
            jobs={profile.experience}
            footnotes={[
              { label: "Earlier", line: profile.earlier },
              { label: "Education", line: profile.education },
            ]}
          />
        </Section>

        {/* Closing: the night side, lit by an aurora. */}
        <section id="contact" className={styles.contact} aria-labelledby="h-contact">
          <div className={styles.contactMedia}>
            <Photo photo={aurora} className={styles.contactImg} />
          </div>
          <div className={`${styles.grid} ${styles.contactGrid}`}>
            <h2 id="h-contact" className={`mono ${styles.label}`}>
              Contact
            </h2>
            <div className={styles.content}>
              <p className={styles.contactText} data-reveal>
                I&apos;m in {profile.place.city} and work remotely. The best way to reach me is email:
              </p>
              <div data-reveal>
                <CopyEmail
                  email={profile.email}
                  copyIcon={<Icon name="tabler:copy" />}
                  doneIcon={<Icon name="tabler:check" />}
                />
              </div>
              <p className={styles.links} data-reveal>
                <External href={profile.linkedin}>LinkedIn</External>
                <External href={profile.github}>GitHub</External>
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={`mono ${styles.footerInner}`}>
          <span>
            © {new Date().getFullYear()} {profile.name}
          </span>
          <External href={profile.repo}>Source</External>
        </div>
      </footer>
    </>
  );
}
