// This is a service worker file that can be used with create-react-app

// eslint-disable-next-line no-restricted-globals
const cache = self;
const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    window.location.hostname === '[::1]' ||
    window.location.hostname.match(
      // eslint-disable-next-line no-useless-escape
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

cache.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }

        return fetch(event.request).then(
          function(response) {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            var responseToCache = response.clone();

            caches.open('sw-cache')
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
  );
});

cache.addEventListener('install', event => event.waitUntil(caches.open('sw-cache').then((cache) => {
  return cache.addAll([
    '/',
    '/index.html',
    '/static/js/',
    '/static/css/',
  ]);
})));

cache.addEventListener('activate', event => {
  const cacheWhitelist = ['sw-cache'];
  event.waitUntil(
    caches.keys().then(keyList =>
      Promise.all(keyList.map(key => {
        if (!cacheWhitelist.includes(key)) {
          return caches.delete(key);
        }
      }))
    )
  );
});