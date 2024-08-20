// // src/components/Dropdown.stories.tsx

// import React, { useState } from 'react';
// import { Meta, StoryObj } from '@storybook/react';
// import Dropdown, { DropdownProps } from './Dropdown';

// const meta: Meta<typeof Dropdown> = {
//   title: 'SabaiCode/Atoms/Dropdown',
//   tags: ['autodocs'],
//   component: Dropdown,
//   argTypes: {
//     label: { control: 'text' },
//     required: { control: 'boolean' },
//     items: [],
//     className: { control: 'text' },
//     isLoading: { control: 'boolean' },
//     isSubmitted: { control: 'boolean' },
//     customError: { control: 'text' },
//     value: { control: 'object' },
//     onChange: { action: 'changed' },
//   },
// };

// export default meta;

// type Story = StoryObj<DropdownProps>;

// const sampleItems = [
//   { id: 1, name: 'Item 1' },
//   { id: 2, name: 'Item 2' },
//   { id: 3, name: 'Item 3' },
// ];

// export const Default: Story = {
//   args: {
//     label: 'Default Dropdown',
//     items: sampleItems,
//     required: false,
//     customError: '',
//   },
//   render: (args) => {
//     const [selectedItem, setSelectedItem] = useState(sampleItems[0]);
//     const handleSelect = (item: any) => {
//       setSelectedItem(item);
//     };

//     return (
//       <Dropdown
//         {...args}
//         value={selectedItem}
//         onChange={handleSelect}
//       />
//     );
//   },
// };

// export const WithCustomItemRender: Story = {
//   args: {
//     label: 'Dropdown with Custom Item Render',
//     items: sampleItems,
//     required: false,
//     customError: '',
//     renderSelectItem: (item) => <span>{item.name}</span>,
//     renderDropdownItem: (item, isSelected, handleSelect) => (
//       <div
//         onClick={() => handleSelect(item)}
//         className={`p-2 cursor-pointer ${isSelected ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
//       >
//         {item.name}
//       </div>
//     ),
//   },
//   render: (args) => {
//     const [selectedItem, setSelectedItem] = useState(sampleItems[0]);
//     const handleSelect = (item: any) => {
//       setSelectedItem(item);
//     };

//     return (
//       <Dropdown
//         {...args}
//         value={selectedItem}
//         onChange={handleSelect}
//       />
//     );
//   },
// };
