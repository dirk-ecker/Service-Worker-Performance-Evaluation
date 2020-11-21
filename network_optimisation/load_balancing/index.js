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

  window.onload = async function getServerLoads() {
    const serverSession = await fetch(addSession(`${SERVER_HOST}/server-loads`))
    return serverSession.json()
  }

  try {
    const registration = await navigator.serviceWorker.register('./sw.js')
    registration && console.log(`sw registered, scope: ${registration.scope}`)

    navigator.serviceWorker.ready.then(() => {
      $('#image-selector').disabled = false
    })
  } catch(error) {
    console.log(`sw registration failed: ${error}`)
  }

  const image = num => {
    for (let i=1; i<num+1; i++) {
      const img = document.createElement("img")
      const imgPath = img.src = "images/"+ i +".jpg"
      const row = document.getElementById("row")
      row.appendChild(img)
      console.log('img path', imgPath)
    }

  }
  image(3)

})(document, navigator, window)
