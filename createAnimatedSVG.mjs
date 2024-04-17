import { SVG, registerWindow } from '@svgdotjs/svg.js';
import { createSVGWindow } from 'svgdom';
import fs from 'fs';

async function generateAnimatedSVG() {
    const window = createSVGWindow();
    const document = window.document;
    registerWindow(window, document);

    const svg = SVG(document.documentElement).size(600, 100).viewbox(0, 0, 600, 100);

    // Read user input from a configuration file
    const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
    const { duration, opacityRange } = config;

    // Create a grid of rectangles
    for (let i = 0; i < 55; i++) {
        for (let j = 0; j < 7; j++) {
            let rect = svg.rect(10, 10).move(i * 15, j * 15).fill('#216e39');

            // Add blinking animation to each rectangle
            rect.animate(duration, '-', 0).attr({ opacity: opacityRange[0] })
                .loop(true, true)
                .animate(duration).attr({ opacity: opacityRange[1] });
        }
    }

    const svgContent = svg.svg();
    fs.writeFileSync('animatedRectangles.svg', svgContent);
}

generateAnimatedSVG().catch(console.error);
