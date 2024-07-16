import { useState } from 'react'
import { Avatar, Button, ButtonIcon, DatePicker, Drawer, Dropdown, Icon, Input, Modal, Select, Skeleton, Tabs, Tab, Textarea, Typography, ProgressBar, Switch, CheckboxGroup, Checkbox, DrawerHeader, DrawerBody, DrawerFooter, Card, CardHeader, CardBody, CardFooter, Menu, Empty } from "./components/atoms";
import { CardMaterial, Navbar } from "./components";

const items = [
  { id: '1', name: 'Item 1' },
  { id: '2', name: 'Item 2' },
  { id: '3', name: 'Item 3' },
];

const App = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [, setOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<any[]>([]);
  const [selectedSingleItem, setSelectedSingleItem] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dropdownItem, setDropdownItem] = useState();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSelectChange = (item: any) => {
    setSelectedItem(item);
  };

  const handleSelectSingleChange = (item: any) => {
    setSelectedSingleItem(item);
  };

  const handleProfileClick = () => {
    alert('Profile clicked');
  };

  const handleSettingsClick = () => {
    alert('Settings clicked');
  };

  const handleSelect = (item: any) => {
    setDropdownItem(item);
  };

  const menuItems = [
    {
      icon: <Icon icon="coach" />,
      label: 'Profile',
      onClick: handleProfileClick,
    },
    {
      icon: <Icon icon="student" />,
      label: 'Settings',
      onClick: handleSettingsClick,
    },
  ];

  const tabs = [
    { id: 1, label: "Tab 1", content: <div>Tab 1 Content</div> },
    { id: 2, label: "Tab 2", content: <div>Tab 2 Content</div> },
    { id: 3, label: "Tab 3", content: <div>Tab 3 Content</div> },
  ];

  return (
    <div className="container mx-auto bg-white">
      <div className="px-20 py-20 flex flex-col gap-4">
        
        <Button colorScheme="secondary" variant="solid" icon="student" iconSize={24} onClick={() => setIsOpen(true)}>Open drawer</Button>

        Button Icon
        <ButtonIcon icon="student" size="lg" className="text-blue-500" />
        <hr />
        icon
        <Icon icon="student" size={24} className="text-blue-500" />
        <hr />
        <Drawer className="w-96" isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <DrawerHeader onClose={() => setIsOpen(false)}>Drawer Header</DrawerHeader>
          <DrawerBody>
            <p>This is the body of the drawer.</p>
          </DrawerBody>
          <DrawerFooter>
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Close
            </button>
          </DrawerFooter>
        </Drawer>
        <hr />
        <Select
          required
          multiple
          label="Multi Select"
          items={items}
          value={selectedItem}
          onChange={(item) => handleSelectChange(item)}
          renderSelectItem={(item) => <span>{item.name}</span>}
          renderDropdownItem={(item, isSelected, handleSelect) => (
            <div
              className={`flex space-x-2 items-center py-2 px-3 ${isSelected ? "text-blue-500 bg-blue-100" : ""} px-3 py-2 hover:bg-blue-100 cursor-pointer`}
              onClick={() => handleSelect(item)}>
              <span className="capitalize">{item.name}</span>
            </div>
          )}
        />

        <Select
          label="Single Select"
          required
          items={items}
          value={selectedSingleItem}
          onChange={(item) => handleSelectSingleChange(item)}
          renderSelectItem={(item) => <span>{item.name}</span>}
          renderDropdownItem={(item, isSelected, handleSelect) => (
            <div
              className={`flex space-x-2 items-center py-2 px-3 ${isSelected ? "text-blue-500 bg-blue-100" : ""} px-3 py-2 hover:bg-blue-100 cursor-pointer`}
              onClick={() => handleSelect(item)}>
              <span className="capitalize">{item.name}</span>
            </div>
          )}
        />
        <hr />
        <Dropdown
          required={true}
          items={items}
          value={dropdownItem}
          onChange={handleSelect}
          className="w-72"
          renderSelectItem={(item) => <span>{item.name}</span>}
          renderDropdownItem={(item, isSelected, handleSelectItem) => (
            <div
              className={`p-2 bg-white text-black hover:bg-gray-50`}
              onClick={() => handleSelectItem(item)}
            >
              {item.name}
            </div>
          )}
          customError="Please select an item"
        />
        <hr />
        <Input
          required
          id="newPassword"
          name="newPassword"
          label="New Password"
          placeholder="Password Password" />
        <hr />
        <Textarea
          label="Description"
          placeholder="Enter your description here..."
          required={true}
          isSubmitted={false}
        />
        <hr />
        <DatePicker
          label="Select Date"
          placeholder="YYYY-MM-DD"
        />
        <hr />
        <Menu className="hover:shadow-md hover:bg-white" buttonContent={<span>Menu Dropdown</span>} items={menuItems} />
        <hr />
        <Button onClick={toggleModal}>Toggle Modal</Button>
        <Modal open={isModalOpen} size="2xl" className="p-4">
          <div className="flex flex-col gap-5">
            <h2>Modal Title</h2>
            <p>This is the modal content.</p>
            <Button onClick={toggleModal}>Close</Button>
          </div>
        </Modal>
        <hr />
        <div className="max-w-[300px] w-full flex items-center gap-3">
          <div>
            <Skeleton className="flex rounded-full w-12 h-12" />
          </div>
          <div className="w-full flex flex-col gap-2">
            <Skeleton className="h-3 w-3/5 rounded-lg" />
            <Skeleton className="h-3 w-4/5 rounded-lg" />
          </div>
        </div>
        <hr />
        <Typography as="b" fontSize="lg" className="text-gray-500">
          Merged Tailwind Classes
        </Typography>
        <hr />
        <Tabs aria-label="Dynamic tabs" items={tabs}>
          {(item) => (
            <Tab key={item.id} title={item.label}>
              {item.content}
            </Tab>
          )}
        </Tabs>
        <hr />
        <ProgressBar
          progress={50}
          animationDuration={700}
          showLabel={true} />
        <hr />
        <Switch label="Switch toggle" />
        <hr />
        <CheckboxGroup label="Checkbox" direction="horizontal">
          <Checkbox>Option 1</Checkbox>
          <Checkbox>Option 2</Checkbox>
          <Checkbox>Option 3</Checkbox>
        </CheckboxGroup>
        <hr />
        <Card className="max-w-sm">
          <CardHeader>
            <h2 className="text-lg font-semibold">Card Header</h2>
          </CardHeader>
          <CardBody>
            <p>This is the body of the card. It can contain text, images, or any other content.</p>
          </CardBody>
          <CardFooter>
            <Button>Action</Button>
          </CardFooter>
        </Card>

        <hr />
        <Empty img="https://www.movingtrafficmedia.com/wp-content/uploads/2023/10/website-error-messages.jpg" />
        <hr />
        <Navbar
          expand
          toggleSidebar={() => { }} />

        <hr />
        <CardMaterial
          material={{
            filetype: 'application/pdf',
            thumbnailUrl: 'https://via.placeholder.com/150',
            title: 'Sample PDF Document'
          }}
        />
      </div>

    </div>
  )
}

export default App