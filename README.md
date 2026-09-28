# Erick Karl Volkert — Portfolio

Personal portfolio of a senior software engineer. Opens with a terminal-style intro that types my name, then covers what I do, the technologies I use and where I've shipped.

**Live:** https://erickkarl.github.io/portfolio/ · **Components:** https://erickkarl.github.io/portfolio/storybook/

Built with the same stack I use at work:

| Tool | Used for |
| --- | --- |
| Next.js 16 (App Router) + React 19 | Static export of the site |
| TypeScript | Typed content model and components |
| CSS Modules + design tokens | Styling, light and dark themes, typed intro animation |
| Storybook 10 | Component catalogue with a11y checks and interaction tests |
| Vitest + Testing Library | Tests for the intro and the tech stack |
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
  assets/tech/    technology logos (SVG)
  components/     Intro, TechStack, Experience, SectionHeading (+ stories, tests)
  content/        profile.ts — all page content
.github/workflows ci.yml, deploy.yml
```

## Deployment

`deploy.yml` runs lint, typecheck and tests, builds the site with the Pages base path, builds Storybook into `out/storybook`, and publishes to GitHub Pages.

## Credits

Technology logos from [Devicon](https://devicon.dev) (MIT). Logos are trademarks of their respective owners.
