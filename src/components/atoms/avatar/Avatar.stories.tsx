// src/components/Avatar.stories.tsx

import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Avatar from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'SabaiCode/Atoms/Avatar',
  tags: ['autodocs'],
  component: Avatar,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    src: { control: 'text' },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    radius: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'full'],
    },
    isDisabled: { control: 'boolean' },
    name: { control: 'text' },
    className: { control: 'text' },
    onClick: { action: 'clicked' },
  },
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const Small: Story = {
  args: {
    size: 'sm',
    radius: 'full',
    isDisabled: false,
    name: 'Small Avatar',
    className: '',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
    radius: 'full',
    isDisabled: false,
    name: 'Medium Avatar',
    className: '',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    radius: 'full',
    isDisabled: false,
    name: 'Large Avatar',
    className: '',
  },
};

export const Disabled: Story = {
  args: {
    size: 'md',
    radius: 'full',
    isDisabled: true,
    name: 'Disabled Avatar',
    className: '',
  },
};

export const CustomRadius: Story = {
  args: {
    size: 'md',
    radius: 'lg',
    isDisabled: false,
    name: 'Custom Radius Avatar',
    className: '',
  },
};

export const WithImage: Story = {
  args: {
    size: 'md',
    radius: 'full',
    isDisabled: false,
    name: 'With Image Avatar',
    src: "https://api.dicebear.com/9.x/adventurer/svg?seed=Cookie",
    className: '',
  },
};

export const CustomClass: Story = {
  args: {
    size: 'md',
    radius: 'full',
    isDisabled: false,
    name: 'Custom Class Avatar',
    icon: 'student',
    className: "border-blue-500 bg-blue-100",
  },
};
