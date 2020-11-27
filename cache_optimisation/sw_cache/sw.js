// const {imgUrls} = require('./index.js');
const imgUrls = [
  './images/1.jpg',
 
];
const textUrls = [
  './text/1.txt',

];
 
 self.addEventListener('install', (event) => {
    console.log('sw start install', event)
    event.waitUntil(async function () {
      // const cache = await caches.open('img_cache');
      // await cache.addAll(imgUrls);
      const cache = await caches.open('text_cache');
      await cache.addAll(textUrls);
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
    return await fetch (event.request)
  }());
  });