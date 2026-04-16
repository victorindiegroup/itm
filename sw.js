// ITM Service Worker — offline-first
// Change la version à chaque mise à jour du code pour forcer le re-téléchargement
const CACHE_VERSION = 'itm-v3';
const CACHE_NAME = `itm-cache-${CACHE_VERSION}`;

// Ressources à mettre en cache dès l'installation
const CORE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './catalogue.json',
  './mascot.png'
];

// Installation : met en cache les ressources essentielles
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activation : nettoie les anciens caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys
          .filter((key) => key.startsWith('itm-cache-') && key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

// Fetch : stratégie "network first" pour le HTML (pour les mises à jour),
// "cache first" pour les autres ressources
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Ne pas intercepter les requêtes vers d'autres domaines (ex: API Anthropic)
  if (url.origin !== location.origin) {
    return;
  }

  // Pour catalogue.json : network-first (pour que les màj arrivent vite)
  if (url.pathname.endsWith('/catalogue.json') || url.pathname === '/catalogue.json') {
    event.respondWith(
      fetch(event.request, { cache: 'no-cache' })
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Pour le HTML : essayer le réseau d'abord, fallback cache
  if (event.request.mode === 'navigate' || event.request.destination === 'document') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          return response;
        })
        .catch(() => caches.match(event.request).then((cached) => cached || caches.match('./index.html')))
    );
    return;
  }

  // Pour les autres ressources : cache d'abord, fallback réseau
  event.respondWith(
    caches.match(event.request)
      .then((cached) => {
        if (cached) return cached;
        return fetch(event.request).then((response) => {
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          return response;
        });
      })
  );
});
