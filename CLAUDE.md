# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

UI/TOPIA — a curated component library built on **Base UI** (`@base-ui-components/react`) and **Motion**, distributed via a **shadcn registry** (`registry.json`, custom namespace `@uitopia`). The `apps/web` site (Next.js) both hosts the docs (Fumadocs) and serves as the registry source/distribution point at `/r/{name}.json`.

## Monorepo layout

- Turborepo + Bun workspaces (`bun@1.2.12`), workspaces: `apps/*`, `packages/*`.
- `apps/web/` — Next.js 16 app: marketing site, docs (Fumadocs, MDX in `apps/web/content/docs`), and the **registry source of truth** in `apps/web/registry/{ui,hooks,lib,blocks,components}`.
- `apps/web/registry.json` — shadcn registry manifest; every distributable item (component, hook, lib util, block, example) is declared here with its `type` (`registry:ui`, `registry:hook`, `registry:lib`, `registry:example`, `registry:block`) and `files` paths. Building it (`registry:build` → `shadcn build`) emits the public JSON files (`apps/web/public/r/*.json`, git-tracked) consumed by `bun x shadcn add`.
- `apps/web/registry/{ui,hooks,lib,blocks,components}` is the **only** component source in this repo — there is no separate installable npm package, and no separate internal component set. The site's own marketing/showcase UI (landing page, block viewer, etc.) imports directly from `apps/web/registry/ui/*` (via `@/registry/ui/*`), same as anything shipped through the registry. Every component is Base UI-based (`@base-ui-components/react/*`) — don't reach for Radix primitives. Consumption from any other project is via `bun x`/`npx shadcn add @uitopia/<name>` (or `shadcn init`), resolved against `https://uitopia.vercel.app/r/{name}.json` per the `registries` config in `apps/web/components.json` (the repo's only `components.json`).
- `packages/tsconfig/` — shared `tsconfig` bases (`base.json`, `nextjs.json`, `react-library.json`) consumed via `@uitopia/tsconfig`.

## Commands

Run from repo root unless noted.

```bash
bun i                    # install
bun run dev              # turbo run dev (all apps/packages, persistent/uncached)
bun run build            # turbo run build
bun run lint             # turbo run lint (next lint under apps/web)
bun run format           # biome format --write .
bun run check            # biome check --fix .
```

Inside `apps/web/`:
```bash
next dev --turbo         # dev server
next build                # build (also runs fumadocs-mdx via postinstall)
ANALYZE=true next build   # bundle analyzer
bun x shadcn build        # rebuild registry.json's public JSON output (registry:build script)
bun x shadcn add <name>   # pull a registry component into a consuming project
```

There is no test runner configured in this repo — don't assume `bun test`/`vitest`/`jest` exist unless you add one.

Linting/formatting is Biome (`biome.json` at root), not ESLint/Prettier, except `apps/web`'s `lint` script which shells out to `next lint`. Biome config notes: import organization is on by default (`assist.actions.source.organizeImports`), several a11y rules are deliberately relaxed (`noSvgWithoutTitle`, `useButtonType`, `useAltText`, `useValidAnchor`, `useKeyWithClickEvents` all off), and `useSortedClasses` (Tailwind class sorting) is an enforced, auto-fixable error.

## Adding a new component (registry item)

This is the most common task in this repo. Follow `CONTRIBUTING.md`'s process:

1. Component source goes in `apps/web/registry/ui/<name>.tsx` (or `registry/hooks`, `registry/lib`, `registry/blocks/<block-name>/` as appropriate). Components use Base UI primitives (`@base-ui-components/react/*`) + `class-variance-authority` for variants + `cn` from `@/lib/utils` — follow the pattern in `apps/web/registry/ui/button.tsx`.
2. Register it as an item in `apps/web/registry.json` with the correct `type` and `files[].path`/`type`, and add it to any relevant `registryDependencies` arrays (e.g. the umbrella `"ui"` item) and `categories`.
3. Add usage examples as separate `registry:example` items when relevant (source files typically live alongside demos, e.g. `registry/components/<name>-demo.tsx`), default-exported.
4. Write docs as MDX under `apps/web/content/docs/ui/components/<name>.mdx` (or `content/docs/motion/components/` for motion-focused docs), and update the section's `meta.json` if adding a new nav entry.
5. Run `bun x shadcn build` (or `bun run registry:build` in `apps/web`) to regenerate the public registry JSON under `apps/web/public/r/`.

Commit messages follow conventional-commit-style categories (`feat`, `fix`, `refactor`, `docs`, `build`, `test`, `ci`, `chore`), e.g. `feat(components): add new button component`.

## Docs architecture (Fumadocs)

- `apps/web/source.config.ts` defines the MDX doc collection (`defineDocs`, dir `content/docs`) with an extended frontmatter schema (`preview`, `index`, `method`, `links.doc`/`links.api`) and a meta schema with `description`. Custom rehype/remark pipeline: Shiki-based code highlighting with `transformerTwoslash`, `remark-install` (persisted package-manager tabs), and `remarkDocGen`/`fileGenerator` for generated code snippets.
- Two doc sections exist under `content/docs`: `ui/` (component docs) and `motion/` (Motion-based animation docs), each with their own `meta.json` nav config.
- Routing: `apps/web/app/docs/[[...slug]]/` renders MDX content; `apps/web/app/(home)` is the marketing/landing page; `apps/web/app/blocks/preview` renders standalone block previews (used for `apps/web/registry/blocks/*` such as `login-03/04/05`).
- `apps/web/app/api/search/route.ts` powers docs search; `apps/web/app/api/og/route.tsx` generates OG images (uses embedded Geist font JSON files in the same directory).

## Styling

Tailwind CSS v4 (`@tailwindcss/postcss`, no `tailwind.config.js` — v4 CSS-first config lives in `apps/web/styles`). Class name merging goes through `cn()` (`clsx` + `tailwind-merge`). Component variants use `cva`. Respect the `useSortedClasses` Biome rule — don't hand-order Tailwind classes against its expectations.

## Component conventions to match

Looking at existing registry components (e.g. `button.tsx`) before adding new ones will show the established conventions: Base UI's `useRender`/`mergeProps` for polymorphic rendering, `cva` variant maps with a `defaultVariants` block, data-attribute-driven state styling (`data-pressed`, etc.) instead of JS-driven conditional classes, and pointer-coarse touch-target padding via `pointer-coarse:after:*` utilities.
