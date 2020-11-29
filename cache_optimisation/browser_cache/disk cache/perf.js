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

  var total = [];

  function print_PerformanceEntries() {
    // Use getEntriesByType() to just get the "resource" events
    var p = performance.getEntriesByType("resource");
    
    for (var i=0; i < p.length; i++) {
      print_start_and_end_properties(p[i]);
    }
    var totalDiff = total[total.length -1] - total[0];
    console.log("resource timing total:" + totalDiff.toFixed(4))
  }
  function print_start_and_end_properties(perfEntry) {
    if (perfEntry.initiatorType == "fetch") {
    // Print timestamps of the PerformanceEntry *start and *end properties 
    properties = ["connectStart", "connectEnd",
                  "domainLookupStart", "domainLookupEnd",
                  "fetchStart", 
                  "redirectStart", "redirectEnd",
                  "requestStart", 
                  "responseStart", "responseEnd",
                  "secureConnectionStart"];
  
        
        console.log("resource initiator type:" + perfEntry.initiatorType)
        var respEndValue = perfEntry[properties[9]];
        var fetchStartValue = perfEntry[properties[4]];
        var resVal = respEndValue - fetchStartValue;
        total.push(resVal);
       console.log("resource timing:" + resVal.toFixed(4) + "ms");
        
  }
  
}
  print_PerformanceEntries()
  showPaintTimings()
});