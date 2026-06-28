const fs = require('fs');
const content = fs.readFileSync('C:/Users/Teste/Downloads/CopyCenter/SITE-COPYCENTER/public/reference-body.html', 'utf8');
const startIndex = content.indexOf('<footer class="footer">');
if (startIndex !== -1) {
    const mainEndIndex = content.lastIndexOf('</main>');
    if (startIndex > mainEndIndex) {
        console.log('Footer is after main.');
    } else {
        console.log('Footer is inside main.');
    }
    const endIndex = content.indexOf('</footer>', startIndex);
    if (endIndex !== -1) {
        const footerContent = content.substring(startIndex, endIndex + 9);
        fs.writeFileSync('C:/Users/Teste/Downloads/CopyCenter/SITE-COPYCENTER/public/footer.html', footerContent);
        console.log('Footer extracted successfully.');
    }
}
