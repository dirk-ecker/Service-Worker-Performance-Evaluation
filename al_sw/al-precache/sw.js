// Incrementing OFFLINE_VERSION will kick off the install event and force
// previously cached resources to be updated from the network.
const OFFLINE_VERSION = 2

const CONNECTION_IMAGE_QUALITY_MAPPER = {
  'slow-2g': '2g'
}

const precache = [
    'images/2g/example.jpg',
];

self.addEventListener('install', event => {
    const connection = navigator.connection.effectiveType;   
    if (connection == '4g' || connection == '5g') {
        console.log('good connection');  
    }
        else {
            event.waitUntil(async function () {
               const cache = await caches.open('precache');
               await cache.addAll(precache);
              }());
        }
    self.skipWaiting()    
    console.log('sw end install')
  });

  self.addEventListener('activate', (event) => {
    console.log('sw start activate', event)
    // Tell the active service worker to take control of the page immediately.
    self.clients.claim()
    console.log('sw end activate')
  })

self.addEventListener('fetch', event => {
    if (/\.jpg$|.png$|.gif$|.webp$/.test(event.request.url)) {
      const connectionType = navigator.connection.effectiveType
      const imageQuality = CONNECTION_IMAGE_QUALITY_MAPPER[connectionType] || connectionType || '4g'
      const imageURLParts = event.request.url.split('/');
      imageURLParts.splice(imageURLParts.length - 1, 0, `${imageQuality}`);
      const finalImageURL = new URL(imageURLParts.join('/'));
      
      event.respondWith(async function () {
        const cachedResponse = await caches.match(finalImageURL);
        if (cachedResponse) return cachedResponse;
            try {
                return await fetch (finalImageURL) 
            }
            catch(err) {
                console.log('you are offline');
            }      
      }());
    }  
  });