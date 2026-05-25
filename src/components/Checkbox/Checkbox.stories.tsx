import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from './Checkbox';

void React;

const cx = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(' ');

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: { layout: 'centered' },
  args: { label: 'Accept terms' },
  argTypes: {
    disabled: { control: 'boolean' },
    checked: { control: 'inline-radio', options: [false, true, 'indeterminate'] },
    label: { control: 'text' },
    description: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Playground: Story = {};

export const Default: Story = { args: {} };

export const Checked: Story = { args: { defaultChecked: true } };

export const Indeterminate: Story = { args: { checked: 'indeterminate' } };

export const WithDescription: Story = {
  args: {
    label: 'Email notifications',
    description: 'We will send you a digest once a week.',
  },
};

export const NoLabel: Story = { args: { label: undefined, 'aria-label': 'Select row' } };

export const States: Story = {
  render: () => (
    <div className="grid grid-cols-[auto_auto] items-center gap-x-24 gap-y-16">
      <span className="text-xs text-fg-subtle">Unchecked</span>
      <Checkbox label="Unchecked" />
      <span className="text-xs text-fg-subtle">Checked</span>
      <Checkbox label="Checked" defaultChecked />
      <span className="text-xs text-fg-subtle">Indeterminate</span>
      <Checkbox label="Indeterminate" checked="indeterminate" onCheckedChange={() => {}} />
      <span className="text-xs text-fg-subtle">Disabled</span>
      <Checkbox label="Disabled" disabled />
      <span className="text-xs text-fg-subtle">Disabled + checked</span>
      <Checkbox label="Disabled checked" disabled defaultChecked />
    </div>
  ),
};

// ── Grouped controls ────────────────────────────────────────────────────────
//
// Per Guidelines/Composition, group legend sits 12px from the first option,
// horizontal groups use a 24px column gap, vertical use 12–16px row gap.
// ────────────────────────────────────────────────────────────────────────────

type Orientation = 'vertical' | 'horizontal';

const groupArgTypes = {
  orientation: {
    control: 'inline-radio',
    options: ['vertical', 'horizontal'] as Orientation[],
    table: { category: 'Group layout' },
  },
};

function StatusFieldset({ orientation = 'vertical' }: { orientation?: Orientation }) {
  return (
    <fieldset
      className={cx(
        'flex',
        orientation === 'horizontal' ? 'flex-row flex-wrap gap-24' : 'flex-col gap-12',
      )}
    >
      <legend className="text-sm text-fg mb-12 w-full">Status</legend>
      <Checkbox label="Created" defaultChecked />
      <Checkbox label="Scheduled" defaultChecked />
      <Checkbox label="In Progress" />
      <Checkbox label="Completed" />
      <Checkbox label="Paused" />
      <Checkbox label="Cancelled" />
    </fieldset>
  );
}

function NotificationFieldset({ orientation = 'vertical' }: { orientation?: Orientation }) {
  return (
    <fieldset
      className={cx(
        'flex',
        orientation === 'horizontal' ? 'flex-row flex-wrap gap-24' : 'flex-col gap-16',
      )}
    >
      <legend className="text-sm text-fg mb-12 w-full">Notification channels</legend>
      <Checkbox label="Email" description="Daily digest delivered every morning at 8am." defaultChecked />
      <Checkbox label="SMS" description="Critical alerts only — billing, security, downtime." />
      <Checkbox label="Push" description="In-app and mobile notifications for everything." defaultChecked />
      <Checkbox label="Slack" description="Posts to your connected workspace channel." />
    </fieldset>
  );
}

export const Group: Story = {
  argTypes: groupArgTypes,
  args: { orientation: 'vertical' } as never,
  render: (args: { orientation?: Orientation }) => <StatusFieldset orientation={args.orientation} />,
};

export const GroupHorizontal: Story = {
  parameters: { layout: 'padded' },
  render: () => <StatusFieldset orientation="horizontal" />,
};

export const GroupWithSubtext: Story = {
  argTypes: groupArgTypes,
  args: { orientation: 'vertical' } as never,
  render: (args: { orientation?: Orientation }) => (
    <NotificationFieldset orientation={args.orientation} />
  ),
};

export const GroupWithSubtextHorizontal: Story = {
  parameters: { layout: 'padded' },
  render: () => <NotificationFieldset orientation="horizontal" />,
};
