import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

void React;

// Canary — proves Tailwind + global.css loaded in the test runner via brand yellow.
function BrandChip() {
  return (
    <span
      data-testid="brand-chip"
      className="inline-block rounded-8 bg-brand-300 px-12 py-4 text-sm font-semibold text-black"
    >
      Keychain
    </span>
  );
}

const meta: Meta<typeof BrandChip> = {
  title: 'Foundations/CssCheck',
  component: BrandChip,
  tags: ['ai-generated'],
};
export default meta;

type Story = StoryObj<typeof BrandChip>;

// Hex #FFEC44 → rgb(255, 236, 68)
const BRAND_RGB = 'rgb(255, 236, 68)';

export const TailwindLoaded: Story = {
  play: async ({ canvas }) => {
    const chip = canvas.getByTestId('brand-chip');
    await expect(getComputedStyle(chip).backgroundColor).toBe(BRAND_RGB);
  },
};
