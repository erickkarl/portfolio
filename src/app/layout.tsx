import type { Metadata } from "next";
import { introBootScript } from "@/components/Intro/Intro";
import { profile } from "@/content/profile";
import { fontVariables } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: `${profile.name} · ${profile.role}`,
  description: profile.headline,
  openGraph: {
    title: profile.name,
    description: profile.headline,
    type: "profile",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // The boot script may set data-intro before hydration.
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introBootScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
