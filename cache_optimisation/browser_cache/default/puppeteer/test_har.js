const puppeteer = require('puppeteer');
const PuppeteerHar = require('puppeteer-har');

(async () => {
    const browser = await puppeteer.launch({
        headless: true
    });
    const page = await browser.newPage();
  
   //const har = new PuppeteerHar(page);
    //await har.start({ path: 'har/results.har' });

   const response =  await page.goto('http://localhost:8080');
 
    console.log(response.fromCache())
    //await har.stop();
    await browser.close();
  })();