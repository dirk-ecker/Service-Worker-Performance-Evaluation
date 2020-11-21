// Incrementing OFFLINE_VERSION will kick off the install event and force
// previously cached resources to be updated from the network.
const OFFLINE_VERSION = 2

const CONNECTION_IMAGE_QUALITY_MAPPER = {
  'slow-2g': '2g'
}

self.addEventListener('install', (event) => {
  console.log('sw start install', event)
  // Force the waiting service worker to become the active service worker.
  self.skipWaiting()
  console.log('sw end install')
})

self.addEventListener('activate', (event) => {
  console.log('sw start activate', event)
  // Tell the active service worker to take control of the page immediately.
  self.clients.claim()
  console.log('sw end activate')
})

self.addEventListener('fetch', event => {
  console.log('sw start fetch', event)
  if (/\.jpg$|.png$|.gif$|.webp$/.test(event.request.url)) {
      const connectionType = navigator.connection.effectiveType
      const imageQuality = CONNECTION_IMAGE_QUALITY_MAPPER[connectionType] || connectionType || '4g'
      const imageURLParts = event.request.url.split('/')
      imageURLParts.splice(imageURLParts.length - 1, 0, imageQuality)
      const finalImageURL = new URL(imageURLParts.join('/'))
      console.log(`fetching ${finalImageURL}`)
      event.respondWith(
        fetch(finalImageURL.href, { headers: event.request.headers })
      )
    }
  console.log('sw end fetch')
})
