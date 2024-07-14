import { useState } from 'react'
import { Avatar, Button, ButtonIcon, DatePicker, Drawer, Dropdown, Icon, Input, Modal, Select, Skeleton, Tabs, Tab, Textarea, Typography, ProgressBar, Switch, CheckboxGroup, Checkbox, DrawerHeader, DrawerBody, DrawerFooter, Card, CardHeader, CardBody, CardFooter } from "./components";

const items = [
  { id: '1', name: 'Item 1' },
  { id: '2', name: 'Item 2' },
  { id: '3', name: 'Item 3' },
];

const App = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [, setOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSelectChange = (item: any) => {
    setSelectedItem(item);
  };

  const handleProfileClick = () => {
    alert('Profile clicked');
  };

  const handleSettingsClick = () => {
    alert('Settings clicked');
  };

  const dropdownItems = [
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
        <h1 className="text-3xl text-gray-900 font-bold">UI Component</h1>
        <hr />
        <Avatar src="https://api.dicebear.com/9.x/thumbs/svg?seed=Pepper" className="size-20 border-blue-500" />
        <hr />
        <Button colorScheme="secondary" variant="solid" icon="student" onClick={() => setIsOpen(true)}>Open drawer</Button>
        <ButtonIcon icon="student" size="md" className="text-blue-500 fixed bottom-0 left-0 size-10" />
        <hr />
        <Icon icon="student" className="text-blue-500 size-10" />
        <hr />
        <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)}>
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
          multiple
          label="Single Select"
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
        <hr />
        <Dropdown buttonContent={<span>Menu Dropdown</span>} items={dropdownItems} />
        <hr />
        <Input
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
        <CheckboxGroup label="Checkbox">
          <Checkbox>Option 1</Checkbox>
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
      </div>

    </div>
  )
}

export default App