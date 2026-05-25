/**
 * Keychain semantic tokens — single source of truth for the semantic layer.
 *
 * Each entry describes WHAT a token represents, the Tailwind class to use, the primitive it
 * maps to, and WHEN to reach for it. Color tokens additionally carry their `cssVar` name and
 * `lightValue` (HSL channels) — `generateCssVars()` walks these to produce the `:root { … }`
 * block that the Storybook preview injects at runtime. The Tailwind config in
 * `tailwind.config.ts` derives its class definitions from this same file.
 *
 * Layers:
 *   L1 Primitives → `src/tokens/{colors,typography,spacing,radii,shadows,motion}.ts`
 *   L2 Semantic   → THIS FILE
 *   L3 Component  → owned by each component
 */

export interface SemanticToken {
  /** Token id (also the Tailwind sub-key for color tokens). */
  name: string;
  /** Tailwind utility class that consumes this token. */
  class: string;
  /** Resolved value (the actual CSS value at render time). */
  value: string;
  /** Which primitive token this maps to. */
  primitive: string;
  /** One-line role description. */
  description: string;
  /** When designers/AI should reach for this vs. alternatives. */
  usage: string;
  /** Color tokens only: CSS variable name (e.g. `--surface`). */
  cssVar?: string;
  /** Color tokens only: hex value emitted into the CSS var (e.g. `#FFFFFF`). */
  lightHex?: string;
}

export interface TokenGroup {
  title: string;
  intro: string;
  tokens: SemanticToken[];
}

import { gray, brand, red, blue, emerald, orange, neutral } from './colors';

