// // src/components/Menu.stories.tsx

// import React from 'react';
// import { Meta, StoryObj } from '@storybook/react';
// import Menu, { MenuProps, MenuItemProps } from './Menu';

// const meta: Meta<typeof Menu> = {
//   title: 'SabaiCode/Atoms/Menu',
//   tags: ['autodocs'],
//   component: Menu,
//   parameters: {
//     layout: 'centered'
//   },
//   argTypes: {
//     buttonContent: { control: 'text' },
//     items: { control: 'object' },
//   },
// };

// export default meta;

// type Story = StoryObj<MenuProps>;

// const sampleItems: MenuItemProps[] = [
//   { label: 'Item 1', onClick: () => alert('Item 1 clicked') },
//   { label: 'Item 2', onClick: () => alert('Item 2 clicked') },
//   { label: 'Item 3', onClick: () => alert('Item 3 clicked') },
// ];

// export const Default: Story = {
//   args: {
//     buttonContent: <p className="px-4 py-2 bg-gray-300 rounded-lg">Menu</p>,
//     items: sampleItems,
//   },
// };

// export const WithIcons: Story = {
//   args: {
//     buttonContent: "Menu with icon *️",

//     items: [
//       { icon: <span>🏠</span>, label: 'Home', onClick: () => alert('Home clicked') },
//       { icon: <span>📄</span>, label: 'Documents', onClick: () => alert('Documents clicked') },
//       { icon: <span>⚙️</span>, label: 'Settings', onClick: () => alert('Settings clicked') },
//     ],

//     className: "hover:shadow-md"
//   },
// };

// export const DisabledItems: Story = {
//   args: {
//     buttonContent: 'Menu with Disabled Items',
//     items: [
//       { label: 'Enabled Item', onClick: () => alert('Enabled Item clicked') },
//       { label: 'Disabled Item' },
//       { label: 'Another Enabled Item', onClick: () => alert('Another Enabled Item clicked') },
//     ],
//   },
// };
