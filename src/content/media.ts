// Every photograph on the site, with provenance.
// NASA imagery is generally not subject to copyright in the United States:
// https://www.nasa.gov/nasa-brand-center/images-and-media/
// ESO imagery is CC BY 4.0; its credit line must be shown unaltered:
// https://www.eso.org/public/copyright/
import auroraLarge from "@/assets/media/aurora-2000.jpg";
import auroraSmall from "@/assets/media/aurora-1200.jpg";
import milkyWayLarge from "@/assets/media/milky-way-2200.jpg";
import milkyWaySmall from "@/assets/media/milky-way-1200.jpg";
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

export const milkyWay: Photo = {
  small: milkyWaySmall,
  large: milkyWayLarge,
  alt: "",
  caption: "The Milky Way, photographed as a full-sky panorama.",
  credit: "ESO/S. Brunier",
  source: "https://www.eso.org/public/images/eso0932a/",
};
