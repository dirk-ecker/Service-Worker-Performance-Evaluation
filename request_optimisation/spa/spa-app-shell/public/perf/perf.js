window.onload = function() {
    function showPaintTimings() {
        if (window.performance) {
          var total = [];
          let performance = window.performance;
          let performanceEntries = performance.getEntriesByType('paint');
          performanceEntries.forEach( (performanceEntry, i, entries) => {
            console.log( performanceEntry.name + " : " + `${ performanceEntry.startTime}` + "ms.");
            total.push(performanceEntry.startTime);
          });
          
        } else {
          console.log('Performance timing isn\'t supported.');
        }
        var diff =  total[1] - total[0];
        console.log("FP & FCP difference: " + diff);
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
        console.log("DOM content loaded = " + (p.domContentLoadedEventEnd - p.domContentLoadedEventStart));
        console.log("DOM complete = " + p.domComplete);
        console.log("DOM interactive = " + p.interactive);
     
        // document load and unload time
        console.log("document load = " + (p.loadEventEnd - p.loadEventStart));
        console.log("document unload = " + (p.unloadEventEnd - p.unloadEventStart));
        
        // other properties
        console.log("type = " + p.type);
        console.log("redirectCount = " + p.redirectCount);
      }
      else {
        setTimeout(showPerEnt, 1000);
    }
      }
    }
    
    showPaintTimings() 
    showPerEnt() 
      
    }
    
    
    
    
    