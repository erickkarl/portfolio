import { Experience } from "@/components/Experience/Experience";
import { Icon } from "@/components/Icon/Icon";
import { Intro } from "@/components/Intro/Intro";
import { Motion } from "@/components/Motion/Motion";
import { Photo } from "@/components/Photo/Photo";
import { SectionHeading } from "@/components/SectionHeading/SectionHeading";
import { SpaceField } from "@/components/SpaceField/SpaceField";
import { SplitWords } from "@/components/SplitWords/SplitWords";
import { TechStack } from "@/components/TechStack/TechStack";
import { aurora, orbitalSunrise } from "@/content/media";
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
      <Motion />
      <SpaceField />

      <header className={styles.header}>
        <a href="#top" className={styles.brand} aria-label={`${profile.name}, back to top`}>
          <span className={styles.prompt}>&gt;</span>
          {profile.firstName.toLowerCase()}
          <span className={styles.caret} aria-hidden="true" />
        </a>
        <nav aria-label="Sections" className={styles.navBar}>
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
        {/* Hero — the first moment of an orbital sunrise. */}
        <section className={styles.hero} aria-labelledby="name" data-hero-section>
          {/* Earth's night side blocks the stars behind it. The shape traces the
              photo's horizon in the photo's own coordinates (slice = cover). */}
          <div className={`${styles.heroLayer} ${styles.earthShadow}`} data-hero="media" aria-hidden="true">
            <div className={styles.heroParallax} data-parallax>
              <svg viewBox="0 0 1000 562" preserveAspectRatio="xMidYMid slice" className={styles.earthSvg}>
                <path d="M0 374 Q430 336 1000 398 L1000 562 L0 562 Z" />
              </svg>
            </div>
          </div>
          <div className={`${styles.heroLayer} ${styles.heroMedia}`} data-hero="media">
            <div className={styles.heroParallax} data-parallax>
              <Photo photo={orbitalSunrise} className={styles.heroImg} priority />
            </div>
          </div>

          <div className={styles.heroContent}>
            <p className="eyebrow" data-hero="eyebrow">
              {profile.role} · {profile.location}
            </p>
            <h1 id="name" className={styles.name} data-hero="title">
              <SplitWords text={profile.name} />
            </h1>
            <p className={styles.lede} data-hero="lede">
              {profile.headline}
            </p>
            <div className={styles.actions} data-hero="actions">
              <a className={styles.btnPrimary} href="#contact">
                Get in touch
              </a>
              <a className={styles.btnSecondary} href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn <Icon name="solar:arrow-right-up-linear" />
              </a>
              <a className={styles.btnSecondary} href={profile.github} target="_blank" rel="noopener noreferrer">
                GitHub <Icon name="solar:arrow-right-up-linear" />
              </a>
            </div>
          </div>

          <p className={styles.heroCaption} data-hero="caption">
            <span className={styles.status}>
              <span className={styles.statusDot} aria-hidden="true" />
              Now at {profile.company}
            </span>
            <span className={styles.credit}>
              {orbitalSunrise.caption} <a href={orbitalSunrise.source}>{orbitalSunrise.credit}</a>
            </span>
          </p>
        </section>

        <section id="about" className={styles.section} aria-labelledby="h-about">
          <div className={styles.inner}>
            <p className="eyebrow" data-reveal>
              About
            </p>
            <h2 id="h-about" className={styles.statement} data-reveal-heading>
              <SplitWords text={profile.statement} />
            </h2>
            <div className={styles.aboutGrid}>
              <div className={styles.prose} data-reveal>
                {profile.about.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>
              <div className={styles.aboutAside}>
                <div data-reveal>
                  <h3 className={styles.subhead}>What I do</h3>
                  <ul className={styles.focus}>
                    {profile.focus.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                </div>
                <div data-reveal>
                  <h3 className={styles.subhead}>Where it runs</h3>
                  <dl className={styles.domains}>
                    {profile.domains.map((d) => (
                      <div key={d.what}>
                        <dt>{d.what}</dt>
                        <dd>{d.where}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="stack" className={styles.section} aria-labelledby="h-stack">
          <div className={styles.inner}>
            <SectionHeading eyebrow="Stack" id="h-stack" title="The tools I reach for" />
            <TechStack groups={profile.stack} />
          </div>
        </section>

        <section id="experience" className={styles.section} aria-labelledby="h-exp">
          <div className={styles.inner}>
            <SectionHeading eyebrow="Experience" id="h-exp" title="Trajectory so far" />
            <Experience
              jobs={profile.experience}
              footnotes={[
                { label: "Earlier", line: profile.earlier },
                { label: "Education", line: profile.education },
              ]}
            />
          </div>
        </section>

        {/* Closing — the night side, lit by an aurora. */}
        <section id="contact" className={styles.contact} aria-labelledby="h-contact">
          <div className={styles.contactMedia}>
            <Photo photo={aurora} className={styles.contactImg} />
          </div>
          <div className={styles.contactInner}>
            <p className="eyebrow" data-reveal>
              Contact
            </p>
            <h2 id="h-contact" className={styles.contactTitle} data-reveal-heading>
              <SplitWords text="Let's build what's next." />
            </h2>
            <p className={styles.contactText} data-reveal>
              Based in {profile.location} and working remotely. The fastest way to reach me is on LinkedIn.
            </p>
            <div className={styles.actions} data-reveal>
              <a className={styles.btnPrimary} href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                Message me on LinkedIn <Icon name="solar:arrow-right-up-linear" />
              </a>
              <a className={styles.btnSecondary} href={profile.github} target="_blank" rel="noopener noreferrer">
                GitHub <Icon name="solar:arrow-right-up-linear" />
              </a>
            </div>
            <p className={styles.handle} data-reveal>
              {linkedinHandle}
            </p>
          </div>
          <p className={styles.contactCredit}>
            {aurora.caption} <a href={aurora.source}>{aurora.credit}</a>
          </p>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <span>
            © {new Date().getFullYear()} {profile.name}
          </span>
          <span>
            Photographs: NASA, public domain. Icons:{" "}
            <a href="https://www.figma.com/community/file/1166831539721848736">Solar</a> by 480 Design (CC BY 4.0) and{" "}
            <a href="https://github.com/gilbarbara/logos">SVG Logos</a> (CC0). Built with Next.js, GSAP and Lenis.
          </span>
        </div>
      </footer>
    </>
  );
}
