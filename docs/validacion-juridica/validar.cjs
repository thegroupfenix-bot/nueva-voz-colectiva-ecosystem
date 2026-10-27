// NODE_PATH debe apuntar al directorio de paquetes que contiene playwright.
const {chromium}=require('playwright');
const fs=require('fs'), path=require('path'), http=require('http'), assert=require('assert/strict'), crypto=require('crypto');
const root=path.resolve(__dirname,'../../portal');
const mime={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.png':'image/png','.webp':'image/webp','.webmanifest':'application/manifest+json'};
const server=http.createServer((req,res)=>{
  let name=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  if(name.endsWith('/'))name+='index.html';
  const file=path.resolve(root,'.'+name);
  if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return;}
  fs.readFile(file,(err,data)=>{res.writeHead(err?404:200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream'});res.end(err?'Not found':data);});
});
const results=[];
(async()=>{
  const before=JSON.parse(fs.readFileSync(path.join(__dirname,'antes-hashes.json'),'utf8').replace(/^\uFEFF/,''));
  const allowed=['portal\\quienes-somos.html','portal\\transparencia.html','portal\\js\\nav.js'];
  const protectedFiles=[];
  for(const [file,hash] of Object.entries(before)){
    if(allowed.includes(file))continue;
    const now=crypto.createHash('sha256').update(fs.readFileSync(path.resolve(root,'..',file))).digest('hex').toUpperCase();
    assert.equal(now,hash,`Archivo protegido modificado: ${file}`);protectedFiles.push(file);
  }
  await new Promise(r=>server.listen(0,'127.0.0.1',r));
  const base=`http://127.0.0.1:${server.address().port}/`;
  const browser=await chromium.launch({channel:'chrome',headless:true});
  try{
    for(const [width,height] of [[1440,900],[1920,1080],[390,844]]){
      const context=await browser.newContext({viewport:{width,height},deviceScaleFactor:1});
      const page=await context.newPage();
      const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
      const dimensions=async()=>page.locator('.nvc-brand img,.nvc-footer-brand img').evaluateAll(es=>es.map(e=>({width:e.getBoundingClientRect().width,height:e.getBoundingClientRect().height,naturalWidth:e.naturalWidth,naturalHeight:e.naturalHeight})));
      // Medir la versión anterior con los mismos recursos, fuentes y viewport.
      await page.route('**/transparencia.html',route=>route.fulfill({contentType:'text/html',body:fs.readFileSync(path.join(__dirname,'antes/transparencia.html'),'utf8')}));
      await page.goto(base+'transparencia.html',{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);
      const originalLogo=await dimensions();await page.unroute('**/transparencia.html');
      await page.goto(base+'transparencia.html',{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);
      assert.deepEqual(await dimensions(),originalLogo);
      const values=['CORPORACION NUEVA VOZ COLECTIVA','Entidad sin ánimo de lucro','902119662-0','Tuluá, Valle del Cauca, Colombia','22 de octubre de 2026','Misael Valencia Barahona','Gobernación del Valle del Cauca','CIIU 9499','CIIU 8899'];
      const text=await page.locator('#identidad-juridica').innerText();for(const v of values)assert.ok(text.includes(v),v);
      assert.ok(text.includes('Contamos con personería jurídica'));
      assert.equal(await page.getByText('902119662-0',{exact:true}).isVisible(),true);
      assert.equal(await page.locator('#identidad-juridica .legal-copy p').count(),3);
      assert.equal(await page.locator('.legal-review-note').count(),0);
      assert.equal(await page.locator('#documentos-institucionales a').count(),0);
      assert.equal(await page.locator('.humanitarian-campaign-alert').count(),0);
      assert.equal(await page.locator('a[href*="wa.me"]').count(),0);
      const geometry=await page.evaluate(()=>({viewport:innerWidth,scrollWidth:document.documentElement.scrollWidth,overflow:[...document.querySelectorAll('.legal-identity *, .legal-documents *')].filter(e=>{const r=e.getBoundingClientRect();return r.right>innerWidth+1||r.left< -1;}).map(e=>e.tagName),fontSize:getComputedStyle(document.querySelector('.legal-copy p')).fontSize}));
      assert.equal(geometry.viewport,geometry.scrollWidth);assert.deepEqual(geometry.overflow,[]);assert.equal(geometry.fontSize,'16px');
      const suffix=`${width}x${height}.png`;
      await page.locator('#identidad-juridica').screenshot({path:path.join(__dirname,'identidad-'+suffix)});
      await page.screenshot({path:path.join(__dirname,'transparencia-'+suffix),fullPage:true});
      await page.locator('#nvc-footer').screenshot({path:path.join(__dirname,'pie-'+suffix)});
      await page.locator('#nvc-footer').getByRole('link',{name:'Información jurídica',exact:true}).click();
      assert.ok(page.url().endsWith('#identidad-juridica'));
      await page.goto(base+'quienes-somos.html',{waitUntil:'networkidle'});
      await page.locator('.legal-reference').screenshot({path:path.join(__dirname,'nosotros-'+suffix)});
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth),width);
      await page.getByRole('link',{name:'Consultar información jurídica',exact:true}).click();await page.waitForLoadState('networkidle');
      assert.ok(page.url().endsWith('transparencia.html#identidad-juridica'));
      await page.goto(base+'programas/index.html',{waitUntil:'networkidle'});
      await page.locator('#nvc-footer').getByRole('link',{name:'Información jurídica',exact:true}).click();await page.waitForLoadState('networkidle');
      assert.ok(page.url().endsWith('/transparencia.html#identidad-juridica'));
      assert.deepEqual(errors,[]);
      results.push({width,height,logo:originalLogo,geometry,errors,links:'Nosotros y pie de página (incluida ruta anidada): correctos'});
      await context.close();
    }
    const formChecks=[];
    const formPage=await browser.newPage({viewport:{width:390,height:844}});
    for(const file of ['contacto.html','participa.html']){
      await formPage.goto(base+file,{waitUntil:'networkidle'});
      const form=formPage.locator('form');
      await form.locator('input[type="text"]').fill('Prueba local de validación');
      await form.locator('input[type="email"]').fill('validacion@example.invalid');
      await form.locator('textarea').fill('Prueba local: no enviar.');
      if(await form.locator('input[type="checkbox"]').count())await form.locator('input[type="checkbox"]').check();
      await formPage.evaluate(()=>{
        window.formSubmissionPrevented=null;
        document.addEventListener('submit',event=>{window.formSubmissionPrevented=event.defaultPrevented;});
      });
      let requests=0;const onRequest=()=>requests++;formPage.on('request',onRequest);
      await form.locator('button').click();await formPage.waitForTimeout(300);
      formPage.off('request',onRequest);
      const check=await form.evaluate(e=>({inlineHandler:e.getAttribute('onsubmit'),action:e.getAttribute('action'),fieldsEditable:!!e.querySelector('textarea').value,submissionPrevented:window.formSubmissionPrevented,scrollWidth:document.documentElement.scrollWidth,viewport:innerWidth}));
      assert.equal(check.fieldsEditable,true);assert.equal(check.scrollWidth,390);
      formChecks.push({page:file,...check,requestsAfterClick:requests,deliveryWorks:false,reason:'Limitación preexistente: onsubmit="return false", sin servicio de envío conectado.'});
    }
    await formPage.close();
    results.push({forms:formChecks,allPublicationChecksPassed:false});
    results.push({protectedFilesUnchanged:protectedFiles.length,documentVerification:'Nueve datos contrastados el 27/10/2026 con los PDF aportados de Cámara de Comercio y RUT, ambos del 23/10/2026; ver INFORME.md',campaign:'Cierre anterior conservado'});
    fs.writeFileSync(path.join(__dirname,'resultados.json'),JSON.stringify(results,null,2));console.log(JSON.stringify(results,null,2));
  }finally{await browser.close();server.close();}
})().catch(e=>{console.error(e);server.close();process.exitCode=1;});
