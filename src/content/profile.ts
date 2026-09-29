// Single source of truth for everything the page shows.
// Edit this file to update the portfolio; components only render it.

export type Tech = {
  name: string;
  /**
   * Iconify name of the technology's official mark. Full-color "logos:" marks
   * where they read on a dark card; the brand's single-color mark from
   * "simple-icons:" (shown in white) where the official mark is dark ink.
   */
  logo: string;
  /** Brand color, used for the pill's glow. */
  color: string;
};

export type TechGroup = {
  title: string;
  items: Tech[];
};

export type Role = {
  title: string;
  dates: string;
  summary?: string;
  highlights?: string[];
};

export type Job = {
  company: string;
  dates: string;
  place: string;
  meta: string;
  current?: boolean;
  roles: Role[];
  tags: string[];
};

export const profile = {
  name: "Erick Karl Volkert",
  /** Typed out by the intro, with the tagline fading in below. */
  intro: { text: "Erick Karl", tagline: "Software Engineer" },
  firstName: "Erick",
  role: "Senior Software Engineer",
  location: "São Paulo, Brazil",
  company: "Witek",
  headline:
    "I build web, mobile and cloud products with React, Next.js, Node, TypeScript and AWS.",
  email: "erickkarl5@gmail.com",
  linkedin: "https://www.linkedin.com/in/erick-kva",
  github: "https://github.com/erickkarl",

  /** One line that sums up the work; shown large at the top of About. */
  statement: "I build software that registry offices, banks and field teams rely on every day.",

  about: [
    "I'm a senior software engineer at Witek, building software for several clients across six stacks. Most of my time goes to ONR, the national operator that runs Brazil's electronic property registration system for registry offices across the country, and to ON-RPCN, which is digitizing birth, death and marriage records nationwide.",
    "Before that I helped a bank take two apps from an empty repository to production, led its frontend team, and rebuilt a large sales app for Unilever in React Native.",
  ],

  focus: [
    "Full-stack delivery across React, Next.js, React Native, Vue, Django Ninja and NestJS",
    "Design systems in Storybook with clean, well-structured architecture",
    "Trunk-based development and continuous delivery on GitHub Actions",
    "AWS infrastructure: Amplify, Lambda, CloudFront, DynamoDB, KMS and more",
    "SQL and NoSQL data with PostgreSQL, MongoDB and DynamoDB; containers with Docker and Kubernetes",
    "Feature flags and monitoring with AppConfig, Datadog, Sentry and Mixpanel",
    "Frontend technical leadership and mentoring",
  ],

  domains: [
    { what: "Public registry platforms", where: "ONR · ON-RPCN" },
    { what: "Banking web apps", where: "Banco Ourinvest" },
    { what: "Field-sales mobile apps", where: "Unilever via Accenture" },
  ],

  stack: [
    {
      title: "Frontend & mobile",
      items: [
        { name: "React", logo: "logos:react", color: "#61DAFB" },
        { name: "Next.js", logo: "simple-icons:nextdotjs", color: "#FFFFFF" },
        { name: "React Native", logo: "logos:react", color: "#61DAFB" },
        { name: "TypeScript", logo: "logos:typescript-icon", color: "#3178C6" },
        { name: "Vue", logo: "logos:vue", color: "#42B883" },
        { name: "Tailwind CSS", logo: "logos:tailwindcss-icon", color: "#38BDF8" },
        { name: "Redux Toolkit", logo: "logos:redux", color: "#764ABC" },
        { name: "Storybook", logo: "logos:storybook-icon", color: "#FF4785" },
      ],
    },
    {
      title: "Backend",
      items: [
        { name: "Node.js", logo: "logos:nodejs-icon", color: "#5FA04E" },
        { name: "Express", logo: "simple-icons:express", color: "#FFFFFF" },
        { name: "NestJS", logo: "logos:nestjs", color: "#E0234E" },
        { name: "Django Ninja", logo: "simple-icons:django", color: "#44B78B" },
        { name: "Python", logo: "logos:python", color: "#3776AB" },
      ],
    },
    {
      title: "Data · SQL & NoSQL",
      items: [
        { name: "PostgreSQL", logo: "logos:postgresql", color: "#4169E1" },
        { name: "MongoDB", logo: "logos:mongodb-icon", color: "#47A248" },
        { name: "DynamoDB", logo: "logos:aws-dynamodb", color: "#4053D6" },
      ],
    },
    {
      title: "Cloud & delivery",
      items: [
        { name: "AWS", logo: "simple-icons:amazonwebservices", color: "#FF9900" },
        { name: "Docker", logo: "logos:docker-icon", color: "#2496ED" },
        { name: "Kubernetes", logo: "logos:kubernetes", color: "#326CE5" },
        { name: "GitHub Actions", logo: "logos:github-actions", color: "#2088FF" },
        { name: "Datadog", logo: "logos:datadog-icon", color: "#7C4DDB" },
        { name: "Sentry", logo: "simple-icons:sentry", color: "#A78BFA" },
      ],
    },
  ] satisfies TechGroup[],

  experience: [
    {
      company: "Witek",
      dates: "May 2024 – now",
      place: "São Paulo · Remote",
      meta: "Full-stack development · Full-time",
      current: true,
      roles: [
        {
          title: "Senior Software Engineer",
          dates: "May 2024 – now",
          summary:
            "Development and maintenance for several businesses, fitting each client's needs across React, Next.js, React Native, Vue, Django Ninja and NestJS.",
          highlights: [
            "Primary focus: designing, building and maintaining software for ONR, the national operator of Brazil's electronic property registration system, which provides the technology that registry offices across the country run on.",
            "Also serving ON-RPCN, Brazil's national operator for civil registry, digitizing birth, death, marriage and related records.",
          ],
        },
      ],
      tags: ["React", "Next.js", "React Native", "Vue", "Django Ninja", "NestJS", "AWS"],
    },
    {
      company: "Banco Ourinvest",
      dates: "Mar 2022 – May 2024",
      place: "São Paulo · Hybrid",
      meta: "Full-time · 2 years 3 months",
      roles: [
        {
          title: "Senior Frontend Developer",
          dates: "Jul 2023 – May 2024",
          summary:
            "Helped build two applications from the ground up, infrastructure included. Both are live.",
          highlights: [
            "Web apps in React and Next.js, with a shared design system in Storybook.",
            "Trunk-based development and continuous delivery, with deploys automated through GitHub Actions.",
            "Infrastructure on Amplify, S3, Lambda, CloudFront, Route 53, DynamoDB, KMS, CloudWatch, Secrets Manager and AppConfig.",
            "Feature flags and tagging, with performance tracked in Datadog, Sentry, AppConfig and Mixpanel to guide product decisions.",
            "Frontend technical lead for the team; mentored junior developers.",
          ],
        },
        {
          title: "Frontend Developer",
          dates: "Mar 2022 – Jul 2023",
          summary: "Frontend development with React.",
        },
      ],
      tags: ["React", "Next.js", "Storybook", "AWS", "GitHub Actions", "Datadog", "Sentry"],
    },
    {
      company: "Accenture",
      dates: "Oct 2021 – Mar 2022",
      place: "Salvador · Remote",
      meta: "Full-time · 6 months",
      roles: [
        {
          title: "React Native Developer",
          dates: "Oct 2021 – Mar 2022",
          summary:
            "Key contributor to the complete refactor of Unilever's local sales app. Made memory-heavy tasks more efficient and kept the code as clean as possible, leaving the app faster and smoother to use.",
        },
      ],
      tags: ["React Native", "TypeScript", "Redux", "Styled Components", "Salesforce SDK"],
    },
  ] satisfies Job[],

  // Kept deliberately short: one line each, no highlights.
  earlier: { dates: "2017 – 2020", text: "Engineering internships at SENAI CIMATEC and Coelba." },
  education: {
    dates: "2015 – 2021",
    text: "B.Eng. in Electrical Engineering, Universidade Federal da Bahia (UFBA).",
  },
};

export type Profile = typeof profile;
