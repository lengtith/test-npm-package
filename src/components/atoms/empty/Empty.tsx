import React from "react";
import { twMerge } from "tailwind-merge";
export interface EmptyProps {
  img?: string;
  desc?: string;
  className?: string;
}
const Empty: React.FC<EmptyProps> = ({ img, desc, className }) => (
  <div className={twMerge("grid min-h-60 h-60 w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible", className)}>
    <div className="w-full h-full bg-center bg-contain bg-no-repeat" style={{ backgroundImage: `url(${img || "https://materials-resource.s3.ap-southeast-1.amazonaws.com/+image/no-data.jpg"})` }}>
    </div>
    {desc && <div className="block mt-2 font-sans text-sm antialiased font-normal leading-normal text-center text-inherit">
      {desc}
    </div>}
</div>


);

export default Empty;
