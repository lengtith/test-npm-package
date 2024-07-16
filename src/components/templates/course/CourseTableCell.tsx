import React from "react";

interface CourseTableCellProps {
  title: string;
  thumbnail: string;
}

const CourseTableCell: React.FC<CourseTableCellProps> = ({
  title,
  thumbnail,
}) => {
  return (
    <div className="flex items-center gap-x-4 max-w-[500px]">
      <img
        src={`${thumbnail}`}
        alt={title}
        className="w-[50px] h-[35px] rounded-md object-cover object-center"
      />
      <span>{title}</span>
    </div>
  );
};

export default CourseTableCell;
