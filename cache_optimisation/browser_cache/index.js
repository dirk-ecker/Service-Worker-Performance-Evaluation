(async (document) => {

// Loading of image files - from Disk Cache

  const image = num => {
    for (let i = 1; i < num + 1; i++) { 
      const imgPath = "images/1.jpg"
 // avoid blob request ?
      fetch(imgPath)  
      .then(response => response.blob())
      .then(function(response) {
        // console.log('response', response);
      var objectURL = URL.createObjectURL(response);
      const img = document.createElement("img");
      img.src = objectURL ;
     
      row.appendChild(img)
  
    }); 
    }
  } 
  image(10)

  //Loading of image files - from Memory Cache

  imgUrls = [];

  const image = num => {
    for (let i=1; i<num+1; i++) {
      const img = document.createElement("img")
      const imgPath = img.src = "images/"+ i +".jpg"
      const row = document.getElementById("row")
      row.appendChild(img)
      console.log('img path', imgPath)
      imgUrls.push(imgPath);
    }
  }
  image(10)


 //Loading of text files - from Disk Cache

  // const txt = num => {
  //   for (let i = 1; i < num + 1; i++) {
  //     var txtPath = "text/1.txt"
  //     var row = document.getElementById("row")
  //     fetch(txtPath)
  //     .then(response => response.text())
  //     .then(text =>{
  //       row.innerHTML += text;
  //   })  
  //   }
  // }
  // txt(20)

//   const resources = performance.getEntriesByType("resource");
//   const timings = [];
//   for (const resource of resources) {
//   timings.push({
//     name: resource.name,
//     initiatorType: resource.initiatorType,
//     redirectTime: resource.redirectEnd - resource.redirectStart,
//     dnsTime: resource.domainLookupEnd - resource.domainLookupStart,
//     tcpHandshakeTime: resource.connectEnd - resource.connectStart,
//     secureConnectionTime: resource.connectEnd - resource.secureConnectionStart,
//     responseTime: resource.responseEnd - resource.responseStart,
//     fetchUntilResponseEndTime: resource.responseEnd - resource.fetchStart,
//     requestStartUntilResponseEnd: resource.responseEnd - resource.requestStart,
//     startUntilResponseEnd: resource.responseEnd - resource.startTime
//   });
// }
// console.log(timings);



})(document)