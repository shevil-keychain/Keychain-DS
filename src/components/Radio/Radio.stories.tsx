import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Radio, RadioGroup } from './Radio';

void React;

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/Radio',
  component: RadioGroup,
  parameters: { layout: 'centered' },
  argTypes: {
    orientation: { control: 'inline-radio', options: ['vertical', 'horizontal'] },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Playground: Story = {
  args: { defaultValue: 'b', label: 'Pick a plan' },
  render: (args) => (
    <RadioGroup {...args}>
      <Radio value="a" label="Hobby" />
      <Radio value="b" label="Pro" />
      <Radio value="c" label="Enterprise" />
    </RadioGroup>
  ),
};

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="a">
      <Radio value="a" label="One" />
      <Radio value="b" label="Two" />
      <Radio value="c" label="Three" />
    </RadioGroup>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <RadioGroup defaultValue="email" label="Notification channel">
      <Radio value="email" label="Email" description="Daily digest delivered every morning at 8am." />
      <Radio value="sms" label="SMS" description="Critical alerts only — billing, security, downtime." />
      <Radio value="push" label="Push" description="In-app and mobile notifications for everything." />
    </RadioGroup>
  ),
};

export const States: Story = {
  render: () => (
    <RadioGroup defaultValue="checked">
      <Radio value="unchecked" label="Unselected" />
      <Radio value="checked" label="Selected" />
      <Radio value="disabled" label="Disabled" disabled />
      <Radio value="disabled-checked" label="Disabled + selected" disabled />
    </RadioGroup>
  ),
};

export const Group: Story = {
  render: () => (
    <RadioGroup defaultValue="created" label="Status">
      <Radio value="created" label="Created" />
      <Radio value="scheduled" label="Scheduled" />
      <Radio value="in-progress" label="In Progress" />
      <Radio value="completed" label="Completed" />
      <Radio value="paused" label="Paused" />
      <Radio value="cancelled" label="Cancelled" />
    </RadioGroup>
  ),
};

export const GroupHorizontal: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <RadioGroup defaultValue="md" label="Size" orientation="horizontal">
      <Radio value="sm" label="Small" />
      <Radio value="md" label="Medium" />
      <Radio value="lg" label="Large" />
      <Radio value="xl" label="Extra large" />
    </RadioGroup>
  ),
};

export const GroupWithSubtext: Story = {
  render: () => (
    <RadioGroup defaultValue="email" label="Notification channel">
      <Radio value="email" label="Email" description="Daily digest delivered every morning at 8am." />
      <Radio value="sms" label="SMS" description="Critical alerts only — billing, security, downtime." />
      <Radio value="push" label="Push" description="In-app and mobile notifications for everything." />
      <Radio value="slack" label="Slack" description="Posts to your connected workspace channel." />
    </RadioGroup>
  ),
};

export const GroupWithSubtextHorizontal: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <RadioGroup defaultValue="email" label="Notification channel" orientation="horizontal">
      <Radio value="email" label="Email" description="Daily digest, 8am." />
      <Radio value="sms" label="SMS" description="Critical alerts only." />
      <Radio value="push" label="Push" description="In-app + mobile." />
      <Radio value="slack" label="Slack" description="Posts to your workspace." />
    </RadioGroup>
  ),
};
