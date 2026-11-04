const {chromium}=require('playwright');
const fs=require('fs'),path=require('path'),http=require('http'),assert=require('assert/strict');
const root=path.resolve(__dirname,'../../portal');let version='v1';
const server=http.createServer((req,res)=>{let name=new URL(req.url,'http://localhost').pathname;if(name.endsWith('/'))name+='index.html';const file=path.resolve(root,'.'+name);if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return;}fs.readFile(file,(err,data)=>{if(name==='/sw.js'&&data)data=Buffer.from(data.toString().replace("'v1'",`'${version}'`));const ext=path.extname(file);res.writeHead(err?404:200,{'Content-Type':({'.html':'text/html; charset=utf-8','.js':'application/javascript','.css':'text/css','.webmanifest':'application/manifest+json','.png':'image/png','.webp':'image/webp'})[ext]||'text/plain','Cache-Control':'no-store'});res.end(err?'Not found':data);});});
const results=[];
(async()=>{await new Promise(r=>server.listen(0,'127.0.0.1',r));const base=`http://127.0.0.1:${server.address().port}/`;const browser=await chromium.launch({channel:'chrome',headless:true});try{
for(const config of [{name:'desktop1440',width:1440,height:900},{name:'desktop1920',width:1920,height:1080},{name:'android',width:390,height:844,userAgent:'Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36 Chrome/130.0.0.0 Mobile Safari/537.36',isMobile:true,hasTouch:true},{name:'iphone',width:390,height:844,userAgent:'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 Version/18.0 Mobile/15E148 Safari/604.1',isMobile:true,hasTouch:true}]){
 const context=await browser.newContext({viewport:{width:config.width,height:config.height},userAgent:config.userAgent,isMobile:!!config.isMobile,hasTouch:!!config.hasTouch});
 await context.addInitScript(()=>{Object.defineProperty(navigator,'share',{configurable:true,value:undefined});});
 const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(base,{waitUntil:'networkidle'});await page.evaluate(()=>navigator.serviceWorker.ready);await page.reload({waitUntil:'networkidle'});
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth),config.width);
 assert.equal(await page.locator('.humanitarian-campaign-alert').count(),0);
 if(config.isMobile)await page.getByRole('button',{name:'Abrir menú'}).click();
 const area=config.isMobile?page.locator('#nvc-drawer'):page.locator('.nvc-nav');
 assert(await area.getByRole('button',{name:'Instalar app',exact:true}).isVisible());
 await page.screenshot({path:path.join(__dirname,`${config.name}-menu.png`)});
 await area.getByRole('button',{name:'Instalar app',exact:true}).click();
 assert(await page.locator('dialog').isVisible());
 if(config.name==='iphone')assert((await page.locator('[data-app-help]').textContent()).includes('Añadir a pantalla de inicio'));
 await page.screenshot({path:path.join(__dirname,`${config.name}-instalar.png`)});
 await page.getByRole('button',{name:'Cerrar',exact:true}).last().click();
 await area.getByRole('button',{name:'Compartir app',exact:true}).click();
 const wa=new URL(await page.getByRole('link',{name:'Compartir por WhatsApp'}).getAttribute('href'));assert.equal(wa.hostname,'wa.me');assert(wa.searchParams.get('text').includes('https://corporacionnuevavozcolectiva.org/'));
 await page.evaluate(()=>Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async text=>{window.copied=text;}}}));
 await page.getByRole('button',{name:'Copiar enlace',exact:true}).click();assert.equal(await page.evaluate(()=>window.copied),'https://corporacionnuevavozcolectiva.org/');assert.equal(await page.locator('[data-app-status]').textContent(),'Enlace copiado.');
 await page.evaluate(()=>Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async()=>{throw Error('Denied');}}}));await page.getByRole('button',{name:'Copiar enlace',exact:true}).click();assert((await page.locator('[data-app-status]').textContent()).includes('Selecciona'));
 await page.screenshot({path:path.join(__dirname,`${config.name}-compartir.png`)});await page.getByRole('button',{name:'Cerrar',exact:true}).last().click();
 await page.evaluate(()=>{Object.defineProperty(navigator,'share',{configurable:true,value:async data=>{window.shared=data;}})});await area.getByRole('button',{name:'Compartir app',exact:true}).click();assert(await page.getByRole('button',{name:'Copiar enlace',exact:true}).isVisible());await page.getByRole('button',{name:'Compartir con otras aplicaciones',exact:true}).click();assert.equal(await page.evaluate(()=>window.shared.url),'https://corporacionnuevavozcolectiva.org/');
 await page.evaluate(()=>{Object.defineProperty(navigator,'share',{configurable:true,value:async()=>{throw new DOMException('cancel','AbortError')}})});await page.getByRole('button',{name:'Compartir con otras aplicaciones',exact:true}).click();assert.equal(await page.locator('dialog').isVisible(),true);await page.getByRole('button',{name:'Cerrar',exact:true}).last().click();
 const notCancelled=await page.evaluate(()=>{const event=new Event('beforeinstallprompt',{cancelable:true});event.prompt=async()=>{window.prompted=true};event.userChoice=Promise.resolve({outcome:'dismissed'});window.dispatchEvent(event);return !event.defaultPrevented});assert(notCancelled);
 await area.getByRole('button',{name:'Instalar app',exact:true}).click();assert(await page.evaluate(()=>window.prompted));
 await page.evaluate(()=>window.dispatchEvent(new Event('appinstalled')));assert.equal(await area.locator('[data-app-install]').isVisible(),false);assert(await area.locator('[data-app-share]').isVisible());await area.locator('[data-app-share]').click();assert(await page.getByRole('link',{name:'Compartir por WhatsApp'}).isVisible());assert(await page.getByRole('button',{name:'Copiar enlace',exact:true}).isVisible());await page.getByRole('button',{name:'Cerrar',exact:true}).last().click();
 if(config.isMobile){await page.locator('#nvc-drawer summary').filter({hasText:'Programas'}).click();await page.locator('#nvc-drawer a').filter({hasText:'Liderazgo Ciudadano'}).click();}else{await page.locator('.nvc-nav-item button').filter({hasText:'Programas'}).focus();await page.locator('.nvc-nav .megamenu a').filter({hasText:'Liderazgo Ciudadano'}).click();}
 await page.waitForLoadState('networkidle');assert(page.url().endsWith('programas/liderazgo-ciudadano.html'));assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth),config.width);
 await page.goto(base+'transparencia.html',{waitUntil:'networkidle'});assert(await page.getByText('902119662-0',{exact:true}).isVisible());
 assert.deepEqual(errors,[]);results.push({device:config.name,status:'passed',simulation:true});await context.close();
}
const context=await browser.newContext({viewport:{width:1440,height:900}}),page=await context.newPage();await page.goto(base,{waitUntil:'networkidle'});await page.evaluate(()=>navigator.serviceWorker.ready);await page.reload({waitUntil:'networkidle'});
const manifest=await (await page.request.get(base+'site.webmanifest')).json();assert.equal(manifest.start_url,'./');assert.equal(manifest.scope,'./');for(const icon of manifest.icons)assert.equal((await page.request.get(base+icon.src)).status(),200);
await page.goto(base+'transparencia.html',{waitUntil:'networkidle'});await context.setOffline(true);await page.reload();assert(await page.getByText('902119662-0',{exact:true}).isVisible());await page.goto(base+'contacto.html');assert.equal(await page.locator('h1').textContent(),'Estás sin conexión');await page.goto(base+'programas/desconocido.html');assert.equal(await page.locator('h1').textContent(),'Estás sin conexión');assert.equal(await page.locator('a').getAttribute('href'),'./');assert.equal(await page.locator('a').evaluate(a=>a.href),base);await context.setOffline(false);await page.goto(base,{waitUntil:'networkidle'});
version='v2';await page.evaluate(async()=>{await(await navigator.serviceWorker.getRegistration()).update()});await page.waitForFunction(()=>document.querySelector('[data-app-update]:not([hidden])'));await page.locator('.nvc-nav [data-app-update]').click();await page.waitForFunction(async()=>{const names=await caches.keys();return names.some(n=>n.endsWith('-v2'))&&!names.some(n=>n.endsWith('-v1'))});
results.push({offlineVisitedPage:true,offlineFallback:true,workerUpdate:true,manifest:true});
const pages=[];function walk(dir){for(const f of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,f.name);if(f.isDirectory())walk(p);else if(f.name.endsWith('.html'))pages.push(path.relative(root,p).replaceAll('\\','/'));}}walk(root);
for(const name of pages){await page.goto(base+name,{waitUntil:'networkidle'});for(const href of new Set(await page.locator('a[href]').evaluateAll(es=>es.map(e=>e.href))))if(href.startsWith(base))assert((await page.request.get(href)).status()<400,href);}
results.push({internalPages:pages.length});await context.close();
const installedContext=await browser.newContext({viewport:{width:1440,height:900}});
await installedContext.addInitScript(()=>{Object.defineProperty(navigator,'standalone',{value:true});});
const installedPage=await installedContext.newPage();await installedPage.goto(base,{waitUntil:'networkidle'});
assert.equal(await installedPage.locator('.nvc-nav [data-app-install]').isVisible(),false);assert(await installedPage.locator('.nvc-nav [data-app-share]').isVisible());
results.push({standaloneLaunchSimulated:true});await installedContext.close();
}finally{await browser.close();server.close()}fs.writeFileSync(path.join(__dirname,'results.json'),JSON.stringify(results,null,2));console.log(results);
})().catch(e=>{console.error(e);server.close();process.exitCode=1});
