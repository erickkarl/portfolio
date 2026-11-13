import { JetBrains_Mono, Newsreader } from "next/font/google";

// Two voices: a serif for everything a person says, and the monospace of a
// terminal for the prompt, dates and labels. The serif loads without its
// optical-size axis: with it the file is almost four times the size.
const serif = Newsreader({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

/** Class names that define the --font-* variables used by globals.css. */
export const fontVariables = `${serif.variable} ${mono.variable}`;
