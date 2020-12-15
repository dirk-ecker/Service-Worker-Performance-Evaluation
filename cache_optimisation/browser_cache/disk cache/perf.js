window.onload = function () {
  function showPaintTimings() {
    const observer = new window.PerformanceObserver(list => {
      list.getEntries().forEach(({
        name,
        startTime
      }) => {
        // get first paint + first contentful paint
        //console.log('\n' + `${name}` + " : " + `${startTime.toFixed(4)}` );
        console.log('\n' + `${startTime.toFixed(4)}` );
      });
    });
    observer.observe({
      entryTypes: ['paint']
    });
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
       // console.log('\n' + "Page full load time: " + totalLoadTime.toFixed(4));
         console.log('\n' + totalLoadTime.toFixed(4));
      }) 

    });
    observer.observe({entryTypes: ["navigation"]});
    
  }
  function showLCP() {
    const observer = new PerformanceObserver(list => {
      list.getEntries().forEach(entry => {
      console.log("\n" + "LCP: " + entry["loadTime"]);
      });
  }).observe({ type: "largest-contentful-paint", buffered: true });
}


  var totalResTime = [];
  function showResourceTiming() {
    const observer = new window.PerformanceObserver(list => {
      list.getEntries().forEach(entry => {
        if (entry.initiatorType == "fetch") {
          properties = ["connectStart", "connectEnd",
            "domainLookupStart", "domainLookupEnd",
            "fetchStart",
            "redirectStart", "redirectEnd",
            "requestStart",
            "responseStart", "responseEnd",
            "secureConnectionStart",
            "duration"
          ];
          var respEndValue = entry[properties[9]];
          var fetchStartValue = entry[properties[4]];
          var resVal = respEndValue - fetchStartValue;
          totalResTime.push(resVal);
          //response time with cache seek for each element
          //console.log("resource timing:" + resVal.toFixed(4) + "ms"); 
          if (totalResTime.length === 100 ) { // to catch the performance entries because PerformanceObserver works async
            var minTime = Math.min.apply(null, totalResTime);
            var maxTime = Math.max.apply(null, totalResTime);
            var durTime = entry[properties[11]]
            //  console.log('\n' + "Min resource timing: " + minTime.toFixed(4)); 
            //  console.log('\n' + "Max resource timing: " + maxTime.toFixed(4));
            //  console.log('\n' +  "Duration: " + entry[properties[11]])
            console.log('\n' + minTime.toFixed(4)); 
            console.log('\n' + maxTime.toFixed(4));
            console.log('\n'+ durTime.toFixed(4))
          }
        }
      });
      //console.log('[showResourceTimingsResult]',  JSON.stringify(list.getEntriesByType('resource')));
    });

    observer.observe({
      entryTypes: ['resource'],
      buffer: true
    });

  }

  showPaintTimings()
  showResourceTiming()
  showLoadTime()
}