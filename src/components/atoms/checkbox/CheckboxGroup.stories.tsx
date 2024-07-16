// src/components/CheckboxGroup.stories.tsx

import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import CheckboxGroup from './CheckboxGroup';
import Checkbox from './Checkbox';

const meta: Meta<typeof CheckboxGroup> = {
  title: 'SabaiCode/Atoms/Checkbox Group',
  tags: ['autodocs'],
  component: CheckboxGroup,
  argTypes: {
    label: { control: 'text' },
    value: [],
    direction: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    required: { control: 'boolean' },
    isInvalid: { control: 'boolean' },
    children: { control: undefined },
  },
};

export default meta;

type Story = StoryObj<typeof CheckboxGroup>;

export const Vertical: Story = {
  args: {
    label: 'Vertical Checkbox Group',
    value: [],
    direction: 'vertical',
    required: false,
    isInvalid: false,
    children: (
      <>
        <Checkbox value="option1">Option 1</Checkbox>
        <Checkbox value="option2">Option 2</Checkbox>
        <Checkbox value="option3">Option 3</Checkbox>
      </>
    ),
  },
};

export const Horizontal: Story = {
  args: {
    label: 'Horizontal Checkbox Group',
    value: [],
    direction: 'horizontal',
    required: false,
    isInvalid: false,
    children: (
      <>
        <Checkbox value="option1">Option 1</Checkbox>
        <Checkbox value="option2">Option 2</Checkbox>
        <Checkbox value="option3">Option 3</Checkbox>
      </>
    ),
  },
};

export const Required: Story = {
  args: {
    label: 'Required Checkbox Group',
    value: [],
    direction: 'vertical',
    required: true,
    isInvalid: false,
    children: (
      <>
        <Checkbox value="option1">Option 1</Checkbox>
        <Checkbox value="option2">Option 2</Checkbox>
        <Checkbox value="option3">Option 3</Checkbox>
      </>
    ),
  },
};

export const Invalid: Story = {
  args: {
    label: 'Invalid Checkbox Group',
    value: [],
    direction: 'vertical',
    required: false,
    isInvalid: true,
    children: (
      <>
        <Checkbox value="option1">Option 1</Checkbox>
        <Checkbox value="option2">Option 2</Checkbox>
        <Checkbox value="option3">Option 3</Checkbox>
      </>
    ),
  },
};
