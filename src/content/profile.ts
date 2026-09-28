// Single source of truth for everything the page shows.
// Edit this file to update the portfolio; components only render it.

export type Pin = {
  n: number;
  name: string;
  where: string;
  note: string;
};

export type Characteristic = {
  parameter: string;
  conditions: string;
  value: string;
  unit: string;
};

export type Role = {
  title: string;
  dates: string;
  summary?: string;
  highlights?: string[];
};

export type Revision = {
  rev: string;
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
  partNo: "EKV-2026",
  revision: "F",
  issued: "September 2026",
  headline:
    "Senior software engineer building web, mobile and cloud systems with React, Node, TypeScript and AWS.",
  facts: [
    { k: "Now", v: "Witek" },
    { k: "Based", v: "São Paulo, Brazil" },
    { k: "Trained", v: "Electrical Engineering, UFBA" },
  ],
  linkedin: "https://www.linkedin.com/in/erick-kva",
  github: "https://github.com/erickkarl",

  features: [
    "Full-stack delivery across React, Next.js, React Native, Vue, Django Ninja and NestJS",
    "Builds and maintains national registry platforms for ONR and ON-RPCN",
    "Took two banking apps from an empty repository to production",
    "Design systems in Storybook, clean code and well-structured architecture",
    "Trunk-based development with continuous delivery on GitHub Actions",
    "AWS infrastructure: Amplify, Lambda, CloudFront, DynamoDB, KMS and more",
    "Feature flags and monitoring with AppConfig, Datadog, Sentry and Mixpanel",
    "Frontend technical leadership and mentoring of junior developers",
    "Hardware roots: microcontroller drivers, PCB design and data analysis",
  ],

  applications: [
    { what: "Public registry infrastructure", where: "ONR · ON-RPCN" },
    { what: "Banking web apps", where: "Banco Ourinvest" },
    { what: "Field-sales mobile apps", where: "Unilever via Accenture" },
    { what: "Utility automation and analytics", where: "Coelba" },
    { what: "Embedded patient monitoring", where: "SENAI CIMATEC" },
  ],

  description: [
    "Erick is a senior software engineer at Witek, where he builds software for several clients across six stacks. Most of his time goes to ONR, the national operator that runs the electronic property registration system for registry offices across Brazil, and to ON-RPCN, which is digitizing birth, death and marriage records nationwide.",
    "He trained as an electrical engineer at UFBA and wrote his first production code as drivers for STM32 microcontrollers. From there he moved into automation and data work in the energy sector, then into mobile and web engineering full-time in 2021.",
  ],

  // DIP-14 pinout. Pins 1–7 run down the left side, 8–14 run up the right.
  pins: [
    { n: 1, name: "React", where: "Witek · Banco Ourinvest · Coelba", note: "His main UI library since 2018: an internal site at Coelba, both production apps at Banco Ourinvest, and client work at Witek." },
    { n: 2, name: "Next.js", where: "Witek · Banco Ourinvest", note: "Framework behind the two banking apps he took to production, and in client projects at Witek. This site is built with it too." },
    { n: 3, name: "React Native", where: "Witek · Accenture", note: "Rebuilt Unilever's local sales app at Accenture, cutting memory-heavy work. Mobile projects at Witek." },
    { n: 4, name: "TypeScript", where: "Witek · Accenture", note: "Typed codebases from the Unilever refactor onward." },
    { n: 5, name: "Vue", where: "Witek", note: "Client projects at Witek." },
    { n: 6, name: "Storybook", where: "Banco Ourinvest", note: "Built the design system that kept two apps consistent and sped up UI work." },
    { n: 7, name: "Redux-Saga", where: "Accenture", note: "State and side effects in the Unilever sales app, alongside Styled Components and the Salesforce SDK." },
    { n: 8, name: "Node.js", where: "Witek · Coelba", note: "Express and MongoDB site at Coelba; Node services in client work at Witek." },
    { n: 9, name: "NestJS", where: "Witek", note: "Back-end services for Witek clients." },
    { n: 10, name: "Django Ninja", where: "Witek", note: "Python APIs for Witek clients." },
    { n: 11, name: "Python", where: "Coelba · Witek", note: "Automation with Selenium, PyAutoGUI and pywinauto at Coelba. Passed the LinkedIn Python skill assessment." },
    { n: 12, name: "SQL", where: "Coelba", note: "Data work behind choosing targets for fraud inspections." },
    { n: 13, name: "AWS", where: "Banco Ourinvest · Witek", note: "Ran Amplify, S3, Lambda, CloudFront, Route 53, DynamoDB, KMS, CloudWatch, Secrets Manager and AppConfig in production." },
    { n: 14, name: "GitHub Actions", where: "Banco Ourinvest", note: "Automated deploys for trunk-based development and continuous delivery. This site deploys the same way." },
  ] satisfies Pin[],

  characteristics: [
    { parameter: "Professional software experience", conditions: "Full-time since Oct 2021", value: "5", unit: "years" },
    { parameter: "First production code", conditions: "STM32 drivers, SENAI CIMATEC", value: "2017", unit: "year" },
    { parameter: "Stacks in active use", conditions: "Client work at Witek", value: "6", unit: "stacks" },
    { parameter: "Apps taken from scratch to production", conditions: "Banco Ourinvest", value: "2", unit: "apps" },
    { parameter: "AWS services run in production", conditions: "Banco Ourinvest", value: "10", unit: "services" },
    { parameter: "Backlog cleared by automation", conditions: "Collection letters, Coelba", value: "6", unit: "months" },
    { parameter: "Throughput increase", conditions: "Same project", value: ">100", unit: "%" },
  ] satisfies Characteristic[],

  revisions: [
    {
      rev: "F",
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
            "Delivers development and maintenance for several businesses, fitting each client's needs across React, Next.js, React Native, Vue, Django Ninja and NestJS.",
          highlights: [
            "Primary focus: designing, building and maintaining software for ONR, the national operator of Brazil's electronic property registration system, which provides the technology that registry offices across the country run on.",
            "Also serves ON-RPCN, Brazil's national operator for civil registry, digitizing birth, death, marriage and related records.",
          ],
        },
      ],
      tags: ["React", "Next.js", "React Native", "Vue", "Django Ninja", "NestJS", "AWS"],
    },
    {
      rev: "E",
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
      rev: "D",
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
      tags: ["React Native", "TypeScript", "Redux-Saga", "Styled Components", "Salesforce SDK"],
    },
    {
      rev: "C",
      company: "Coelba",
      dates: "Oct 2018 – Oct 2020",
      place: "Salvador, Bahia",
      meta: "Internship · 2 years 1 month",
      roles: [
        {
          title: "Electrical Engineering Intern, Commercial Losses",
          dates: "Oct 2018 – Oct 2020",
          highlights: [
            "Led a project automating collection letters that cleared a six-month backlog and more than doubled throughput.",
            "Selected targets for technical inspections to detect energy fraud.",
            "Automated processes with Python (Selenium, PyAutoGUI, pywinauto) and VBA.",
            "Worked with SQL databases and built dashboards in Excel.",
            "Built a website with React and Node.js (Express, MongoDB).",
            "Used SAP tools; data science and big data work.",
          ],
        },
      ],
      tags: ["Python", "SQL", "VBA", "React", "Express", "MongoDB"],
    },
    {
      rev: "B",
      company: "SENAI CIMATEC",
      dates: "Jul 2017 – Dec 2017",
      place: "Salvador, Bahia",
      meta: "Internship · 6 months",
      roles: [
        {
          title: "Microelectronics Intern",
          dates: "Jul 2017 – Dec 2017",
          highlights: [
            "Hospital bed patient-monitoring project.",
            "Drivers for STM32Fx and STM32Lx microcontrollers (USART, I2C, SPI).",
            "Applications for several types of sensors, and a web server for controller-to-PC communication.",
            "PCB design.",
          ],
        },
      ],
      tags: ["STM32", "USART", "I2C", "SPI", "PCB design"],
    },
    {
      rev: "A",
      company: "UFBA",
      dates: "2015 – 2021",
      place: "Salvador, Bahia",
      meta: "Electrical, Electronics and Communications Engineering · Universidade Federal da Bahia",
      roles: [{ title: "Bachelor of Engineering", dates: "2015 – 2021" }],
      tags: [],
    },
  ] satisfies Revision[],
};

export type Profile = typeof profile;
