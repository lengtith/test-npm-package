import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { CourseDataCatalog } from "./CourseDataCatalog";

const meta: Meta<typeof CourseDataCatalog> = {
  title: "SabaiCode/Templates/CourseDataCatalog",
  component: CourseDataCatalog,
  parameters: {
    design: {
      type: "figma",
      url: "",
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof CourseDataCatalog>;

export const Default: Story = {
  render: () => <CourseDataCatalog />,
};
