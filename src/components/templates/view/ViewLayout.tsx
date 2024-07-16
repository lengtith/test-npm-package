import React, { useState, ReactElement, useEffect } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
} from "../../atoms";
interface LayoutConfig {
  layoutType: string;
  render: (item: any, index: number) => React.ReactNode;
  loadingUi: React.ReactNode;
  icon: ReactElement; // Use ReactElement for components that can be rendered
  headers?: string[];
}

interface ViewLayoutProps {
  data: any[];
  loading: boolean;
  layouts: LayoutConfig[];
}

const ViewLayout: React.FC<ViewLayoutProps> = ({ data, loading, layouts }) => {
  // Initialize state with localStorage value or default layoutType
  const [currentLayoutType, setCurrentLayoutType] = useState<string>(() => {
    return localStorage.getItem("currentLayoutType") || layouts[0].layoutType;
  });

  useEffect(() => {
    // Update localStorage when currentLayoutType changes
    localStorage.setItem("currentLayoutType", currentLayoutType);
  }, [currentLayoutType]); // Dependency array ensures this runs only when currentLayoutType changes

  const currentLayout = layouts.find(
    (layout) => layout.layoutType === currentLayoutType
  );

  return (
    <div>
      <div className="flex items-center justify-end space-x-4 px-4 mb-4">
        {layouts.map(({ layoutType, icon }) => (
          <div
            key={layoutType}
            onClick={() => setCurrentLayoutType(layoutType)}
            className="cursor-pointer"
          >
            {/* Render the icon directly without wrapping in a JSX tag */}
            {React.cloneElement(icon, {
              className: `w-6 h-6 ${
                currentLayoutType === layoutType
                  ? "text-[#2B2F7E]"
                  : "text-gray-600"
              }`,
            })}
          </div>
        ))}
      </div>
      {loading && currentLayout?.loadingUi}
      {!loading && currentLayout?.headers ? (
        <TableContainer className="w-full">
          <Table className="w-full">
            <TableHead className="border-b bg-[#F5F5F5]">
              <TableRow>
                {currentLayout.headers.map((header, index) => (
                  <TableCell
                    key={index}
                    variant="subhead"
                    scope="col"
                    className=" py-[22px] px-[34px] text-[#03085E]  whitespace-nowrap"
                    align="left"
                  >
                    <Typography fontSize="base">{header}</Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {data.map((item, index) =>
                currentLayout.render ? currentLayout.render(item, index) : null
              )}
            </TableBody>
          </Table>
          {!loading && data.length === 0 && (
            <div className="flex items-center justify-center w-full mt-20">
              <img
                src="https://materials-resource.s3.ap-southeast-1.amazonaws.com/+image/no-data.jpg"
                alt="no-data-images"
              />
            </div>
          )}
        </TableContainer>
      ) : (
        <>
          <div className="flex items-center justify-center w-full h-full">
            <div className="grid w-full grid-cols-1 gap-10 px-10 md:grid-cols-3 lg:grid-cols-4">
              {data.map((item, index) =>
                currentLayout && currentLayout.render
                  ? currentLayout.render(item, index)
                  : null
              )}
            </div>
          </div>
          {!loading && data.length === 0 && (
            <div className="flex items-center justify-center w-full mt-20">
              <img
                src="https://materials-resource.s3.ap-southeast-1.amazonaws.com/+image/no-data.jpg"
                alt="no-data-images"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export { ViewLayout };
