import { SVG, registerWindow } from '@svgdotjs/svg.js';
import { createSVGWindow } from 'svgdom';
import fs from 'fs';

// Example poses encoded directly as SVG content (usually, you'd have more complex SVGs)
const poses = {
    'Monday': '<svg width="100" height="100"><circle cx="50" cy="30" r="10" fill="black"/></svg>',
    'Tuesday': '<svg width="100" height="100"><rect x="25" y="25" width="50" height="50" fill="green"/></svg>',
    'Wednesday': '<svg width="100" height="100"><line x1="10" y1="10" x2="90" y2="90" stroke="blue" stroke-width="2"/></svg>',
    'Thursday': '<svg width="100" height="100"><ellipse cx="50" cy="50" rx="20" ry="30" fill="red"/></svg>',
    'Friday': '<svg width="100" height="100"><polygon points="50,15 20,80 80,80" fill="purple"/></svg>',
    'Saturday': '<svg width="100" height="100"><path d="M 10 80 Q 50 10 90 80" stroke="orange" fill="transparent" stroke-width="5"/></svg>',
    'Sunday': '<svg width="100" height="100"><text x="25" y="50" font-family="Verdana" font-size="20" fill="navy">Rest!</text></svg>'
};

async function createDailyStickFigureAnimation() {
    const window = createSVGWindow();
    const document = window.document;
    registerWindow(window, document);

    const dayOfWeek = new Date().toLocaleDateString('en-US', { weekday: 'long' });

    const svgContent = poses[dayOfWeek]; // Select the SVG based on the day of the week
    fs.writeFileSync('dailyStickFigure.svg', svgContent);
}

createDailyStickFigureAnimation().catch(console.error);
