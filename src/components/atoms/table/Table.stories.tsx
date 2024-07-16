import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Table } from "./Table";
import { TableBody } from "./TableBody";
import { TableCell } from "./TableCell";
import { TableContainer } from "./TableContainer";
import { TableRow } from "./TableRow";
import { TableHead } from "./TableHead";
import { action } from "@storybook/addon-actions";
import { userEvent, within } from "@storybook/test";
import { Typography } from "../typography";

const meta: Meta = {
  title: "Sabaicode/Atoms/Table",
  tags: ["autodocs"],
  component: Table,
  parameters: {
    layout: "center",
  },
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: () => (
    <TableContainer className="w-full">
      <Table className="w-full ">
        <TableHead className="border-b bg-[#F5F5F5]">
          <TableRow>
            <TableCell
              variant="head"
              className=" py-[22px] px-[34px] text-[#03085E] "
              align="left"
            >
              <Typography fontSize="base">No.</Typography>
            </TableCell>
            <TableCell
              variant="head"
              align="left"
              className=" py-[22px] px-[34px] text-[#03085E] "
            >
              <Typography fontSize="base">Course</Typography>
            </TableCell>
            <TableCell
              variant="head"
              align="left"
              className=" py-[22px] px-[34px] text-[#03085E] "
            >
              <Typography fontSize="base">Subject</Typography>
            </TableCell>
            <TableCell
              variant="head"
              align="left"
              className=" py-[22px] px-[34px] text-[#03085E] "
            >
              <Typography fontSize="base">Duration</Typography>
            </TableCell>
            <TableCell
              variant="head"
              align="left"
              className=" py-[22px] px-[34px] text-[#03085E] "
            >
              <Typography fontSize="base">Level</Typography>
            </TableCell>
            <TableCell
              variant="head"
              align="left"
              className=" py-[22px] px-[34px] text-[#03085E] "
            >
              <Typography fontSize="base">Last Update</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow
            onClick={action("row-click")}
            className="border-b cursor-pointer hover:bg-gray-50"
          >
            <TableCell align="left" className="py-[22px] px-[34px]">
              1
            </TableCell>
            <TableCell align="left" className="py-[22px] px-[34px]">
              <div className="flex items-center space-x-2">
                <img
                  src="https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="images"
                  className="w-[50px] h-[35px] rounded-md"
                />
                <p>CS Fundamental & Express</p>
              </div>
            </TableCell>
            <TableCell align="left" className="py-[22px] px-[34px]">
              <Typography fontSize="base">Web Development</Typography>
            </TableCell>
            <TableCell align="left" className="py-[22px] px-[34px]">
              <Typography fontSize="base">40 hours</Typography>
            </TableCell>
            <TableCell align="left" className="py-[22px] px-[34px]">
              <Typography fontSize="base">Basic</Typography>
            </TableCell>
            <TableCell align="left" className="py-[22px] px-[34px]">
              <Typography fontSize="base">18/Nov/2022</Typography>
            </TableCell>
          </TableRow>
          <TableRow
            onClick={action("row-click")}
            className="border-b cursor-pointer hover:bg-gray-50"
          >
            <TableCell align="left" className="py-[22px] px-[34px]">
              1
            </TableCell>
            <TableCell align="left" className="py-[22px] px-[34px]">
              <div className="flex items-center space-x-2">
                <img
                  src="https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="images"
                  className="w-[50px] h-[35px] rounded-md"
                />
                <p>CS Fundamental & Express</p>
              </div>
            </TableCell>
            <TableCell align="left" className="py-[22px] px-[34px]">
              <Typography fontSize="base">Web Development</Typography>
            </TableCell>
            <TableCell align="left" className="py-[22px] px-[34px]">
              <Typography fontSize="base">40 hours</Typography>
            </TableCell>
            <TableCell align="left" className="py-[22px] px-[34px]">
              <Typography fontSize="base">Basic</Typography>
            </TableCell>
            <TableCell align="left" className="py-[22px] px-[34px]">
              <Typography fontSize="base">18/Nov/2022</Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Simulate user hovering on the first table row
    const firstRow = canvas.getAllByRole("row")[1]; // assuming the first row is the header
    await userEvent.hover(firstRow);

    // Simulate user clicking on the first table row
    await userEvent.click(firstRow);

    // Simulate user clicking on the second table row
    const secondRow = canvas.getAllByRole("row")[2];
    await userEvent.click(secondRow);

    // Delay to observe changes, if necessary
    await new Promise((resolve) => setTimeout(resolve, 1000));
  },
};
