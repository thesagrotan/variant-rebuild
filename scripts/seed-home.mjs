import { getPayload } from 'payload';
import configPromise from '../payload.config.ts';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env manually
const envPath = path.resolve(__dirname, '../.env');
if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, 'utf-8');
    envConfig.split('\n').forEach(line => {
        if (line && !line.startsWith('#')) {
            const [key, ...values] = line.split('=');
            if (key && values.length > 0) {
                process.env[key.trim()] = values.join('=').trim();
            }
        }
    });
}

/* content from data/siteContent.ts */
const siteContent = {
    hero: {
        intro: "I'm Daniel Campagne, **a product designer** who transforms complex systems into intuitive experiences while helping brands tell their stories effectively.",
        experience: "**With over 15 years of experience** for the last years helping startups on b2b and b2c solutions  in the areas fo mobility, fintech, DeFi, and digital health.",
        approach: "**I believe in collaboration** and working closely with founders and teams to craft solutions that are not only beautiful but also functional and scalable.",
        cta: "Get in touch",
        email: "dcampagne@gmail.com",
        lead: "Transforming **complex ideas** into **seamless digital products**."
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

// Helper to convert markdown-like bold to Lexical
function textToLexical(text) {
    if (!text) return { root: { children: [], direction: 'ltr', format: '', indent: 0, type: 'root', version: 1 } };

    // Simple parser for **bold**
    const parts = text.split(/(\*\*.*?\*\*)/g);
    const children = parts.map(part => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return {
                detail: 0,
                format: 1, // Bold
                mode: 'normal',
                style: '',
                text: part.slice(2, -2),
                type: 'text',
                version: 1
            };
        }
        if (part === '') return null;
        return {
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text: part,
            type: 'text',
            version: 1
        };
    }).filter(Boolean);

    return {
        root: {
            children: [
                {
                    children: children,
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    type: 'paragraph',
                    version: 1,
                    textFormat: 0,
                    textStyle: ""
                }
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            type: 'root',
            version: 1
        }
    };
}

// Convert links to proper structure
const linksData = siteContent.helpWith.links.map(row => ({
    row: row.map(text => ({ text }))
}));

async function seed() {
    try {
        console.log('Seeding Home Page...');
        const config = await configPromise;
        const payload = await getPayload({ config });

        // Check if Home page exists
        const existing = await payload.find({
            collection: 'pages',
            where: {
                slug: {
                    equals: 'home'
                }
            }
        });

        const data = {
            title: 'Home',
            slug: 'home',
            layout: [
                {
                    blockType: 'richText',
                    style: 'lead',
                    content: textToLexical(siteContent.hero.lead)
                },
                {
                    blockType: 'richText',
                    style: 'default',
                    content: textToLexical(siteContent.hero.intro)
                },
                {
                    blockType: 'richText',
                    style: 'default',
                    content: textToLexical(siteContent.hero.experience)
                },
                {
                    blockType: 'carousel',
                    carousel: [] // Will be populated by seed-carousel.mjs
                },
                {
                    blockType: 'richText',
                    style: 'default',
                    content: textToLexical(siteContent.hero.approach)
                },
                {
                    blockType: 'selectedWorks',
                    title: siteContent.selectedWork
                },
                {
                    blockType: 'helpWith',
                    heading: siteContent.helpWith.heading,
                    links: linksData
                }
            ],
            metadata: {
                siteTitle: 'Portfolio',
                siteDescription: 'A high-fidelity reconstruction of Portfolio'
            }
        };

        if (existing.docs.length > 0) {
            console.log('Home page exists, updating...');
            await payload.update({
                collection: 'pages',
                id: existing.docs[0].id,
                data: data
            });
        } else {
            console.log('Creating Home page...');
            await payload.create({
                collection: 'pages',
                data: data
            });
        }

        console.log('✅ Home Page seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding home page:', error);
        process.exit(1);
    }
}

seed();
