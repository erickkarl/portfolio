import type { Metadata } from "next";
import { profile } from "@/content/profile";
import { fontVariables } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: profile.name,
  description: `${profile.name}: ${profile.headline}`,
  openGraph: {
    title: profile.name,
    description: profile.headline,
    type: "profile",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={fontVariables}>
      <body>{children}</body>
    </html>
  );
}
