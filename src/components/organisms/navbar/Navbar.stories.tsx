// Navbar.stories.tsx
import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Navbar } from "./Navbar";
import { action } from "@storybook/addon-actions";
import { userEvent, within, expect } from "@storybook/test";

const meta: Meta<typeof Navbar> = {
  title: "Sabaicode/Organisms/Navbar",
  component: Navbar,
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: "https://www.figma.com/proto/1ck3QkLujqYR52ayf0evpX/Sabaicode-Admin-App?page-id=0%3A1&node-id=2618-2795&viewport=-5294%2C518%2C0.34&t=MrZwMZPHXQcqpI9b-1&scaling=min-zoom&starting-point-node-id=2618%3A2795"
    }
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Expanded: Story = {
  args: {
    expand: true,
    toggleSidebar: action("toggle-sidebar"),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Simulate user interactions
    await userEvent.click(canvas.getByLabelText("toggle-sidebar"));

    // Add assertions using expect
    await expect(canvas.getByLabelText("toggle-sidebar")).toBeVisible();

    // Delay to observe changes
    await new Promise((r) => setTimeout(r, 1000));
  },
};

export const Collapsed: Story = {
  args: {
    expand: false,
    toggleSidebar: action("toggle-sidebar"),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Simulate user interactions
    await userEvent.click(canvas.getByLabelText("toggle-sidebar"));
  },
};
