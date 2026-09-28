# Erick Karl Volkert — Portfolio

Personal portfolio laid out as an electronic component datasheet: features, a DIP-14 pinout of core skills, a key-characteristics table and a revision history of my career.

**Live:** https://erickkarl.github.io/portfolio/ · **Components:** https://erickkarl.github.io/portfolio/storybook/

Built with the same stack I use at work:

| Tool | Used for |
| --- | --- |
| Next.js 16 (App Router) + React 19 | Static export of the site |
| TypeScript | Typed content model and components |
| CSS Modules + design tokens | Styling, light and dark themes |
| Storybook 10 | Component catalogue with a11y checks and interaction tests |
| Vitest + Testing Library | Unit tests for pinout logic and components |
| GitHub Actions | CI on every branch, deploy to GitHub Pages from `main` |

## Editing content

Everything on the page comes from [`src/content/profile.ts`](src/content/profile.ts). Change the data there; the components only render it.

## Scripts

```bash
pnpm install
pnpm dev              # http://localhost:3000
pnpm test             # Vitest
pnpm lint && pnpm typecheck
pnpm build            # static export to ./out
pnpm storybook        # http://localhost:6006
```

## Structure

```
src/
  app/            layout, page, global tokens, fonts
  components/     Pinout, CharacteristicsTable, RevisionHistory, SectionHeading (+ stories)
  content/        profile.ts — all page content
  lib/            pinout.ts — DIP pin numbering (tested)
.github/workflows ci.yml, deploy.yml
```

## Deployment

`deploy.yml` runs lint, typecheck and tests, builds the site with the Pages base path, builds Storybook into `out/storybook`, and publishes to GitHub Pages.
