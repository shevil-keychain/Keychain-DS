/**
 * Keychain primitive shadows.
 * Inherits Tailwind's default scale at the primitive layer. Semantic shadow roles
 * (`card`, `raised`, `popover`, `modal`) layer on top in `semantic.ts`.
 */
import defaultTheme from 'tailwindcss/defaultTheme';

export const shadows = defaultTheme.boxShadow;
