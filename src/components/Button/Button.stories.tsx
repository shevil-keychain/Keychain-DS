import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

void React;

const ArrowRight = () => (
  <svg viewBox="0 0 16 16" fill="none" className="h-full w-full">
    <path d="M3 8h10m0 0L8.5 3.5M13 8l-4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Trash = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
    <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14zM10 11v6M14 11v6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: { layout: 'centered' },
  args: { children: 'Button' },
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary', 'secondary', 'tertiary', 'danger'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    loading: { control: 'boolean' },
    iconOnly: { control: 'boolean' },
    disabled: { control: 'boolean' },
    iconLeading: { control: false },
    iconTrailing: { control: false },
  },
};
export default meta;
type Story = StoryObj<typeof Button>;

export const Playground: Story = {};

export const Primary: Story = { args: { variant: 'primary' } };
export const Secondary: Story = { args: { variant: 'secondary' } };
export const Tertiary: Story = { args: { variant: 'tertiary' } };
export const Danger: Story = { args: { variant: 'danger', children: 'Remove' } };

export const AllVariants: Story = {
  render: () => (
    <div className="flex items-center gap-16">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="tertiary">Tertiary</Button>
      <Button variant="danger">Danger</Button>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-16">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div className="flex flex-col gap-16">
      <div className="flex items-center gap-16">
        <Button variant="primary" iconLeading={<ArrowRight />}>Continue</Button>
        <Button variant="primary" iconTrailing={<ArrowRight />}>Continue</Button>
        <Button variant="danger" iconLeading={<Trash />}>Remove</Button>
      </div>
      <div className="flex items-center gap-16">
        <Button variant="secondary" size="sm" iconLeading={<ArrowRight />}>Next</Button>
        <Button variant="secondary" size="md" iconLeading={<ArrowRight />}>Next</Button>
        <Button variant="secondary" size="lg" iconLeading={<ArrowRight />}>Next</Button>
      </div>
    </div>
  ),
};

export const IconOnly: Story = {
  render: () => (
    <div className="flex items-center gap-16">
      <Button iconOnly size="sm" iconLeading={<Trash />} aria-label="Remove" />
      <Button iconOnly size="md" iconLeading={<Trash />} aria-label="Remove" />
      <Button iconOnly size="lg" iconLeading={<Trash />} aria-label="Remove" />
      <Button iconOnly variant="secondary" iconLeading={<Trash />} aria-label="Remove" />
      <Button iconOnly variant="tertiary" iconLeading={<Trash />} aria-label="Remove" />
      <Button iconOnly variant="danger" iconLeading={<Trash />} aria-label="Remove" />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="grid grid-cols-5 items-center gap-16">
      {(['primary', 'secondary', 'tertiary', 'danger'] as const).map((v) => (
        <div key={v} className="contents">
          <div className="text-xs text-fg-subtle">{v}</div>
          <Button variant={v}>Rest</Button>
          <Button variant={v}>Hover (use :hover)</Button>
          <Button variant={v} disabled>Disabled</Button>
          <Button variant={v} loading>Loading</Button>
        </div>
      ))}
    </div>
  ),
};

export const Matrix: Story = {
  render: () => (
    <div className="flex flex-col gap-24">
      {(['primary', 'secondary', 'tertiary', 'danger'] as const).map((v) => (
        <div key={v} className="flex flex-col gap-12">
          <div className="text-xs uppercase tracking-wide text-fg-subtle">{v}</div>
          <div className="flex flex-wrap items-center gap-12">
            <Button variant={v} size="sm">Label</Button>
            <Button variant={v} size="md">Label</Button>
            <Button variant={v} size="lg">Label</Button>
            <Button variant={v} size="md" iconLeading={<ArrowRight />}>Leading</Button>
            <Button variant={v} size="md" iconTrailing={<ArrowRight />}>Trailing</Button>
            <Button variant={v} size="md" iconOnly iconLeading={<Trash />} aria-label="Remove" />
            <Button variant={v} size="md" disabled>Disabled</Button>
            <Button variant={v} size="md" loading>Loading</Button>
          </div>
        </div>
      ))}
    </div>
  ),
};
