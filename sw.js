const CACHE = 'quran-cache-v1';
const ASSETS = [
  '.', '/index.html', '/manifest.json'
  // لا تضف ملفات أرشيف كبيرة هنا — نترك ملفات الأرشيف تُحمّل عند الطلب
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim());
});
self.addEventListener('fetch', (e) => {
  // استجابة سريعة من الكاش أولًا ثم الشبكة (network fallback)
  e.respondWith(
    caches.match(e.request).then(resp => resp || fetch(e.request).catch(()=>caches.match('/index.html')))
  );
});
