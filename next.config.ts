import type { NextConfig } from "next";

// GitHub Pages serves project sites under /<repo>. The deploy workflow sets
// PAGES_BASE_PATH; local dev and other hosts leave it empty.
const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
