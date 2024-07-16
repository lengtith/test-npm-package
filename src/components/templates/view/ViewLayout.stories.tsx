import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ViewLayout } from "./ViewLayout";
import {
  Icon,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
} from "./../../atoms";

import { Card, CardBody } from "../..";

// Update the type for `level` in `DataItem` to reflect the expected values
interface DataItem {
  courseTitle: string;
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  prerequisite: string;
  duration: string;
  id: string;
  subject: string;
  thumbnail: string;
  updatedAt: Date;
}

interface DifficultyBulletsProps {
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
}

interface CardItemViewProps {
  item: DataItem;
  index: number;
}

interface ListItemViewProps {
  item: DataItem;
  index: number;
}

const mockData: DataItem[] = [
  {
    courseTitle: "Frontend Development",
    level: "BEGINNER",
    prerequisite: "Basic computer skills",
    duration: "10",
    id: "1",
    subject: "Programming",
    thumbnail:
      "https://images.unsplash.com/photo-1542744094-24638eff58bb?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    updatedAt: new Date(2021, 0, 1),
  },
  {
    courseTitle: "Backend Development",
    level: "INTERMEDIATE",
    prerequisite: "Frontend basics",
    duration: "15",
    id: "2",
    subject: "Programming",
    thumbnail:
      "https://images.unsplash.com/photo-1532622785990-d2c36a76f5a6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    updatedAt: new Date(2021, 1, 1),
  },
];

const meta: Meta<typeof ViewLayout> = {
  title: "Sabaicode/Templates/ViewLayout",
  component: ViewLayout,
  parameters: {
    layout: "fullscreen",
    design: {
      type: "figma",
      url: "https://www.figma.com/proto/1ck3QkLujqYR52ayf0evpX/Sabaicode-Admin-App?page-id=0%3A1&node-id=2673-3676&viewport=-20508%2C-98%2C1.17&t=KqAgOeh9JYJCuVvW-1&scaling=min-zoom&starting-point-node-id=2673%3A3676"
    }
  },
  tags: ["autodocs"],
};

const ListItemView: React.FC<ListItemViewProps> = ({ item, index }) => (
  <TableRow
    key={index}
    className="border-b cursor-pointer hover:bg-gray-50"
    data-testid="list-view"
  >
    <TableCell align="left" className=" py-[20px] px-[30px] ">
      <Typography fontSize="base">{index + 1}</Typography>
    </TableCell>
    <TableCell align="left" className=" py-[20px] px-[14px]">
      <div className="flex items-center space-x-4">
        <img
          src={`${item.thumbnail}`}
          alt="images"
          className="w-[50px] h-[35px] rounded-md"
        />
        <Typography fontSize="base">{item.courseTitle}</Typography>
      </div>
    </TableCell>
    <TableCell align="left" className="py-[20px] px-[30px]">
      {item.subject}
    </TableCell>
    <TableCell align="left" className="py-[20px] px-[30px]">
      <Typography fontSize="base">{item.duration} hours</Typography>
    </TableCell>
    <TableCell align="left" className="capitalize  py-[20px] px-[30px]">
      <Typography fontSize="base">{item.level}</Typography>
    </TableCell>
    <TableCell align="left" className="py-[20px] px-[30px]">
      <Typography fontSize="base">
        {item.updatedAt.toLocaleDateString()}
      </Typography>
    </TableCell>
  </TableRow>
);

const CardItemView: React.FC<CardItemViewProps> = ({ item, index }) => (
  <Card
    key={index}
    className="w-[361px] h-[270px] overflow-hidden rounded-[26px] shadow-md "
    data-testid="card-view"
  >
    <img
      className="h-[150px] p-3 rounded-[20px] w-full object-cover"
      src={`${item.thumbnail}`}
      alt="Frontend Development"
    />
    <CardBody className="w-full h-full ">
      <div className="flex flex-col items-start space-y-[10px]">
        <div className="text-[22px] font-medium line-clamp-1">
          {item?.courseTitle}
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-gray-600 capitalize">{item.level}</div>
          <DifficultyBullets level={item?.level} />
        </div>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-5">
            <div className="flex items-center space-x-2">
              <Icon icon="course" className="w-5 h-5" />
              <p className="text-sm text-gray-500">6 Lessons</p>
            </div>
            <div className="flex items-center space-x-2">
              <Icon icon="clock" className="w-5 h-5" />
              <p className="text-sm text-gray-500">{item?.duration} h</p>
            </div>
          </div>
          <p className="text-sm text-gray-500 capitalize">{item.subject}</p>
        </div>
      </div>
    </CardBody>
  </Card>
);

const DifficultyBullets: React.FC<DifficultyBulletsProps> = ({ level }) => {
  const colors: { [key in DifficultyBulletsProps["level"]]: string[] } = {
    BEGINNER: ["bg-[#5DE2E7]", "bg-gray-300", "bg-gray-300"],
    INTERMEDIATE: ["bg-[#5DE2E7]", "bg-[#5DE2E7]", "bg-gray-300"],
    ADVANCED: ["bg-[#5DE2E7]", "bg-[#5DE2E7]", "bg-[#5DE2E7]"],
  };

  return (
    <div className="flex space-x-1">
      {colors[level].map((color, index) => (
        <span
          key={index}
          className={`block rounded-full ${color} w-2 h-2`}
        ></span>
      ))}
    </div>
  );
};

const COURSE_TABLE_HEADER = [
  "No.",
  "Course",
  "Subject",
  "Duration",
  "Level",
  "Last Update",
];

export default meta;

export const Default: StoryObj<typeof ViewLayout> = {
  args: {
    data: mockData,
    layouts: [
      {
        layoutType: "list",
        render: (item, index) => <ListItemView item={item} index={index} />,
        icon: <Icon icon="list" size={26} data-testid="list-view-icon" />,
        headers: COURSE_TABLE_HEADER,
        loadingUi: <div>Loading...</div>,
      },
      {
        layoutType: "card",
        render: (item, index) => <CardItemView item={item} index={index} />,
        icon: <Icon icon="item" size={26} data-testid="card-view-icon" />,
        loadingUi: <div>Loading...</div>,
      },
    ],
  },
};
