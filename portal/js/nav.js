/* ============================================================
   NVC — NAVEGACIÓN: sitemap único, header + mega-menú + footer +
   breadcrumb + drawer móvil. Arquitectura escalable: agregar una
   página nueva = agregar una fila a SITE_MAP. No tocar el resto.
   ============================================================ */
(function(){
  const HUMANITARIAN_CAMPAIGN_ACTIVE = true;
  const HUMANITARIAN_CAMPAIGN_SESSION_KEY = 'nvc-humanitarian-campaign-dismissed';

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
        <nav class="nvc-nav">${navItems}</nav>
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

  function renderHumanitarianCampaignAlert(){
    const isCampaignPage = document.body.getAttribute('data-page') === 'ayuda-humanitaria'
      || /\/ayuda-humanitaria\.html$/i.test(window.location.pathname);
    let dismissed = false;

    try{
      dismissed = window.sessionStorage.getItem(HUMANITARIAN_CAMPAIGN_SESSION_KEY) === 'true';
    }catch(e){
      dismissed = false;
    }

    if(!HUMANITARIAN_CAMPAIGN_ACTIVE || isCampaignPage || dismissed) return;

    const alert = document.createElement('div');
    alert.className = 'humanitarian-campaign-alert';
    alert.hidden = true;
    alert.innerHTML = `
      <button class="humanitarian-campaign-alert-backdrop" type="button" tabindex="-1" aria-label="Cerrar alerta de campaña"></button>
      <section class="humanitarian-campaign-alert-panel" role="dialog" aria-modal="true" aria-labelledby="humanitarian-campaign-alert-title" aria-describedby="humanitarian-campaign-alert-description">
        <button class="humanitarian-campaign-alert-close" type="button" aria-label="Cerrar alerta">&times;</button>
        <div class="humanitarian-campaign-alert-brand">
          <img class="humanitarian-campaign-alert-logo" src="${base()}assets/logo/nvc-logo-oficial.png" alt="Nueva Voz Colectiva">
          <span>CAMPAÑA ACTIVA</span>
        </div>
        <div class="humanitarian-campaign-alert-icon" aria-hidden="true">
          <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M16 28S5 21.2 5 12.8A6.8 6.8 0 0 1 16 7.5a6.8 6.8 0 0 1 11 5.3C27 21.2 16 28 16 28Z"/><path d="M16 10v11M10.5 15.5h11"/></svg>
        </div>
        <p class="humanitarian-campaign-alert-eyebrow">Alerta humanitaria</p>
        <h2 id="humanitarian-campaign-alert-title">VALLE SOLIDARIO</h2>
        <p class="humanitarian-campaign-alert-lead">Tu ayuda puede llegar hoy a una familia que la necesita.</p>
        <p class="humanitarian-campaign-alert-copy" id="humanitarian-campaign-alert-description">Estamos recibiendo alimentos, agua, elementos de higiene, productos para bebés, colchonetas y apoyo para mascotas.</p>
        <div class="humanitarian-campaign-alert-actions">
          <a class="btn btn-primary" href="/ayuda-humanitaria.html">QUIERO AYUDAR</a>
          <a class="btn btn-outline" href="https://wa.me/573013887972?text=Hola.%20Deseo%20realizar%20una%20donaci%C3%B3n%20para%20la%20campa%C3%B1a%20de%20ayuda%20humanitaria%20de%20Nueva%20Voz%20Colectiva%20y%20necesito%20solicitar%20recolecci%C3%B3n%20a%20domicilio." target="_blank" rel="noopener">SOLICITAR RECOLECCIÓN</a>
        </div>
        <p class="humanitarian-campaign-alert-motto">42 municipios. Un mismo corazón.</p>
      </section>`;

    document.body.appendChild(alert);

    const panel = alert.querySelector('.humanitarian-campaign-alert-panel');
    const closeButton = alert.querySelector('.humanitarian-campaign-alert-close');
    const backdrop = alert.querySelector('.humanitarian-campaign-alert-backdrop');
    const actionLinks = alert.querySelectorAll('.humanitarian-campaign-alert-actions a');
    let previousFocus = null;
    let open = false;

    function saveDismissal(){
      try{
        window.sessionStorage.setItem(HUMANITARIAN_CAMPAIGN_SESSION_KEY, 'true');
      }catch(e){ /* sessionStorage can be unavailable in restricted contexts */ }
    }

    function closeAlert(restoreFocus = true){
      if(!open) return;
      open = false;
      saveDismissal();
      alert.classList.remove('is-open');
      document.body.classList.remove('humanitarian-campaign-alert-open');
      window.setTimeout(function(){ alert.hidden = true; }, 220);
      if(restoreFocus && previousFocus instanceof HTMLElement && previousFocus.isConnected){
        previousFocus.focus();
      }
    }

    function handleKeydown(event){
      if(!open) return;
      if(event.key === 'Escape'){
        event.preventDefault();
        closeAlert();
        return;
      }
      if(event.key !== 'Tab') return;
      const focusable = Array.from(panel.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'));
      if(!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if(event.shiftKey && document.activeElement === first){
        event.preventDefault();
        last.focus();
      }else if(!event.shiftKey && document.activeElement === last){
        event.preventDefault();
        first.focus();
      }
    }

    function openAlert(){
      if(open) return;
      previousFocus = document.activeElement;
      alert.hidden = false;
      document.body.classList.add('humanitarian-campaign-alert-open');
      window.requestAnimationFrame(function(){
        alert.classList.add('is-open');
        open = true;
        closeButton.focus();
      });
    }

    closeButton.addEventListener('click', function(){ closeAlert(); });
    backdrop.addEventListener('click', function(){ closeAlert(); });
    actionLinks.forEach(function(link){ link.addEventListener('click', saveDismissal); });
    document.addEventListener('keydown', handleKeydown);
    window.setTimeout(openAlert, 2500);
  }

  document.addEventListener('DOMContentLoaded', function(){
    renderHeader();
    renderFooter();
    renderBreadcrumb();
    renderHumanitarianCampaignAlert();
  });
})();
