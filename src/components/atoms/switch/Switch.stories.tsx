// src/components/Switch.stories.tsx

import React, { ChangeEvent, useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Switch, { SwitchProps } from './Switch'; // Adjust the import based on your project structure

const meta: Meta<typeof Switch> = {
  title: 'SabaiCode/Atoms/Switch',
  component: Switch,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    checked: { control: 'boolean' },
    onChange: { action: 'changed' },
    size: { 
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<SwitchProps>;

export const Default: Story = {
  args: {
    checked: false,
    size: 'md',
    label: 'Switch Label',
  },
};

export const Checked: Story = {
  args: {
    checked: true,
    size: 'md',
    label: 'Switch Label',
  },
};

export const Small: Story = {
  args: {
    checked: false,
    size: 'sm',
    label: 'Small Switch',
  },
};

export const Large: Story = {
  args: {
    checked: false,
    size: 'lg',
    label: 'Large Switch',
  },
};

export const Disabled: Story = {
  args: {
    checked: false,
    size: 'md',
    disabled: true,
    label: 'Disabled Switch',
  },
};

export const Interactive: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      setChecked(event.target.checked);
    };

    return (
      <Switch
        {...args}
        checked={checked}
        onChange={handleChange}
      />
    );
  },
};
