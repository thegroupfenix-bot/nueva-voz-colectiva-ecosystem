/* Public static content only. Bump VERSION when changing the offline shell. */
const VERSION = 'v1';
const ROOT = new URL(self.registration.scope);
const PREFIX = 'nvc-public-' + ROOT.pathname + '-';
const CACHE = PREFIX + VERSION;
const offlineURL = new URL('offline.html', ROOT).href;
const shell = ['offline.html','css/tokens.css','css/base.css','assets/logo/nvc-logo-oficial.png'];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(shell.map(p => new URL(p,ROOT).href))));
});
self.addEventListener('activate', event => {
  event.waitUntil((async()=>{
    for(const name of await caches.keys()) if(name.startsWith(PREFIX) && name !== CACHE) await caches.delete(name);
    await self.clients.claim();
  })());
});
self.addEventListener('message', event => {
  if(event.data && event.data.type === 'NVC_SKIP_WAITING') self.skipWaiting();
});
async function offlinePage(){
  const cached = await caches.match(offlineURL);
  const html = (await cached.text()).replace('<head>', '<head><base href="' + ROOT.href + '">');
  return new Response(html,{headers:{'Content-Type':'text/html; charset=utf-8'}});
}
self.addEventListener('fetch', event => {
  const request = event.request, url = new URL(request.url);
  if(request.method !== 'GET' || url.origin !== ROOT.origin || !url.pathname.startsWith(ROOT.pathname) || url.search) return;
  const relative = url.pathname.slice(ROOT.pathname.length);
  // Never store forms, submissions, internal documents or historic archives.
  const page = /^(?:index|quienes-somos|transparencia|impacto|ayuda-humanitaria|eventos|sala-de-prensa|cooperacion-internacional)\.html$/.test(relative)
    || /^(?:programas|proyectos|biblioteca)\/(?:[a-z-]+\.html)?$/.test(relative) || relative === '';
  const asset = /^(?:css|js|assets)\/.+\.(?:css|js|png|webp|svg|ico)$/.test(relative);
  if(!page && !asset){
    if(request.mode === 'navigate') event.respondWith(fetch(request).catch(()=>offlinePage()));
    return;
  }
  // Network first: do not keep serving an obsolete campaign when a connection exists.
  event.respondWith((async()=>{
    const cache = await caches.open(CACHE);
    try {
      const response = await fetch(request);
      if(response.ok && response.type === 'basic'){
        try { await cache.put(request,response.clone()); } catch { return response; }
        const keys = await cache.keys();
        if(keys.length > 100){
          const protectedURLs = shell.map(p=>new URL(p,ROOT).href);
          const oldest = keys.find(k=>!protectedURLs.includes(k.url));
          if(oldest) await cache.delete(oldest);
        }
      }
      return response;
    } catch {
      return await cache.match(request) || (request.mode === 'navigate' ? await offlinePage() : Response.error());
    }
  })());
});
