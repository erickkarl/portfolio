import { describe, expect, it } from "vitest";
import { profile } from "@/content/profile";
import { buildJsonLd, seo, serializeJsonLd, SITE_URL } from "./seo";

describe("seo", () => {
  it("keeps the description within what Google shows", () => {
    expect(seo.description.length).toBeGreaterThan(70);
    expect(seo.description.length).toBeLessThanOrEqual(160);
  });

  it("leads the title with the name people search for", () => {
    expect(seo.title.startsWith(profile.name)).toBe(true);
    expect(seo.title.length).toBeLessThanOrEqual(60);
  });

  it("describes one person and links their profiles", () => {
    const graph = buildJsonLd()["@graph"];
    const person = graph.find((node) => node["@type"] === "Person") as Record<string, unknown>;
    expect(person.name).toBe(profile.name);
    expect(person.url).toBe(SITE_URL);
    expect(person.sameAs).toEqual([profile.linkedin, profile.github]);
  });

  it("cannot break out of its script tag", () => {
    expect(serializeJsonLd({ x: "</script><script>alert(1)</script>" })).not.toContain("<");
  });
});
