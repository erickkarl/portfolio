import type { IconifyJSON } from "@iconify/types";
import { getIconData, iconToSVG, replaceIDs } from "@iconify/utils";
import logos from "@iconify-json/logos/icons.json";
import solar from "@iconify-json/solar/icons.json";

// Solar (interface icons, CC BY 4.0, 480 Design) and SVG Logos (CC0).
// Rendered to inline SVG on the server, so no icon code ships to the browser.
const sets: Record<string, IconifyJSON> = {
  logos: logos as IconifyJSON,
  solar: solar as IconifyJSON,
};

type Props = {
  /** "prefix:name", e.g. "solar:arrow-right-up-linear" or "logos:react". */
  name: string;
  size?: number | string;
  className?: string;
  /** Accessible name. Omit for decorative icons next to visible text. */
  label?: string;
};

export function Icon({ name, size = "1em", className, label }: Props) {
  const [prefix, iconName] = name.split(":");
  const set = sets[prefix];
  const data = set ? getIconData(set, iconName) : null;
  if (!data) throw new Error(`Unknown icon "${name}"`);

  const { attributes, body } = iconToSVG(data, { height: size });

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      {...attributes}
      className={className}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
      dangerouslySetInnerHTML={{ __html: replaceIDs(body) }}
    />
  );
}
