const { SVG, registerWindow } = require('@svgdotjs/svg.js');
const fs = require('fs');

async function createSvg() {
    const { createSVGWindow } = await import('svgdom');
    
    // Create a window and document (required by svg.js)
    const window = createSVGWindow();
    const document = window.document;
    registerWindow(window, document);

    // Function to create and return the SVG
    function createCoolSVG(color = 'blue') {
        const canvas = SVG(document.documentElement);
        canvas.size(200, 200);

        // Draw a circle
        const circle = canvas.circle(100).move(50, 50).fill(color);

        // Export SVG as a string
        return canvas.svg();
    }

    // Generate SVG with a specific color
    const svgContent = createCoolSVG('purple');

    // Write the SVG to a file
    fs.writeFileSync('coolGraphic.svg', svgContent);
}

createSvg().catch(console.error);
