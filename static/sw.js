 const staticAssets = [
   './',
   './#',
   './#/schedule',
   './about.html',
   './styles.css',
   './app.js'
 ];

 //  importScripts('workbox-sw.js');


 //  if (workbox) {
 console.log(`Yay! Workbox is loaded 🎉`);
 //  } else {
 //      console.log(`Boo! Workbox didn't load 😬`);
 //  }

 //  workbox.precaching.precacheAndRoute(staticAssets);

 self.addEventListener('install', async event => {
   //use cache to save assets
   const cache = await caches.open('news-static');
   cache.addAll(staticAssets);
 });

 self.addEventListener('fetch', event => {
   const req = event.request,
     url = new URL(req.url);


   console.log(event);

   if (url.origin === location.origin) {
     event.respondWith(cacheFirst(req));
   } else {
     event.respondWith(serverFirst(req));
   }
 });

 //this checks the cache first then hits the network
 //if asset is not in the cache
 async function cacheFirst(request) {
   const cachedResponse = await caches.match(request);

   return cachedResponse || fetch(request);
 }
 //this checks the server first, then checks the cache
 async function serverFirst(request) {
   const cache = await caches.open('news-dynamic');

   try {
     const response = await fetch(request);
     //can only read the requst once, so clone is
     //how we'll save it to cache
     cache.put(request, response.clone());
     return response;
   } catch (error) {
     return await cache.match(request);
   }
 }
