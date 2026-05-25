/**
 * Keychain primitive color palettes.
 *
 * Tailwind defaults are the baseline. Two Keychain overrides:
 *  - `gray-100` warm tint (#F6F6F4) replaces Tailwind's #F3F4F6.
 *  - `brand` is Tailwind's yellow ramp with the 300 step replaced by #FFEC44 (brand primary).
 *
 * Curated palettes (in-system): gray, red, blue, emerald, violet, orange, pink, brand.
 * Other Tailwind palettes still compile (we `extend`), but the documentation lists only these.
 */
import colors from 'tailwindcss/colors';

export const gray = { ...colors.gray, 100: '#F6F6F4' } as const;
export const brand = { ...colors.yellow, 300: '#FDE047' } as const;
export const red = colors.red;
export const blue = colors.blue;
export const emerald = colors.emerald;
export const violet = colors.violet;
export const orange = colors.orange;
export const pink = colors.pink;

export const neutral = {
  white: colors.white,
  black: colors.black,
} as const;

/** All in-system palettes, keyed by name. */
export const palettes = { gray, brand, red, blue, emerald, violet, orange, pink } as const;

export type PaletteName = keyof typeof palettes;
