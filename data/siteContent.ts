export interface CarouselIcon {
    url: string;
    alt: string;
}

export type SiteContentBlock =
    | { type: 'richText'; content: string; style?: 'default' | 'lead' }
    | { type: 'carousel'; icons: CarouselIcon[] }
    | { type: 'selectedWorks'; title: string }
    | { type: 'helpWith'; heading: string; links: string[][] };

export type SiteContent = SiteContentBlock[];

export const siteContent: SiteContent = [
    {
        type: 'richText',
        content: "Transforming **complex ideas** into **seamless digital products**."
    },
    {
        type: 'richText',
        content: "I'm Daniel Campagne, **a product designer** who transforms complex systems into intuitive experiences while helping brands tell their stories effectively."
    },
    {
        type: 'richText',
        content: "**With over 15 years of experience** for the last years helping startups on b2b and b2c solutions  in the areas fo mobility, fintech, DeFi, and digital health."
    },
    {
        type: 'carousel',
        icons: []
    },
    {
        type: 'richText',
        content: "**I believe in collaboration** and working closely with founders and teams to craft solutions that are not only beautiful but also functional and scalable."
    },
    {
        type: 'selectedWorks',
        title: "Selected Work"
    },
    {
        type: 'helpWith',
        heading: "Here to help you with...",
        links: [
            ["Product Design ", "Web Design ", "Visual Identity"],
            ["Design Systems", "Framer", "Prototypes"]
        ]
    }
];

export interface ParsedText {
    text: string;
    bold: boolean;
    key: string;
}

export function parseBold(text: string): ParsedText[] {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return {
                text: part.slice(2, -2),
                bold: true,
                key: `bold-${index}`
            };
        }
        return {
            text: part,
            bold: false,
            key: `text-${index}`
        };
    });
}
