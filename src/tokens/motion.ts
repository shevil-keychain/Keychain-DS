/**
 * Keychain primitive motion (durations + easings).
 * Inherits Tailwind's defaults at the primitive layer. Semantic motion roles
 * (`duration-quick/base/slow`, `ease-standard/emphasized/exit`) layer on top in `semantic.ts`.
 */
import defaultTheme from 'tailwindcss/defaultTheme';

export const transitionDuration = defaultTheme.transitionDuration;
export const transitionTimingFunction = defaultTheme.transitionTimingFunction;
