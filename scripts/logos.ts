// Writes every technology logo the site shows to public/logos, one SVG each.
// The page then loads them as plain images: cached, lazy, and out of the HTML,
// where twenty inlined logos were most of the page's weight.
//
// Run with `pnpm logos` after changing the stack in src/content/profile.ts.
// The generated files are committed; a test fails if one is missing.
//
// Sources: SVG Logos and Simple Icons through Iconify, both CC0.
import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import type { IconifyJSON } from "@iconify/types";
import { getIconData } from "@iconify/utils";
import { logoFile, profile } from "../src/content/profile.ts";

const require = createRequire(import.meta.url);
const sets: Record<string, IconifyJSON> = {
  logos: require("@iconify-json/logos/icons.json"),
  "simple-icons": require("@iconify-json/simple-icons/icons.json"),
};

/** Single-color marks are drawn in the page's ink color. */
const INK = "#f2f0ea";
const outDir = new URL("../public/logos/", import.meta.url);

mkdirSync(outDir, { recursive: true });
for (const file of readdirSync(outDir)) rmSync(new URL(file, outDir));

const names = new Set(profile.stack.flatMap((group) => group.items.map((tech) => tech.logo)));
for (const name of names) {
  const [prefix, iconName] = name.split(":");
  const data = sets[prefix] && getIconData(sets[prefix], iconName);
  if (!data) throw new Error(`Unknown logo "${name}"`);

  // Center each mark in a square, so every logo lays out at the same size.
  const { left = 0, top = 0, width = 16, height = 16 } = data;
  const side = Math.max(width, height);
  const viewBox = [left - (side - width) / 2, top - (side - height) / 2, side, side].join(" ");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}">${data.body.replaceAll("currentColor", INK)}</svg>\n`;

  writeFileSync(new URL(logoFile(name), outDir), svg);
}
console.log(`Wrote ${names.size} logos to public/logos`);
