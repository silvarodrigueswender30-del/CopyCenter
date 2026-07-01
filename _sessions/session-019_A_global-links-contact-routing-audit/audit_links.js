const fs = require('fs');
const path = require('path');

const filesToAudit = [
  'header-hero.html',
  'logo-marquee.html',
  'animated-content.html',
  'services.html',
  'process.html',
  'about.html',
  'video.html',
  'info.html',
  'testimonial.html',
  'blog.html',
  'cta.html',
  'footer.html'
];

const basePath = path.join(__dirname, '..', 'SITE-COPYCENTER', 'public');
let allLinks = [];

// Simple regex to find <a> tags and extract attributes
const linkRegex = /<a\s+([^>]+)>(.*?)<\/a>/gs;
const hrefRegex = /href="([^"]*)"/i;
const classRegex = /class="([^"]*)"/i;
const ariaRegex = /aria-label="([^"]*)"/i;

filesToAudit.forEach(file => {
  const filePath = path.join(basePath, file);
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, 'utf8');
  
  let match;
  while ((match = linkRegex.exec(content)) !== null) {
    const attrs = match[1];
    const innerHTML = match[2];
    
    const hrefMatch = hrefRegex.exec(attrs);
    const classMatch = classRegex.exec(attrs);
    const ariaMatch = ariaRegex.exec(attrs);
    
    // Attempt to extract text content roughly (strip inner tags)
    const textContent = innerHTML.replace(/<[^>]*>?/gm, '').trim();
    const hasImg = /<img\s/i.test(innerHTML);
    const hasSvg = /<svg\s/i.test(innerHTML);
    
    let type = 'Text Link';
    if (hasImg) type = 'Image Link';
    else if (hasSvg) type = 'Icon/SVG Link';
    if (/button/i.test(classMatch ? classMatch[1] : '')) type = 'Button';
    
    allLinks.push({
      file,
      href: hrefMatch ? hrefMatch[1] : null,
      class: classMatch ? classMatch[1] : null,
      ariaLabel: ariaMatch ? ariaMatch[1] : null,
      text: textContent || (hasImg ? '[Image]' : (hasSvg ? '[SVG]' : '')),
      type
    });
  }
});

console.log(JSON.stringify(allLinks, null, 2));
