// Ejecutar con NODE_PATH apuntando al directorio de paquetes que contiene playwright.
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const http = require('http');
const assert = require('assert/strict');
const root = path.resolve(__dirname, '../../portal');
const mime = {'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.png':'image/png','.webp':'image/webp','.xml':'application/xml','.webmanifest':'application/manifest+json'};
const server = http.createServer((req,res) => {
  let name = decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  if(name.endsWith('/')) name += 'index.html';
  const file = path.resolve(root, '.' + name);
  if(!file.startsWith(root + path.sep)) { res.writeHead(403).end(); return; }
  fs.readFile(file,(err,data)=>{res.writeHead(err?404:200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream'});res.end(err?'Not found':data);});
});
const results = [];
(async()=>{
  await new Promise(r=>server.listen(0,'127.0.0.1',r));
  const base = `http://127.0.0.1:${server.address().port}/`;
  const browser = await chromium.launch({channel:'chrome',headless:true});
  try {
    for(const [width,height] of [[1440,900],[1920,1080],[390,844]]){
      const context = await browser.newContext({viewport:{width,height},deviceScaleFactor:1});
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror',e=>errors.push(e.message));
      page.on('console',m=>{if(m.type()==='error') errors.push(m.text());});
      await page.goto(base,{waitUntil:'networkidle'});
      await page.evaluate(()=>document.fonts.ready);
      await page.waitForTimeout(2800);
      const metrics = await page.evaluate(()=>{
        const rect = s => {const r=document.querySelector(s).getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height,right:r.right,bottom:r.bottom};};
        const h=document.querySelector('h1'), range=document.createRange();range.selectNodeContents(h);
        const box=h.getBoundingClientRect();
        return {scrollWidth:document.documentElement.scrollWidth,viewport:innerWidth,logo:rect('.nvc-brand img'),nav:rect('.nvc-nav'),actions:rect('.nvc-actions'),title:h.textContent,titleFits:[...range.getClientRects()].every(r=>r.left>=box.left-1&&r.right<=box.right+1&&r.bottom<=box.bottom+1),popup:!!document.querySelector('.humanitarian-campaign-alert'),campaignLinks:[...document.querySelectorAll('a[href]')].filter(a=>/ayuda-humanitaria|wa\.me/.test(a.href)).length,fontsLoaded:document.fonts.check('800 40px Archivo'),overflow:[...document.querySelectorAll('body *')].filter(e=>!e.closest('.nvc-drawer,.megamenu')&&getComputedStyle(e).display!=='none'&&e.getBoundingClientRect().right>innerWidth+1).map(e=>e.className)};
      });
      assert.equal(metrics.scrollWidth,width);
      assert.equal(metrics.popup,false);
      assert.equal(metrics.campaignLinks,0);
      assert.equal(metrics.titleFits,true);
      assert.equal(metrics.logo.height,width===390?60:75);
      assert.deepEqual(metrics.overflow,[]);
      if(width>1000){assert.ok(metrics.logo.right<metrics.nav.x);assert.ok(metrics.nav.right<=metrics.actions.x);}
      await page.screenshot({path:path.join(__dirname,`home-${width}x${height}.png`)});
      await page.screenshot({path:path.join(__dirname,`home-${width}x${height}-completo.png`),fullPage:true});
      if(width===390){
        await page.getByRole('button',{name:'Abrir menú'}).click();
        await page.locator('#nvc-drawer summary').filter({hasText:'Programas'}).click();
        await page.screenshot({path:path.join(__dirname,'menu-movil.png')});
        await page.locator('#nvc-drawer a').filter({hasText:'Liderazgo Ciudadano'}).click();
        await page.waitForLoadState('networkidle');
        assert.ok(page.url().endsWith('/programas/liderazgo-ciudadano.html'));
      } else {
        await page.locator('.nvc-nav-item button').filter({hasText:'Programas'}).focus();
        await page.locator('.nvc-nav .megamenu a').filter({hasText:'Liderazgo Ciudadano'}).click();
        await page.waitForLoadState('networkidle');
        assert.ok(page.url().endsWith('/programas/liderazgo-ciudadano.html'));
      }
      assert.deepEqual(errors,[]);
      results.push({width,height,metrics,errors});
      await context.close();
    }
    const page=await browser.newPage();
    const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
    const pages=[];
    function walk(dir){for(const f of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,f.name);if(f.isDirectory())walk(p);else if(f.name.endsWith('.html'))pages.push(path.relative(root,p).replaceAll('\\','/'));}}
    walk(root);
    const broken=[];
    for(const p of pages){
      await page.goto(base+p,{waitUntil:'networkidle'});
      assert.equal(await page.locator('.humanitarian-campaign-alert').count(),0);
      const links=await page.locator('a[href]').evaluateAll(es=>es.map(e=>e.href));
      assert.equal(links.filter(l=>l.startsWith(base)&&/ayuda-humanitaria\.html/.test(l)).length,0);
      for(const url of new Set(links.filter(l=>l.startsWith(base)))){const r=await page.request.get(url);if(r.status()>=400)broken.push({page:p,url,status:r.status()});}
    }
    await page.goto(base+'ayuda-humanitaria.html',{waitUntil:'networkidle'});
    assert.equal(await page.locator('h1').textContent(),'Campaña finalizada');
    assert.equal(await page.locator('a[href*="wa.me"],form,.humanitarian-modal').count(),0);
    await page.goto(base+'impacto.html#memoria-terremoto',{waitUntil:'networkidle'});
    assert.equal(await page.locator('#memoria-terremoto-title').textContent(),'EL VALLE DEL CAUCA FRENTE A LA EMERGENCIA');
    results.push({pagesChecked:pages.length,brokenLinks:broken,errors});
    fs.writeFileSync(path.join(__dirname,'resultados.json'),JSON.stringify(results,null,2));
    assert.deepEqual(broken,[]);assert.deepEqual(errors,[]);
    console.log(JSON.stringify(results,null,2));
  } finally {await browser.close();server.close();}
})().catch(e=>{console.error(e);server.close();process.exitCode=1;});
