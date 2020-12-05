window.onload = function () {
  function showPaintTimings() {
    if (window.performance) {
      let performance = window.performance;
      let performanceEntries = performance.getEntriesByType('paint');
      performanceEntries.forEach((performanceEntry) => {
        console.log(performanceEntry.name + " : " + performanceEntry.startTime.toFixed(4) + " ms." + '\n');
      });
    } else {
      console.log('Performance timing isn\'t supported.');
    }
    const observer = new window.PerformanceObserver(list => {
      list.getEntries().forEach(({
        name,
        startTime
      }) => {
        console.log('\n' + `${name}` + " : " + `${startTime.toFixed(4)}` + "ms." +'\n');
        // console.log('[showPaintTimingsResult]', JSON.stringify(list.getEntriesByType('paint')))
      });
    });
    observer.observe({
      entryTypes: ['paint']
    });
  }



  function showPerEnt() {
    var perfEntries = performance.getEntriesByType("navigation");
    for (var i = 0; i < perfEntries.length; i++) {

      // console.log("= Navigation entry[" + i + "]");
      var p = perfEntries[i];
      if (p.loadEventEnd > 0) {
        var earliestTime = p.navigationStart;
        if (earliestTime == 0) {
          earliestTime = t.fetchStart;
        }

        // dom Properties
        console.log('\n' + "DOM content loaded = " + (p.domContentLoadedEventEnd - p.domContentLoadedEventStart) + '\n');
        console.log("DOM complete = " + p.domComplete + '\n');
        console.log("DOM interactive = " + p.interactive + '\n');

        // document load and unload time
        console.log("document load = " + (p.loadEventEnd - p.loadEventStart) + '\n');
        console.log("document unload = " + (p.unloadEventEnd - p.unloadEventStart) + '\n');

        // other properties
        console.log("type = " + p.type + '\n');
        console.log("redirectCount = " + p.redirectCount + '\n');
        console.log('[showPerEntResult]', i, JSON.stringify(p))
      } else {
        setTimeout(showPerEnt, 1000);
      }
    }
  }


  showPerEnt()
  showPaintTimings()

}