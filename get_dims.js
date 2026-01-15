
const fs = require('fs');
const path = require('path');
// const { imageSize } = require('image-size'); // Removed unused dependency
// Actually I don't know if image-size is installed. I'll assume not and use a simpler specific check or try to run it.
// If not available, I can try to read headers manually or just use 'sips' on mac.

const images = [
    "credcore-1.png",
    "credcore-2.png",
    "credcore-3.png"
];

// Using sips (scriptable image processing system) which is standard on macOS
const { execSync } = require('child_process');

images.forEach(img => {
    const p = path.join('public/images/projects', img);
    try {
        const output = execSync(`sips -g pixelWidth -g pixelHeight "${p}"`).toString();
        console.log(`Image: ${img}`);
        console.log(output);
    } catch (e) {
        console.error(`Error processing ${img}`, e);
    }
});
