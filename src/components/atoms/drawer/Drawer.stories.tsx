// // src/components/Drawer.stories.tsx

// import React, { useState } from 'react';
// import { Meta, StoryObj } from '@storybook/react';
// import { Drawer, DrawerHeader, DrawerBody, DrawerFooter, DrawerProps } from './Drawer';
// import { Button } from "../..";

// const meta: Meta<typeof Drawer> = {
//   title: 'SabaiCode/Atoms/Drawer',
//   tags: ['autodocs'],
//   component: Drawer,
//   argTypes: {
//     isOpen: { control: 'boolean' },
//     onClose: { action: 'closed' },
//     className: { control: 'text' },
//     placement: {
//       control: 'select',
//       options: ['top', 'bottom', 'left', 'right'],
//     },
//     size: {
//       control: 'select',
//       options: ['sm', 'md', 'lg', 'xl', 'full'],
//     },
//   },
// };

// export default meta;

// type Story = StoryObj<DrawerProps>;

// export const Default: Story = {

//   args: {
//     placement: 'right',
//     size: 'md',
//     isOpen: true
//   },
//   render: (args: any) => {
//     const [isOpen, setIsOpen] = useState(true);
//     return (
//       <Drawer isOpen={isOpen} {...args}>
//         <DrawerHeader onClose={() => { setIsOpen(false) }}>Drawer Header</DrawerHeader>
//         <DrawerBody>Drawer Body Content</DrawerBody>
//         <DrawerFooter>Drawer Footer Content</DrawerFooter>
//       </Drawer>
//     )
//   }
// };

// export const FullSize: Story = {
//   args: {
//     isOpen: true,
//     placement: 'right',
//     size: 'full',
//   },
//   render: (args: any) => {
//     const [isOpen, setIsOpen] = useState(true);
//     return (
//       <Drawer isOpen={isOpen} {...args}>
//         <DrawerHeader onClose={() => { setIsOpen(false) }}>Drawer Header</DrawerHeader>
//         <DrawerBody>Drawer Body Content</DrawerBody>
//         <DrawerFooter>Drawer Footer Content</DrawerFooter>
//       </Drawer>
//     )
//   }
// };

// export const ButtonControl: Story = {
//   args: {
//     placement: 'right',
//     size: 'lg',
//   },
//   render: (args: any) => {
//     const [isOpen, setIsOpen] = useState(false);

//     return (
//       <div>
//         <Button onClick={() => setIsOpen(true)}>Open Drawer</Button>

//         <Drawer isOpen={isOpen} {...args}>
//           <DrawerHeader onClose={() => setIsOpen(false)}>Drawer Header</DrawerHeader>
//           <DrawerBody>Drawer Body Content</DrawerBody>
//           <DrawerFooter>Drawer Footer Content</DrawerFooter>
//         </Drawer>
//       </div>
//     )
//   }
// };
