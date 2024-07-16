import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, within, expect } from "@storybook/test";
import { action } from "@storybook/addon-actions";
import DataTable from "./DataTable";
import { Empty } from "../..";

const meta: Meta<typeof DataTable> = {
  title: "SabaiCode/Organisms/Data Table",
  component: DataTable,
  tags: ["autodocs"],
  args: {
    onRowClick: undefined,
    onSort: undefined,
  },
};
export default meta;

type Story = StoryObj<typeof meta>;

const columns = [
  { field: "id", headerName: "ID" },
  {
    field: "firstName",
    headerName: "First name",
  },
  {
    field: "lastName",
    headerName: "Last name",
  },
  {
    field: "age",
    headerName: "Age",
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 14 },
  { id: 2, lastName: "Lannister", age: 31 },
  { id: 3, lastName: "Lannister", firstName: "Jaime" },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 11 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys" },
];

export const Default: Story = {
  args: {
    columns: columns,
    rows: rows,
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/proto/1ck3QkLujqYR52ayf0evpX/Sabaicode-Admin-App?page-id=0%3A1&node-id=2634-3107&viewport=-20508%2C-98%2C1.17&t=KqAgOeh9JYJCuVvW-1&scaling=min-zoom&starting-point-node-id=2634%3A3107&show-proto-sidebar=1",
    },
  },
};

Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const columnheader = canvas.getAllByRole("columnheader");
  const allRows = canvas.getAllByRole("row");

  expect(columnheader.length).toBe(columns.length);
  expect(allRows.length).toBe(rows.length + 1);
};

export const WithIndexField: Story = {
  args: {
    columns: [{ field: "index", headerName: "No." }, ...columns],
    rows: rows,
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/proto/1ck3QkLujqYR52ayf0evpX/Sabaicode-Admin-App?page-id=0%3A1&node-id=2647-2630&viewport=-20508%2C-98%2C1.17&t=KqAgOeh9JYJCuVvW-1&scaling=min-zoom&starting-point-node-id=2647%3A2630&show-proto-sidebar=1",
    },
  },
};

WithIndexField.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const columnheader = canvas.getAllByRole("columnheader");
  const allRows = canvas.getAllByRole("row");
  const indexFieldName = "No.";
  const firstIndex = "01.";

  expect(columnheader.length).toBe(columns.length + 1);
  expect(allRows.length).toBe(rows.length + 1);
  canvas.getByRole("columnheader", { name: indexFieldName });
  canvas.getByRole("cell", { name: firstIndex });
};

export const NoData: Story = {
  args: {
    columns: columns,
    rows: [],
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/proto/1ck3QkLujqYR52ayf0evpX/Sabaicode-Admin-App?page-id=0%3A1&node-id=2647-2661&viewport=-20508%2C-98%2C1.17&t=KqAgOeh9JYJCuVvW-1&scaling=min-zoom&starting-point-node-id=2647%3A2661&show-proto-sidebar=1",
    },
  },
};

NoData.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const columnheader = canvas.getAllByRole("columnheader");
  const noDataMessage = "No data to display";

  expect(columnheader.length).toBe(columns.length);
  canvas.getByText(noDataMessage);
};

export const Loading: Story = {
  args: {
    columns: columns,
    rows: [],
    loading: true,
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/proto/1ck3QkLujqYR52ayf0evpX/Sabaicode-Admin-App?page-id=0%3A1&node-id=2647-2693&viewport=-20508%2C-98%2C1.17&t=KqAgOeh9JYJCuVvW-1&scaling=min-zoom&starting-point-node-id=2647%3A2693&show-proto-sidebar=1",
    },
  },
};

Loading.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const columnheader = canvas.getAllByRole("columnheader");

  expect(columnheader.length).toBe(columns.length);
};

export const OnRowClick: Story = {
  args: {
    columns: columns,
    rows: rows,
    onRowClick: action("onRowClick"),
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/proto/1ck3QkLujqYR52ayf0evpX/Sabaicode-Admin-App?page-id=0%3A1&node-id=2650-2768&viewport=-20508%2C-98%2C1.17&t=KqAgOeh9JYJCuVvW-1&scaling=min-zoom&starting-point-node-id=2650%3A2768&show-proto-sidebar=1",
    },
  },
};

