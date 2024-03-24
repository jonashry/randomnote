const fs = require('fs');
const path = require('path');

const srcDir = './src';
const destDir = './public';

// Function to recursively copy files from source directory to destination directory
function copyFiles(source, destination) {
    // Get the list of files in the source directory
    const files = fs.readdirSync(source);

    // Loop through each file in the source directory
    files.forEach(file => {
        const srcPath = path.join(source, file);
        const destPath = path.join(destination, file);

        // Check if the current file is a directory
        if (fs.statSync(srcPath).isDirectory()) {
            // If it's a directory, create the directory in the destination and recursively copy its contents
            fs.mkdirSync(destPath, { recursive: true });
            copyFiles(srcPath, destPath);
        } else {
            // If it's a file, copy the file to the destination
            fs.copyFileSync(srcPath, destPath);
            console.log(`Copied ${srcPath} to ${destPath}`);
        }
    });
}

// Call the function to copy files from src directory to public directory
copyFiles(srcDir, destDir);