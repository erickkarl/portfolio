// Next prefixes its own assets with the base path, but not files under
// public/ that are referenced by hand. GitHub Pages project sites live under
// /<repo>, so those references go through here.
const BASE_PATH = process.env.PAGES_BASE_PATH ?? "";

/** URL of a file in public/, e.g. publicPath("/logos/react.svg"). */
export const publicPath = (path: string) => `${BASE_PATH}${path}`;
