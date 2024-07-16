import React from "react";
import { SUBJECT_OPTIONS } from "./course";
import { Dropdown } from "../../../components";

interface FilterSubjectProps {
  onChange: (value: string) => void;
}

const FilterSubject: React.FC<FilterSubjectProps> = ({ onChange }) => {
  
  return (
    <Dropdown
      items={[{ label: "All Subjects", value: "" }, ...SUBJECT_OPTIONS]}
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

export default FilterSubject;
