// Single source of truth for everything the page shows.
// Edit this file to update the portfolio; components only render it.
import type { StaticImageData } from "next/image";
import awsLogo from "@/assets/tech/aws.svg";
import datadogLogo from "@/assets/tech/datadog.svg";
import djangoLogo from "@/assets/tech/django.svg";
import githubActionsLogo from "@/assets/tech/github-actions.svg";
import nestjsLogo from "@/assets/tech/nestjs.svg";
import nextjsLogo from "@/assets/tech/nextjs.svg";
import nodejsLogo from "@/assets/tech/nodejs.svg";
import pythonLogo from "@/assets/tech/python.svg";
import reactNativeLogo from "@/assets/tech/react-native.svg";
import reactLogo from "@/assets/tech/react.svg";
import reduxLogo from "@/assets/tech/redux.svg";
import sentryLogo from "@/assets/tech/sentry.svg";
import storybookLogo from "@/assets/tech/storybook.svg";
import typescriptLogo from "@/assets/tech/typescript.svg";
import vueLogo from "@/assets/tech/vue.svg";

export type Tech = {
  name: string;
  logo: StaticImageData | string;
  where: string;
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
  firstName: "Erick",
  role: "Senior Software Engineer",
  location: "São Paulo, Brazil",
  company: "Witek",
  headline:
    "I build web, mobile and cloud products with React, Next.js, Node, TypeScript and AWS.",
  linkedin: "https://www.linkedin.com/in/erick-kva",
  github: "https://github.com/erickkarl",

  about: [
    "I'm a senior software engineer at Witek, building software for several clients across six stacks. Most of my time goes to ONR, the national operator that runs Brazil's electronic property registration system for registry offices across the country, and to ON-RPCN, which is digitizing birth, death and marriage records nationwide.",
    "Before that I helped a bank take two apps from an empty repository to production, led its frontend team, and rebuilt a large sales app for Unilever in React Native.",
  ],

  focus: [
    "Full-stack delivery across React, Next.js, React Native, Vue, Django Ninja and NestJS",
    "Design systems in Storybook with clean, well-structured architecture",
    "Trunk-based development and continuous delivery on GitHub Actions",
    "AWS infrastructure: Amplify, Lambda, CloudFront, DynamoDB, KMS and more",
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
        { name: "React", logo: reactLogo, where: "Witek · Ourinvest" },
        { name: "Next.js", logo: nextjsLogo, where: "Witek · Ourinvest" },
        { name: "React Native", logo: reactNativeLogo, where: "Witek · Accenture" },
        { name: "TypeScript", logo: typescriptLogo, where: "Witek · Accenture" },
        { name: "Vue", logo: vueLogo, where: "Witek" },
        { name: "Storybook", logo: storybookLogo, where: "Ourinvest" },
        { name: "Redux-Saga", logo: reduxLogo, where: "Accenture" },
      ],
    },
    {
      title: "Backend",
      items: [
        { name: "Node.js", logo: nodejsLogo, where: "Witek" },
        { name: "NestJS", logo: nestjsLogo, where: "Witek" },
        { name: "Django Ninja", logo: djangoLogo, where: "Witek" },
        { name: "Python", logo: pythonLogo, where: "Witek" },
      ],
    },
    {
      title: "Cloud & delivery",
      items: [
        { name: "AWS", logo: awsLogo, where: "Ourinvest · Witek" },
        { name: "GitHub Actions", logo: githubActionsLogo, where: "Ourinvest" },
        { name: "Datadog", logo: datadogLogo, where: "Ourinvest" },
        { name: "Sentry", logo: sentryLogo, where: "Ourinvest" },
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
      tags: ["React Native", "TypeScript", "Redux-Saga", "Styled Components", "Salesforce SDK"],
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
