
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
        await page.goto('http://localhost:8080', {waitUntil: 'domcontentloaded'});
        await console.log("-------------");
        await consoleLog();
       
        //  redirect logs from page to console
        function consoleLog() {
        page.on('console', consoleObj => {
            const text = consoleObj.text();
            console.log('[Page] '+text);
            });
        }     
        await Sleep(10000);
        await console.log("------Initial Request-------");
        await page.reload({ waitUntil: ["networkidle0", "domcontentloaded"] });
        await Sleep(10000);
        await console.log("------Reload-------");
        await browser.close();
        }

        //console.log('\n\n Got restults:\n ', testStack);

    })();