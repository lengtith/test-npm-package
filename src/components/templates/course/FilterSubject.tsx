import React from "react";
import { SUBJECT_OPTIONS } from "./course";
import { Dropdown, DropdownItem } from "../../../components";

interface FilterSubjectProps {
  onChange: (value: string) => void;
}

const FilterSubject: React.FC<FilterSubjectProps> = ({ onChange }) => {

  return (
    <Dropdown
      label="All Subjects"
      onChange={onChange}
    >
      {SUBJECT_OPTIONS.map((item) => (
        <DropdownItem key={item.value} value={item.value}>
          {item.label}
        </DropdownItem>
      ))}
    </Dropdown>
  );
};

export default FilterSubject;
