/**
 * Content Export Script
 * 
 * This script exports content from static JSON/TS files into the format
 * needed for the static site build. This allows us to maintain the current
 * content structure while the PayloadCMS integration is being developed.
 * 
 * For production with PayloadCMS:
 * - This script would query PayloadCMS Local API
 * - Export content to static JSON files
 * - These files are then used during static site generation
 * 
 * Usage: node scripts/export-content.js
 */

const fs = require('fs');
const path = require('path');

// Source files
const projectsJsonPath = path.join(__dirname, '../data/projects.json');
const outputDir = path.join(__dirname, '../.content');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

async function exportContent() {
    console.log('📦 Exporting static content...');

    try {
        // Export projects
        if (fs.existsSync(projectsJsonPath)) {
            const projectsData = JSON.parse(fs.readFileSync(projectsJsonPath, 'utf-8'));
            const projectsOutputPath = path.join(outputDir, 'projects.json');
            fs.writeFileSync(projectsOutputPath, JSON.stringify(projectsData, null, 2));
            console.log(`✅ Exported projects to ${projectsOutputPath}`);
        } else {
            console.warn('⚠️ projects.json not found, skipping...');
        }

        // Create a manifest of exported content
        const manifest = {
            exportedAt: new Date().toISOString(),
            files: ['projects.json'],
            mode: 'static',
        };

        const manifestPath = path.join(outputDir, 'manifest.json');
        fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
        console.log(`✅ Created manifest at ${manifestPath}`);

        console.log('📦 Content export complete!');
    } catch (error) {
        console.error('❌ Error exporting content:', error);
        process.exit(1);
    }
}

exportContent();