// ─────────────────────────────────────────────────────────────────────────────
// SURFACES
// ─────────────────────────────────────────────────────────────────────────────
export const surfaces: TokenGroup = {
  title: 'Surfaces',
  intro: 'Background fills for containers — pages, cards, headers, sheets.',
  tokens: [
    {
      name: 'surface',
      class: 'bg-surface',
      value: '#FFFFFF',
      primitive: 'white',
      cssVar: '--surface',
      lightHex: neutral.white,
      description: 'The default page background. The base canvas everything else sits on.',
      usage: 'Outermost surface in a page or large region. Default card fill.',
    },
    {
      name: 'surface-subtle',
      class: 'bg-surface-subtle',
      value: 'gray-50',
      primitive: 'gray-50 (warm)',
      cssVar: '--surface-subtle',
      lightHex: gray[50],
      description: 'A faintly lower-emphasis surface than the page background.',
      usage: 'Table headers, secondary panels, section bands that nest inside a page. We do NOT use this for alternating table rows.',
    },
    {
      name: 'surface-sunken',
      class: 'bg-surface-sunken',
      value: 'gray-50',
      primitive: 'gray-50',
      cssVar: '--surface-sunken',
      lightHex: gray[50],
      description: 'A "depressed" surface — visually recessed into the page.',
      usage: 'Input field backgrounds, code blocks, wells, search bars.',
    },
    {
      name: 'surface-inverse',
      class: 'bg-surface-inverse',
      value: 'gray-900',
      primitive: 'gray-900',
      cssVar: '--surface-inverse',
      lightHex: gray[900],
      description: 'Dark surface for momentary or attention-getting UI.',
      usage: 'Tooltips, dark snackbars, command palette, ephemeral overlays.',
    },
    {
      name: 'surface-overlay',
      class: 'bg-surface-overlay',
      value: 'gray-900 @ 40%',
      primitive: 'gray-900 + 0.4 alpha',
      cssVar: '--surface-overlay',
      lightHex: gray[900],
      description: 'Scrim that dims the page behind a modal or drawer.',
      usage: 'Modal backdrop, drawer scrim, lightbox dimmer. Always semi-transparent (alpha applied in Tailwind config).',
    },
    {
      name: 'surface-brand-subtle',
      class: 'bg-surface-brand-subtle',
      value: 'brand-100',
      primitive: 'brand-100',
      cssVar: '--surface-brand-subtle',
      lightHex: brand[100],
      description: 'A pale brand-yellow tint surface.',
      usage: 'Selected nav item highlight, branded callouts, promotional banners.',
    },
    {
      name: 'surface-selected',
      class: 'bg-surface-selected',
      value: 'blue-50',
      primitive: 'blue-50',
      cssVar: '--surface-selected',
      lightHex: blue[50],
      description: 'Highlight surface for the active/selected option.',
      usage: 'Currently selected list row, picked menu item, selected card. Distinct from hover.',
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// FOREGROUND
// ─────────────────────────────────────────────────────────────────────────────
export const foreground: TokenGroup = {
  title: 'Foreground',
  intro: 'Color for text and icons. Pair each with a compatible surface for contrast.',
  tokens: [
    {
      name: 'fg', class: 'text-fg', value: 'gray-900', primitive: 'gray-900',
      cssVar: '--fg', lightHex: gray[900],
      description: 'Primary text color — body copy and headings on light surfaces.',
      usage: 'Default text on `bg-surface`, `bg-surface-subtle`.',
    },
    {
      name: 'fg-subtle', class: 'text-fg-subtle', value: 'gray-500', primitive: 'gray-500',
      cssVar: '--fg-subtle', lightHex: gray[500],
      description: 'Lower-emphasis text — supporting copy, captions, placeholders.',
      usage: 'Helper text under fields, secondary metadata, captions, placeholder text, breadcrumb separators.',
    },
    {
      name: 'fg-disabled', class: 'text-fg-disabled', value: 'gray-400', primitive: 'gray-400',
      cssVar: '--fg-disabled', lightHex: gray[400],
      description: 'Text inside a disabled control.',
      usage: 'Disabled button labels, disabled menu items, greyed-out option text.',
    },
    {
      name: 'fg-inverse', class: 'text-fg-inverse', value: 'white', primitive: 'white',
      cssVar: '--fg-inverse', lightHex: neutral.white,
      description: 'Text/icons on dark surfaces.',
      usage: 'Text on `bg-surface-inverse` (tooltips, snackbars).',
    },
    {
      name: 'fg-link', class: 'text-fg-link', value: 'blue-600', primitive: 'blue-600',
      cssVar: '--fg-link', lightHex: blue[600],
      description: 'Hyperlink text color.',
      usage: 'Inline links inside body copy, breadcrumbs, anchor text.',
    },
    {
      name: 'fg-link-hover', class: 'text-fg-link-hover', value: 'blue-700', primitive: 'blue-700',
      cssVar: '--fg-link-hover', lightHex: blue[700],
      description: 'Hyperlink text color on hover.',
      usage: 'Pair with `text-fg-link` via `hover:text-fg-link-hover`.',
    },
    {
      name: 'fg-on-primary', class: 'text-fg-on-primary', value: 'black', primitive: 'black',
      cssVar: '--fg-on-primary', lightHex: neutral.black,
      description: 'Text/icons on top of the primary brand-yellow surface.',
      usage: 'Label inside primary Button, text on `bg-primary`.',
    },
    {
      name: 'fg-on-secondary', class: 'text-fg-on-secondary', value: 'gray-900', primitive: 'gray-900',
      cssVar: '--fg-on-secondary', lightHex: gray[900],
      description: 'Text/icons on top of the secondary outline-button surface.',
      usage: 'Label inside secondary Button — sits on the white surface paired with a dark outline.',
    },
    {
      name: 'fg-on-danger', class: 'text-fg-on-danger', value: 'white', primitive: 'white',
      cssVar: '--fg-on-danger', lightHex: neutral.white,
      description: 'Text/icons on top of the destructive (red) action surface.',
      usage: 'Label inside danger Button, text on `bg-danger`.',
    },
    {
      name: 'fg-on-success', class: 'text-fg-on-success', value: 'white', primitive: 'white',
      cssVar: '--fg-on-success', lightHex: neutral.white,
      description: 'Text/icons on top of the success solid surface.',
      usage: 'Text on `bg-success` (the bold solid, not the subtle banner).',
    },
    {
      name: 'fg-on-warning', class: 'text-fg-on-warning', value: 'white', primitive: 'white',
      cssVar: '--fg-on-warning', lightHex: neutral.white,
      description: 'Text/icons on top of the warning solid surface.',
      usage: 'Text on `bg-warning` (orange solid).',
    },
    {
      name: 'fg-on-info', class: 'text-fg-on-info', value: 'white', primitive: 'white',
      cssVar: '--fg-on-info', lightHex: neutral.white,
      description: 'Text/icons on top of the info solid surface.',
      usage: 'Text on `bg-info` (blue solid).',
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// BORDERS
// ─────────────────────────────────────────────────────────────────────────────
export const borders: TokenGroup = {
  title: 'Borders',
  intro: 'Stroke colors for dividers, outlines, and interactive boundaries. Borders trend soft.',
  tokens: [
    {
      name: 'border', class: 'border-border', value: 'gray-100', primitive: 'gray-100',
      cssVar: '--border', lightHex: gray[100],
      description: 'Default border color for cards, dividers, table cells.',
      usage: 'Most outlines. Card borders, list dividers, table grid.',
    },
    {
      name: 'border-subtle', class: 'border-border-subtle', value: 'gray-50', primitive: 'gray-50',
      cssVar: '--border-subtle', lightHex: gray[50],
      description: 'Very low-emphasis divider — the faintest stroke in the system.',
      usage: 'Internal dividers inside a card, ghost separators between dense rows.',
    },
    {
      name: 'border-strong', class: 'border-border-strong', value: 'gray-300', primitive: 'gray-300',
      cssVar: '--border-strong', lightHex: gray[300],
      description: 'Stronger, more emphasized stroke. Top of the soft-border ramp — visible against white surfaces without shouting.',
      usage: 'Form control outlines at rest (Checkbox, Radio, Switch borders), section separators in dense UIs, secondary Button outlines, table footer borders.',
    },
    {
      name: 'border-focus', class: 'border-border-focus', value: 'gray-900', primitive: 'gray-900',
      cssVar: '--border-focus', lightHex: gray[900],
      description: 'Focus ring color around interactive controls.',
      usage: 'Outline/ring color on focused buttons, inputs, links. Pair with `border-2` for width.',
    },
    {
      name: 'border-input', class: 'border-border-input', value: 'gray-200', primitive: 'gray-200',
      cssVar: '--border-input', lightHex: gray[200],
      description: 'Border around form inputs in their resting state.',
      usage: 'Inputs, textareas, selects, checkboxes, radios — the field outline.',
    },
    {
      name: 'border-danger', class: 'border-border-danger', value: 'red-500', primitive: 'red-500',
      cssVar: '--border-danger', lightHex: red[500],
      description: 'Error state border for form fields.',
      usage: 'Input with validation error, invalid form group outline.',
    },
    {
      name: 'border-selected', class: 'border-border-selected', value: 'blue-500', primitive: 'blue-500',
      cssVar: '--border-selected', lightHex: blue[500],
      description: 'Outline that marks a card or row as selected.',
      usage: 'Selected card, picked option outline, currently-chosen tile.',
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// ACTIONS
// ─────────────────────────────────────────────────────────────────────────────
type ActionRole = 'primary' | 'secondary' | 'tertiary' | 'danger';

interface ActionConfig {
  defaultPrimitive: string;
  defaultValue?: string;        // hex; omit for the literal 'transparent'
  hoverPrimitive: string;
  hoverValue: string;
  activePrimitive: string;
  activeValue: string;
  disabledPrimitive: string;
  disabledValue: string;
  fgPrimitive: string;
  fgValue: string;
  description: string;
  when: string;
}

const buildActionTokens = (role: ActionRole, c: ActionConfig): SemanticToken[] => [
  {
    name: role,
    class: `bg-${role}`,
    value: c.defaultPrimitive,
    primitive: c.defaultPrimitive,
    // `tertiary` default is the literal `transparent` — no CSS var.
    cssVar: c.defaultValue ? `--${role}` : undefined,
    lightHex: c.defaultValue,
    description: `Resting background for ${role} action surfaces.`,
    usage: `Default fill for ${role} Buttons and toggles. ${c.when}`,
  },
  {
    name: `${role}-hover`, class: `bg-${role}-hover`, value: c.hoverPrimitive, primitive: c.hoverPrimitive,
    cssVar: `--${role}-hover`, lightHex: c.hoverValue,
    description: `Hover-state background for ${role} action surfaces.`,
    usage: `Pair via \`hover:bg-${role}-hover\`.`,
  },
  {
    name: `${role}-active`, class: `bg-${role}-active`, value: c.activePrimitive, primitive: c.activePrimitive,
    cssVar: `--${role}-active`, lightHex: c.activeValue,
    description: `Pressed/active background for ${role} action surfaces.`,
    usage: `Pair via \`active:bg-${role}-active\`.`,
  },
  {
    name: `${role}-disabled`, class: `bg-${role}-disabled`, value: c.disabledPrimitive, primitive: c.disabledPrimitive,
    cssVar: `--${role}-disabled`, lightHex: c.disabledValue,
    description: `Disabled background for ${role} action surfaces.`,
    usage: `Pair via \`disabled:bg-${role}-disabled\`. Same value across action types for visual consistency.`,
  },
  {
    name: `${role}-fg`, class: `text-${role}-fg`, value: c.fgPrimitive, primitive: c.fgPrimitive,
    cssVar: `--${role}-fg`, lightHex: c.fgValue,
    description: `Label text/icon color on a ${role} surface.`,
    usage: `Text color of ${role} Button label. Always paired with \`bg-${role}\`.`,
  },
];

export const actions: TokenGroup = {
  title: 'Actions',
  intro:
    'Interactive surfaces (buttons, toggles, links). Each role has resting / hover / active / disabled backgrounds plus its label foreground. Secondary and Tertiary share the same surface ramp — secondary adds a dark outline via `border-border-strong`, tertiary has no outline.',
  tokens: [
    ...buildActionTokens('primary', {
      defaultPrimitive: 'brand-300', defaultValue: brand[300],
      hoverPrimitive: 'brand-400', hoverValue: brand[400],
      activePrimitive: 'brand-500', activeValue: brand[500],
      disabledPrimitive: 'gray-200', disabledValue: gray[200],
      fgPrimitive: 'black', fgValue: neutral.black,
      description: 'Brand-yellow CTA surface.',
      when: 'Reserve for the single most important action per view.',
    }),
    ...buildActionTokens('secondary', {
      defaultPrimitive: 'white', defaultValue: neutral.white,
      hoverPrimitive: 'gray-50', hoverValue: gray[50],
      activePrimitive: 'gray-100', activeValue: gray[100],
      disabledPrimitive: 'gray-200', disabledValue: gray[200],
      fgPrimitive: 'gray-900', fgValue: gray[900],
      description: 'Outline-style CTA surface — white background with a dark outline.',
      when: 'Outline buttons. Pair with `border border-border-strong` to make the outline visible.',
    }),
    ...buildActionTokens('tertiary', {
      defaultPrimitive: 'transparent',                       // no defaultValue → no CSS var
      hoverPrimitive: 'gray-50', hoverValue: gray[50],
      activePrimitive: 'gray-100', activeValue: gray[100],
      disabledPrimitive: 'gray-200', disabledValue: gray[200],
      fgPrimitive: 'gray-900', fgValue: gray[900],
      description: 'Ghost CTA surface — transparent at rest, fills on hover.',
      when: 'Low-emphasis actions: Cancel, dismiss, in-row buttons. No outline.',
    }),
    ...buildActionTokens('danger', {
      defaultPrimitive: 'red-500', defaultValue: red[500],
      hoverPrimitive: 'red-600', hoverValue: red[600],
      activePrimitive: 'red-700', activeValue: red[700],
      disabledPrimitive: 'gray-200', disabledValue: gray[200],
      fgPrimitive: 'white', fgValue: neutral.white,
      description: 'Destructive CTA surface.',
      when: 'Delete, remove, archive — irreversible actions. Confirm intent.',
    }),
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// CONTROLS
// ─────────────────────────────────────────────────────────────────────────────
export const controls: TokenGroup = {
  title: 'Controls',
  intro:
    'Selection-control fills (Checkbox today; Radio and Switch later). The checked state is high-contrast dark — distinct from `primary` (brand-yellow CTAs) so the system can tell "this is a chosen option" apart from "this is the most important action".',
  tokens: [
    {
      name: 'control', class: 'bg-control', value: 'gray-900', primitive: 'gray-900',
      cssVar: '--control', lightHex: gray[900],
      description: 'Filled background of a selected/checked control.',
      usage: 'Checkbox in `checked` or `indeterminate` state. Radio dot (when added). Switch track when on.',
    },
    {
      name: 'control-hover', class: 'bg-control-hover', value: 'gray-800', primitive: 'gray-800',
      cssVar: '--control-hover', lightHex: gray[800],
      description: 'Hover state of a selected control.',
      usage: 'Pair via `hover:bg-control-hover` on the checked control.',
    },
    {
      name: 'control-off', class: 'bg-control-off', value: 'gray-300', primitive: 'gray-300',
      cssVar: '--control-off', lightHex: gray[300],
      description: 'Resting fill of a two-state control in its OFF position.',
      usage: 'Switch/Toggle track when off. Distinct from the unchecked Checkbox/Radio (those have a white fill and a border instead of a tinted fill).',
    },
    {
      name: 'control-fg', class: 'text-control-fg', value: 'white', primitive: 'white',
      cssVar: '--control-fg', lightHex: neutral.white,
      description: 'Icon/dot color sitting on top of a checked control.',
      usage: 'Check glyph inside a checked Checkbox, dot inside a selected Radio.',
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// STATUS
// ─────────────────────────────────────────────────────────────────────────────
type StatusRole = 'success' | 'warning' | 'info';

interface StatusConfig {
  solid: string; solidValue: string;
  subtle: string; subtleValue: string;
  fg: string; fgValue: string;
  description: string;
  when: string;
}

const buildStatusTokens = (role: StatusRole, c: StatusConfig): SemanticToken[] => [
  {
    name: role, class: `bg-${role}`, value: c.solid, primitive: c.solid,
    cssVar: `--${role}`, lightHex: c.solidValue,
    description: `Bold solid ${role} fill — high-emphasis indicators.`,
    usage: `${c.description} Use for solid status badges, dot indicators, progress bars.`,
  },
  {
    name: `${role}-subtle`, class: `bg-${role}-subtle`, value: c.subtle, primitive: c.subtle,
    cssVar: `--${role}-subtle`, lightHex: c.subtleValue,
    description: `Soft tinted ${role} fill — for banners and toasts.`,
    usage: `Pair with \`text-${role}-fg\` for status banners, inline alerts, validation toasts.`,
  },
  {
    name: `${role}-fg`, class: `text-${role}-fg`, value: c.fg, primitive: c.fg,
    cssVar: `--${role}-fg`, lightHex: c.fgValue,
    description: `${role} text/icon color, readable on a subtle background.`,
    usage: `Status labels in banners, status icon color. ${c.when}`,
  },
];

export const status: TokenGroup = {
  title: 'Status',
  intro:
    'Informational feedback colors. `success`/`warning`/`info` are non-actionable. Destructive use cases reuse `danger` from Actions.',
  tokens: [
    ...buildStatusTokens('success', {
      solid: 'emerald-600', solidValue: emerald[600],
      subtle: 'emerald-50', subtleValue: emerald[50],
      fg: 'emerald-900', fgValue: emerald[900],
      description: 'Confirms a positive outcome.',
      when: 'Successful save, completed step, healthy status.',
    }),
    ...buildStatusTokens('warning', {
      solid: 'orange-500', solidValue: orange[500],
      subtle: 'orange-50', subtleValue: orange[50],
      fg: 'orange-900', fgValue: orange[900],
      description: 'Signals caution that needs attention.',
      when: 'Approaching a limit, deprecation notice, expiring item.',
    }),
    ...buildStatusTokens('info', {
      solid: 'blue-500', solidValue: blue[500],
      subtle: 'blue-50', subtleValue: blue[50],
      fg: 'blue-900', fgValue: blue[900],
      description: 'Neutral information that adds context.',
      when: 'Helpful tips, "did you know" callouts, feature explanation.',
    }),
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// RADIUS (semantic — plain values, no CSS vars)
// ─────────────────────────────────────────────────────────────────────────────
export const radii: TokenGroup = {
  title: 'Radius',
  intro: 'Named corner radii by component role. 8px is the standard radius everywhere except small controls and overlays.',
  tokens: [
    { name: 'control', class: 'rounded-control', value: '4px',  primitive: 'rounded-4',  description: 'Small radius for compact selection controls.', usage: 'Checkboxes, radios (outer), small toggles, chips, tag pills with square ends — anywhere `rounded-default` (8px) would look chunky next to body text.' },
    { name: 'default', class: 'rounded-default', value: '8px',  primitive: 'rounded-8',  description: 'Standard radius across the entire system.', usage: 'Buttons, inputs, selects, badges, cards, panels, sections, list items — anywhere a normal corner is needed.' },
    { name: 'overlay', class: 'rounded-overlay', value: '12px', primitive: 'rounded-12', description: 'Slightly larger radius for floating overlays.', usage: 'Popovers, menus, dialogs, drawers, toasts — surfaces that hover above the page.' },
    { name: 'pill',    class: 'rounded-pill',    value: 'full', primitive: 'rounded-full', description: 'Fully rounded.', usage: 'Avatars, status pills, chips, badges meant to look like pills.' },
    { name: 'none',    class: 'rounded-0',       value: '0',    primitive: 'rounded-0',  description: 'No rounding — flush edges.', usage: 'Table cells, full-bleed image edges, segmented controls.' },
  ],
};

/** Convenience map → Tailwind config.theme.borderRadius. */
export const radiiClassMap = {
  control: '4px',
  default: '8px',
  overlay: '12px',
  pill:    '9999px',
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// ELEVATION (semantic shadows — plain values)
// ─────────────────────────────────────────────────────────────────────────────
export const elevation: TokenGroup = {
  title: 'Elevation',
  intro: 'Shadow roles, ordered by ascending visual lift.',
  tokens: [
    { name: 'card',    class: 'shadow-card',    value: '0 1px 2px 0 rgb(0 0 0 / 0.05)', primitive: 'shadow-sm',         description: 'Static, resting elevation.',                       usage: 'Cards at rest, dashboard tiles, settings panels.' },
    { name: 'raised',  class: 'shadow-raised',  value: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)', primitive: 'shadow (DEFAULT)', description: 'Slightly lifted, used on hover or pinned elements.', usage: 'Hovered card, sticky header, draggable item being held.' },
    { name: 'popover', class: 'shadow-popover', value: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)', primitive: 'shadow-md',     description: 'Floating overlay above the page.',                 usage: 'Popovers, dropdown menus, autocomplete lists, date pickers.' },
    { name: 'modal',   class: 'shadow-modal',   value: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)', primitive: 'shadow-lg', description: 'Highest UI elevation.',                              usage: 'Dialogs, drawers, command palettes, full-screen sheets.' },
  ],
};

/** Convenience map → Tailwind config.theme.extend.boxShadow. */
export const elevationClassMap = {
  card:    '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  raised:  '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  popover: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  modal:   '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// MOTION (semantic — plain values)
// ─────────────────────────────────────────────────────────────────────────────
export const motion: TokenGroup = {
  title: 'Motion',
  intro: 'Named durations and easings for transitions. Match the timing to the intent.',
  tokens: [
    { name: 'duration-quick',    class: 'duration-quick',    value: '150ms', primitive: '150ms',       description: 'Snappy micro-interactions.',                        usage: 'Color/opacity changes on hover, focus ring fade-in, small toggles.' },
    { name: 'duration-base',     class: 'duration-base',     value: '200ms', primitive: '200ms',       description: 'Standard UI transition timing.',                    usage: 'Most component state changes, expand/collapse, fade, tab change.' },
    { name: 'duration-slow',     class: 'duration-slow',     value: '300ms', primitive: '300ms',       description: 'Deliberate, attention-drawing motion.',             usage: 'Modal entrance, drawer slide-in, large layout shifts.' },
    { name: 'easing-standard',   class: 'ease-standard',     value: 'cubic-bezier(0.4, 0, 0.2, 1)',    primitive: 'custom cubic', description: 'Default easing — slight acceleration, smooth deceleration.', usage: 'Most transitions. The "if in doubt" choice.' },
    { name: 'easing-emphasized', class: 'ease-emphasized',   value: 'cubic-bezier(0.16, 1, 0.3, 1)',   primitive: 'custom cubic', description: 'Bold entrance easing — anticipatory, drawing the eye.',      usage: 'Element entering view, modal/drawer opening, important reveal.' },
    { name: 'easing-exit',       class: 'ease-exit',         value: 'cubic-bezier(0.4, 0, 1, 1)',      primitive: 'custom cubic', description: 'Exit easing — accelerates into removal.',                     usage: 'Element leaving view, toast dismissal, drawer close.' },
  ],
};

/** Maps → Tailwind config.theme.extend.transition*. */
export const motionClassMap = {
  duration: { quick: '150ms', base: '200ms', slow: '300ms' },
  easing: {
    standard:   'cubic-bezier(0.4, 0, 0.2, 1)',
    emphasized: 'cubic-bezier(0.16, 1, 0.3, 1)',
    exit:       'cubic-bezier(0.4, 0, 1, 1)',
  },
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// OPACITY (semantic — plain values)
// ─────────────────────────────────────────────────────────────────────────────
export const opacity: TokenGroup = {
  title: 'Opacity',
  intro: 'Named opacities for cross-cutting interaction states beyond color tokens.',
  tokens: [
    { name: 'disabled',        class: 'opacity-disabled', value: '0.4',  primitive: '0.4',  description: 'Whole-element disabled state.',                                  usage: 'Wrap a complex disabled control in `opacity-disabled` when you can\'t recolor every layer.' },
    { name: 'hover-overlay',   class: 'opacity-hover',    value: '0.08', primitive: '0.08', description: 'Subtle overlay tint applied on hover (typically on dark surfaces).', usage: 'White or black wash on hover for tiles, list items where a color change is too loud.' },
    { name: 'pressed-overlay', class: 'opacity-pressed',  value: '0.12', primitive: '0.12', description: 'Slightly stronger overlay tint applied on press/active.',          usage: 'Use after `opacity-hover-overlay` for the pressed step.' },
  ],
};

export const opacityClassMap = { disabled: '0.4', hover: '0.08', pressed: '0.12' } as const;

// ─────────────────────────────────────────────────────────────────────────────
// Z-INDEX (semantic — plain values)
// ─────────────────────────────────────────────────────────────────────────────
export const zIndex: TokenGroup = {
  title: 'Z-index',
  intro: 'Stacking ladder with deliberate gaps so additions don\'t require reshuffling.',
  tokens: [
    { name: 'base',     class: 'z-base',     value: '0',    primitive: '0',    description: 'Page-level baseline.',                  usage: 'Normal in-flow content.' },
    { name: 'dropdown', class: 'z-dropdown', value: '1000', primitive: '1000', description: 'Standalone dropdowns and pickers.',     usage: 'Select menu, date picker, autocomplete.' },
    { name: 'sticky',   class: 'z-sticky',   value: '1100', primitive: '1100', description: 'Sticky page elements.',                 usage: 'Sticky table headers, sticky filter bars.' },
    { name: 'overlay',  class: 'z-overlay',  value: '1300', primitive: '1300', description: 'Backdrops and scrims.',                 usage: 'Modal/drawer scrim. Sits BELOW the modal itself.' },
    { name: 'modal',    class: 'z-modal',    value: '1400', primitive: '1400', description: 'Modal dialogs and drawers.',            usage: 'The modal container itself, above its overlay.' },
    { name: 'popover',  class: 'z-popover',  value: '1500', primitive: '1500', description: 'Popovers opened from inside modals.',   usage: 'Popover, menu opened from within a modal.' },
    { name: 'tooltip',  class: 'z-tooltip',  value: '1600', primitive: '1600', description: 'Tooltips — always on top of other floating UI.', usage: 'Hover tooltips, never blocked by popovers.' },
    { name: 'toast',    class: 'z-toast',    value: '1700', primitive: '1700', description: 'Toasts/notifications — the highest layer.',     usage: 'Toast/snackbar stack, always visible.' },
  ],
};

export const zIndexClassMap = {
  base: '0', dropdown: '1000', sticky: '1100', overlay: '1300',
  modal: '1400', popover: '1500', tooltip: '1600', toast: '1700',
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// ICON SIZES (semantic — plain values)
// ─────────────────────────────────────────────────────────────────────────────
export const iconSizes: TokenGroup = {
  title: 'Icon sizes',
  intro: 'Five icon size tokens. Use these instead of primitive `w-{n} h-{n}` for icons.',
  tokens: [
    { name: 'xs', class: 'size-icon-xs', value: '12px', primitive: '12px', description: 'Inline indicators.',         usage: 'Dot indicators, inline glyphs inside small text (eyebrow/xs).' },
    { name: 'sm', class: 'size-icon-sm', value: '16px', primitive: '16px', description: 'Default UI icon size.',       usage: 'Inline icons in buttons, inputs, menu items, list rows.' },
    { name: 'md', class: 'size-icon-md', value: '20px', primitive: '20px', description: 'Standalone or emphasized.',   usage: 'IconButton at medium size, prominent action icons.' },
    { name: 'lg', class: 'size-icon-lg', value: '24px', primitive: '24px', description: 'Large UI icons.',             usage: 'Headers, empty state illustrations, nav icons.' },
    { name: 'xl', class: 'size-icon-xl', value: '32px', primitive: '32px', description: 'Display-size icons.',          usage: 'Onboarding illustrations, large feature glyphs.' },
  ],
};

export const iconSizeClassMap = {
  'icon-xs': '12px', 'icon-sm': '16px', 'icon-md': '20px', 'icon-lg': '24px', 'icon-xl': '32px',
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Aggregations
// ─────────────────────────────────────────────────────────────────────────────
export const allGroups: TokenGroup[] = [
  surfaces, foreground, borders, actions, controls, status,
  radii, elevation, motion, opacity, zIndex, iconSizes,
];

/** Color groups that contribute to the runtime `:root { … }` block. */
const colorGroups = [surfaces, foreground, borders, actions, controls, status];

/**
 * Build the `:root { … }` CSS string from semantic color tokens.
 * Called by the Storybook preview decorator to inject CSS variables at runtime.
 * Future dark theme: add a `darkValue` field per token and emit a second `.dark { … }` block.
 */
export function generateCssVars(): string {
  const lines: string[] = [':root {'];
  for (const group of colorGroups) {
    for (const t of group.tokens) {
      if (t.cssVar && t.lightHex) {
        lines.push(`  ${t.cssVar}: ${t.lightHex};`);
      }
    }
  }
  lines.push('}');
  return lines.join('\n');
}
