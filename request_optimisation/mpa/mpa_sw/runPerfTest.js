//const puppeteer = require('puppeteer');
// const PuppeteerHar = require('puppeteer-har');

// (async () => {
//     const browser = await puppeteer.launch({
//         headless: true
//     });
//     const page = await browser.newPage();
  
//    //const har = new PuppeteerHar(page);
//     //await har.start({ path: 'har/results.har' });

//    const response =  await page.goto('http://localhost:8080');
 
//     console.log(response.fromCache())
//     //await har.stop();
//     await browser.close();
//   })();

import puppeteer from 'puppeteer'

function Sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

(async () => {
    const testStack = [];
    const repeat = 1;

    for (let i = 0 ; i < repeat; i++) {
         const browser = await puppeteer.launch({executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe', headless:true});
        //const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('http://localhost:3000/');
        await consoleLog();
       
        // await Promise.all([
        //     page.waitForNavigation(),
        //     page.click('#content')
        // ]);

        // redirect logs from page to console
        function consoleLog() {
        page.on('console', consoleObj => {
            const text = consoleObj.text();
            console.log('[Page] '+text);
            if (text.startsWith('[showPaintTimingsResult]')) {
                const splitted = text.split(' ');
                const results = JSON.parse(splitted[2]);
                // console.log('Results', splitted[1], results);
                testStack.push(results);
            }
        });
    }

        await Sleep(10000);
        await page.goto('http://localhost:3000/content1');
        await Sleep(10000);
        await browser.close();
    }

   // console.log('\n\n Got restults:\n ', testStack);

})();