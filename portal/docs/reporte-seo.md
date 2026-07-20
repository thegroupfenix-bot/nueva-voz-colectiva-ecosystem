# Reporte SEO Técnico — Nueva Voz Colectiva

## Implementado en esta fase
- **Title + meta description** únicos por página (ya existían, verificados).
- **Canonical** (`<link rel="canonical">`) configurado con el dominio oficial `https://corporacionnuevavozcolectiva.org`.
- **Open Graph** completo: `og:type`, `og:site_name`, `og:title`, `og:description`, `og:url`, `og:image`, `og:locale`.
- **Twitter Cards**: `summary_large_image` con título, descripción e imagen.
- **Imagen social (OG/Twitter)** diseñada a medida: `assets/og-image.png` (1200×630), con el logotipo oficial y jerarquía de marca.
- **theme-color** (`#16293F`) para barra de navegador en móvil.
- **apple-touch-icon** y **favicon** apuntando al logotipo oficial único.
- **site.webmanifest** (PWA-ready): nombre, colores, ícono 512×512.
- **sitemap.xml**: 18 URLs públicas indexables con prioridad y frecuencia de cambio.
- **robots.txt**: permite rastreo del sitio público, excluye `/design-system/` y `/templates/` (documentación interna y plantillas de marca, no contenido de cara al público).
- Páginas de `design-system/` marcadas `noindex, nofollow` — son documentación interna, no contenido institucional.

## Estructura semántica
- Un `<h1>` por página, jerarquía `h1 → h2 → h3` respetada en todas las secciones.
- `lang="es"` declarado en `<html>` en las 24 páginas.
- Breadcrumb como navegación semántica (no solo visual) con `aria-label="Breadcrumb"`.

## Verificación antes de publicar
1. Confirmar el dominio oficial en `sitemap.xml`, `robots.txt` y los metadatos sociales de cada página.
2. Si se registra Google Search Console / Bing Webmaster Tools, enviar `sitemap.xml` tras la publicación.
3. Cuando exista contenido institucional definitivo, revisar que las `meta description` sigan reflejando el contenido real de cada página.
