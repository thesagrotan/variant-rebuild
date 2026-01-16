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

const carouselDir = path.resolve(__dirname, '../public/images/carousel');

async function seed() {
    try {
        console.log('Seeding Carousel Icons...');
        const config = await configPromise;
        const payload = await getPayload({ config });

        // Get all SVG files from the carousel directory
        const files = fs.readdirSync(carouselDir).filter(file => file.endsWith('.svg'));

        const mediaIds = [];

        for (const file of files) {
            const filePath = path.join(carouselDir, file);
            const fileName = file;
            const alt = file.replace('.svg', '').split(/[- ]/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

            // Check if media already exists
            const existingMedia = await payload.find({
                collection: 'media',
                where: {
                    filename: {
                        equals: fileName
                    }
                }
            });

            let mediaId;
            if (existingMedia.docs.length > 0) {
                console.log(`Media ${fileName} already exists, skipping upload.`);
                mediaId = existingMedia.docs[0].id;
            } else {
                console.log(`Uploading ${fileName}...`);
                const media = await payload.create({
                    collection: 'media',
                    data: {
                        alt: alt,
                    },
                    file: {
                        data: fs.readFileSync(filePath),
                        name: fileName,
                        mimetype: 'image/svg+xml',
                        size: fs.statSync(filePath).size,
                    },
                });
                mediaId = media.id;
            }
            mediaIds.push(mediaId);
        }

        // Find the Home page
        const existingPages = await payload.find({
            collection: 'pages',
            where: {
                slug: {
                    equals: 'home'
                }
            }
        });

        if (existingPages.docs.length === 0) {
            console.error('Home page not found! Please run seed-home.mjs first.');
            process.exit(1);
        }

        const homePage = existingPages.docs[0];

        console.log('Updating Home page layout with carousel icons...');
        const newLayout = (homePage.layout || []).map(block => {
            if (block.blockType === 'carousel') {
                return {
                    ...block,
                    carousel: mediaIds.map(id => ({ icon: id }))
                };
            }
            return block;
        });

        await payload.update({
            collection: 'pages',
            id: homePage.id,
            data: {
                layout: newLayout
            }
        });

        console.log('✅ Carousel icons seeded and linked to Home page successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding carousel icons:', error);
        process.exit(1);
    }
}

seed();
