// src/components/Checkbox.stories.tsx

import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Checkbox, { CheckboxProps } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'SabaiCode/Atoms/Checkbox',
  tags: ['autodocs'],
  component: Checkbox,
  argTypes: {
    isChecked: { control: 'boolean' },
    value: { control: 'text' },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    radius: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'full'],
    },
    disabled: { control: 'boolean' },
    className: { control: 'text' },
    children: { control: 'text' },
    onChange: { action: 'changed' },
  },
};

export default meta;

type Story = StoryObj<CheckboxProps>;

export const Small: Story = {
  args: {
    size: 'sm',
    radius: 'sm',
    disabled: false,
    children: 'Small Checkbox',
    isChecked: false,
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
    radius: 'md',
    disabled: false,
    children: 'Medium Checkbox',
    isChecked: false,
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    radius: 'lg',
    disabled: false,
    children: 'Large Checkbox',
    isChecked: false,
  },
};

export const FullRadius: Story = {
  args: {
    size: 'md',
    radius: 'full',
    disabled: false,
    children: 'Full Radius Checkbox',
    isChecked: false,
  },
};

export const Disabled: Story = {
  args: {
    size: 'md',
    radius: 'md',
    disabled: true,
    children: 'Disabled Checkbox',
    isChecked: false,
  },
};

export const Checked: Story = {
  args: {
    size: 'md',
    radius: 'md',
    disabled: false,
    children: 'Checked Checkbox',
    isChecked: true,
  },
};

export const CustomClass: Story = {
  args: {
    size: 'md',
    radius: 'md',
    disabled: false,
    children: 'Custom Class Checkbox',
    className: "text-sm text-blue-500",
    isChecked: true,
  },
};
