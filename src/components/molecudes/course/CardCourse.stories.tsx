import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CardCourse } from './CardCourse'; // Adjust the import path based on your project structure
import { action } from "@storybook/addon-actions";
import { within, userEvent, expect } from '@storybook/test';

const meta: Meta<typeof CardCourse> = {
    title: 'Sabaicode/Molecules/CardCourse',
    component: CardCourse,
    tags: ['autodocs'],
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/proto/1ck3QkLujqYR52ayf0evpX/Sabaicode-Admin-App?page-id=0%3A1&node-id=2836-52936&viewport=-10876%2C965%2C0.68&t=kTNHNHAL6US8oUv5-1&scaling=min-zoom&starting-point-node-id=2634%3A3107&show-proto-sidebar=1'
        }
    },
    argTypes: {
        level: {
            control: {
                type: 'select',
                options: ['Beginner', 'Intermediate', 'Advanced'],
            },
        },
    },
};

export default meta;

type Story = StoryObj<typeof CardCourse>;

export const Default: Story = {
    args: {
        name: 'React Basics',
        imageUrl: 'https://www.nbmchealth.com/wp-content/uploads/2018/04/default-placeholder.png',
        level: 'Beginner',
        duration: '3 hours',
        subject: 'Web Development',
        onClick: action('Card clicked'),
    },
};

Default.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const card = canvas.getByRole('article');
    await userEvent.click(card);
    expect(action('Card clicked')).toHaveBeenCalled();
};

export const IntermediateCourse: Story = {
    args: {
        name: 'Advanced React',
        imageUrl: 'https://via.placeholder.com/150',
        level: 'Intermediate',
        duration: '5 hours',
        subject: 'Web Development',
        onClick: action('Card clicked'),
    },
};

IntermediateCourse.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const card = canvas.getByRole('article');
    await userEvent.click(card);
};

export const AdvancedCourse: Story = {
    args: {
        name: 'React and TypeScript',
        imageUrl: 'https://via.placeholder.com/150',
        level: 'Advanced',
        duration: '4 hours',
        subject: 'Web Development',
        onClick: action('Card clicked'),
    },
};

AdvancedCourse.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const card = canvas.getByRole('article');
    await userEvent.click(card);
};

export const NoImageCourse: Story = {
    args: {
        name: 'No Image Course',
        imageUrl: '', // No image URL provided
        level: 'Beginner',
        duration: '2 hours',
        subject: 'Web Development',
    },
};

NoImageCourse.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const card = canvas.getByRole('article');
    const img = canvas.getByRole('img', { name: /No Image Course/i });
    await userEvent.click(card);
    expect(img).toHaveAttribute('src', 'https://www.nbmchealth.com/wp-content/uploads/2018/04/default-placeholder.png');
};