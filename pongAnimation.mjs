import { SVG, registerWindow } from '@svgdotjs/svg.js';
import { createSVGWindow } from 'svgdom';
import fs from 'fs';

async function createPongAnimation() {
    const window = createSVGWindow();
    const document = window.document;
    registerWindow(window, document);

    const width = 800, height = 600;
    const canvas = SVG(document.documentElement).size(width, height).viewbox(0, 0, width, height);

    const ballSize = 10;
    const ball = canvas.circle(ballSize).center(width / 2, height / 2).fill('white');
    const paddleWidth = 10, paddleHeight = 100;
    const paddle1 = canvas.rect(paddleWidth, paddleHeight).fill('white').x(10).cy(height / 2);
    const paddle2 = canvas.rect(paddleWidth, paddleHeight).fill('white').x(width - 20).cy(height / 2);

    // Animation for the ball
    let dx = 4, dy = 4;
    function animateBall() {
        let x = ball.cx(), y = ball.cy();
        if (x <= 0 || x >= width) dx = -dx;
        if (y <= 0 || y >= height) dy = -dy;
        ball.dmove(dx, dy);

        setTimeout(animateBall, 16); // Roughly 60 FPS
    }
    animateBall();

    // Export SVG as a string
    const svgContent = canvas.svg();
    fs.writeFileSync('pongAnimation.svg', svgContent);
}

createPongAnimation().catch(console.error);
