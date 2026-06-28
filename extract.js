const fs = require('fs');
const path = require('path');

const cssFile = 'C:/Users/Teste/Downloads/CopyCenter/Paridade/cdn.prod.website-files.com/68c7fc532c18bd4c19f842d0/css/albadoe.webflow.shared.ddbf4f6eb.css';
const htmlFile = 'C:/Users/Teste/Downloads/CopyCenter/Paridade/albadoe.webflow.io/index.html';
const assetsDir = 'C:/Users/Teste/Downloads/CopyCenter/Paridade/cdn.prod.website-files.com/68c7fc532c18bd4c19f842d0/';

const cssContent = fs.readFileSync(cssFile, 'utf8');
const htmlContent = fs.readFileSync(htmlFile, 'utf8');

// 1. Extract tokens
console.log("=== TOKENS ===");
const colors = new Set();
const hexColorRegex = /#([a-fA-F0-9]{3,6})\b/g;
const rgbaColorRegex = /rgba?\([^)]+\)/g;
let match;
while ((match = hexColorRegex.exec(cssContent)) !== null) colors.add(match[0]);
while ((match = rgbaColorRegex.exec(cssContent)) !== null) colors.add(match[0]);
console.log("Colors:", Array.from(colors).slice(0, 30));

const fontFamilies = new Set();
const fontRegex = /font-family:\s*([^;]+)/g;
while ((match = fontRegex.exec(cssContent)) !== null) fontFamilies.add(match[1].trim());
console.log("Fonts:", Array.from(fontFamilies));

const fontWeights = new Set();
const weightRegex = /font-weight:\s*([^;]+)/g;
while ((match = weightRegex.exec(cssContent)) !== null) fontWeights.add(match[1].trim());
console.log("Font Weights:", Array.from(fontWeights));

const lineHeights = new Set();
const lhRegex = /line-height:\s*([^;]+)/g;
while ((match = lhRegex.exec(cssContent)) !== null) lineHeights.add(match[1].trim());
console.log("Line Heights:", Array.from(lineHeights).slice(0, 20));

const letterSpacings = new Set();
const lsRegex = /letter-spacing:\s*([^;]+)/g;
while ((match = lsRegex.exec(cssContent)) !== null) letterSpacings.add(match[1].trim());
console.log("Letter Spacings:", Array.from(letterSpacings).slice(0, 20));

const borderRadii = new Set();
const brRegex = /border-radius:\s*([^;]+)/g;
while ((match = brRegex.exec(cssContent)) !== null) borderRadii.add(match[1].trim());
console.log("Border Radii:", Array.from(borderRadii).slice(0, 20));

// 2. Extract structure
console.log("\n=== STRUCTURE ===");
const sections = [];
const sectionRegex = /<section[^>]*class="([^"]+)"[^>]*>/g;
while ((match = sectionRegex.exec(htmlContent)) !== null) sections.push(match[1]);
console.log("Sections (Classes):", sections);

const wrappers = [];
const divClassRegex = /<div[^>]*class="([^"]*wrapper[^"]*|[^"]*container[^"]*)"[^>]*>/gi;
while ((match = divClassRegex.exec(htmlContent)) !== null) wrappers.push(match[1]);
console.log("Wrappers/Containers:", [...new Set(wrappers)].slice(0, 20));

const components = {
    buttons: [...new Set(htmlContent.match(/class="[^"]*btn[^"]*|[^"]*button[^"]*"/gi) || [])],
    cards: [...new Set(htmlContent.match(/class="[^"]*card[^"]*"/gi) || [])]
};
console.log("Components:", components);

// 3. Extract animations
console.log("\n=== ANIMATIONS ===");
const ix2 = htmlContent.match(/data-w-id="[^"]+"/g) || [];
console.log("Elements with data-w-id (IX2):", ix2.length);
const gsapInHtml = htmlContent.match(/gsap/gi) || [];
console.log("GSAP mentions in HTML:", gsapInHtml.length);
const dataAnimations = htmlContent.match(/data-animation="[^"]+"/g) || [];
console.log("data-animation attrs:", [...new Set(dataAnimations)]);

// 4. Extract assets
console.log("\n=== ASSETS ===");
const imgRegex = /<img[^>]*src="([^"]+)"[^>]*>/g;
const images = [];
while ((match = imgRegex.exec(htmlContent)) !== null) {
    if(!match[1].includes("webflow.com/badge")) images.push(match[1]);
}
console.log("Images used in HTML:", [...new Set(images)]);
