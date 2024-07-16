// src/components/Skeleton.stories.tsx

import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Skeleton, { SkeletonProps } from './Skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'SabaiCode/Atoms/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    className: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<SkeletonProps>;

export const Default: Story = {
  render: (args: any) => {
    return (
      <div className="w-[300px] flex items-center gap-3">
        <div>
          <Skeleton className="flex rounded-lg w-12 h-12" />
        </div>
        <div className="w-full flex flex-col gap-2">
          <Skeleton className="h-3 w-3/5 rounded-sm" />
          <Skeleton className="h-3 w-4/5 rounded-sm" />
        </div>
      </div>
    )
  }
};

export const Circle: Story = {
  render: (args: any) => {
    return (
      <div className="w-[300px] flex items-center gap-3">
        <div>
          <Skeleton className="flex rounded-full w-12 h-12" />
        </div>
        <div className="w-full flex flex-col gap-2">
          <Skeleton className="h-3 w-3/5 rounded-lg" />
          <Skeleton className="h-3 w-4/5 rounded-lg" />
        </div>
      </div>
    )
  }
};

export const CustomClassName: Story = {
  render: (args: any) => {
    return (
      <div className="w-[300px] flex items-center gap-3">
        <div>
          <Skeleton className="flex rounded-lg w-12 h-12 bg-blue-500" />
        </div>
        <div className="w-full flex flex-col gap-2">
          <Skeleton className="h-3 w-3/5 rounded-sm bg-blue-500" />
          <Skeleton className="h-3 w-4/5 rounded-sm bg-blue-500" />
        </div>
      </div>
    )
  }
};
