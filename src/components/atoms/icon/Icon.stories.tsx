// src/components/Icon.stories.tsx

import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Icon, { Props as IconProps } from './Icon';

const meta: Meta<typeof Icon> = {
  title: 'SabaiCode/Atoms/Icon',
  tags: ['autodocs'],
  component: Icon,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    icon: { control: 'select', options: ["arrowDown", "arrowUp", "course", "add", "cancel", "class", "coach", "contact", "dashboard", "dropdown", "invoice", "item", "list", "material", "menu", "report", "scholarship", "search", "student", "clock", "document-text", "academic-cap", "arrow-long-left", "chart-bar-square", "clock-1", "drag", "dropdown-1", "filter", "link", "list-bullet", "menu-1", "pencil", "pencil-square", "tick", "trash", "upload", "email", "phone", "arrow-up-tray", "image", "video", "excel", "word", "pdf", "power-point", "logout", "user", "close"], },
    size: { control: 'text' },
    className: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<IconProps>;

export const Default: Story = {
  args: {
    icon: "coach",
  },
};

export const CustomSize: Story = {
  args: {
    icon: "coach",
    size: '32',
  },
};

export const WithClassName: Story = {
  args: {
    icon: "coach",
    size: '24',
    className: "text-red-500 size-20",
  },
};

export const DifferentIcon: Story = {
  args: {
    icon: "student",
    size: "24",
  },
};
