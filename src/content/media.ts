// Every photograph on the site, with provenance kept here in the source.
// All are NASA public-domain images, so no on-page credit is required.
// NASA imagery is generally not subject to copyright in the United States:
// https://www.nasa.gov/nasa-brand-center/images-and-media/
// Each photo ships as AVIF (static files in public/media, which the bundler
// cannot process yet), with the JPEG as the fallback.
import auroraLarge from "@/assets/media/aurora-2000.jpg";
import auroraSmall from "@/assets/media/aurora-1200.jpg";
import sunriseLarge from "@/assets/media/orbital-sunrise-2560.jpg";
import sunriseSmall from "@/assets/media/orbital-sunrise-1280.jpg";
import { publicPath } from "./paths";

type Source = { src: string; width: number; height: number };

export type Photo = {
  small: Source;
  large: Source;
  /** Same pixels as `small` and `large`, so they share those dimensions. */
  avif: { small: string; large: string };
  alt: string;
  credit: string;
  source: string;
};

export const orbitalSunrise: Photo = {
  small: sunriseSmall,
  large: sunriseLarge,
  avif: {
    small: publicPath("/media/orbital-sunrise-1280.avif"),
    large: publicPath("/media/orbital-sunrise-2560.avif"),
  },
  alt: "The thin blue line of Earth's atmosphere glowing at the first moment of an orbital sunrise, against black space.",
  credit: "NASA · ISS071-E-000922 · cropped",
  source: "https://images.nasa.gov/details/iss071e000922",
};

export const aurora: Photo = {
  small: auroraSmall,
  large: auroraLarge,
  avif: { small: publicPath("/media/aurora-1200.avif"), large: publicPath("/media/aurora-2000.avif") },
  alt: "A green aurora arcing over Earth's night-side horizon under a starry sky, with city lights below.",
  credit: "NASA · ISS066-E-023323",
  source: "https://images.nasa.gov/details/iss066e023323",
};

