import type { StorybookConfig } from '@storybook/react-vite';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-mcp',
  ],
  framework: '@storybook/react-vite',
  viteFinal: async (cfg) => {
    cfg.plugins = cfg.plugins || [];
    // Workaround for storybookjs/storybook addon-docs bug:
    // The MDX compiler emits a raw `file://...` URL for the provider import,
    // url-encoded (`%20`) so Vite cannot resolve it on paths containing spaces.
    // Fix is PR storybookjs/storybook#34841 — remove this plugin once released.
    cfg.plugins.push({
      name: 'sb-mdx-file-url-fix',
      enforce: 'pre',
      resolveId(id: string) {
        if (id.startsWith('file://')) {
          try {
            return fileURLToPath(id);
          } catch {
            // Handles the malformed `file://./node_modules/...` shape too.
            const stripped = id.replace(/^file:\/\/(\.?\/)?/, '');
            return path.resolve(process.cwd(), decodeURIComponent(stripped));
          }
        }
        return null;
      },
    });
    return cfg;
  },
};
export default config;
