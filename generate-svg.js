const fs = require('fs');

function generateSVG(color, duration) {
    const svgHeader = `<svg width="800" height="300" viewBox="0 0 600 100" xmlns="http://www.w3.org/2000/svg">`;
    let animatedBody = generrateAnimatedBody('bird-flying',color,duration)
    const svgFooter = `</svg>`;
    return svgHeader + animatedBody + svgFooter;
}

function generrateAnimatedBody(key,color,duration) {
    switch (key) {
        case 'github-grid':
            return animatedGrid(color,duration)
        case 'bird-flying':
            return birdFlying(color,duration)
    
        default:
            break;
    }
}

function animatedGrid(color,duration) {
    let animatedBody = '';
    for (let i = 0; i < 55; i++) {
        for (let j = 0; j < 7; j++) {
            const animationBegin = Math.random() * duration;  // Adjusting begin times based on duration
            const rectangle = `<rect x="${i * 15}" y="${j * 15}" width="10" height="10" fill="${color}">
                <animate attributeName="opacity" values="0.2;1;0.2" dur="${duration}s" repeatCount="indefinite" begin="${animationBegin}s" />
            </rect>`;
            animatedBody += rectangle;
        }
    }
    return animatedBody;
}
function birdFlying(color,duration) {
    let animations = '';

    // Define a simple bird shape using SVG path
    const birdShape = `<path d="M10 15 Q 25 5 40 15 T 70 15 Q 55 5 40 15 T 10 15 Z" fill="${color}"/>`;

    // Animation for the bird to fly across the screen
    const birdAnimation = `<animateMotion path="M 0 150 Q 400 50 800 150" dur="${duration}s" repeatCount="indefinite"/>`;
    // Animation for the wings flapping
    const wingFlap = `<animateTransform attributeName="transform" attributeType="XML" type="scale" values="1,1; 1,0.8; 1,1" dur="${duration / 2}s" repeatCount="indefinite"/>`;

    // Add the bird with animations to the SVG
    animations += `<g>${birdShape}${birdAnimation}${wingFlap}</g>`;

    return animations;
}

// Default values
let color = '#216e39'; // Green
let duration = 1; // 1 second, ensure it's a number

// Command line arguments
const args = process.argv.slice(2);
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
