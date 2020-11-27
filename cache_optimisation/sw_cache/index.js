(async (document, navigator) => {

  // register service worker
  try {
    const registration = await navigator.serviceWorker.register('./sw.js')
    registration && console.log(`sw registered, scope: ${registration.scope}`)
  } catch (error) {
    console.log(`sw registration failed: ${error}`)
  }

  var row = document.getElementById("row")
  // Loading of image files - from Disk Cache

  const image = num => {
    for (let i = 1; i < num + 1; i++) {
      const imgPath = "images/1.jpg"
      // avoid blob request ?
      fetch(imgPath)
        .then(response => response.blob())
        .then(function (response) {
          // console.log('response', response);
          var objectURL = URL.createObjectURL(response);
          const img = document.createElement("img");
          img.src = objectURL;
          row.appendChild(img)

        });
    }
  }
  image(30)


  //Loading of image files - from Memory Cache
  // imgUrls = [];

  // const image = num => {
  //   for (let i = 1; i < num + 1; i++) {
  //     const img = document.createElement("img")
  //     const imgPath = img.src = "images/" + i + ".jpg"
  //     const row = document.getElementById("row")
  //     row.appendChild(img)
  //     console.log('img path', imgPath)
  //     imgUrls.push(imgPath);
  //   }
  // }
  // image(10)

  //Loading of text files - from Disk Cache

  const txt = num => {
    for (let i = 1; i < num + 1; i++) {
      var txtPath = "text/1.txt"
     
      fetch(txtPath)
        .then(response => response.text())
        .then(text => {
          row.innerHTML += text;
        })
    }
  }
  txt(20)



})(document, navigator)