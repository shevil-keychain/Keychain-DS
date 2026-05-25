import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Toggle } from './Toggle';

void React;

const cx = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(' ');

const meta: Meta<typeof Toggle> = {
  title: 'Components/Toggle',
  component: Toggle,
  parameters: { layout: 'centered' },
  args: { label: 'Enable notifications' },
  argTypes: {
    disabled: { control: 'boolean' },
    checked: { control: 'boolean' },
    label: { control: 'text' },
    description: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<typeof Toggle>;

export const Playground: Story = {};

export const Default: Story = { args: {} };

export const On: Story = { args: { defaultChecked: true } };

export const WithDescription: Story = {
  args: {
    label: 'Email notifications',
    description: 'We will send you a digest once a week.',
    defaultChecked: true,
  },
};

export const NoLabel: Story = { args: { label: undefined, 'aria-label': 'Notifications' } };

export const States: Story = {
  render: () => (
    <div className="grid grid-cols-[auto_auto] items-center gap-x-24 gap-y-16">
      <span className="text-xs text-fg-subtle">Off</span>
      <Toggle label="Off" />
      <span className="text-xs text-fg-subtle">On</span>
      <Toggle label="On" defaultChecked />
      <span className="text-xs text-fg-subtle">Disabled off</span>
      <Toggle label="Disabled off" disabled />
      <span className="text-xs text-fg-subtle">Disabled on</span>
      <Toggle label="Disabled on" disabled defaultChecked />
    </div>
  ),
};

// ── Grouped (per Guidelines/Composition) ────────────────────────────────────

type Orientation = 'vertical' | 'horizontal';

function NotificationFieldset({ orientation = 'vertical' }: { orientation?: Orientation }) {
  return (
    <fieldset
      className={cx(
        'flex',
        orientation === 'horizontal' ? 'flex-row flex-wrap gap-24' : 'flex-col gap-16',
      )}
    >
      <legend className="text-sm text-fg mb-12 w-full">Notification channels</legend>
      <Toggle label="Email" description="Daily digest delivered every morning at 8am." defaultChecked />
      <Toggle label="SMS" description="Critical alerts only — billing, security, downtime." />
      <Toggle label="Push" description="In-app and mobile notifications for everything." defaultChecked />
      <Toggle label="Slack" description="Posts to your connected workspace channel." />
    </fieldset>
  );
}

export const Group: Story = {
  argTypes: {
    orientation: {
      control: 'inline-radio',
      options: ['vertical', 'horizontal'] as Orientation[],
      table: { category: 'Group layout' },
    },
  },
  args: { orientation: 'vertical' } as never,
  render: (args: { orientation?: Orientation }) => (
    <NotificationFieldset orientation={args.orientation} />
  ),
};

export const GroupHorizontal: Story = {
  parameters: { layout: 'padded' },
  render: () => <NotificationFieldset orientation="horizontal" />,
};
