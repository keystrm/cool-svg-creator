const express = require('express');
const fs = require('fs'); // Include the filesystem module
const app = express();
const port = 3000;

// Route that triggers SVG generation and saves it to the server
app.get('/generate-svg', (req, res) => {
    const svg = generateSVG();
    const filePath = './saved_svgs/animated-grid.svg'; // Define a path to save the file

    // Ensure the directory exists
    fs.mkdir('./saved_svgs', { recursive: true }, (err) => {
        if (err) {
            return console.error('Error creating directory:', err);
        }

        // Write the SVG file
        fs.writeFile(filePath, svg, err => {
            if (err) {
                console.error('Error writing SVG to file:', err);
                res.status(500).send("Failed to save SVG.");
            } else {
                console.log('SVG file was saved successfully!');
                res.send("SVG has been successfully saved on the server.");
            }
        });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

function generateSVG() {
    const svgHeader = `<svg width="600" height="100" viewBox="0 0 600 100" xmlns="http://www.w3.org/2000/svg">`;
    let rectangles = '';

    for (let i = 0; i < 55; i++) {
        for (let j = 0; j < 7; j++) {
            const animationBegin = Math.random();
            const rectangle = `<rect x="${i * 15}" y="${j * 15}" width="10" height="10" fill="#216e39">
                <animate attributeName="opacity" values="0.2;1;0.2" dur="1s" repeatCount="indefinite" begin="${animationBegin}s" />
            </rect>`;
            rectangles += rectangle;
        }
    }

    const svgFooter = `</svg>`;
    return svgHeader + rectangles + svgFooter;
}
