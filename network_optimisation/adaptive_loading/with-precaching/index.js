(async (navigator) => {
  // register service worker
  try {
    const registration = await navigator.serviceWorker.register('./sw.js')
    registration  
    //console.log(`sw registered, scope: ${registration.scope}`)
    navigator.serviceWorker.ready.then(() => {
      $('#image-selector').disabled = false
    })
  } catch(error) {
    console.log(`sw registration failed: ${error}`)
  }
  // navigator?.connection && console.log(navigator.connection)
})(navigator)
