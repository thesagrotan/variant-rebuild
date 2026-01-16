import type { CollectionConfig } from 'payload'

export const Frames: CollectionConfig = {
    slug: 'frames',
    admin: {
        useAsTitle: 'tag',
        defaultColumns: ['tag', 'type', 'rotation'],
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'frameId',
            type: 'text',
            required: true,
            unique: true,
            admin: {
                description: 'Unique identifier for the frame',
            },
        },
        {
            name: 'tag',
            type: 'text',
            required: true,
            admin: {
                description: 'Display tag for the frame',
            },
        },
        {
            name: 'type',
            type: 'select',
            required: true,
            options: [
                { label: 'Image', value: 'image' },
                { label: 'Video', value: 'video' },
            ],
        },
        {
            name: 'media',
            type: 'upload',
            relationTo: 'media',
            required: true,
            admin: {
                description: 'Image or video content for the frame',
            },
        },
        {
            name: 'initialX',
            type: 'group',
            fields: [
                {
                    name: 'relX',
                    type: 'number',
                    required: true,
                    admin: { description: 'Relative X position' },
                },
                {
                    name: 'relY',
                    type: 'number',
                    required: true,
                    admin: { description: 'Relative Y position' },
                },
                {
                    name: 'w',
                    type: 'number',
                    required: true,
                    admin: { description: 'Initial Width' },
                },
                {
                    name: 'h',
                    type: 'number',
                    required: true,
                    admin: { description: 'Initial Height' },
                },
            ],
        },
        {
            name: 'width',
            type: 'number',
            required: true,
            admin: {
                description: 'Full width',
            },
        },
        {
            name: 'height',
            type: 'number',
            required: true,
            admin: {
                description: 'Full height',
            },
        },
        {
            name: 'rotation',
            type: 'number',
            required: true,
            defaultValue: 0,
            admin: {
                description: 'Rotation angle in degrees',
            },
        },
    ],
}
