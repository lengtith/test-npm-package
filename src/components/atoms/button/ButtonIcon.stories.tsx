// src/stories/ButtonIcon.stories.tsx

import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import ButtonIcon from './ButtonIcon';

const meta: Meta<typeof ButtonIcon> = {
  title: 'SabaiCode/Atoms/Button Icon',
  tags: ['autodocs'],
  component: ButtonIcon,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
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
    icon: { control: 'text' },
    className: { control: 'text' },
    onClick: { action: 'clicked' },
  },
};

export default meta;

type Story = StoryObj<typeof ButtonIcon>;

export const Small: Story = {
  args: {
    size: 'sm',
    radius: 'full',
    isDisabled: false,
    name: 'Small ButtonIcon',
    icon: 'student',
    className: '',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
    radius: 'full',
    isDisabled: false,
    name: 'Medium ButtonIcon',
    icon: 'student',
    className: '',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    radius: 'full',
    isDisabled: false,
    name: 'Large ButtonIcon',
    icon: 'student',
    className: '',
  },
};

export const Disabled: Story = {
  args: {
    size: 'md',
    radius: 'full',
    isDisabled: true,
    name: 'Disabled ButtonIcon',
    icon: 'student',
    className: '',
  },
};

export const CustomRadius: Story = {
  args: {
    size: 'md',
    radius: 'lg',
    isDisabled: false,
    name: 'Custom Radius ButtonIcon',
    icon: 'student',
    className: '',
  },
};

export const CustomClass: Story = {
  args: {
    size: 'md',
    radius: 'full',
    isDisabled: false,
    name: 'Custom Class ButtonIcon',
    icon: 'student',
    className: 'bg-blue-100 border-blue-500',
  },
};
