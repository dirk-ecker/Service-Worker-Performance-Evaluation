const prechache_1 = [
    '/images/1.jpg',
    '/images/2.jpg',
    '/images/3.jpg'
];


self.addEventListener('install', (event) => {
  console.log('sw start install', event)
  event.waitUntil(async function () {
    const cache = await caches.open('precache_1');
    await cache.addAll(prechache_1);
   }());
 
  self.skipWaiting() // Force the waiting service worker to become the active service worker.
  console.log('sw end install')
})

self.addEventListener('activate', (event) => {
  console.log('sw start activate', event)
  // Tell the active service worker to take control of the page immediately.
  self.clients.claim()
  console.log('sw end activate')
});

self.addEventListener('fetch', event => {
  event.respondWith(async function () {
    const cachedResponse = await caches.match(event.request);
    if (cachedResponse) return cachedResponse;
    try {
      return await fetch (event.request) // without await its gonna pass promise back even if it is going to be rejected. with await it can be try catched
    }
    catch(err) {
      return caches.match(); // offline response
    }
  }());
  });