// src/components/Typography.stories.tsx

import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Typography, { TypographyProps } from './Typography';

const meta: Meta<typeof Typography> = {
  title: 'SabaiCode/Atoms/Typography',
  tags: ['autodocs'],
  component: Typography,
  argTypes: {
    fontSize: { 
      control: 'select', 
      options: ["base", "xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl"],
    },
    className: { control: 'text' },
    as: { 
      control: 'select', 
      options: ["p", "span", "b", "i", "u", "abbr", "cite", "del", "em", "ins", "mark", "s", "samp", "sub", "sup"],
    },
    textAlign: { 
      control: 'select', 
      options: ["left", "right", "center", "justify"],
    },
    variant: { 
      control: 'select', 
      options: ["primary", "title", "link"],
    },
    href: { control: 'text' },
    children: { control: 'text' },
    onClick: { action: 'clicked' },
  },
};

export default meta;

type Story = StoryObj<TypographyProps>;

export const Default: Story = {
  args: {
    fontSize: 'md',
    textAlign: 'left',
    variant: 'primary',
    children: 'This is a default typography component.',
  },
};

export const Title: Story = {
  args: {
    fontSize: '2xl',
    textAlign: 'center',
    variant: 'title',
    children: 'This is a title typography component.',
  },
};

export const Link: Story = {
  args: {
    fontSize: 'lg',
    textAlign: 'left',
    variant: 'link',
    href: 'https://example.com',
    children: 'This is a link typography component.',
  },
};

export const CustomClassName: Story = {
  args: {
    fontSize: 'md',
    textAlign: 'justify',
    variant: 'primary',
    className: 'text-red-500',
    children: 'This is a typography component with a custom class name.',
  },
};
