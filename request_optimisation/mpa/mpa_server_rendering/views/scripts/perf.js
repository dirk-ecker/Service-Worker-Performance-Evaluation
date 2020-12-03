window.onload = function() {
function showPaintTimings() {
    // if (window.performance) {
    //   var total = [];
    //   let performance = window.performance;
    //   let performanceEntries = performance.getEntriesByType('paint');
    //   performanceEntries.forEach( (performanceEntry, i, entries) => {
    //     console.log( performanceEntry.name + " : " + `${ performanceEntry.startTime}` + "ms.");
    //     total.push(performanceEntry.startTime);
    //     console.log('[showPaintTimingsResult]',i, JSON.stringify(performanceEntries))
    //   });
      
    // } else {
    //   console.log('Performance timing isn\'t supported.');
    // }
    // var diff =  total[1] - total[0];
    // console.log("FP & FCP difference: " + diff);
    const observer = new window.PerformanceObserver(list => {
      list.getEntries().forEach(({name, startTime}) => {
        console.log('\n' + `${name}` + " : " + `${startTime}` + "ms." );
          total.push(startTime);
          console.log('[showPaintTimingsResult]', JSON.stringify(list.getEntriesByType('paint')))
          console.log(startTime);
        });
      });
      observer.observe({
      entryTypes: ['paint']
      });
  }
  


function showPerEnt() {
  var perfEntries = performance.getEntriesByType("navigation");
  for (var i=0; i < perfEntries.length; i++) {
    
   // console.log("= Navigation entry[" + i + "]");
    var p = perfEntries[i];
    if (p.loadEventEnd > 0) {
      var earliestTime = p.navigationStart;
      if (earliestTime == 0) {
        earliestTime = t.fetchStart;
    }
   
    // dom Properties
    console.log('\n' + "DOM content loaded = " + (p.domContentLoadedEventEnd - p.domContentLoadedEventStart) +'\n');
    console.log("DOM complete = " + p.domComplete +'\n');
    console.log("DOM interactive = " + p.interactive +'\n');
 
    // document load and unload time
    console.log("document load = " + (p.loadEventEnd - p.loadEventStart) +'\n');
    console.log("document unload = " + (p.unloadEventEnd - p.unloadEventStart) +'\n');
    
    // other properties
    console.log("type = " + p.type +'\n');
    console.log("redirectCount = " + p.redirectCount +'\n');
    console.log('[showPerEntResult]', i, JSON.stringify(p))
  }
  else {
    setTimeout(showPerEnt, 1000);
}
  }
}


showPerEnt() 
showPaintTimings() 
  
}




