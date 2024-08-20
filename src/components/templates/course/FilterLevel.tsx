import React from "react";
import { LEVEL_OPTIONS } from "./course";
import { Dropdown, DropdownItem } from "../../../components";

interface FilterLevelProps {
  onChange: (value: string) => void;
}

const FilterLevel: React.FC<FilterLevelProps> = ({ onChange }) => {
  return (
    <Dropdown
      label="All Levels"
      onChange={onChange}
    >
      {LEVEL_OPTIONS.map((item) => (
        <DropdownItem key={item.value} value={item.value}>
          {item.label}
        </DropdownItem>
      ))}
    </Dropdown>
  );
};

export default FilterLevel;
