const CACHE_NAME = 'app-cache';

const urlsToCache = [
  '/',
  '/?utm_source=homescreen',
  '/index.html',
  '/blog.html',
  '/ecommerce.html',
  '/get-noticed.html',
  '/blog/my-site-speed-test.html',
  '/blog/i-started-blogging-again.html',
  '/blog/consumer-forms-project-description.html',
  '/blog/testing-testing-testing.html',
  '/blog/paczka-w-ruchu-modul-do-magento-1-9.html',
  '/assets/images/bg-no-credits.jpg',
  '/assets/images/mateusz-kutyba.png',
  '/assets/fonts/fontawesome-webfont-4.6.3.eot',
  '/assets/fonts/fontawesome-webfont-4.6.3.svg',
  '/assets/fonts/fontawesome-webfont-4.6.3.ttf',
  '/assets/fonts/fontawesome-webfont-4.6.3.woff',
  '/assets/fonts/fontawesome-webfont-4.6.3.woff2',
  '/assets/images/speed-test.jpg',
  '/assets/images/103084-OM8M26-164.jpg',
  '/assets/images/magento-paczka-w-ruchu.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => {
    return cache.addAll(urlsToCache);
  }));
});

self.addEventListener('fetch', (event) => {
  event.respondWith(caches.match(event.request).then((response) => {
    return response ? response : fetch(event.request);
  }));
});
