const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const projectsFilePath = path.join(__dirname, 'data/projects.json');
const projectsData = require(projectsFilePath);

function getDimensions(imagePath) {
    try {
        // Handle both absolute paths in public (starting with /) and relative paths
        // Remove leading slash if present to make it relative to cwd
        const relativePath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
        const fullPath = path.join(__dirname, 'public', relativePath.replace('public/', ''));

        if (!fs.existsSync(fullPath)) {
            // Try without public/ prefix just in case
            const altPath = path.join(__dirname, 'public', relativePath);
            if (!fs.existsSync(altPath)) {
                console.warn(`File not found: ${fullPath} or ${altPath}`);
                return null;
            }
            // if altPath works, use it
        }

        // Use the path that actually maps to the file system
        const fileToRead = fs.existsSync(fullPath) ? fullPath : path.join(__dirname, 'public', relativePath);

        const width = execSync(`sips -g pixelWidth "${fileToRead}" | awk '/pixelWidth/ {print $2}'`).toString().trim();
        const height = execSync(`sips -g pixelHeight "${fileToRead}" | awk '/pixelHeight/ {print $2}'`).toString().trim();

        if (width && height && !isNaN(width) && !isNaN(height)) {
            return { width: parseInt(width), height: parseInt(height) };
        }
    } catch (e) {
        console.error(`Error getting dims for ${imagePath}:`, e.message);
    }
    return null;
}

function processImages(imagesArray) {
    let updated = false;
    for (const img of imagesArray) {
        if (img.src && (!img.width || !img.height)) {
            console.log(`Processing ${img.src}...`);
            const dims = getDimensions(img.src);
            if (dims) {
                img.width = dims.width;
                img.height = dims.height;
                console.log(`  -> ${dims.width}x${dims.height}`);
                updated = true;
            }
        }
    }
    return updated;
}

let anyUpdated = false;

for (const project of projectsData.projects) {
    if (project.images) {
        // Check if images is an array (legacy structure?) or object with card/detail
        // Based on projects.json view, it seems 'images' is an ARRAY of objects directly in some cases?
        // Wait, looking at the previous view_file of projects.json:
        // "images": [ { "src": ... }, ... ]
        // BUT projects.ts says: images: { card: [], detail: [] }

        // Let's re-examine projects.json structure from the previous turn.
        // It showed "images": [ { "src": ..., "card": {}, "detail": {} } ] for 'credcore'.
        // So it IS an array of image objects.
        // My projects.ts 'transform' function separates them into 'card' and 'detail' arrays in memory.

        if (Array.isArray(project.images)) {
            if (processImages(project.images)) {
                anyUpdated = true;
            }
        }
    }
}

if (anyUpdated) {
    fs.writeFileSync(projectsFilePath, JSON.stringify(projectsData, null, 4));
    console.log('projects.json updated with new dimensions.');
} else {
    console.log('No new dimensions needed.');
}
