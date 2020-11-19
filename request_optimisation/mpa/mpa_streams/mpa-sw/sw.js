// Incrementing OFFLINE_VERSION will kick off the install event and force
// previously cached resources to be updated from the network.
const OFFLINE_VERSION = 1

const precache = [
  'partials/header.html',
  'partials/footer.html'
]
self.addEventListener('install', (event) => {
  console.log('sw start install', event)
  event.waitUntil(async function () {
    const cache = await caches.open('precache')
    await cache.addAll(precache)
    console.log('precache done')
  }())
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
  console.log('sw start fetch', event.request.referrer, event.request.url, event)
  const requestURL = new URL(event.request.url)

  if (/^\/partials\//.test(requestURL.pathname)) {
    event.respondWith((async () => caches.match(requestURL.pathname))())
  } else if (/^\/pages\//.test(requestURL.pathname)) {
      event.respondWith((async () => {
        const cache = await caches.open('precache')
        const cachedHeader = await cache.match(precache[0])
        const cachedHeaderText = await cachedHeader.text()
        const cachedFooter = await cache.match(precache[1])
        const cachedFooterText = await cachedFooter.text()
        try {
          console.log(`fetching ${event.request.url}`)
          const content = await fetch(event.request.url)
          const contentText = await content.text()
          return new Response(`${cachedHeaderText}${contentText}${cachedFooterText}`, {
            headers: { 'Content-Type': 'text/html' }
          })
        } catch (err) {
          console.log('you are offline')
        }
      })())
    }
    console.log('sw end fetch')
})
