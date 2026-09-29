import { profile } from "@/content/profile";

/** Canonical origin. Everything search engines see points here. */
export const SITE_URL = "https://erickkarl.dev";

/** Every name people might search for. */
export const NAME_VARIANTS = ["Erick Karl Volkert Alves", "Erick Karl", "Erick Volkert"];

export const seo = {
  title: `${profile.name} — ${profile.role}`,
  /** About 150 characters: the length Google shows in results. */
  description: `${profile.name} is a ${profile.role.toLowerCase()} in ${profile.location}, building web, mobile and cloud products with React, Next.js, Node.js, TypeScript and AWS.`,
  keywords: [
    profile.name,
    ...NAME_VARIANTS,
    profile.role,
    "Software Engineer São Paulo",
    "Full-stack developer",
    "Frontend engineer",
    "React developer",
    "Next.js developer",
    "React Native developer",
    "Node.js developer",
    "TypeScript",
    "AWS",
  ],
};

/**
 * schema.org structured data. Tells search engines this site is about one
 * person, and that the LinkedIn and GitHub profiles are the same person.
 */
export function buildJsonLd() {
  const technologies = profile.stack.flatMap((group) => group.items.map((tech) => tech.name));
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: profile.name,
        alternateName: NAME_VARIANTS,
        givenName: "Erick Karl",
        familyName: "Volkert",
        jobTitle: profile.role,
        description: seo.description,
        url: SITE_URL,
        image: `${SITE_URL}/opengraph-image.png`,
        email: `mailto:${profile.email}`,
        address: {
          "@type": "PostalAddress",
          addressLocality: "São Paulo",
          addressRegion: "SP",
          addressCountry: "BR",
        },
        worksFor: { "@type": "Organization", name: profile.company },
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: "Universidade Federal da Bahia",
          alternateName: "UFBA",
        },
        knowsAbout: technologies,
        sameAs: [profile.linkedin, profile.github],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: profile.name,
        inLanguage: "en",
        publisher: { "@id": `${SITE_URL}/#person` },
      },
      {
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/#profile`,
        url: SITE_URL,
        name: seo.title,
        mainEntity: { "@id": `${SITE_URL}/#person` },
        isPartOf: { "@id": `${SITE_URL}/#website` },
      },
    ],
  };
}

/** JSON for a <script> tag, with "<" escaped so content can never close it. */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
