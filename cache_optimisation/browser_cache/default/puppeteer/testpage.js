const {
    getTimeFromPerformanceMetrics,
    extractDataFromPerformanceMetrics,
  } = require('./helpers');
  
  async function testPage(page) {
    const client = await page.target().createCDPSession();
    await client.send('Performance.enable');
  
    await page.goto('http://localhost:8080');
  
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
  
  module.exports = testPage;