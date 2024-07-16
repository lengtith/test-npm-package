import React from "react";
import { LEVEL_OPTIONS } from "./course";
import { Dropdown } from "../../../components";

interface FilterLevelProps {
  onChange: (value: string) => void;
}

const FilterLevel: React.FC<FilterLevelProps> = ({ onChange }) => {
  return (
    <Dropdown
      items={[{ label: "All Level", value: "" }, ...LEVEL_OPTIONS]}
      onChange={onChange}
      className="w-72"
      renderSelectItem={(item) => <span>{item.name}</span>}
      renderDropdownItem={(item, isSelected, handleSelectItem) => (
        <div
          className={`p-2 bg-white text-black hover:bg-gray-50`}
          onClick={() => handleSelectItem(item.value)}
        >
          {item.label}
        </div>
      )}
      customError="Please select an item"
    />
  );
};

export default FilterLevel;
