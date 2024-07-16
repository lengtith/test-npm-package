// src/stories/Button.stories.tsx

import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Button from './Button';
import { IconName } from "../icon/Icon";

const iconNames: IconName[] = [
  "arrowDown", "arrowUp", "course", "add", "cancel", "class", "coach", "contact",
  "dashboard", "dropdown", "invoice", "item", "list", "material", "menu", "report",
  "scholarship", "search", "student", "clock", "document-text", "academic-cap",
  "arrow-long-left", "chart-bar-square", "clock-1", "drag", "dropdown-1", "filter",
  "link", "list-bullet", "menu-1", "pencil", "pencil-square", "tick", "trash",
  "upload", "email", "phone", "arrow-up-tray", "image", "video", "excel", "word",
  "pdf", "power-point", "logout"
];

const meta: Meta<typeof Button> = {
  title: 'SabaiCode/Atoms/Button',
  tags: ['autodocs'],
  component: Button,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    children: { control: 'text' },
    className: { control: 'text' },
    colorScheme: {
      control: 'select',
      options: ['primary', 'secondary', 'error', 'warning', 'success'],
    },
    onClick: { action: 'clicked' },
    size: {
      control: 'select',
      options: ['lg', 'md', 'sm', 'xs'],
    },
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'ghost', 'link'],
    },
    icon: {
      control: { type: 'select' },
      options: iconNames,
    },
    iconPosition: {
      control: 'select',
      options: ['left', 'right', 'top', 'bottom'],
    },
    isDisabled: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    colorScheme: 'primary',
    size: 'md',
    variant: 'solid',
    iconPosition: 'right',
    isDisabled: false,
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    colorScheme: 'secondary',
    size: 'md',
    variant: 'solid',
    iconPosition: 'right',
    isDisabled: false,
  },
};

export const Error: Story = {
  args: {
    children: 'Error Button',
    colorScheme: 'error',
    size: 'md',
    variant: 'solid',
    iconPosition: 'right',
    isDisabled: false,
  },
};

export const Warning: Story = {
  args: {
    children: 'Warning Button',
    colorScheme: 'warning',
    size: 'md',
    variant: 'solid',
    iconPosition: 'right',
    isDisabled: false,
  },
};

export const Success: Story = {
  args: {
    children: 'Success Button',
    colorScheme: 'success',
    size: 'md',
    variant: 'solid',
    iconPosition: 'right',
    isDisabled: false,
  },
};

export const WithIcon: Story = {
  args: {
    children: 'Button with Icon',
    colorScheme: 'primary',
    size: 'md',
    variant: 'solid',
    icon: "coach",
    iconPosition: 'left',
    isDisabled: false,
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    colorScheme: 'primary',
    size: 'md',
    variant: 'solid',
    icon: 'coach',
    iconPosition: 'right',
    isDisabled: true,
  },
};
