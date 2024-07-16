// src/components/ButtonUpload.stories.tsx

import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import ButtonUpload from './ButtonUpload';

const meta: Meta<typeof ButtonUpload> = {
  title: 'SabaiCode/Atoms/Button Upload',
  tags: ['autodocs'],
  component: ButtonUpload,
  parameters: {
    layout: 'centered'
  },
  args: {
    children: 'Upload',
    colorScheme: 'primary',
    size: 'md',
    variant: 'solid',
    isDisabled: false,
    isLoading: false,
  },
  argTypes: {
    colorScheme: { control: 'select', options: ['primary', 'secondary', 'error', 'warning', 'success'] },
    size: { control: 'select', options: ['lg', 'md', 'sm', 'xs'] },
    variant: { control: 'select', options: ['solid', 'outline', 'ghost', 'link'] },
    isDisabled: { control: 'boolean' },
    isLoading: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof ButtonUpload>;

export const Default: Story = {};

export const Primary: Story = {
  args: {
    colorScheme: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    colorScheme: 'secondary',
  },
};

export const Error: Story = {
  args: {
    colorScheme: 'error',
  },
};

export const Warning: Story = {
  args: {
    colorScheme: 'warning',
  },
};

export const Success: Story = {
  args: {
    colorScheme: 'success',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
  },
};

export const Link: Story = {
  args: {
    variant: 'link',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
  },
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};

export const FileButton: Story = {
  args: {
    onFileSelect: (file: File) => alert(`File selected: ${file.name}`),
  },
};

export const WithIcons: Story = {
  args: {
    leftIcon: <span>📁</span>,
    rightIcon: <span>📤</span>,
  },
};
