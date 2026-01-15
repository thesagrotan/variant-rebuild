export interface SiteContent {
    hero: {
        intro: string;
        experience: string;
        cta: string;
        email: string;
    };
    selectedWork: string;
    helpWith: {
        heading: string;
        links: string[][];
    };
}

export const siteContent: SiteContent = {
    hero: {
        intro: "I'm Daniel Campagne, **a product designer** who transforms complex systems into intuitive experiences while helping brands tell their stories effectively.",
        experience: "**With over 15 years of experience** for the last years helping startups on b2b and b2c solutions  in the areas fo mobility, fintech, DeFi, and digital health.",
        cta: "Get in touch",
        email: "dcampagne@gmail.com"
    },
    selectedWork: "Selected Work",
    helpWith: {
        heading: "Here to help you with...",
        links: [
            ["Product Design ", "Web Design ", "Visual Identity"],
            ["Design Systems", "Framer", "Prototypes"]
        ]
    }
};

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
