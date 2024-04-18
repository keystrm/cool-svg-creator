const fs = require('fs');

function generateSVG(color, duration) {
    const svgHeader = `<svg width="600" height="100" viewBox="0 0 600 100" xmlns="http://www.w3.org/2000/svg">`;
    let rectangles = '';
console.log(color,duration)
    for (let i = 0; i < 55; i++) {
        for (let j = 0; j < 7; j++) {
            const animationBegin = Math.random() * duration;  // Adjusting begin times based on duration
            const rectangle = `<rect x="${i * 15}" y="${j * 15}" width="10" height="10" fill="${color}">
                <animate attributeName="opacity" values="0.2;1;0.2" dur="${duration}s" repeatCount="indefinite" begin="${animationBegin}s" />
            </rect>`;
            rectangles += rectangle;
        }
    }

    const svgFooter = `</svg>`;
    return svgHeader + rectangles + svgFooter;
}

// Default values
let color = '#216e39'; // Green
let duration = 1; // 1 second, ensure it's a number

// Command line arguments
const args = process.argv.slice(2);
console.log(args)
if (args.length >= 2) {
    color = args[0];
    duration = parseFloat(args[1]);  // Convert duration to a floating-point number
    if (isNaN(duration)) {           // Check if the conversion failed
        console.error('Invalid duration, using default 1 second');
        duration = 1;
    }
}

const svgContent = generateSVG(color, duration);
const filePath = './saved_svgs/animated-grid.svg';

// Ensure the directory exists
fs.mkdirSync('./saved_svgs', { recursive: true });

// Write the SVG file
fs.writeFileSync(filePath, svgContent);
console.log('SVG file was saved successfully!');
