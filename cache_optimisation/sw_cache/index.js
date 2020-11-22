(async (document, navigator) => {

  // register service worker
  try {
    const registration = await navigator.serviceWorker.register('./sw.js')
    registration && console.log(`sw registered, scope: ${registration.scope}`)
  } catch(error) {
    console.log(`sw registration failed: ${error}`)
  }
  // navigator?.connection && console.log(navigator.connection)

  // const image = num => {
  //   for (let i=1; i<num+1; i++) {
  //     const img = document.createElement("img")
  //     const imgPath = img.src = "images/"+ i +".jpg"
  //     const row = document.getElementById("row")
  //     row.appendChild(img)
  //     console.log('img path', imgPath)
  //   }
  // }
  // image(3)

})(document, navigator)
