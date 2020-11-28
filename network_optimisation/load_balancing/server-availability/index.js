(async (document, navigator,window) => {

  const SERVER_HOST = 'http://localhost:5000'

  const scope = {
    scope: './'
  }

  const $ = document.querySelector.bind(document)

  // A simple session manager based on a random string stored in the localStorage
  const getSession = () => {
    let session = localStorage.getItem('session')
    if (!session) {
      session = `${Date.now()}-${Math.random()}`
      localStorage.setItem('session', session)
    }
    return session
  }

  // Add the session parameter to an URL.
  const addSession = url => `${url}?session=${getSession()}`

   window.onload = async function getServerLoads() { // onload.event instead of  
    // const getServerLoads = async () => {
    const serverLoads = await fetch(addSession(`${SERVER_HOST}/server-loads`))
    return serverLoads.json()
  }

  const enableUI = async () => {
    const loads = await getServerLoads()
   // server availability logic 

    $('#image-selector').disabled = false
  }

  try {
    const registration = await navigator.serviceWorker.register('./sw.js')
    navigator.serviceWorker.ready.then(enableUI)
    registration && console.log(`sw registered, scope: ${registration.scope}`)
  } catch(error) {
    console.log(`sw registration failed: ${error}`)
  }

  // Simply change the source for the image.
  $('#image-selector').onchange = () => {
    const imgUrl = $('select').value
    if (imgUrl) {
      // The bumping parameter `_b` is just to avoid HTTP cache.
      const src = addSession(imgUrl) + '&_b=' + Date.now()
      $('img').src = src

    }
  }


})(document, navigator, window)
