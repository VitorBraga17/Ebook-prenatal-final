const CACHE_NAME = 'ebook-prenatal-cache-v1';
const urlsToCache = [
  '/pages/_index/index.html', // Start page
  '/pages/_index/styles.css',
  '/pages/1/index.html',
  '/pages/1/styles.css',
  '/pages/2/index.html',
  '/pages/2/styles.css',
  '/pages/3/index.html',  // Add other pages similarly
  '/pages/3/styles.css',
  '/assets/images/CAPA_PROJETO_MAGNA.png',
  '/assets/images/bgheader.png',
  '/assets/images/favicon.png',
  '/assets/images/tampao1.png',
  '/assets/images/Frame 39.png',
  '/assets/images/Frame 40.png',
  '/assets/images/tampao2.png',
  '/assets/images/image1.png',
  '/assets/images/image2.png',
  '/assets/images/image3.png',
  '/assets/images/image4.png',
  '/assets/images/image5.png',
  '/assets/images/image6.png',
  '/assets/images/image7.png',
  '/assets/images/image8.png',
  '/assets/images/image12.png',
  '/assets/images/image13.png',
  '/assets/images/image14.png',
  '/assets/images/image15.png',
  '/assets/images/image16.png'
];

// Install event - Cache the necessary assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

// Fetch event - Serve cached files when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response; // Return cached asset
        }
        return fetch(event.request); // Fallback to network
      })
  );
});

// Activate event - Clean up old caches if the CACHE_NAME changes
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName); // Delete old caches
          }
        })
      );
    })
  );
});
