
const puppeteer = require('puppeteer');

function Sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

(async () => {
    const testStack = [];
    const repeat = 1;
    for (let i = 0 ; i < repeat; i++) {
        const browser = await puppeteer.launch({headless:false});
        //const browser = await puppeteer.launch({executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe', headless:true});
        const page = await browser.newPage();
        const client = await page.target().createCDPSession(); //connect to devTools
        await page.goto('http://localhost:8080', {waitUntil: 'domcontentloaded'});
        await Sleep(5000);
        //  redirect logs from page to console
        function consoleLog() {
        page.on('console', consoleObj => {
            const text = consoleObj.text();
            console.log('[Page] '+text);
            if (text.startsWith('[showResourceTimingsResult]')) {
                const splitted = text.split(' ');
                const results = JSON.parse(splitted[2]);
                console.log('Results', splitted[1], results);
                testStack.push(results);
            }
            });
        }
     
        for (let k = 1; k<=3; k++) {
            await page.select("select#image-selector", "images/"+`${k}`+".jpg");
            await Sleep(5000);
            // wait until the image is fully loaded in case of delay
            const resourceTimingJson = await page.evaluate(() =>
            JSON.stringify(window.performance.getEntriesByType('resource')))
            const resourceTiming = JSON.parse(resourceTimingJson)
            const logoResourceTiming = resourceTiming.find(element => element.name.includes(`${k}`+'.jpg'))        
            properties = ["fetchStart", "responseEnd"];
            const imgTiming = logoResourceTiming[properties[1]] - logoResourceTiming[properties[0]];
            console.log(logoResourceTiming);
            console.log("resource timing:" + imgTiming .toFixed(4) + " ms");
            // get resource data
            await consoleLog();
        };
           
        await browser.close();
    }

     //console.log('\n\n Got restults:\n ', testStack);

})();