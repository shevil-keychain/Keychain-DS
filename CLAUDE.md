# Keychain Design System — Storybook spec

## What this project is
- This Storybook IS the spec for the Keychain design system. It is **not** production code.
- Production design tokens live in [atlas-tech-inc/webapp-monorepo](https://github.com/atlas-tech-inc/webapp-monorepo) (`packages/tailwind-config/tailwind.config.ts` + `packages/ui/styles.css`).
- This project does **not** modify the monorepo. Engineers adopt the spec from here separately.
- The user is a designer. Pick sensible defaults for tooling/code decisions instead of asking.

## Source of truth (do not bypass)
- **`src/tokens/semantic.ts`** is the single source of truth for semantic tokens. Every color token has `cssVar`, `lightValue`, `description`, `usage` — read these before suggesting a token.
- **`src/tokens/{colors,typography,spacing,radii,shadows,motion}.ts`** define primitives.
- `tailwind.config.ts` **imports** from `src/tokens/*` and builds itself programmatically. Do not hardcode values there.
- `src/styles/global.css` contains only `@tailwind` directives + the Inter import. **Do not** add a `:root { … }` block — CSS vars are injected by `.storybook/preview.tsx` calling `generateCssVars()` from semantic.ts.
- Adding a semantic token = edit `semantic.ts` only. Tailwind class, CSS var, docs page, and AI description all derive from it.

## Conventions
- **Spacing & radius** are named by px value (`space-12` = 12px, `rounded-8` = 8px). Tailwind's default fractional names (`space-3`, `rounded-md`) do **not** exist here.
- **Font sizes** are locked at `eyebrow → 2xl`. No display sizes. Always reference weights by name (`font-medium`), never number — Inter optical shift makes them -100 from CSS conventions.
- **Curated palettes** (in-system): gray, brand, red, blue, emerald, violet, orange, pink. `brand` = Tailwind yellow with `#FFEC44` at the 300 step. `gray-100` is warm-tinted (`#F6F6F4`).
- **Semantic colors** use Tailwind class compositions: `bg-surface`, `text-fg-subtle`, `border-border-strong`, `bg-primary-hover`, `text-success-fg`, etc.
- **Dogfood the scale.** When writing internal docs UI (Storybook helper components), use the curated scale (`w-160`, `gap-32`, `px-24`, `rounded-default`) — not arbitrary values.
- **Components encode their own sizes** (sm/md/lg props). No component-size tokens.

## Response style
- Terse. No trailing summaries the user can read in the diff.
- No prose/guidelines in MDX pages unless the user asks for them.
- Iterate quickly: propose v1, let the user iterate, don't ask for sign-off on small changes.
- For design system questions: be concise about tradeoffs, show concrete tokens/values, recommend one path.

## Hard rule — token changes require explicit approval
**Never edit `src/tokens/*` (primitives or `semantic.ts`) without first asking the user via `AskUserQuestion` and getting a button-click "yes".** This includes adding a single value to a scale (e.g. a new spacing step, a new semantic color, bumping an existing HSL). No silent additions, no "I'll just add this real quick." Always present the proposed change as an explicit option and wait for the click. Applies to: `colors.ts`, `typography.ts`, `spacing.ts`, `radii.ts`, `shadows.ts`, `motion.ts`, `semantic.ts`.

## Things not to do
- Don't propose text-role composites (`text-heading-lg`). Raw Tailwind utilities only.
- Don't propose component-size tokens (`h-control-sm`). Components own their sizes.
- Don't reach for primitives (`bg-gray-50`) when a semantic token exists. Read `semantic.ts` first.
- Don't suggest changes to `webapp-monorepo` unless explicitly asked.
- Don't add a CSS variable to `global.css` — only `semantic.ts`.

## References
- Token alignment audit: https://www.notion.so/Design-System-Alignment-Audit-Figma-Tailwind-Code-361e62b190a381a4a391d9257e3aad7c
- Production Tailwind config (read-only reference): atlas-tech-inc/webapp-monorepo, `packages/tailwind-config/tailwind.config.ts`
- Production semantic vars (read-only reference): atlas-tech-inc/webapp-monorepo, `packages/ui/styles.css`

## Run / verify
- `npm run storybook` — boots at http://localhost:6006
- Foundations pages live under `src/foundations/*.mdx`
- The `.storybook/main.ts` has a `viteFinal` plugin that fixes a Storybook 10.4–10.5 alpha MDX bug with `file://` URLs in paths with spaces. Don't remove until upstream PR #34841 ships.
