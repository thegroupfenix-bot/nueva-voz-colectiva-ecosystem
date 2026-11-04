/* ============================================================
   NVC — NAVEGACIÓN: sitemap único, header + mega-menú + footer +
   breadcrumb + drawer móvil. Arquitectura escalable: agregar una
   página nueva = agregar una fila a SITE_MAP. No tocar el resto.
   ============================================================ */
(function(){

  const appRoot = new URL('../', document.currentScript.src);
  const appURL = 'https://corporacionnuevavozcolectiva.org/';
  const shareText = 'Conoce Nueva Voz Colectiva y sus programas de ciudadanía, liderazgo y desarrollo territorial.';
  let installPrompt, installed = false, waitingWorker, updateRequested = false;
  const standalone = window.matchMedia('(display-mode: standalone)');
  const isInstalled = () => installed || standalone.matches || navigator.standalone === true;
  // Do not preventDefault: preserve the browser's own installation invitation.
  window.addEventListener('beforeinstallprompt', event => { installPrompt = event; });
  window.addEventListener('appinstalled', () => { installed = true; installPrompt = null; syncAppButtons(); });
  standalone.addEventListener('change', syncAppButtons);

  function appActions(){
    return `<div class="nvc-app-actions" aria-label="Aplicación Nueva Voz Colectiva">
      <button type="button" class="btn btn-secondary btn-sm" data-app-install>Instalar app</button>
      <button type="button" class="btn btn-secondary btn-sm" data-app-share>Compartir app</button>
      <button type="button" class="btn btn-secondary btn-sm" data-app-update hidden>Actualizar app</button>
    </div>`;
  }
  function syncAppButtons(){
    document.querySelectorAll('[data-app-install]').forEach(button => { button.hidden = isInstalled(); });
    document.querySelectorAll('[data-app-update]').forEach(button => { button.hidden = !waitingWorker; });
  }
  function setupApp(){
    const dialog = document.createElement('dialog');
    dialog.className = 'nvc-app-dialog';
    dialog.setAttribute('aria-labelledby','nvc-app-title');
    dialog.innerHTML = `<h2 id="nvc-app-title">Nueva Voz Colectiva</h2>
      <p data-app-help></p>
      <div class="nvc-app-options">
        <button type="button" class="btn btn-primary" data-app-native>Compartir con otras aplicaciones</button>
        <a class="btn btn-secondary" href="https://wa.me/?text=${encodeURIComponent(shareText+' '+appURL)}" target="_blank" rel="noopener noreferrer">Compartir por WhatsApp</a>
        <button type="button" class="btn btn-secondary" data-app-copy>Copiar enlace</button>
      </div>
      <label for="nvc-app-link">Enlace oficial</label>
      <input id="nvc-app-link" type="url" readonly value="${appURL}">
      <p role="status" aria-live="polite" data-app-status></p>
      <button type="button" class="btn btn-secondary" data-app-close>Cerrar</button>`;
    document.body.appendChild(dialog);
    const status = dialog.querySelector('[data-app-status]');
    const nativeButton = dialog.querySelector('[data-app-native]');
    nativeButton.hidden = typeof navigator.share !== 'function';
    function openHelp(installation){
      nativeButton.hidden = typeof navigator.share !== 'function';
      const ios = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
      dialog.querySelector('[data-app-help]').textContent = installation
        ? (ios ? 'En iPhone o iPad, abre este sitio en Safari. Pulsa Compartir y elige Añadir a pantalla de inicio. Confirma con Añadir.'
          : 'Abre el menú de tu navegador y busca Instalar app o Añadir a pantalla de inicio. Si no aparece, puedes seguir usando el sitio desde el navegador.')
        : 'Comparte el portal institucional de Nueva Voz Colectiva.';
      status.textContent = '';
      dialog.showModal();
    }
    async function share(){
      if(typeof navigator.share !== 'function'){ openHelp(false); return; }
      try { await navigator.share({title:'Nueva Voz Colectiva',text:shareText,url:appURL}); }
      catch(error){
        if(error.name !== 'AbortError'){
          if(!dialog.open) openHelp(false);
          status.textContent = 'No fue posible abrir las aplicaciones. Puedes usar WhatsApp o copiar el enlace.';
        }
      }
    }
    document.addEventListener('click', async event => {
      const button = event.target.closest('[data-app-install],[data-app-share],[data-app-update]');
      if(!button) return;
      if(button.hasAttribute('data-app-share')){ openHelp(false); return; }
      if(button.hasAttribute('data-app-update')){
        if(waitingWorker){ updateRequested = true; waitingWorker.postMessage({type:'NVC_SKIP_WAITING'}); }
        return;
      }
      if(isInstalled()) return;
      if(!installPrompt){ openHelp(true); return; }
      const prompt = installPrompt; installPrompt = null;
      button.disabled = true;
      try { await prompt.prompt(); await prompt.userChoice; }
      catch { openHelp(true); }
      finally { button.disabled = false; syncAppButtons(); }
    });
    nativeButton.addEventListener('click',share);
    dialog.querySelector('[data-app-copy]').addEventListener('click',async()=>{
      try {
        if(!navigator.clipboard) throw new Error('Clipboard unavailable');
        await navigator.clipboard.writeText(appURL);
        status.textContent = 'Enlace copiado.';
      } catch {
        const input = dialog.querySelector('input'); input.focus(); input.select();
        status.textContent = 'Selecciona y copia el enlace mostrado con las opciones de tu dispositivo.';
      }
    });
    dialog.querySelector('[data-app-close]').addEventListener('click',()=>dialog.close());
    // Native dialog.close() restores focus to the invoking control.
    syncAppButtons();
    if('serviceWorker' in navigator && window.isSecureContext){
      navigator.serviceWorker.addEventListener('controllerchange',()=>{ if(updateRequested) location.reload(); });
      navigator.serviceWorker.register(new URL('sw.js',appRoot),{scope:appRoot.href,updateViaCache:'none'}).then(registration=>{
        const showUpdate = () => { waitingWorker = registration.waiting; syncAppButtons(); };
        showUpdate();
        registration.addEventListener('updatefound',()=>{
          const worker = registration.installing;
          if(worker) worker.addEventListener('statechange',()=>{
            if(worker.state === 'installed' && navigator.serviceWorker.controller) showUpdate();
          });
        });
        registration.update().catch(()=>{}); // Offline is expected; retry on the next online visit.
      }).catch(()=>{}); // Keep navigation and browser installation available if registration fails.
    }
  }

  const ICONS = {
    inicio:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 11 12 4l8 7"/><path d="M6 10v9h12v-9"/></svg>',
    quienes: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="8" r="3.4"/><path d="M5 20c1.2-4 4-6 7-6s5.8 2 7 6"/></svg>',
    programas:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 6h16M4 12h16M4 18h10"/></svg>',
    proyectos:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="4" y="4" width="7" height="7" rx="1"/><rect x="13" y="4" width="7" height="7" rx="1"/><rect x="4" y="13" width="7" height="7" rx="1"/><rect x="13" y="13" width="7" height="7" rx="1"/></svg>',
    impacto: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 20V10M12 20V4M20 20v-7"/></svg>',
    biblioteca:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 5.5C6 4.5 9 4.5 11 5.5v14C9 18.5 6 18.5 4 19.5z"/><path d="M20 5.5c-2-1-5-1-7 0v14c2-1 5-1 7 0z"/></svg>',
    eventos: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 9h16M8 3v4M16 3v4"/></svg>',
    participa:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 21s-7-4.8-9.4-9A5.4 5.4 0 0 1 12 6a5.4 5.4 0 0 1 9.4 6c-2.4 4.2-9.4 9-9.4 9z"/></svg>',
    cooperacion:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a13 13 0 0 1 0 18 13 13 0 0 1 0-18z"/></svg>',
    transparencia:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 3 4 6.5V12c0 5 3.4 8.6 8 9 4.6-.4 8-4 8-9V6.5z"/></svg>',
    prensa:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="6" width="14" height="13" rx="1"/><path d="M17 9h4v9a2 2 0 0 1-2 2H7"/><path d="M6 10h8M6 13h8M6 16h5"/></svg>',
    contacto:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 6 8 7 8-7"/></svg>'
  };

  const SITE_MAP = [
    { key:'inicio', label:'Inicio', href:'index.html', icon:'inicio' },
    { key:'quienes', label:'Quiénes Somos', href:'quienes-somos.html', icon:'quienes' },
    { key:'programas', label:'Programas', href:'programas/index.html', icon:'programas',
      feature:{ eyebrow:'Programa destacado', title:'Liderazgo Ciudadano', text:'Formación de liderazgos territoriales para la incidencia pública.', href:'programas/liderazgo-ciudadano.html' },
      children:[
        { label:'Liderazgo Ciudadano', href:'programas/liderazgo-ciudadano.html', desc:'Formación de liderazgos territoriales' },
        { label:'Educación Cívica', href:'programas/educacion-civica.html', desc:'Cultura democrática y participación' },
        { label:'Participación Ciudadana', href:'programas/participacion-ciudadana.html', desc:'Mecanismos de incidencia pública' },
        { label:'Desarrollo Territorial', href:'programas/desarrollo-territorial.html', desc:'Fortalecimiento de comunidades' },
        { label:'Cooperación', href:'programas/cooperacion.html', desc:'Alianzas para el desarrollo' },
      ]},
    { key:'proyectos', label:'Proyectos', href:'proyectos/index.html', icon:'proyectos',
      children:[
        { label:'Todos los proyectos', href:'proyectos/index.html', desc:'Portafolio completo' },
        { label:'Proyecto piloto territorial', href:'proyectos/proyecto-piloto-territorial.html', desc:'Ficha de proyecto — ejemplo' },
      ]},
    { key:'impacto', label:'Impacto', href:'impacto.html', icon:'impacto' },
    { key:'biblioteca', label:'Biblioteca', href:'biblioteca/index.html', icon:'biblioteca',
      children:[
        { label:'Guías', href:'biblioteca/index.html#guias', desc:'Material práctico' },
        { label:'Publicaciones', href:'biblioteca/index.html#publicaciones', desc:'Artículos y ensayos' },
        { label:'Informes', href:'biblioteca/index.html#informes', desc:'Informes institucionales' },
        { label:'Estudios', href:'biblioteca/index.html#estudios', desc:'Investigación aplicada' },
      ]},
    { key:'eventos', label:'Eventos', href:'eventos.html', icon:'eventos' },
    { key:'participa', label:'Participa', href:'participa.html', icon:'participa' },
    { key:'cooperacion', label:'Cooperación Internacional', href:'cooperacion-internacional.html', icon:'cooperacion' },
    { key:'transparencia', label:'Transparencia', href:'transparencia.html', icon:'transparencia' },
    { key:'prensa', label:'Sala de Prensa', href:'sala-de-prensa.html', icon:'prensa' },
    { key:'contacto', label:'Contacto', href:'contacto.html', icon:'contacto' },
  ];
  window.NVC_SITE_MAP = SITE_MAP;

  function base(){ return document.body.getAttribute('data-base') || './'; }
  function url(href){ return base() + href; }

  function renderHeader(){
    const mount = document.getElementById('nvc-header');
    if(!mount) return;
    const current = document.body.getAttribute('data-page');
    const primary = SITE_MAP.filter(i=>['inicio','quienes','programas','proyectos','impacto','biblioteca'].includes(i.key)
      .valueOf() || true).slice(0,9);
    const navItems = SITE_MAP.map(item=>{
      const activeCls = item.key===current ? ' active':'';
      if(item.children){
        const cols = `
          <div class="megamenu-col">
            <h6 class="cond">${item.label}</h6>
            <ul class="megamenu-links">
              ${item.children.map(c=>`<li><a href="${url(c.href)}">${c.label}<small>${c.desc}</small></a></li>`).join('')}
            </ul>
          </div>
          ${item.feature?`<div class="megamenu-feature">
            <span class="eyebrow">${item.feature.eyebrow}</span>
            <h4>${item.feature.title}</h4>
            <p>${item.feature.text}</p>
            <a class="btn btn-secondary btn-sm" href="${url(item.feature.href)}">Ver programa</a>
          </div>`:'<div></div>'}
        `;
        return `<div class="nvc-nav-item${activeCls}">
          <button type="button" aria-haspopup="true">${item.label}
            <svg viewBox="0 0 12 8" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M1 1l5 5 5-5"/></svg>
          </button>
          <div class="megamenu">${cols}</div>
        </div>`;
      }
      return `<div class="nvc-nav-item${activeCls}"><a href="${url(item.href)}">${item.label}</a></div>`;
    }).join('');

    mount.innerHTML = `
      <div class="nvc-header-in">
        <a class="nvc-brand" href="${url('index.html')}">
          <img src="${base()}assets/logo/nvc-logo-oficial.png" alt="Nueva Voz Colectiva">
        </a>
        <nav class="nvc-nav" aria-label="Navegación principal">${navItems}${appActions()}</nav>
        <div class="nvc-actions">
          <div class="lang-switch"><button class="active">ES</button><button>EN</button></div>
          <a class="btn btn-primary btn-sm" href="${url('participa.html')}">Participa</a>
          <button class="nvc-burger" aria-label="Abrir menú" id="nvc-burger-btn"><span></span></button>
        </div>
      </div>`;

    // drawer
    const drawer = document.createElement('div');
    drawer.className = 'nvc-drawer';
    drawer.id = 'nvc-drawer';
    drawer.innerHTML = `
      <div class="nvc-drawer-in">
        <div class="nvc-drawer-top">
          <span class="cond" style="text-transform:uppercase;letter-spacing:.1em;font-weight:700;font-size:13px">Menú</span>
          <button class="nvc-drawer-close" id="nvc-drawer-close" aria-label="Cerrar">&times;</button>
        </div>
        ${appActions()}
        ${SITE_MAP.map(item=>{
          if(item.children){
            return `<details><summary>${item.label} <span>+</span></summary>
              <ul class="sub-links">${item.children.map(c=>`<li><a href="${url(c.href)}">${c.label}</a></li>`).join('')}</ul>
            </details>`;
          }
          return `<a href="${url(item.href)}">${item.label}</a>`;
        }).join('')}
      </div>`;
    document.body.appendChild(drawer);
    document.getElementById('nvc-burger-btn').addEventListener('click', ()=>drawer.classList.add('open'));
    document.getElementById('nvc-drawer-close').addEventListener('click', ()=>drawer.classList.remove('open'));
  }

  function renderFooter(){
    const mount = document.getElementById('nvc-footer');
    if(!mount) return;
    const cols = [
      { title:'Programas', items: SITE_MAP.find(i=>i.key==='programas').children.slice(0,5) },
      { title:'Biblioteca', items: SITE_MAP.find(i=>i.key==='biblioteca').children },
      { title:'Institucional', items: [
          {label:'Quiénes Somos', href:'quienes-somos.html'},
          {label:'Impacto', href:'impacto.html'},
          {label:'Transparencia', href:'transparencia.html'},
          {label:'Información jurídica', href:'transparencia.html#identidad-juridica'},
          {label:'Sala de Prensa', href:'sala-de-prensa.html'},
        ]},
      { title:'Comunidad', items:[
          {label:'Eventos', href:'eventos.html'},
          {label:'Participa', href:'participa.html'},
          {label:'Cooperación Internacional', href:'cooperacion-internacional.html'},
          {label:'Contacto', href:'contacto.html'},
        ]},
    ];
    mount.innerHTML = `
      <div class="wrap">
        <div class="nvc-footer-top">
          <div class="nvc-footer-brand">
            <img src="${base()}assets/logo/nvc-logo-oficial.png" alt="Nueva Voz Colectiva">
            <p>Portal institucional de Nueva Voz Colectiva Ecosystem — ciudadanía, liderazgo y desarrollo territorial.</p>
          </div>
          ${cols.map(c=>`<div><h6 class="cond">${c.title}</h6><ul>${c.items.map(i=>`<li><a href="${url(i.href)}">${i.label}</a></li>`).join('')}</ul></div>`).join('')}
        </div>
        <div class="nvc-footer-bottom">
          <span>© ${new Date().getFullYear()} Nueva Voz Colectiva Ecosystem. Todos los derechos reservados.</span>
          <a href="${url('design-system/index.html')}" style="color:rgba(255,255,255,.5)">Sistema de Diseño</a>
        </div>
      </div>`;
  }

  function renderBreadcrumb(){
    const mount = document.getElementById('nvc-breadcrumb');
    if(!mount) return;
    let trail;
    try{ trail = JSON.parse(mount.getAttribute('data-trail') || '[]'); }catch(e){ trail=[]; }
    const items = [{label:'Inicio', href:'index.html'}].concat(trail);
    mount.innerHTML = items.map((it,i)=>{
      const isLast = i===items.length-1;
      return (i>0?'<span class="sep">/</span>':'') + (isLast
        ? `<span class="current">${it.label}</span>`
        : it.href
          ? `<a href="${url(it.href)}">${it.label}</a>`
          : `<span>${it.label}</span>`);
    }).join('');
  }

  document.addEventListener('DOMContentLoaded', function(){
    renderHeader();
    renderFooter();
    renderBreadcrumb();
    setupApp();
  });
})();
