import { JetBrains_Mono, Public_Sans, Saira_Condensed } from "next/font/google";

const saira = Saira_Condensed({
  variable: "--font-saira",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

/** Class names that define the --font-* variables used by globals.css. */
export const fontVariables = `${saira.variable} ${publicSans.variable} ${jetbrains.variable}`;
