(async (document, navigator) => {

  // register service worker
  try {
    const registration = await navigator.serviceWorker.register('./sw.js')
    registration && console.log(`sw registered, scope: ${registration.scope}`)
  } catch(error) {
    console.log(`sw registration failed: ${error}`)
  }
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
 console.log(imgUrls);

// export { imgUrls };
  

})(document, navigator)
