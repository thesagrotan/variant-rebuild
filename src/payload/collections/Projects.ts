import { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
    slug: 'projects',
    admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'year', 'categories'],
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'projectId',
            type: 'text',
            required: true,
            unique: true,
            admin: {
                description: 'URL-friendly identifier (e.g., "credcore", "mobility-platform")',
            },
        },
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            name: 'logo',
            type: 'upload',
            relationTo: 'media',
            admin: {
                description: 'Brand/logo asset for project cards',
            },
        },
        {
            name: 'logoText',
            type: 'text',
            admin: {
                description: 'Alternative text logo (if no image logo)',
            },
        },
        {
            name: 'year',
            type: 'text',
            admin: {
                description: 'Year or date range (e.g., "2023-2025")',
            },
        },
        {
            name: 'categories',
            type: 'array',
            fields: [
                {
                    name: 'category',
                    type: 'text',
                    required: true,
                },
            ],
        },
        {
            name: 'longDescription',
            type: 'richText',
            required: true,
            admin: {
                description: 'Full project description shown in detail modal',
            },
        },
        {
            name: 'images',
            type: 'array',
            admin: {
                description: 'Project screenshots and visuals',
            },
            fields: [
                {
                    name: 'image',
                    type: 'upload',
                    relationTo: 'media',
                    required: true,
                },
                {
                    name: 'cardSettings',
                    type: 'group',
                    fields: [
                        {
                            name: 'objectPosition',
                            type: 'text',
                            defaultValue: 'center',
                        },
                        {
                            name: 'scale',
                            type: 'number',
                            defaultValue: 1,
                        },
                        {
                            name: 'translateX',
                            type: 'text',
                            defaultValue: '0',
                        },
                        {
                            name: 'translateY',
                            type: 'text',
                            defaultValue: '0',
                        },
                    ],
                },
                {
                    name: 'detailSettings',
                    type: 'group',
                    fields: [
                        {
                            name: 'objectPosition',
                            type: 'text',
                            defaultValue: 'center',
                        },
                    ],
                },
            ],
        },
    ],
}
