// // src/components/Modal.stories.tsx

// import React, { useState } from 'react';
// import { Meta, StoryObj } from '@storybook/react';
// import Modal, { ModalProps } from './Modal';
// import { Button } from "../..";

// const meta: Meta<typeof Modal> = {
//   title: 'SabaiCode/Atoms/Modal',
//   // tags: ['autodocs'],
//   component: Modal,
//   argTypes: {
//     isOpen: { control: 'boolean' },
//     className: { control: 'text' },
//     size: {
//       control: 'select',
//       options: ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "full"],
//     },
//     children: { control: 'text' },
//   },
// };

// export default meta;

// type Story = StoryObj<ModalProps>;

// export const Default: Story = {
//   args: {
//     isOpen: true,
//     size: 'md',
//     children: <div className="p-5">
//       This is the content of modal
//     </div>,
//   },
// };

// export const Small: Story = {
//   args: {
//     isOpen: true,
//     size: 'sm',
//     children: <div className="p-5">
//       This is the content of modal
//     </div>,
//   },
// };

// export const Large: Story = {
//   args: {
//     isOpen: true,
//     size: 'lg',
//     children: <div className="p-5">
//       This is the content of modal
//     </div>,
//   },
// };

// export const CustomClassName: Story = {
//   args: {
//     isOpen: true,
//     size: 'md',
//     className: "border border-blue-500 rounded-none",
//     children: <div className="p-5">
//       This is the content of modal
//     </div>,
//   },
// };

// export const ControlledModal: Story = {
//   args: {
//     isOpen: false,
//     size: 'md',
//     children: 'This modal is controlled',
//   },
//   render: (args) => {
//     const [isOpen, setIsOpen] = useState(args.isOpen);

//     return (
//       <>
//         <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
//         <Modal {...args} isOpen={isOpen}>
//           <div className="flex flex-col space-y-5 p-5">
//             <p>This modal is controlled by a button</p>
//             <Button onClick={() => setIsOpen(false)}>Close Modal</Button>
//           </div>
//         </Modal>
//       </>
//     );
//   },
// };
