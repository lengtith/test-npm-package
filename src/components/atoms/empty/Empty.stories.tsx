// src/components/Empty.stories.tsx

import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Empty, { EmptyProps } from './Empty';

const meta: Meta<typeof Empty> = {
  title: 'SabaiCode/Atoms/Empty',
  tags: ['autodocs'],
  component: Empty,
  argTypes: {
    img: { control: 'text' },
    desc: { control: 'text' },
    className: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<EmptyProps>;

export const Default: Story = {
  args: {
    desc: 'No data available',
    className: "flex flex-col gap-5"
  },
};

export const WithCustomImage: Story = {
  args: {
    img: 'https://www.movingtrafficmedia.com/wp-content/uploads/2023/10/website-error-messages.jpg',
    desc: 'Custom image for no data',
  },
};

export const WithCustomDescription: Story = {
  args: {
    desc: 'There is nothing here at the moment',
  },
};

export const WithCustomClassName: Story = {
  args: {
    className: "mx-auto w-96 bg-white p-5 rounded-xl shadow-lg",
    desc: 'Styled Empty Component',
  },
};
