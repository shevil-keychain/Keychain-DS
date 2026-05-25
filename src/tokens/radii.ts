/**
 * Keychain primitive border-radius scale.
 * Named by px value. Semantic radius roles (`default`, `overlay`, `pill`) layer on top
 * in `semantic.ts`.
 */

export const radii = {
  0:  '0px',
  2:  '2px',
  4:  '4px',
  6:  '6px',
  8:  '8px',
  12: '12px',
  16: '16px',
  24: '24px',
  full: '9999px',
} as const;

export type RadiusToken = keyof typeof radii;
