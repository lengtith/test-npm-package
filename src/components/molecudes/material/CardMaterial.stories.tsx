import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { CardMaterial } from './CardMaterial';
import { action } from "@storybook/addon-actions";
import { userEvent, within, expect } from '@storybook/test';


const meta: Meta<typeof CardMaterial> = {
    title: 'Sabaicode/Molecules/CardMaterial',
    component: CardMaterial,
    tags: ['autodocs'],
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/proto/1ck3QkLujqYR52ayf0evpX/Sabaicode-Admin-App?page-id=0%3A1&node-id=2836-52937&viewport=-10876%2C965%2C0.68&t=kTNHNHAL6US8oUv5-1&scaling=min-zoom&starting-point-node-id=2634%3A3107&show-proto-sidebar=1'
        }
    },
    argTypes: {
        onClick: action('clicked'),
    },
};

export default meta;

// Story type
type Story = StoryObj<typeof CardMaterial>;

// Default story with pdf
export const PDFMaterial: Story = {
    args: {
        material: {
            filetype: 'application/pdf',
            thumbnailUrl: 'https://via.placeholder.com/150',
            title: 'Sample PDF Document',
        },
    },
};

// Story with image material
export const ImageMaterial: Story = {
    args: {
        material: {
            filetype: 'image/jpeg',
            thumbnailUrl: 'https://via.placeholder.com/150',
            title: 'Sample Image',
        },
    },
};

// Story with docs material
export const DocsMaterial: Story = {
    args: {
        material: {
            filetype: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            title: 'Sample DOCX Document',
        },
    },
};

// Story with power point material
export const PptxMaterial: Story = {
    args: {
        material: {
            filetype: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
            title: 'Sample PowerPoint Document',
        },
    },
};

// Story with excel material
export const XlsxMaterial: Story = {
    args: {
        material: {
            filetype: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            title: 'Sample Excel Document',
        },
    },
};

// Story with video material
export const VideosMaterial: Story = {
    args: {
        material: {
            filetype: 'application/mp4',
            title: 'Sample Video Document',
        },
    },
};

// Story with actions and interactions
export const Clickable: Story = {
    args: {
        material: {
            filetype: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
            thumbnailUrl: 'https://via.placeholder.com/150',
            title: 'Sample PPTX Document',
        },
    },
    play: async ({ args, canvasElement }) => {
        const canvas = within(canvasElement);
        const card = canvas.getByRole('article'); // Assuming your card component has a role of article
        await userEvent.click(card);
        expect(args.onClick).toHaveBeenCalled();
    },
};
