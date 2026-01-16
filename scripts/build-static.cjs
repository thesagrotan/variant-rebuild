#!/usr/bin/env node

/**
 * Static Build Script
 * 
 * This script temporarily moves the PayloadCMS routes out of the app directory
 * during static export builds to prevent GraphQL/REST dependencies from being bundled.
 * 
 * Usage: node scripts/build-static.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const payloadDir = path.join(__dirname, '../app/(payload)');
const payloadBackupDir = path.join(__dirname, '../.payload-backup');

console.log('🔧 Preparing for static build...');

// Check if payload directory exists
if (fs.existsSync(payloadDir)) {
    console.log('📦 Moving PayloadCMS routes aside...');

    // Move payload directory to backup location
    fs.renameSync(payloadDir, payloadBackupDir);
    console.log('✅ PayloadCMS routes moved to .payload-backup');
}

let buildSucceeded = false;

try {
    console.log('🏗️  Running Next.js static export...');

    // Run the static build
    execSync('npx next build', {
        stdio: 'inherit',
        env: {
            ...process.env,
            BUILD_MODE: 'static',
        },
    });

    buildSucceeded = true;
    console.log('✅ Static build completed successfully!');
} catch (error) {
    console.error('❌ Build failed:', error.message);
} finally {
    // Restore payload directory
    if (fs.existsSync(payloadBackupDir)) {
        console.log('♻️  Restoring PayloadCMS routes...');
        fs.renameSync(payloadBackupDir, payloadDir);
        console.log('✅ PayloadCMS routes restored');
    }
}

if (!buildSucceeded) {
    process.exit(1);
}

console.log('🎉 Static export ready in ./out directory');
