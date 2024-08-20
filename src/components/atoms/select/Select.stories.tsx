// // src/components/Select.stories.tsx

// import React, { useState } from 'react';
// import { Meta, StoryObj } from '@storybook/react';
// import Select, { SelectProps, Item } from './Select';

// const meta: Meta<typeof Select> = {
//   title: 'SabaiCode/Atoms/Select',
//   tags: ['autodocs'],
//   component: Select,
//   argTypes: {
//     label: { control: 'text' },
//     required: { control: 'boolean' },
//     items: {control: 'object'},
//     className: { control: 'text' },
//     isLoading: { control: 'boolean' },
//     isSubmitted: { control: 'boolean' },
//     customError: { control: 'text' },
//     renderSelectItem: {control: React.createElement},
//     renderDropdownItem: {control: React.createElement},
//     multiple: { control: 'boolean' },
//     value: { control: 'object' },
//     onChange: { action: 'changed' },
//   },
// };

// export default meta;

// type Story = StoryObj<SelectProps>;

// const sampleItems: Item[] = [
//   { id: 1, name: 'Item 1' },
//   { id: 2, name: 'Item 2' },
//   { id: 3, name: 'Item 3' },
// ];

// export const SingleSelect: Story = {
//   args: {
//     label: 'Single Select',
//     items: sampleItems,
//     required: false,
//     isLoading: false,
//     isSubmitted: false,
//     customError: '',
//   },
//   render: (args:any) => {
//     const [selectedItem, setSelectedItem] = useState<Item | undefined>(sampleItems[0]);

//     return (
//       <Select
//         {...args}
//         value={selectedItem}
//         onChange={setSelectedItem}
//       />
//     );
//   },
// };

// export const MultipleSelect: Story = {
//   args: {
//     label: 'Multiple Select',
//     items: sampleItems,
//     required: true,
//     isLoading: false,
//     isSubmitted: false,
//     customError: '',
//     multiple: true,
//   },
//   render: (args:any) => {
//     const [selectedItems, setSelectedItems] = useState<Item[]>([]);

//     return (
//       <Select
//         {...args}
//         value={selectedItems}
//         onChange={setSelectedItems}
//       />
//     );
//   },
// };

// export const WithCustomItemRender: Story = {
//   args: {
//     label: 'Select with Custom Item Render',
//     items: sampleItems,
//     required: false,
//     isLoading: false,
//     isSubmitted: false,
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
//   render: (args:any) => {
//     const [selectedItem, setSelectedItem] = useState<Item | undefined>(sampleItems[0]);

//     return (
//       <Select
//         {...args}
//         value={selectedItem}
//         onChange={setSelectedItem}
//       />
//     );
//   },
// };

// export const WithError: Story = {
//   args: {
//     label: 'Select with Error',
//     items: sampleItems,
//     required: true,
//     isLoading: false,
//     isSubmitted: true,
//     customError: 'This field is required',
//   },
//   render: (args:any) => {
//     const [selectedItem, setSelectedItem] = useState<Item | undefined>({});

//     return (
//       <Select
//         {...args}
//         value={selectedItem}
//         onChange={setSelectedItem}
//       />
//     );
//   },
// };

// export const Loading: Story = {
//   args: {
//     label: 'Select with Loading State',
//     items: sampleItems,
//     required: false,
//     isLoading: true,
//     isSubmitted: false,
//     customError: '',
//   },
//   render: (args:any) => {
//     const [selectedItem, setSelectedItem] = useState<Item | undefined>(sampleItems[0]);

//     return (
//       <Select
//         {...args}
//         value={selectedItem}
//         onChange={setSelectedItem}
//       />
//     );
//   },
// };
