// src/components/Card.stories.tsx

import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardBody, CardFooter } from './Card';

const meta: Meta<typeof Card> = {
  title: 'SabaiCode/Atoms/Card',
  tags: ['autodocs'],
  component: Card,
  argTypes: {
    className: { control: 'text' },
    shadow: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
    },
    radius: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
    },
    children: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    className: '',
    shadow: 'md',
    radius: 'md',
    children: (
      <>
        <CardHeader>Card Header</CardHeader>
        <CardBody>Card Body</CardBody>
        <CardFooter>Card Footer</CardFooter>
      </>
    ),
  },
};

export const NoShadow: Story = {
  args: {
    className: '',
    shadow: 'none',
    radius: 'md',
    children: (
      <>
        <CardHeader>Card Header</CardHeader>
        <CardBody>Card Body</CardBody>
        <CardFooter>Card Footer</CardFooter>
      </>
    ),
  },
};

export const LargeShadow: Story = {
  args: {
    className: '',
    shadow: 'lg',
    radius: 'md',
    children: (
      <>
        <CardHeader>Card Header</CardHeader>
        <CardBody>Card Body</CardBody>
        <CardFooter>Card Footer</CardFooter>
      </>
    ),
  },
};

export const RoundedCorners: Story = {
  args: {
    className: '',
    shadow: 'md',
    radius: 'lg',
    children: (
      <>
        <CardHeader>Card Header</CardHeader>
        <CardBody>Card Body</CardBody>
        <CardFooter>Card Footer</CardFooter>
      </>
    ),
  },
};

export const CustomClass: Story = {
  args: {
    className: 'custom-class',
    shadow: 'md',
    radius: 'md',
    children: (
      <>
        <CardHeader>Card Header</CardHeader>
        <CardBody>Card Body</CardBody>
        <CardFooter>Card Footer</CardFooter>
      </>
    ),
  },
};

const headerMeta: Meta<typeof CardHeader> = {
  title: 'Components/CardHeader',
  component: CardHeader,
  argTypes: {
    className: { control: 'text' },
    children: { control: 'text' },
  },
};

export const HeaderDefault: StoryObj<typeof CardHeader> = {
  args: {
    className: '',
    children: 'Card Header',
  },
};

const bodyMeta: Meta<typeof CardBody> = {
  title: 'Components/CardBody',
  component: CardBody,
  argTypes: {
    className: { control: 'text' },
    children: { control: 'text' },
  },
};

export const BodyDefault: StoryObj<typeof CardBody> = {
  args: {
    className: '',
    children: 'Card Body',
  },
};

const footerMeta: Meta<typeof CardFooter> = {
  title: 'Components/CardFooter',
  component: CardFooter,
  argTypes: {
    className: { control: 'text' },
    children: { control: 'text' },
  },
};

export const FooterDefault: StoryObj<typeof CardFooter> = {
  args: {
    className: '',
    children: 'Card Footer',
  },
};
