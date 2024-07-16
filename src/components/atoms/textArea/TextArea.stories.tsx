// src/components/Textarea.stories.tsx

import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Textarea, { TextareaProps } from './TextArea';

const meta: Meta<typeof Textarea> = {
  title: 'SabaiCode/Atoms/Textarea',
  tags: ['autodocs'],
  component: Textarea,
  argTypes: {
    id: { control: 'text' },
    name: { control: 'text' },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
    value: { control: 'text' },
    label: { control: 'text' },
    className: { control: 'text' },
    customError: { control: 'text' },
    isSubmitted: { control: 'boolean' },
    validate: () => { },
    onChange: { action: 'changed' },
  },
};

export default meta;

type Story = StoryObj<TextareaProps>;

export const Default: Story = {
  args: {
    label: 'Default Textarea',
    name: 'default-textarea',
    placeholder: 'Enter text here...',
  },
};

export const WithPlaceholder: Story = {
  args: {
    label: 'Textarea with Placeholder',
    name: 'textarea-with-placeholder',
    placeholder: 'This is a placeholder',
  },
};

export const Required: Story = {
  args: {
    label: 'Required Textarea',
    name: 'required-textarea',
    required: true,
    placeholder: 'This field is required',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Textarea',
    name: 'disabled-textarea',
    disabled: true,
    placeholder: 'This field is disabled',
  },
};

export const WithCustomError: Story = {
  args: {
    label: 'Textarea with Custom Error',
    name: 'textarea-with-custom-error',
    placeholder: 'Enter text here...',
    customError: 'This is a custom error message',
  },
};

export const WithValidation: Story = {
  args: {
    label: 'Textarea with Validation',
    name: 'textarea-with-validation',
    placeholder: 'Enter text here...',
    required: true,
    validate: (value) => {
      if (value.length < 10) {
        return 'Text must be at least 10 characters long';
      }
      return '';
    },
  },
  render: (args) => {
    const [value, setValue] = useState('');

    return (
      <Textarea
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
};
