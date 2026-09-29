import { Geist, Geist_Mono } from "next/font/google";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/** Class names that define the --font-* variables used by globals.css. */
export const fontVariables = `${geist.variable} ${geistMono.variable}`;
