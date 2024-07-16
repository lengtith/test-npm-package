import React from "react";
import { DataTable } from "../../organisms";
import { Empty } from "../../../components";
import CourseTableCell from "./CourseTableCell";

interface TableCellData {
  title: string;
  thumbnail: string;
}

interface TableLayoutProps {
  rows: any[];
  loading: boolean;
  onSort: (sortData: any) => void;
  onRowClick: (rowData: any) => void;
}

const courseTableCell = (data: TableCellData) => (
  <CourseTableCell title={data.title} thumbnail={data.thumbnail} />
);

const columns = [
  {
    field: "index",
    headerName: "No.",
  },
  {
    field: "courseTitle",
    headerName: "Course",
    component: (data: TableCellData) => courseTableCell(data),
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
  },
];

const TableLayout: React.FC<TableLayoutProps> = ({
  rows,
  loading,
  onSort,
  onRowClick,
}) => {
  return (
    <DataTable
      columns={columns}
      rows={rows}
      loading={loading}
      emptyData={<Empty />}
      onRowClick={onRowClick}
      onSort={onSort}
      className="min-w-[1200px]"
      classNames={{
        header: "h-[60px]",
        headerCells: {
          index: "text-right w-[80px]",
          course: "w-[600px]",
        },
        columns: {
          index: "text-right",
        },
        allRows: "h-[60px] hover:bg-gray-50",
      }}
    />
  );
};

export default TableLayout;
