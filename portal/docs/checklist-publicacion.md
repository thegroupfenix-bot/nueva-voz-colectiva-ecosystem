# Checklist de Publicación — Hostinger

## Antes de subir
- [x] Confirmar el dominio oficial `https://corporacionnuevavozcolectiva.org` en:
      `sitemap.xml`, `robots.txt`, y los metadatos `og:url`, `og:image`, `twitter:url` y `twitter:image`.
- [ ] Confirmar que el contenido institucional definitivo ya fue integrado (reemplazo de `.placeholder-block`), si esta publicación es la versión final de contenido.
- [ ] Revisar textos de contacto (`contacto.html`, footer) con los correos/teléfonos reales de la organización.

## Subida a Hostinger
- [ ] Subir el contenido completo de la carpeta `NVC-Portal/` a `public_html/` (o al subdominio correspondiente) vía el Administrador de Archivos o FTP.
- [ ] Verificar que `index.html` quede en la raíz de `public_html/` (no dentro de una subcarpeta `NVC-Portal/`) para que el dominio cargue el Inicio directamente.
- [ ] Confirmar que las carpetas `css/`, `js/`, `assets/`, `programas/`, `proyectos/`, `biblioteca/`, `design-system/`, `templates/` se suban completas y con esa misma estructura.

## Después de publicar
- [ ] Verificar carga de `index.html` y navegación completa en el dominio real (desktop y móvil).
- [ ] Confirmar que `favicon`, `apple-touch-icon` y `site.webmanifest` cargan correctamente en el dominio real.
- [ ] Enviar `sitemap.xml` a Google Search Console / Bing Webmaster Tools.
- [ ] Verificar certificado SSL activo (candado en el navegador) — Hostinger lo activa automáticamente con Let's Encrypt.
- [ ] Probar el formulario de Participa/Contacto una vez conectado a un backend/servicio de envío real (actualmente son formularios de maqueta, `onsubmit="return false"`).

## No incluido en esta versión (por diseño, según alcance aprobado)
- Módulos reservados: Campus, Observatorio, Certificaciones, Comunidad — no están en el sitemap ni en la navegación.
- Contenido institucional definitivo — placeholders claramente marcados en espera del material oficial.
- Conexión real de formularios a un servicio de envío de correo o CRM.
