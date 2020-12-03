
const puppeteer = require('puppeteer');

function Sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

(async () => {
    const testStack = [];
    const repeat = 1;
  
    for (let i = 0 ; i < repeat; i++) {
        const browser = await puppeteer.launch();
         //const browser = await puppeteer.launch({executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe', headless:true});
        const page = await browser.newPage();
        await page.goto('http://localhost:4000', {waitUntil: 'domcontentloaded'});
        await consoleLog();
       
        
            // const resourceTimingJson = await page.evaluate(() =>
            // JSON.stringify(window.performance.getEntriesByType('resource')))
            // const resourceTiming = JSON.parse(resourceTimingJson)
            // const logoResourceTiming = resourceTiming.find(element => element.name.includes('.jpg'))
        
      
    
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

     
       await Sleep(10000);
       await console.log("-------------");
       await page.reload({ waitUntil: ["networkidle0", "domcontentloaded"] });
       await Sleep(10000);
       await browser.close();
    }

     //console.log('\n\n Got restults:\n ', testStack);

})();