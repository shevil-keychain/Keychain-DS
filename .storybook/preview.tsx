import type { Preview } from '@storybook/react-vite';
import '../src/styles/global.css';
import { generateCssVars } from '../src/tokens/semantic';

/**
 * Inject the semantic CSS variables generated from `src/tokens/semantic.ts`.
 * Runs once at module load — single source of truth for token values lives in semantic.ts.
 */
if (typeof document !== 'undefined') {
  const ID = 'keychain-semantic-tokens';
  let style = document.getElementById(ID) as HTMLStyleElement | null;
  if (!style) {
    style = document.createElement('style');
    style.id = ID;
    document.head.appendChild(style);
  }
  style.textContent = generateCssVars();
}

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: { test: 'todo' },
    options: {
      storySort: {
        order: [
          'Foundations',
          ['Introduction', 'Colors', 'Typography', 'Spacing', 'Radii', 'Shadows', 'Motion', 'Semantic Tokens'],
          'Primitives',
          'Components',
          '*',
        ],
      },
    },
  },
};

export default preview;
