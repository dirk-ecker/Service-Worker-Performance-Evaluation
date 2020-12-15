const { Cluster } = require('puppeteer-cluster');
 
(async () => {
  const cluster = await Cluster.launch({
    concurrency: Cluster.CONCURRENCY_CONTEXT,
    maxConcurrency: 10,
    puppeteerOptions: {
        headless:true,
    },

  });

  function Sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}
 
 
    await cluster.task(async ({ page, data: url }) => {
    await page.on('console', consoleObj => {
            const text = consoleObj.text();
            console.log('[Page] '+text);
            });
    await page.goto(url, {waitUntil: 'load'});
    await Sleep(5000);

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
        // await consoleLog();
    };

   
  });
 
  cluster.queue('http://localhost:8080');
  cluster.queue('http://localhost:8080');


  // many more pages
 
  await cluster.idle();
  await cluster.close();
})();