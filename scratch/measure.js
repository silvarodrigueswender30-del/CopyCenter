const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({headless: "new"});
    const page = await browser.newPage();
    
    const viewports = [
        {width: 1920, height: 1080},
        {width: 1440, height: 900},
        {width: 1366, height: 768},
        {width: 768, height: 1024},
        {width: 390, height: 844},
        {width: 430, height: 932}
    ];

    for (let vp of viewports) {
        await page.setViewport(vp);
        await page.goto('http://127.0.0.1:5177', {waitUntil: 'networkidle2'});
        
        const dims = await page.evaluate(() => {
            const imgs = document.querySelectorAll('.service-collection_item-image');
            if (imgs.length === 0) return null;
            
            return Array.from(imgs).map(img => {
                const rect = img.getBoundingClientRect();
                return {
                    width: Math.round(rect.width),
                    height: Math.round(rect.height)
                };
            });
        });
        
        console.log(`${vp.width}x${vp.height}:`, dims);
    }
    
    await browser.close();
})();
