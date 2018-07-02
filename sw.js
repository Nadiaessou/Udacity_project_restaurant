var staticCacheName = 'restaurant-cache';

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(staticCacheName).then(function(cache) {
            return cache.addAll([
                "./",
                './index.html',
                './restaurant.html',
                './css/styles.css',
                './css/responsive-home.css',
                './css/responsive-infos.css',
                './data/restaurants.json',
                './img/1.jpg',
                './img/2.jpg',
                './img/3.jpg',
                './img/4.jpg',
                './img/5.jpg',
                './img/6.jpg',
                './img/7.jpg',
                './img/8.jpg',
                './img/9.jpg',
                './img/10.jpg',
                './js/main.js',
                './js/dbhelper.js',
                './js/restaurant_info.js',
            ]);
        })
    );
});

self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.filter(function(cacheName) {
                    return cacheName.startsWith('restaurant-') &&
                        cacheName != staticCacheName;
                }).map(function(cacheName) {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    const requestUrl = new URL(event.request.url);
    event.respondWith(
        caches.match(requestUrl.pathname).then((response) => {
            return response || fetch(event.request);
        })
    );
});