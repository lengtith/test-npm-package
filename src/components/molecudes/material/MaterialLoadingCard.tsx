import React from "react";
import { Skeleton } from "../../../components";

const MaterialLoadingCard: React.FC = () => {
  return (
    <div className="max-w-xs h-[176px] rounded-[26px] shadow-lg flex flex-col gap-8 p-3">
      <div className="h-[100px] w-full">
        <Skeleton className="h-full w-full rounded-[30px]" />
      </div>
      <div>
        <Skeleton className="h-3 w-full" />
      </div>
    </div>
  );
};

export { MaterialLoadingCard };
