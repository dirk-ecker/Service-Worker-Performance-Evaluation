import { Component } from '@angular/core';
import Perfume from 'perfume.js';

declare const PerformanceObserver: any;
const observer = new PerformanceObserver((entryList) => {
  console.log('ok', entryList)
});



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'spa-no-shell';

  constructor() {
    var observer = new PerformanceObserver(list => {
      list.getEntries().forEach(entry => {
        
      let workerTime = 0;
      if (entry.workerStart > 0) {
      workerTime = entry.responseEnd - entry.workerStart;
      }
      var ttf = entry.responseStart-entry.requestStart;
        // Display each reported measurement on console
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
    observer.observe({entryTypes: ['paint', 'navigation'] });
    performance.mark('registered-observer');

    performance.measure('button clicked');
  }
     
}