OnRowClick.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const columnheader = canvas.getAllByRole("columnheader");
  const allRows = canvas.getAllByRole("row");
  const fistRowName = rows.at(0)?.firstName;
  const firstRow = canvas.getByRole("cell", { name: fistRowName });

  expect(columnheader.length).toBe(columns.length);
  expect(allRows.length).toBe(rows.length + 1);
  userEvent.click(firstRow);
};

export const OnSort: Story = {
  args: {
    columns: columns.map((obj) => {
      return { ...obj, sort: true };
    }),
    rows: rows,
    onSort: action("onRowClick"),
  },
};

OnSort.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const columnheader = canvas.getAllByRole("columnheader");
  const allRows = canvas.getAllByRole("row");
  const secondHeaderName = columns.at(1)?.headerName;
  const secondHeader = canvas.getByRole("columnheader", {
    name: secondHeaderName,
  });

  expect(columnheader.length).toBe(columns.length);
  expect(allRows.length).toBe(rows.length + 1);
  userEvent.click(secondHeader);
};

const courseColumns = [
  {
    field: "index",
    headerName: "No.",
  },
  {
    field: "course",
    headerName: "Course",
    component: (data: any) => <CourseComponent data={data} />,
    sort: true,
  },
  {
    field: "subject",
    headerName: "Subject",
  },
  {
    field: "duration",
    headerName: "Duration",
  },
  {
    field: "level",
    headerName: "Level",
  },
  {
    field: "updatedAt",
    headerName: "Last Update",
    sort: true,
  },
];

const courses = [
  {
    course: {
      title: "Basic Data Analytics",
      thumbnail:
        "https://www.logicalcube.com/wp-content/uploads/2023/06/Data-Engineering.jpg",
    },
    subject: "Data Engineering",
    duration: "10 hours",
    level: "Beginner",
    updatedAt: "5/Mar/2024",
  },
  {
    course: {
      title: "Express Course / CS Fundamental ",
      thumbnail:
        "https://materials-resource.s3.ap-southeast-1.amazonaws.com/ image/1.jpg_768",
    },
    subject: "Software Engineering",
    duration: "36 hours",
    level: "Beginner",
    updatedAt: "4/Mar/2024",
  },
  {
    course: {
      title: "Two Wheels Robot",
      thumbnail:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsHG-8A95YPvkBQa1_CWkUqBSd_7MkY8vlIA&usqp=CAU",
    },
    subject: "Robotics & IoT",
    duration: "72 hours",
    level: "Beginner",
    updatedAt: "7/Mar/2024",
  },
];

export const Customize: Story = {
  args: {
    columns: courseColumns,
    rows: courses,
    emptyData: <Empty/>,
    classNames: {
      header: "h-[60px]",
      headerCells: {
        index: "text-right max-w-max",
      },
      columns: {
        index: "text-right",
      },
      allRows: "h-[60px] hover:bg-gray-50",
    },
    onRowClick: action("onRowClick"),
    onSort: action("onRowClick"),
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/proto/1ck3QkLujqYR52ayf0evpX/Sabaicode-Admin-App?page-id=0%3A1&node-id=2653-2817&viewport=-20508%2C-98%2C1.17&t=KqAgOeh9JYJCuVvW-1&scaling=min-zoom&starting-point-node-id=2653%3A2817&show-proto-sidebar=1",
    },
  },
};

Customize.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const columnheader = canvas.getAllByRole("columnheader");
  const allRows = canvas.getAllByRole("row");

  expect(columnheader.length).toBe(courseColumns.length);
  expect(allRows.length).toBe(courses.length + 1);
};

const CourseComponent = ({ data }: any) => (
  <div className="flex items-center gap-x-4 max-w-[500px]">
    <img
      src={`${data.thumbnail}`}
      alt={data.title}
      className="w-[50px] h-[35px] rounded-md object-cover object-center"
    />
    <span>{data.title}</span>
  </div>
);

const EmptyData = () => (
  <div className="flex items-center justify-center w-full mt-20">
    <img
      src="https://materials-resource.s3.ap-southeast-1.amazonaws.com/+image/no-data.jpg"
      alt="no-data-images"
    />
  </div>
);
