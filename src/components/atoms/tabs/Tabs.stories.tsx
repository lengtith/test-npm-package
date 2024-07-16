// src/components/Tabs.stories.tsx

import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Tabs, Tab } from './Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'SabaiCode/Atoms/Tabs',
  tags: ['autodocs'],
  component: Tabs,
  args: {
    'aria-label': 'Tabs Example',
    rounded: 'full',
    items: [
      { id: 1, label: 'Tab 1', content: 'Content 1' },
      { id: 2, label: 'Tab 2', content: 'Content 2' },
      { id: 3, label: 'Tab 3', content: 'Content 3' },
    ],
    children: (item: { label: string, content: React.ReactNode }) => <Tab title={item.label}>{item.content}</Tab>,
  },
  argTypes: {
    'aria-label': { control: 'text' },
    rounded: { control: 'select', options: ['none', 'sm', 'md', 'lg', 'full'] },
  },
};

export default meta;

type Story = StoryObj<typeof Tabs>;

export const Default: Story = {};

export const WithCustomClassName: Story = {
  args: {
    className: 'custom-class',
  },
};

export const WithSelectedTab: Story = {
  args: {
    selecteTab: 2,
  },
};

export const RoundedSm: Story = {
  args: {
    rounded: 'sm',
  },
};

export const RoundedMd: Story = {
  args: {
    rounded: 'md',
  },
};

export const RoundedLg: Story = {
  args: {
    rounded: 'lg',
  },
};

export const RoundedNone: Story = {
  args: {
    rounded: 'none',
  },
};
