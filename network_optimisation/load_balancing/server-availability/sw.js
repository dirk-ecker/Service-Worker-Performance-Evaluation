const SERVER_HOST = 'http://localhost'
const NUMBER_OF_SERVERS = 3

let actualServerNumber = 0

const actualServerUrl = serverNumber => `${SERVER_HOST}:${5000 + serverNumber}`

// A request is a resource request if it is a `GET` for something inside `imgs`.
const isResourceRequest = request => {
  return request.url.match(/\/images\/.*$/) && request.method === 'GET'
}

const handleImageRequest = async request => {
  let tries = 0
  while (tries < 10) {
    try {
      console.log('get image from server', actualServerNumber)
      const url = new URL(request.url)
      const fetchController = new AbortController()
      // we are waiting 100 msec otherwise abort the fetch
      const timeoutHandle = setTimeout(() => {
        fetchController.abort()
      }, 100)
      // we got it below 100 msec
      const serverNumber = actualServerNumber
      actualServerNumber = (actualServerNumber + 1) % NUMBER_OF_SERVERS
      const response = await fetch(`${actualServerUrl(serverNumber)}${url.pathname}`, {signal: fetchController.signal})
      clearTimeout(timeoutHandle)
      return response
    } catch (exception) {
      if (exception instanceof DOMException) {
        console.log('aborted', exception)
      } else {
        console.log(`try ${tries}`, exception)
        tries++
      }
    }
  }
}

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


self.onfetch = event => {
  const request = event.request
  console.log('onfetch', request.url)
  if (isResourceRequest(request)) {
    console.log('image request')
    event.respondWith(handleImageRequest(request))
  } else {
    console.log('other request')
    event.respondWith(fetch(request))
  }
}

