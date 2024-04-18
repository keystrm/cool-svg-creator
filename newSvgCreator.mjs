import {JSDOM} from "jsdom";
import fs from "fs";

// Create a new DOM instance
const dom = new JSDOM(`<!DOCTYPE html><body></body>`);
const document = dom.window.document;
const { XMLSerializer } = JSDOM;  // Ensure XMLSerializer is properly referenced

const svgNS = "http://www.w3.org/2000/svg";

// Create SVG element
let svgElem = document.createElementNS(svgNS, "svg");
svgElem.setAttribute("width", "600");
svgElem.setAttribute("height", "100");
svgElem.setAttribute("viewBox", "0 0 600 100");
svgElem.setAttribute("xmlns", svgNS);

// Create grid of rectangles
for (let i = 0; i < 55; i++) {
    for (let j = 0; j < 7; j++) {
        let rect = document.createElementNS(svgNS, "rect");
        rect.setAttribute("x", i * 15);
        rect.setAttribute("y", j * 15);
        rect.setAttribute("width", "10");
        rect.setAttribute("height", "10");
        rect.setAttribute("fill", "#216e39");
        rect.classList.add("rect");

        // Add blinking animation to each rectangle
        let animate = document.createElementNS(svgNS, "animate");
        animate.setAttribute("attributeType", "XML");
        animate.setAttribute("attributeName", "opacity");
        animate.setAttribute("values", "0.2;1;0.2");
        animate.setAttribute("dur", "1s");
        animate.setAttribute("repeatCount", "indefinite");
        animate.setAttribute("begin", `${Math.random()}s`); // random start for blinking

        rect.appendChild(animate);
        svgElem.appendChild(rect);
    }
}

// Serialize SVG to string using XMLSerializer from jsdom
const serializer = new XMLSerializer();
const serializedSVG = serializer.serializeToString(svgElem);

// Save to file
fs.writeFile("blinking-grid.svg", serializedSVG, err => {
    if (err) {
        console.error("Error writing SVG to file:", err);
    } else {
        console.log("SVG file was saved successfully!");
    }
});