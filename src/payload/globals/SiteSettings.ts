import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
    slug: 'site-settings',
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'hero',
            type: 'group',
            fields: [
                {
                    name: 'intro',
                    type: 'richText',
                    required: true,
                    admin: {
                        description: 'Main introduction paragraph (supports bold markdown)',
                    },
                },
                {
                    name: 'experience',
                    type: 'richText',
                    required: true,
                    admin: {
                        description: 'Experience paragraph',
                    },
                },
                {
                    name: 'approach',
                    type: 'richText',
                    required: true,
                    admin: {
                        description: 'Approach/philosophy paragraph',
                    },
                },
                {
                    name: 'lead',
                    type: 'richText',
                    required: true,
                    admin: {
                        description: 'Lead headline text',
                    },
                },
                {
                    name: 'cta',
                    type: 'text',
                    required: true,
                    defaultValue: 'Get in touch',
                },
                {
                    name: 'email',
                    type: 'email',
                    required: true,
                },
            ],
        },
        {
            name: 'selectedWorkTitle',
            type: 'text',
            defaultValue: 'Selected Work',
        },
        {
            name: 'helpWith',
            type: 'group',
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
        {
            name: 'metadata',
            type: 'group',
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
