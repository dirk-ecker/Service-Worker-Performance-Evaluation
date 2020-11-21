const SERVER_HOST = 'http://localhost'

// The code in `oninstall` and `onactivate` force the service worker to
// control the clients ASAP.
self.oninstall = function(event) {
  console.log('oninstall')
  event.waitUntil(self.skipWaiting())
}

self.onactivate = function(event) {
  console.log('onactivate')
  event.waitUntil(self.clients.claim())
}


self.onfetch = function(event) {
    const request = event.request
    console.log('onfetch', request.url)
    if (isResource(request)) { // check if image request
      const fetchWithRedirection = async () => {
      try {
      console.log('resource request')
      const response = await fetch('http://localhost:5000/' + request.url) // change images to images_0
      if (response) {
        return response
      }
        // If we don't have a valid response, trigger
        throw new Error('Unable to get a response.')
    }
    catch (error) {

     // const redirectionURL = await ... // reirect url to another port

      if (redirectionURL) {
        // HTTP 302 indicates a temporary redirect.
        return Response.redirect(redirectionURL, 302)
      }

      // If we get to this point, redirection isn't possible,
      // so just trigger a NetworkError.
      throw error
     }
    }
   } else {
      console.log('other request')
      event.respondWith(fetch(request))
    }
  }


  // A request is a resource request if it is a `GET` for something inside `imgs`.
function isResource(request) {
    return request.url.match(/\/images\/.*$/) && request.method === 'GET'
  }



  // Query the back-end for servers loads.
function getServerLoads(session) {
    return fetch('http://localhost:5000/server-loads?session=' + session).then(function(response) {
      return response.json()
    })
  }


  function selectServer(serverLoads) {
  // const serverIndex = ... // based on value if server is available

    // Servers are 1, 2, 3...
    return `${SERVER_HOST}:${5000+serverIndex}`
  }
