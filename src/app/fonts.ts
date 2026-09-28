import { Allura, JetBrains_Mono, Public_Sans, Saira_Condensed } from "next/font/google";

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

// Handwriting face for the intro signature.
const allura = Allura({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "400",
});

/** Class names that define the --font-* variables used by globals.css. */
export const fontVariables = `${saira.variable} ${publicSans.variable} ${jetbrains.variable} ${allura.variable}`;
