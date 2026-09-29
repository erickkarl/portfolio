import type { Metadata, Viewport } from "next";
import { introBootScript } from "@/components/Intro/Intro";
import { profile } from "@/content/profile";
import { buildJsonLd, SITE_URL, seo, serializeJsonLd } from "@/content/seo";
import { fontVariables } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: seo.title,
  description: seo.description,
  keywords: seo.keywords,
  authors: [{ name: profile.name, url: SITE_URL }],
  creator: profile.name,
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: profile.name,
    title: seo.title,
    description: seo.description,
    locale: "en_US",
    firstName: "Erick Karl",
    lastName: "Volkert",
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#030407",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // The boot script may set data-intro before hydration.
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introBootScript }} />
        {/* Structured data: who this site is about, for search engines. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildJsonLd()) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
