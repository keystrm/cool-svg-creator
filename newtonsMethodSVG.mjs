const fs = require('fs');

function f(x) { return x * x - 4; }  // Example function f(x) = x^2 - 4
function df(x) { return 2 * x; }     // Derivative f'(x) = 2x

function newtonsMethod(initialGuess, iterations) {
    let x = initialGuess;
    let steps = [];
    for (let i = 0; i < iterations; i++) {
        const fx = f(x);
        const dfx = df(x);
        const newX = x - fx / dfx;
        steps.push({ x, fx, dfx, newX });
        x = newX;
    }
    return steps;
}

function createSVGWithAnimation(steps) {
    let svgContent = `<svg width="800" height="600" viewBox="-10 -10 20 20" xmlns="http://www.w3.org/2000/svg">
        <line x1="-10" y1="0" x2="10" y2="0" stroke="black" stroke-width="0.1"/> <!-- x-axis -->
        <line x1="0" y1="-10" x2="0" y2="10" stroke="black" stroke-width="0.1"/> <!-- y-axis -->
    `;

    steps.forEach((step, index) => {
        const { x, fx, dfx, newX } = step;
        const tangentEndX = x + 1;
        const tangentStartX = x - 1;
        const tangentStartY = -(dfx * (tangentStartX - x) + fx);
        const tangentEndY = -(dfx * (tangentEndX - x) + fx);

        svgContent += `
            <circle cx="${x}" cy="${-fx}" r="0.1" fill="blue">
                <animate attributeName="r" from="0" to="0.2" dur="1s" begin="${index}s" fill="freeze"/>
            </circle>
            <line x1="${tangentStartX}" y1="${tangentStartY}" x2="${tangentEndX}" y2="${tangentEndY}" stroke="red" stroke-width="0.05">
                <animate attributeName="stroke-width" from="0" to="0.1" dur="1s" begin="${index}s" fill="freeze"/>
            </line>
        `;

        if (index < steps.length - 1) {
            svgContent += `<line x1="${newX}" y1="0.5" x2="${newX}" y2="-0.5" stroke="green" stroke-width="0.05">
                <animate attributeName="stroke-width" from="0" to="0.1" dur="1s" begin="${index + 0.5}s" fill="freeze"/>
            </line>`;
        }
    });

    svgContent += `</svg>`;
    return svgContent;
}

const steps = newtonsMethod(2, 5);
const svgData = createSVGWithAnimation(steps);
fs.writeFileSync('newtonsMethodAnimated.svg', svgData);
