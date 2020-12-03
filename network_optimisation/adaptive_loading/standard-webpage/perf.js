window.addEventListener('load', (event) => {

// function showPerEnt() {
//   var perfEntries = performance.getEntriesByType("navigation");
//   for (var i=0; i < perfEntries.length; i++) {
//     console.log("= Navigation entry[" + i + "]");
//     var p = perfEntries[i];
//     // dom Properties
//     console.log("DOM content loaded = " + (p.domContentLoadedEventEnd - p.domContentLoadedEventStart));
//     console.log("DOM complete = " + p.domComplete);
//     console.log("DOM interactive = " + p.interactive);
 
//     // document load and unload time
//     console.log("document load = " + (p.loadEventEnd - p.loadEventStart));
//     console.log("document unload = " + (p.unloadEventEnd - p.unloadEventStart));
    
//     // other properties
//     console.log("type = " + p.type);
//     console.log("redirectCount = " + p.redirectCount);
//   }
// }

// showPerEnt() 
  //  function showPaintTimings2() {
  //   const observer = new window.PerformanceObserver(list => {
  //     list.getEntries().forEach(({
  //       name,
  //       startTime
  //     }) => {
  //       console.log('\n' + `${name}` + " : " + `${startTime}` + "ms.");

  //       // console.log('[showPaintTimingsResult]', JSON.stringify(list.getEntriesByType('paint')))
  //     });
  //   });
  //   observer.observe({
  //     entryTypes: ['paint']
  //   });
  // }
 
  //showPaintTimings2() 
});

function print_PerformanceEntries(value) {
  // Use getEntriesByType() to just get the "resource" events
  var p = performance.getEntriesByType("resource");
  for (var i=0; i < p.length; i++) {
    print_start_and_end_properties(p[i]);
  }
  console.log(value)
}

function print_start_and_end_properties(perfEntry) {
   //const imageType = perfEntry.find(element => element.name.includes('.jpg'))
  // console.log(perfEntry);

  if (perfEntry.initiatorType == "img") {
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
     console.log("resource timing:" + resVal.toFixed(4) + "ms");
     
}
}

