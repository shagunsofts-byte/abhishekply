// Service worker for the Abhishek admin panel only.
// Registered with { scope: '/admin/' } from AdminPwaSetup, so the browser
// guarantees it can never intercept requests outside /admin/ — the public
// storefront is completely untouched by this file.

const CACHE_NAME = 'abhishek-admin-shell-v1';
const SHELL_URL = '/admin/quotes';

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.add(SHELL_URL).catch(() => {}))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (!url.pathname.startsWith('/admin')) return; // belt-and-suspenders on top of the scope guarantee

  // Navigations (opening/refreshing an admin page): network first, so the
  // admin always sees live data when online, with a cached shell as an
  // offline-only fallback rather than a hard failure.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy)).catch(() => {});
          return response;
        })
        .catch(() => caches.match(request).then((cached) => cached || caches.match(SHELL_URL)))
    );
    return;
  }

  // Static assets (JS/CSS/images) under /admin: stale-while-revalidate so
  // repeat visits feel instant, while staying fresh in the background.
  event.respondWith(
    caches.match(request).then((cached) => {
      const network = fetch(request)
        .then((response) => {
          if (response && response.status === 200) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy)).catch(() => {});
          }
          return response;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
