import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { QuillEditor } from "./QuillEditor";

const meta: Meta<typeof QuillEditor> = {
  title: "Sabaicode/Atoms/QuillEditor",
  component: QuillEditor,
  argTypes: {
    label: { control: "text" },
    value: { control: "text" },
    onChange: { action: "onChange" },
    errorMessage: { control: "text" },
    required: { control: "boolean" },
    placeholder: { control: "text" },
  },
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div style={{ width: "500px" }}>
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Your Text",
    value: "",
    onChange: action("onChange"),
    errorMessage: "",
    required: false,
    placeholder: "Enter text here...",
  },
};
