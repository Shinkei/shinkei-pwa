// v2

console.log('hello from SW')
// / is always neccessary because represents the html assets
const assets = [
  '/',
  'styles.css',
  'app.js',
  'sw-register.js',
  'https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2',
]

// cache all assets at install event
self.addEventListener('install', async function (event) {
  console.log('SW installed')
  const cache = await caches.open('assets')
  cache.addAll(assets)
})

// State while revalidate strategy
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Even if the response is in the cache, we fetch it
      // and update the cache for future usage
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        caches.open('assets').then((cache) => {
          cache.put(event.request, networkResponse.clone())
          return networkResponse
        })
      })
      // We use the currently cached version if it's there
      return response || fetchPromise // cached or a network fetch
    })
  )
})
