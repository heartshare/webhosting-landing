const CACHE_NAME = 'hk-lms-v1';
const CACHE_VERSION = '1.0.0.0';
const ASSETS_TO_CACHE = [
    '/',
    '#/',
    '/index.html',
    '/data/courses.json',
    '/data/lessons.json',
    '/data/assignments.json',
    '/data/grades.json',
    '/data/users.json',
    'https://cdn.tailwindcss.com',
    'https://fonts.googleapis.com/css2',
    'https://images.unsplash.com',
];

const DYNAMIC_CACHE_ROUTES = [
    /^\/courses/,
    /^\/assignments/,
    /^\/grades/,
    /^\/lessons\/[^\/]+$/,
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('[Service Worker] Installing caches');

                return cache.addAll([
                    new Request('/data/courses.json'),
                    new Request('/data/lessons.json'),
                    new Request('/data/assignments.json'),
                    new Request('/data/grades.json'),
                    new Request('/data/users.json'),
                    new Request('https://cdn.tailwindcss.com'),
                ]);
            })
            .then(() => {
                return self.clients.claim();
            })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(name => {
                    if (name !== CACHE_NAME) {
                        console.log('[Service Worker] Deleting old cache:', name);
                        return caches.delete(name);
                    }
                })
            );
        }).then(() => {
            console.log('[Service Worker] Activated, old caches cleaned');
            return self.clients.claim();
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then(response => {
            if (response) {
                return response;
            }

            return fetch(event.request).then(fetchResponse => {
                if (!fetchResponse || fetchResponse.status !== 200 || fetchResponse.type !== 'basic') {
                    return fetchResponse;
                }

                return caches.open(CACHE_NAME).then(cache => {
                    const clonedResponse = fetchResponse.clone();

                    if (shouldCache(event.request)) {
                        cache.put(event.request, clonedResponse).then(() => {
                            console.log('[Service Worker] Cached:', event.request.url);
                        });
                    }

                    return clonedResponse;
                });
            });
        })
    );
});

function shouldCache(request) {
    const url = new URL(request.url);

    if (request.method !== 'GET') {
        return false;
    }

    if (url.origin !== location.origin && !url.pathname.startsWith('/data/')) {
        return false;
    }

    const pathname = url.pathname;

    for (const route of DYNAMIC_CACHE_ROUTES) {
        if (route.test(pathname)) {
            return true;
        }
    }

    if (ASSETS_TO_CACHE.includes(pathname)) {
        return true;
    }

    return false;
}

self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }

    if (event.data && event.data.type === 'CLEAR_CACHE') {
        event.waitUntil(
            caches.delete(CACHE_NAME).then(() => {
                return caches.open(CACHE_NAME).then(cache => {
                    console.log('[Service Worker] Cache cleared');
                    return self.clients.matchAll({
                        includeUncontrolled: true,
                    }).then(clients => {
                        clients.forEach(client => {
                            client.postMessage({ type: 'CACHE_CLEARED' });
                        });
                    });
                });
            })
        );
    }
});
