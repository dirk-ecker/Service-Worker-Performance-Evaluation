window.addEventListener('load', (event) => {
function showPaintTimings() {
    if (window.performance) {
      let performance = window.performance;
      let performanceEntries = performance.getEntriesByType('paint');
      performanceEntries.forEach( (performanceEntry, i, entries) => {
        console.log("The time to " + performanceEntry.name + " was " + performanceEntry.startTime.toFixed(4) + " milliseconds.");
      });
    } else {
      console.log('Performance timing isn\'t supported.');
    }
  }
  showPaintTimings()
});