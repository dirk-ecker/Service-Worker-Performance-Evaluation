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
  
  function print_PerformanceEntries() {
    // Use getEntriesByType() to just get the "resource" events
    var p = performance.getEntriesByType("resource");
    for (var i=0; i < p.length; i++) {
      print_start_and_end_properties(p[i]);
    }
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
                  "secureConnectionStart"];
  
    // for (var i=0; i < properties.length; i++) {
    //   // check each property
    //   var supported = properties[i] in perfEntry;
    //   if (supported) {
    //     console.log(perfEntry.initiatorType)
    //     var value = perfEntry[properties[i]];
    //     console.log("... " + properties[i] + " = " + value);
    //   } else {
    //     console.log("... " + properties[i] + " = NOT supported");
    //   }
    // }
    
        console.log("resource initiator type:" + perfEntry.initiatorType)
        var respEndValue = perfEntry[properties[9]];
        var fetchStartValue = perfEntry[properties[4]];
        var resVal = respEndValue - fetchStartValue;
       console.log("resource timing:" + resVal.toFixed(4) + "ms");
        // console.log("... " + properties[i] + " = " + value);
  
  }
}
  showPaintTimings()
  print_PerformanceEntries()
});