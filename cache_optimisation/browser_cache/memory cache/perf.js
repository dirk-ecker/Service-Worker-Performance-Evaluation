window.onload = function () {

 
  function showPaintTimings() {
    const observer = new window.PerformanceObserver(list => {
      list.getEntries().forEach(({
        name,
        startTime
      }) => {
        console.log('\n' + `${name}` + " : " + `${startTime.toFixed(4)}` + "ms.");
        //console.log('\n'  + `${startTime.toFixed(4)}`);
        // console.log('[showPaintTimingsResult]', JSON.stringify(list.getEntriesByType('paint')))
      });
    });
    observer.observe({
      entryTypes: ['paint']
    });

    if (window.performance) {
      let performance = window.performance;
      let performanceEntries = performance.getEntriesByType('paint');
      performanceEntries.forEach((performanceEntry) => {
        console.log('\n' + performanceEntry.name + " : " + performanceEntry.startTime.toFixed(4) + " ms.");
         //console.log("\n" + performanceEntry.startTime.toFixed(4));
      });
    } else {
      console.log('Performance timing isn\'t supported.');
    }
  
  }


  
  function showLoadTime() {
    const observer = new window.PerformanceObserver(list => {
      var perfEntry = list.getEntries();
      list.getEntries().forEach(entry => {
        properties = ["loadEventStart", "fetchStart"];
        var loadEventEnd = entry[properties[0]];
        var navigationStart = entry[properties[1]];
        var totalLoadTime = loadEventEnd - navigationStart;
        // first rendering time + DOM parsing time + synch JS execution + resource loading time
       console.log('\n' + "Page full load time: " + totalLoadTime.toFixed(4));
         //console.log('\n' + totalLoadTime.toFixed(4));
      }) 

    });
    observer.observe({entryTypes: ["navigation"]})
  }
  var total = [];

  function print_PerformanceEntries() {

    // Use getEntriesByType() to just get the "resource" events
    var p = performance.getEntriesByType("resource");

    for (var i = 0; i < p.length; i++) {
      print_start_and_end_properties(p[i]);
    }
    var minTime = Math.min.apply(null, total);
    var maxTime = Math.max.apply(null, total);
    var TotalDiff = maxTime - minTime;

   console.log("min time:" + minTime.toFixed(4));
    console.log("max time: " + maxTime.toFixed(4));
    //console.log("\n" + minTime.toFixed(4));
    //console.log("\n" + maxTime.toFixed(4))
   // console.log("resource timing total: " + TotalDiff.toFixed(4))
  }

  function print_start_and_end_properties(perfEntry) {
    if (perfEntry.initiatorType == "img") {
      // Print timestamps of the PerformanceEntry *start and *end properties 
      properties = ["connectStart", "connectEnd",
        "domainLookupStart", "domainLookupEnd",
        "fetchStart",
        "redirectStart", "redirectEnd",
        "requestStart",
        "responseStart", "responseEnd",
        "secureConnectionStart"
      ];

      //console.log("resource initiator type:" + perfEntry.initiatorType)
      var respEndValue = perfEntry[properties[9]];
      var fetchStartValue = perfEntry[properties[4]];
      var resVal = respEndValue - fetchStartValue;
      total.push(resVal);
      //console.log("resource timing:" + resVal.toFixed(4) + "ms");
    }
  }
  showPaintTimings()
  print_PerformanceEntries()
  showLoadTime()

}