
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
        await page.goto('http://localhost:8080', {waitUntil: 'domcontentloaded', headless:false});
        //await page.waitForNavigation({ waitUntil: ["networkidle0", "domcontentloaded"] });
        
        
       
        
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
   
    await consoleLog();

      await page.select("select#image-selector", "images/example.jpg");

        // await page.evaluate(() => {
        //     const example = document.querySelector('#image-selector');
        //     const example_options = example.querySelectorAll('option');
        //     const selected_option = [...example_options].find(option => option.text === 'Select and image');
        //     selected_option.selected = true;
        //     console.log(selected_option.selected)
        //     })

            await Sleep(10000);
            const resourceTimingJson = await page.evaluate(() =>
            JSON.stringify(window.performance.getEntriesByType('resource')))
            const resourceTiming = JSON.parse(resourceTimingJson)
            const logoResourceTiming = resourceTiming.find(element => element.name.includes('.jpg'))
            properties = ["fetchStart", "responseEnd"];
            const imgTiming = logoResourceTiming[properties[1]] - logoResourceTiming[properties[0]];
            // await consoleLog();
            console.log(logoResourceTiming);
            console.log("resource timing:" + imgTiming .toFixed(4) + " ms");
            await browser.close();
    }

     //console.log('\n\n Got restults:\n ', testStack);

})();