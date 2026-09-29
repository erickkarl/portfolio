import type { IconifyJSON } from "@iconify/types";
import { getIconData, iconToSVG, replaceIDs } from "@iconify/utils";
import logos from "@iconify-json/logos/icons.json";
import simpleIcons from "@iconify-json/simple-icons/icons.json";
import tabler from "@iconify-json/tabler/icons.json";

// Tabler (interface icons, MIT), SVG Logos (CC0) and Simple Icons (CC0;
// single-color brand marks drawn with currentColor). None needs on-page credit.
// Rendered to inline SVG on the server, so no icon code ships to the browser.
const sets: Record<string, IconifyJSON> = {
  logos: logos as IconifyJSON,
  "simple-icons": simpleIcons as IconifyJSON,
  tabler: tabler as IconifyJSON,
};

type Props = {
  /** "prefix:name", e.g. "tabler:arrow-up-right" or "logos:react". */
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
