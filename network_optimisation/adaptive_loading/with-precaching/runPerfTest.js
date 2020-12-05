
const puppeteer = require('puppeteer');

function Sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

(async () => {
    const testStack = [];
    const repeat = 2;
    let NETWORK_PRESETS = {
        'GPRS': {
          'offline': false,
          'downloadThroughput': 50 * 1024 / 8,
          'uploadThroughput': 20 * 1024 / 8,
          'latency': 500
        },
        'Regular2G': {
          'offline': false,
          'downloadThroughput': 250 * 1024 / 8,
          'uploadThroughput': 50 * 1024 / 8,
          'latency': 300
        },
        'Good2G': {
          'offline': false,
          'downloadThroughput': 450 * 1024 / 8,
          'uploadThroughput': 150 * 1024 / 8,
          'latency': 150
        },
        'Regular3G': {
          'offline': false,
          'downloadThroughput': 750 * 1024 / 8,
          'uploadThroughput': 250 * 1024 / 8,
          'latency': 100
        },
        'Good3G': {
          'offline': false,
          'downloadThroughput': 1.5 * 1024 * 1024 / 8,
          'uploadThroughput': 750 * 1024 / 8,
          'latency': 40
        },
        'Regular4G': {
          'offline': false,
          'downloadThroughput': 4 * 1024 * 1024 / 8,
          'uploadThroughput': 3 * 1024 * 1024 / 8,
          'latency': 20
        },
        'DSL': {
          'offline': false,
          'downloadThroughput': 2 * 1024 * 1024 / 8,
          'uploadThroughput': 1 * 1024 * 1024 / 8,
          'latency': 5
        },
        'WiFi': {
          'offline': false,
          'downloadThroughput': 30 * 1024 * 1024 / 8,
          'uploadThroughput': 15 * 1024 * 1024 / 8,
          'latency': 2
        }
      }
    for (let i = 0 ; i < repeat; i++) {
        const browser = await puppeteer.launch({headless:false});
        //const browser = await puppeteer.launch({executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe', headless:false, devtools: true });
        const context = await browser.createIncognitoBrowserContext();
        const page = await browser.newPage();
        const client = await page.target().createCDPSession(); //connect to devTools
        await client.send('Network.emulateNetworkConditions', NETWORK_PRESETS['GPRS']);
        await page.goto('http://localhost:8080', {waitUntil: 'domcontentloaded'});
        // await page.waitForNavigation({ waitUntil: ["networkidle0", "domcontentloaded"] });
        await Sleep(10000);
        
        //  redirect logs from page to console
        function consoleLog() {
          page.on('console', consoleObj => {
            const text = consoleObj.text();
            console.log('[Page] '+text);
            if (text.startsWith('[fetchedImage]')) {
                const splitted = text.split(' ');
                const results = JSON.parse(splitted[1]);
                console.log('Results', splitted[1], results);
                testStack.push(results);
            }
          });
        } 

        await consoleLog();
        await Sleep(10000);
     
        await page.select("select#image-selector", "images/example.jpg");
        await Sleep(10000);
        
        const resourceTimingJson = await page.evaluate(() =>
        JSON.stringify(window.performance.getEntriesByType('resource')))
        const resourceTiming = JSON.parse(resourceTimingJson)
        const logoResourceTiming = resourceTiming.find(element => element.name.includes('.jpg'))
        console.log(logoResourceTiming);
        properties = ["fetchStart", "responseEnd"];
        const imgTiming = logoResourceTiming[properties[1]] - logoResourceTiming[properties[0]];
        console.log("resource timing:" + imgTiming .toFixed(4) + " ms");

        await browser.close();
            
    }

     //console.log('\n\n Got restults:\n ', testStack);

})();