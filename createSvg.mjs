// Import statements
import { SVG, registerWindow } from '@svgdotjs/svg.js';
import { createSVGWindow } from 'svgdom';
import fs from 'fs';

// Create and return the SVG
async function createSvg() {
    const window = createSVGWindow();
    const document = window.document;
    registerWindow(window, document);

    const canvas = SVG(document.documentElement);
    canvas.size(200, 200);

    const circle = canvas.circle(100).move(50, 50).fill('yellow');

    // Export SVG as a string
    const svgContent = canvas.svg();
    fs.writeFileSync('coolGraphic.svg', svgContent);
}

createSvg().catch(console.error);
