// // Button.stories.tsx
// import React from 'react';
// import { Button, ButtonProps } from './Button';
// import { Meta, StoryObj } from '@storybook/react';

// export default {
//   title: 'Components/Button',
//   component: Button,
//   argTypes: {
//     primary: {
//       control: 'boolean',
//       description: 'Set to true to use the primary button styling',
//     },
//     size: {
//       control: { type: 'select', options: ['sm', 'md', 'lg'] },
//       description: 'Set the size of the button',
//     },
//     onClick: {
//       action: 'clicked',
//       description: 'Handler to be called when the button is clicked',
//     }
//   },
// } as Meta<ButtonProps>;

// // Primary Button
// export const Primary: StoryObj<ButtonProps> = {
//   args: {
//     primary: true,
//     children: 'Primary Button',
//   },
// };

// // Secondary Button
// export const Secondary: StoryObj<ButtonProps> = {
//   args: {
//     primary: false,
//     children: 'Secondary Button',
//   },
// };

// // Small Size Button
// export const Small: StoryObj<ButtonProps> = {
//   args: {
//     size: 'sm',
//     children: 'Small Button',
//   },
// };

// // Medium Size Button
// export const Medium: StoryObj<ButtonProps> = {
//   args: {
//     size: 'md',
//     children: 'Medium Button',
//   },
// };

// // Large Size Button
// export const Large: StoryObj<ButtonProps> = {
//   args: {
//     size: 'lg',
//     children: 'Large Button',
//     className:"text-red-500"
//   },
// };
