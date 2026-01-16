import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
    slug: 'pages',
    admin: {
        useAsTitle: 'title',
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            name: 'slug',
            type: 'text',
            required: true,
            unique: true,
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'layout',
            type: 'blocks',
            required: true,
            blocks: [
                {
                    slug: 'richText',
                    fields: [
                        {
                            name: 'content',
                            type: 'richText',
                            required: true,
                        },
                        {
                            name: 'style',
                            type: 'select',
                            defaultValue: 'default',
                            options: [
                                { label: 'Default (text-2xl)', value: 'default' },
                                { label: 'Lead (text-4xl)', value: 'lead' },
                            ],
                        },
                    ],
                },
                {
                    slug: 'carousel',
                    fields: [
                        {
                            name: 'carousel',
                            type: 'array',
                            admin: {
                                description: 'Icons for the infinite carousel',
                            },
                            fields: [
                                {
                                    name: 'icon',
                                    type: 'upload',
                                    relationTo: 'media',
                                    required: true,
                                },
                            ],
                        },
                    ],
                },
                {
                    slug: 'selectedWorks',
                    fields: [
                        {
                            name: 'title',
                            type: 'text',
                            defaultValue: 'Selected Work',
                        },
                    ],
                },
                {
                    slug: 'helpWith',
                    fields: [
                        {
                            name: 'heading',
                            type: 'text',
                            defaultValue: 'Here to help you with...',
                        },
                        {
                            name: 'links',
                            type: 'array',
                            fields: [
                                {
                                    name: 'row',
                                    type: 'array',
                                    fields: [
                                        {
                                            name: 'text',
                                            type: 'text',
                                            required: true,
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            name: 'metadata',
            type: 'group',
            admin: {
                position: 'sidebar',
            },
            fields: [
                {
                    name: 'siteTitle',
                    type: 'text',
                    defaultValue: 'Portfolio',
                },
                {
                    name: 'siteDescription',
                    type: 'textarea',
                    defaultValue: 'A high-fidelity reconstruction of Portfolio',
                },
            ],
        },
    ],
}
