import type { Config } from 'tailwindcss';

import { palettes, neutral } from './src/tokens/colors';
import { fontSize, fontWeight } from './src/tokens/typography';
import { spacing } from './src/tokens/spacing';
import { radii as primitiveRadii } from './src/tokens/radii';
import {
  surfaces, foreground, borders, actions, controls, status,
  radiiClassMap, elevationClassMap, motionClassMap, opacityClassMap,
  zIndexClassMap, iconSizeClassMap,
  type SemanticToken,
} from './src/tokens/semantic';

/**
 * Keychain design-system Tailwind config.
 *
 * All values are derived from `src/tokens/*` (single source of truth).
 * Edit a token there and both this config and the docs follow.
 *
 *   L1 Primitives → src/tokens/{colors,typography,spacing,radii,shadows,motion}.ts
 *   L2 Semantic   → src/tokens/semantic.ts  (read this first when picking a token)
 *   L3 Component  → owned by each component
 */

const COLOR_CATEGORIES = [
  'surface', 'fg', 'border',
  'primary', 'secondary', 'tertiary', 'danger',
  'control',
  'success', 'warning', 'info',
] as const;

/** Maps a token name like `fg-on-primary` to its Tailwind color object position `[fg, on-primary]`. */
function categorize(name: string): [string, string] {
  for (const c of COLOR_CATEGORIES) {
    if (name === c) return [c, 'DEFAULT'];
    if (name.startsWith(`${c}-`)) return [c, name.slice(c.length + 1)];
  }
  return [name, 'DEFAULT'];
}

/** Build the semantic colors object from token metadata, mapping each to `var(--token)`. */
function buildSemanticColors(): Record<string, Record<string, string>> {
  const tokens: SemanticToken[] = [
    ...surfaces.tokens, ...foreground.tokens, ...borders.tokens,
    ...actions.tokens, ...controls.tokens, ...status.tokens,
  ];
  const result: Record<string, Record<string, string>> = {};

  for (const t of tokens) {
    const [cat, sub] = categorize(t.name);
    result[cat] ??= {};

    // tertiary at rest is the literal `transparent`, not a CSS var.
    if (cat === 'tertiary' && sub === 'DEFAULT') {
      result[cat][sub] = 'transparent';
      continue;
    }
    // surface-overlay is the scrim — applied with 40% alpha via color-mix.
    if (t.cssVar === '--surface-overlay') {
      result[cat][sub] = `color-mix(in srgb, var(${t.cssVar}) 40%, transparent)`;
      continue;
    }
    if (t.cssVar) {
      result[cat][sub] = `var(${t.cssVar})`;
    }
  }
  return result;
}

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}', './.storybook/**/*.{ts,tsx}'],
  // Action/status/control classes are built via template literals in semantic.ts
  // (`bg-${role}-hover` etc.). Tailwind's static scanner can't see those, so we explicitly
  // safelist the dynamic patterns. Static classes (bg-surface*, text-fg*, border-border*)
  // are scanned normally.
  safelist: [
    {
      pattern: /^(bg|text|border)-(primary|secondary|tertiary|danger|control)(-hover|-active|-disabled|-off|-fg)?$/,
    },
    {
      pattern: /^(bg|text|border)-(success|warning|info)(-subtle|-fg)?$/,
    },
  ],
  theme: {
    /* L1 — locked scales (replace Tailwind defaults entirely) */
    fontSize,
    fontWeight,
    spacing,
    borderRadius: {
      ...primitiveRadii,
      ...radiiClassMap,
    },

    extend: {
      colors: {
        white: neutral.white,
        black: neutral.black,
        ...palettes,
        ...buildSemanticColors(),
      },

      boxShadow: elevationClassMap,
      transitionDuration: motionClassMap.duration,
      transitionTimingFunction: motionClassMap.easing,
      opacity: opacityClassMap,
      zIndex: zIndexClassMap,

      width:  iconSizeClassMap,
      height: iconSizeClassMap,
    },
  },
  plugins: [],
};

export default config;
