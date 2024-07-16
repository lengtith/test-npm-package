import { Icon, Skeleton } from "../..";
import React, { ReactNode, useState } from "react";

interface Column {
  field: string;
  headerName: string;
  component?: (data: any) => ReactNode;
  sort?: boolean;
}

interface SortData {
  field: string;
  sort: null | "ASC" | "DESC";
}

interface DataTableProps {
  columns: Column[];
  rows: any[];
  loading?: boolean;
  loadingRows?: number;
  noData?: ReactNode;
  emptyData?: ReactNode;
  className?: string;
  classNames?: {
    header?: string;
    headerCells?: { [key: string]: string };
    body?: string;
    allRows?: string;
    rows?: { [key: number]: string };
    allCells?: string;
    rowsAllCells?: { [key: number]: string };
    columns?: { [key: string]: string };
  };
  onRowClick?: (rowData: any) => void;
  onSort?: (sortData: SortData) => void;
}

const DataTable: React.FC<DataTableProps> = ({
  columns,
  rows,
  loading = false,
  loadingRows = 3,
  className = "",
  classNames,
  noData = <i className="text-gray-500">N/A</i>,
  emptyData,
  onRowClick,
  onSort,
}) => {
  const {
    header = "",
    headerCells = {},
    body = "",
    allRows = "",
    rows: specificRows = {},
    allCells = "",
    rowsAllCells = {},
    columns: specificColumns = {},
  } = classNames || {};

  const [sortState, setSortState] = useState<SortData | null>(null);

  const hasData = rows.length > 0;

  const handleSort = (field: string) => {
    if (field) {
      let newSortState: SortData;
      if (!sortState || sortState.field !== field || sortState.sort === null) {
        newSortState = { field: field, sort: "ASC" };
      } else if (sortState.sort === "ASC") {
        newSortState = { ...sortState, sort: "DESC" };
      } else {
        newSortState = { field: "", sort: null };
      }
      setSortState(newSortState);
      if (onSort) {
        onSort(newSortState);
      }
    }
  };

  const renderSortIcon = (field: string) => {
    return (
      <>
        {sortState?.field === field && sortState?.sort !== null ? (
          <Icon
            icon={sortState.sort === "ASC" ? "arrowUp" : "arrowDown"}
            className="w-4 h-4 ml-1"
          />
        ) : (
          <Icon
            icon="arrowUp"
            className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-50"
          />
        )}
      </>
    );
  };

  return (
    <table className={`w-full table table-fixed ${className}`}>
      <thead>
        <tr className={`bg-[#F5F5F5] text-[#03085E] text-left ${header}`}>
          {columns.map((column) => (
            <th
              key={column.field}
              className={`px-4 py-2 font-[500] group ${column?.sort ? "cursor-pointer" : ""
                } ${headerCells[column.field] ?? ""}`}
              onClick={() => column.sort && handleSort(column.field)}
            >
              {column.headerName}
              {column.sort && renderSortIcon(column.field)}
            </th>
          ))}
        </tr>
      </thead>
      {hasData && (
        <tbody className={`${body}`}>
          {rows.map((item, index) => (
            <tr
              key={index}
              className={`border-[#D9D9D9] border-b ${onRowClick ? "cursor-pointer" : "cursor-default"
                } ${allRows} ${specificRows[index] ?? ""}`}
              onClick={() => onRowClick && onRowClick(item)}
            >
              {columns.map((column) => {
                const data =
                  column.field === "index"
                    ? `${String(index + 1).padStart(2, "0")}.`
                    : item[column.field as keyof typeof item];
                return (
                  <td
                    key={column.field}
                    className={`px-4 py-2 truncate ${allCells} ${rowsAllCells[index] ?? ""
                      } ${specificColumns[column.field] ?? ""}`}
                  >
                    {column.component ? column.component(data) : data ?? noData}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      )}
      {!loading && !hasData && (
        <tbody>
          <tr>
            {emptyData ? (
              <td colSpan={columns.length}>{emptyData}</td>
            ) : (
              <td colSpan={columns.length} className="px-4 py-2 text-center">
                No data to display
              </td>
            )}
          </tr>
        </tbody>
      )}
      {loading && (
        <tbody className={`${body}`}>
          {[...Array(loadingRows)].map((_, index) => (
            <tr
              key={index}
              className={`border-[#D9D9D9] border-b ${allRows} ${specificRows[index] ?? ""
                }`}
            >
              {columns.map((column) => {
                return (
                  <td
                    key={column.field}
                    className={`px-4 py-2 ${allCells} ${rowsAllCells[index] ?? ""
                      } ${specificColumns[column.field] ?? ""}`}
                  >
                    <Skeleton className="w-full max-w-[200px] h-3" />
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      )}
    </table>
  );
};

export default DataTable;
