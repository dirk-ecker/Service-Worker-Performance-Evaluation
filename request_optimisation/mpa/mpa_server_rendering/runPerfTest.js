"use strict"

import puppeteer from 'puppeteer'
import fs from 'fs'

const getTimeFromPerformanceMetrics = (metrics, name) =>
  metrics.metrics.find(x => x.name === name).value * 1000;

const extractDataFromPerformanceMetrics = (metrics, ...dataNames) => {
  const navigationStart = getTimeFromPerformanceMetrics(
    metrics,
    'NavigationStart'
  );

  const extractedData = {};
  dataNames.forEach(name => {
    extractedData[name] =
      getTimeFromPerformanceMetrics(metrics, name) - navigationStart;
  });

  return extractedData;
};

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
       
        async function testPage(page) {
            const client = await page.target().createCDPSession();
            await client.send('Performance.enable');
        let firstMeaningfulPaint = 0;
        let performanceMetrics;
        // There is no event where FirstMeaningfulPaint is ready, so we cannot precisely detect when this metric is done. 
        // This is workaround for checking each small amount of time if this metric is ready:
        while (firstMeaningfulPaint === 0) {
          await page.waitFor(300);
          performanceMetrics = await client.send('Performance.getMetrics');
          firstMeaningfulPaint = getTimeFromPerformanceMetrics(
            performanceMetrics,
            'FirstMeaningfulPaint'
          );
        }
      
        return extractDataFromPerformanceMetrics(
          performanceMetrics,
          'FirstMeaningfulPaint'
        );
        }
        // redirect logs from page to console
        function consoleLog() {
        page.on('console', consoleObj => {
            const text = consoleObj.text();
            console.log('[Page] '+text + '\n');
            fs.writeFileSync('perfData.txt', text, {flag:"a"});
            if (text.startsWith('[showPaintTimingsResult]')) {
                const splitted = text.split(' ');
                const results = JSON.parse(splitted[2]);
                // console.log('Results', splitted[1], results);
                testStack.push(results);
            }
           
        });
    }  
        // var fp = await testPage(page);
        //console.log(fp + '\n');
        // fs.writeFileSync('FPData.txt', JSON.stringify(fp), {flag:"a"});

        await Sleep(10000);
        await page.goto('http://localhost:3000/content1');
        await Sleep(10000);
        await browser.close();

       
    }
   
   // console.log('\n\n Got restults:\n ', testStack);

})();