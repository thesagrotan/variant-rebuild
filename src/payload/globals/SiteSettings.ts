import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
    slug: 'site-settings',
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'metadata',
            label: 'Default Site Metadata',
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
