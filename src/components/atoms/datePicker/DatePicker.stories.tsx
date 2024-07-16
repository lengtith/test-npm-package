// src/components/DatePicker.stories.tsx

import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import DatePicker, { DatePickerProps } from './DatePicker';

const meta: Meta<typeof DatePicker> = {
  title: 'SabaiCode/Atoms/DatePicker',
  tags: ['autodocs'],
  component: DatePicker,
  argTypes: {
    id: { control: 'text' },
    label: { control: 'text' },
    name: { control: 'text' },
    placeholder: { control: 'text' },
    errorMessage: { control: 'text' },
    required: { control: 'boolean' },
    value: { control: 'text' },
    defaultValue: { control: 'text' },
    className: { control: 'text' },
    onChange: { action: 'changed' },
  },
};

export default meta;

type Story = StoryObj<DatePickerProps>;

export const Default: Story = {
  args: {
    label: 'Default DatePicker',
    name: 'default-datepicker',
    placeholder: 'Select a date',
    required: false,
    errorMessage: '',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Date of Birth',
    name: 'dob',
    placeholder: 'Select a date',
    required: true,
    errorMessage: '',
  },
};

export const WithError: Story = {
  args: {
    label: 'Event Date',
    name: 'event-date',
    placeholder: 'Select a date',
    required: true,
    errorMessage: 'This field is required.',
  },
};

export const Controlled: Story = {
  args: {
    label: 'Controlled DatePicker',
    name: 'controlled-datepicker',
    placeholder: 'Select a date',
    required: false,
    value: '2024-07-15',
    errorMessage: '',
  },
};

export const DefaultValue: Story = {
  args: {
    label: 'Date with Default Value',
    name: 'default-value-datepicker',
    placeholder: 'Select a date',
    required: false,
    defaultValue: '2024-07-15',
    errorMessage: '',
  },
};
