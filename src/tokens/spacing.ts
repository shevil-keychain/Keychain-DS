/**
 * Keychain primitive spacing scale.
 *
 * Named by px value (e.g. `space-12` = 12px). Inherits Tailwind's value set plus a custom
 * 120px step. Used everywhere Tailwind consumes the spacing scale: `p-*`, `m-*`, `w-*`,
 * `h-*`, `gap-*`, etc.
 */

export const spacing = {
  0:   '0px',
  2:   '2px',
  4:   '4px',
  6:   '6px',
  8:   '8px',
  12:  '12px',
  16:  '16px',
  20:  '20px',
  24:  '24px',
  28:  '28px',
  32:  '32px',
  40:  '40px',
  48:  '48px',
  64:  '64px',
  80:  '80px',
  96:  '96px',
  120: '120px',
  160: '160px',
} as const;

export type SpacingToken = keyof typeof spacing;
