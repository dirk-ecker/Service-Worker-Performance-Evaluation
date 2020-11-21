import { Component } from '@angular/core';
declare const PerformanceObserver: any;


const observer = new PerformanceObserver((entryList) => {
  console.log('ok', entryList)
});

observer.observe({entryTypes: ["navigation"]});
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'spa-sw';

  constructor() {

    var observer = new PerformanceObserver(list => {
      list.getEntries().forEach(entry => {
        // Display each reported measurement on console
        let workerTime = 0;
        if (entry.workerStart > 0) {
        workerTime = entry.responseEnd - entry.workerStart;
        }
        
        var ttf = entry.responseStart-entry.requestStart;
        if (console) {
      
          console.log("Name: "       + entry.name      +
                      ", Type: "     + entry.entryType +
                      ", Start: "    + entry.startTime +
                      ", Duration: " + entry.duration  + "\n");
          console.log("TTF: " + ttf );
          console.log("Response time with Service worker: " + workerTime);
        }
      })
    });
    observer.observe({entryTypes: ['navigation']});
    performance.mark('registered-observer');

    performance.measure('button clicked');
  }
 



}
