/* eslint-disable no-restricted-globals */

/* global self, caches, fetch */

const CACHE = 'cache-9beaa7c';

self.addEventListener('install', e => {
  e.waitUntil(precache()).then(() => self.skipWaiting());
});

self.addEventListener('activate', event => {
  self.clients
    .matchAll({
      includeUncontrolled: true,
    })
    .then(clientList => {
      const urls = clientList.map(client => client.url);
      console.log('[ServiceWorker] Matching clients:', urls.join(', '));
    });

  event.waitUntil(
    caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE) {
              console.log('[ServiceWorker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
            return null;
          })
        )
      )
      .then(() => {
        console.log('[ServiceWorker] Claiming clients for version', CACHE);
        return self.clients.claim();
      })
  );
});

function precache() {
  return caches.open(CACHE).then(cache => cache.addAll(["./","./colophon.html","./favicon.png","./index.html","./manifest.json","./sedmikosteli_001.html","./sedmikosteli_002.html","./sedmikosteli_003.html","./sedmikosteli_004.html","./sedmikosteli_005.html","./sedmikosteli_006.html","./sedmikosteli_007.html","./sedmikosteli_008.html","./sedmikosteli_009.html","./sedmikosteli_010.html","./sedmikosteli_011.html","./sedmikosteli_012.html","./sedmikosteli_013.html","./sedmikosteli_014.html","./sedmikosteli_015.html","./sedmikosteli_016.html","./sedmikosteli_017.html","./sedmikosteli_018.html","./sedmikosteli_019.html","./sedmikosteli_021.html","./sedmikosteli_022.html","./sedmikosteli_023.html","./sedmikosteli_024.html","./sedmikosteli_025.html","./sedmikosteli_026.html","./sedmikosteli_027.html","./sedmikosteli_028.html","./sedmikosteli_029.html","./sedmikosteli_030.html","./sedmikosteli_031.html","./sedmikosteli_032.html","./sedmikosteli_033.html","./sedmikosteli_020.html","./fonts/Literata-Italic-var.woff2","./fonts/Literata-var.woff2","./fonts/LiterataTT-TextItalic.woff2","./fonts/LiterataTT-TextRegular.woff2","./fonts/LiterataTT-TextSemibold.woff2","./fonts/LiterataTT_LICENSE.txt","./fonts/SpaceGroteskVF.woff2","./fonts/SpaceGroteskVF_LICENSE.txt","./resources/image001_fmt.jpeg","./resources/image002_fmt.jpeg","./resources/obalka_sedmikosteli_fmt.jpeg","./resources/upoutavka_eknihy_fmt.jpeg","./scripts/bundle.js","./template-images/circles.png","./style/style.min.css"]));
}

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open(CACHE).then(cache => {
      return cache.match(e.request).then(matching => {
        if (matching) {
          console.log('[ServiceWorker] Serving file from cache.');
          console.log(e.request);
          return matching;
        }

        return fetch(e.request);
      });
    })
  );
});
