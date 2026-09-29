// Every photograph on the site, with provenance.
// NASA imagery is generally not subject to copyright in the United States:
// https://www.nasa.gov/nasa-brand-center/images-and-media/
import auroraLarge from "@/assets/media/aurora-2000.jpg";
import auroraSmall from "@/assets/media/aurora-1200.jpg";
import sunriseLarge from "@/assets/media/orbital-sunrise-2560.jpg";
import sunriseSmall from "@/assets/media/orbital-sunrise-1280.jpg";

export type Photo = {
  small: { src: string; width: number; height: number };
  large: { src: string; width: number; height: number };
  alt: string;
  caption: string;
  credit: string;
  source: string;
};

export const orbitalSunrise: Photo = {
  small: sunriseSmall,
  large: sunriseLarge,
  alt: "The thin blue line of Earth's atmosphere glowing at the first moment of an orbital sunrise, against black space.",
  caption: "Orbital sunrise over the Pacific, seen from the International Space Station.",
  credit: "NASA · ISS071-E-000922 · cropped",
  source: "https://images.nasa.gov/details/iss071e000922",
};

export const aurora: Photo = {
  small: auroraSmall,
  large: auroraLarge,
  alt: "A green aurora arcing over Earth's night-side horizon under a starry sky, with city lights below.",
  caption: "Aurora over Montana, seen from the International Space Station.",
  credit: "NASA · ISS066-E-023323",
  source: "https://images.nasa.gov/details/iss066e023323",
};
