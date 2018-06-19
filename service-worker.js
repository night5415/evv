const staticAssets = [
    './',
    './#',
    './#/schedule',
    './about.html',
    './styles.css',
    './app.js',
    'https://www.gstatic.com/firebasejs/5.0.4/firebase.js',
    'https://www.gstatic.com/firebasejs/5.0.4/firebase-database.js'
  ],
  CACHE_PLACE = 'static-files';

self.addEventListener('install', async event => {
  //use cache to save assets
  const cache = await caches.open(CACHE_PLACE);
  cache.addAll(staticAssets);

  return self.skipWaiting();
});

self.addEventListener('fetch', event => {
  console.log(event.request);
  event.respondWith(serverFirst(event.request));
});

async function serverFirst(request) {
  const cache = await caches.open(CACHE_PLACE);
  //remove the timestamp _dc.. causes issues later
  var cacheKey = removeURLParameter(request.url, '_dc');
  if (request.method !== "POST") {
    var match = await cache.match(cacheKey);
    if (match) {
      return match;
    } else {
      var response = await fetch(request);
      var responseClone = response.clone();
      cache.put(cacheKey, responseClone);
      return response;
    }
  } else {
    return await fetch(request);
  }
}

function removeURLParameter(url, parameter) {
  //prefer to use l.search if you have a location/link object
  var urlparts = url.split('?');
  if (urlparts.length >= 2) {

    var prefix = encodeURIComponent(parameter) + '=';
    var pars = urlparts[1].split(/[&;]/g);

    //reverse iteration as may be destructive
    for (var i = pars.length; i-- > 0;) {
      //idiom for string.startsWith
      if (pars[i].lastIndexOf(prefix, 0) !== -1) {
        pars.splice(i, 1);
      }
    }

    url = urlparts[0] + (pars.length > 0 ? '?' + pars.join('&') : "");
    return url;
  } else {
    return url;
  }
}
