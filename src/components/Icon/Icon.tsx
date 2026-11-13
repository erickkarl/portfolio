import type { IconifyJSON } from "@iconify/types";
import { getIconData, iconToSVG, replaceIDs } from "@iconify/utils";
import tabler from "@iconify-json/tabler/icons.json";

// Tabler interface icons (MIT, no credit needed), rendered to inline SVG on
// the server so no icon code ships to the browser. Technology logos are not
// here: they are static files, see scripts/logos.ts.
const sets: Record<string, IconifyJSON> = {
  tabler: tabler as IconifyJSON,
};

type Props = {
  /** "prefix:name", e.g. "tabler:arrow-up-right". */
  name: string;
  size?: number | string;
  className?: string;
  /** Accessible name. Omit for decorative icons next to visible text. */
  label?: string;
};

function resolve(name: string, size: number | string) {
  const [prefix, iconName] = name.split(":");
  const set = sets[prefix];
  const data = set ? getIconData(set, iconName) : null;
  if (!data) throw new Error(`Unknown icon "${name}"`);
  return iconToSVG(data, { height: size });
}

export function Icon({ name, size = "1em", className, label }: Props) {
  const { attributes, body } = resolve(name, size);

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
