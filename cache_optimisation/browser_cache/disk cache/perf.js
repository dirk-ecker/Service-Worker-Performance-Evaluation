window.onload = function () {
  function showPaintTimings() {
    const observer = new window.PerformanceObserver(list => {
      list.getEntries().forEach(({
        name,
        startTime
      }) => {
        console.log('\n' + `${name}` + " : " + `${startTime.toFixed(4)}` + "ms.");
      });
    });
    observer.observe({
      entryTypes: ['paint']
    });
  }
  var totalResTime = [];

  function print_PerformanceEntries() {
    const observer = new window.PerformanceObserver(list => {
      list.getEntries().forEach(entry => {
        if (entry.initiatorType == "fetch") {
          properties = ["connectStart", "connectEnd",
            "domainLookupStart", "domainLookupEnd",
            "fetchStart",
            "redirectStart", "redirectEnd",
            "requestStart",
            "responseStart", "responseEnd",
            "secureConnectionStart"
          ];
          var respEndValue = entry[properties[9]];
          var fetchStartValue = entry[properties[4]];
          var resVal = respEndValue - fetchStartValue;
          totalResTime.push(resVal);
          console.log("resource timing:" + resVal.toFixed(4) + "ms");
        }
      });
      //console.log('[showResourceTimingsResult]',  JSON.stringify(list.getEntriesByType('resource')));
    });

    observer.observe({
      entryTypes: ['resource'],
      buffer: true
    });

    console.log(totalResTime);
  }

  showPaintTimings()
  print_PerformanceEntries()

}