import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { BrowserRouter as Router } from "react-router-dom";
import { within, userEvent, expect } from "@storybook/test";
import { Sidebar } from "./Sidebar";

const meta: Meta<typeof Sidebar> = {
  title: 'SabaiCode/Organisms/Sidebar',
  component: Sidebar,
  decorators: [
    (Story) => (
      <Router>
        <Story />
      </Router>
    ),
  ],
  argTypes: {
    expand: { control: 'boolean' },
    items: { control: 'object' },
    onSelectItem: { action: 'itemSelected' },
    activeItem: { control: 'object' },
  },
  args: {
    expand: true,
    items: [
      { icon: 'dashboard', text: 'Dashboard', path: '/dashboard' },
      { icon: 'report', text: 'Reports', path: '/reports', disabled: true },
      { icon: 'student', text: 'Student', path: '/students' },
    ],
    activeItem: { icon: 'dashboard', text: 'Dashboard', path: '/dashboard' },
  },
};

export default meta;

type Story = StoryObj<typeof Sidebar>;

// Define the stories
export const Expanded: Story = {
  args: {
    expand: true,
  },
};

export const Collapsed: Story = {
  args: {
    expand: false,
  },
};

export const WithDisabledItem: Story = {
  args: {
    expand: true,
    items: [
      { icon: 'dashboard', text: 'Dashboard', path: '/dashboard' },
      { icon: 'report', text: 'Reports', path: '/reports', disabled: true },
      { icon: 'settings', text: 'Settings', path: '/settings' },
    ],
  },
};

// Define interaction test for the Sidebar component
Expanded.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const dashboardItem = canvas.getByText('Dashboard');
  await userEvent.click(dashboardItem);
  await expect(action('itemSelected')).toHaveBeenCalled();
};