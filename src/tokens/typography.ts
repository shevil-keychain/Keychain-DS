/**
 * Keychain primitive typography.
 *
 * Source of truth: Figma for sizes, code for weights (Inter optical shift, -100).
 * Sizes are capped at `2xl` (32px) — display sizes are out of system.
 * Weights are locked to the four below; Tailwind's `font-thin/light/extrabold/black` are removed.
 */

export type FontSizeEntry = [string, { lineHeight: string }];

export const fontSize: Record<string, FontSizeEntry> = {
  eyebrow: ['10px', { lineHeight: '12px' }],
  xs:      ['12px', { lineHeight: '16px' }],
  sm:      ['14px', { lineHeight: '20px' }],
  base:    ['16px', { lineHeight: '24px' }],
  lg:      ['20px', { lineHeight: '28px' }],
  xl:      ['24px', { lineHeight: '32px' }],
  '2xl':   ['32px', { lineHeight: '40px' }],
};

export const fontWeight = {
  normal:   '300',
  medium:   '400',
  semibold: '500',
  bold:     '600',
} as const;

export type FontSizeToken = keyof typeof fontSize;
export type FontWeightToken = keyof typeof fontWeight;
