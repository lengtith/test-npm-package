// src/components/Input.stories.tsx

import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Input, { InputProps } from './Input';

const meta: Meta<typeof Input> = {
  title: 'SabaiCode/Atoms/Input',
  tags: ['autodocs'],
  component: Input,
  argTypes: {
    label: { control: 'text' },
    id: { control: 'text' },
    name: { control: 'text' },
    type: { control: 'inline-radio', options: ['text', 'number', 'email', 'password', 'tel', 'hidden'] },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
    value: { control: 'text' },
    className: { control: 'text' },
    customError: { control: 'text' },
    isSubmitted: { control: 'boolean' },
    onChange: { action: 'changed' },
  },
};

export default meta;

type Story = StoryObj<InputProps>;

export const Default: Story = {
  args: {
    label: 'Default Input',
    name: 'default-input',
    placeholder: 'Enter text',
    type: "text"
  },
};

export const Email: Story = {
  args: {
    label: 'Email Input',
    name: 'email-input',
    type: 'email',
    placeholder: 'Enter your email',
    required: true,
  },
};

export const Password: Story = {
  args: {
    label: 'Password Input',
    name: 'password-input',
    type: 'password',
    placeholder: 'Enter your password',
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    name: 'disabled-input',
    placeholder: 'Disabled input',
    disabled: true,
  },
};

export const WithCustomError: Story = {
  args: {
    label: 'Input with Custom Error',
    name: 'input-with-custom-error',
    placeholder: 'Enter text',
    customError: 'This is a custom error message',
  },
};

export const WithValidation: Story = {
  args: {
    label: 'Input with Validation',
    name: 'input-with-validation',
    placeholder: 'Enter text',
    required: true,
    validate: (value) => {
      if (value.length < 5) {
        return 'Value must be at least 5 characters long';
      }
      return '';
    },
  },
  render: (args) => {
    const [value, setValue] = React.useState('');

    return (
      <Input
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
};
