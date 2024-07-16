// src/components/ProgressBar.stories.tsx

import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import ProgressBar, { Props as ProgressBarProps } from './ProgressBar'; // Adjust the import based on your project structure
import { Button } from "../..";

const meta: Meta<typeof ProgressBar> = {
  tags: ['autodocs'],
  title: 'SabaiCode/Atoms/ProgressBar',
  component: ProgressBar,
  argTypes: {
    progress: { control: 'number' },
    className: { control: 'text' },
    progressClassName: { control: 'text' },
    containerClassName: { control: 'text' },
    animationDuration: { control: 'number' },
    showLabel: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<ProgressBarProps>;

export const Default: Story = {
  args: {
    progress: 50,
    showLabel: true,
  },
};

export const CustomColor: Story = {
  args: {
    progress: 75,
    progressClassName: 'bg-green-500',
    containerClassName: 'bg-gray-300',
    showLabel: true,
  },
};

export const WithCustomDuration: Story = {
  args: {
    progress: 30,
    animationDuration: 1000,
    showLabel: true,
  },
};

export const WithoutLabel: Story = {
  args: {
    progress: 45,
    showLabel: false,
  },
};

export const Interactive: Story = {
  args: {
    showLabel: true
  },

  render: (args) => {
    const [progress, setProgress] = useState(0);

    const handleIncrease = () => {
      setProgress((prev) => Math.min(prev + 10, 100));
    };

    const handleDecrease = () => {
      setProgress((prev) => Math.max(prev - 10, 0));
    };

    return (
      <div>
        <ProgressBar {...args} progress={progress} className="mb-5" containerClassName="bg-white shadow-md" />
        <Button className="mr-2 inline-block" onClick={handleIncrease}>Increase</Button>
        <Button className="inline-block" onClick={handleDecrease}>Decrease</Button>
      </div>
    );
  }
};
