import React, { useState } from "react";
import { Button, Checkbox, CheckboxGroup, Drawer, DrawerHeader, Modal, Switch } from "./components";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isSubmittedCheckbox, setIsSubmittedCheckbox] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const handleTest = (e, text) => {
    setIsSubmittedCheckbox(true);
    console.log(e, text)
    console.log(selectedValues)
  }

  const handleCheckboxGroupChange = (values: string[]) => {
    setSelectedValues(values);
  };

  return (
    <div className="bg-gray-50 p-10">
      <div className="grid grid-cols-1 gap-4">
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Button onClick={() => setIsOpenDrawer(true)}>Open Drawer</Button>
        <Button onClick={(e) => handleTest(e, "Hello")}>Test</Button>
        <Switch checked disabled />
        <Checkbox checked size="md" radius="md">
          Accept Terms and Conditions
        </Checkbox>
        <CheckboxGroup
          required
          label="Select Your Interests"
          value={selectedValues}
          onChange={handleCheckboxGroupChange}
          direction="vertical"
          customError="Please select at least one interest."
          isSubmitted={isSubmittedCheckbox}
        >
          <Checkbox value="coding">Coding</Checkbox>
          <Checkbox value="music">Music</Checkbox>
          <Checkbox value="sports">Sports</Checkbox>
        </CheckboxGroup>

        
      </div>
      {/* <div className="h-screen"></div> */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="xl">
        Modal
      </Modal>
      <Drawer isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)}>
        <DrawerHeader>Drawer</DrawerHeader>
      </Drawer>
    </div>
  );
};

export default App;
