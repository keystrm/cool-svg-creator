
const express = require('express');
const app = express();
const port = 3000;

// Route to generate SVG
app.get('/animated-svg', (req, res) => {
    const svg = generateSVG();
    res.setHeader('Content-Type', 'image/svg+xml');
    res.send(svg);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

function generateSVG() {
    // SVG generation logic
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