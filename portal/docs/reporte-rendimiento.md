# Reporte de Rendimiento — Nueva Voz Colectiva

## Optimizaciones aplicadas
- **Fuentes**: Google Fonts cargadas con `preconnect` a `fonts.googleapis.com` y `fonts.gstatic.com`, y `display=swap` — el texto nunca queda invisible esperando la fuente (evita FOIT).
- **Preload del logotipo**: `<link rel="preload" as="image">` en las 20 páginas principales — el único activo de marca que aparece en cada carga (header) se prioriza.
- **CSS modular sin duplicación**: 4 archivos (`tokens.css`, `base.css`, `layout.css`, `components.css`) compartidos por las 24 páginas vía `<link>` — se cachean una sola vez en todo el sitio.
- **JS mínimo y compartido**: un solo `js/nav.js` (sin dependencias externas, sin framework) genera header/footer/breadcrumb — se cachea igual que el CSS.
- **Sin imágenes pesadas de relleno**: las secciones sin material fotográfico real usan bloques de marcador de posición ligeros (CSS), no imágenes de stock que inflarían el peso de página.
- **SVG de iconos inline**: los 12 íconos de navegación son SVG inline (sin petición de red adicional, sin fuente de íconos externa).

## Recomendación para la fase de contenido/publicación
- Al incorporar fotografías institucionales reales, servirlas en WebP con fallback, y en el ancho máximo real de uso (evitar imágenes de resolución completa en tarjetas pequeñas).
- Activar compresión Gzip/Brotli y cache de archivos estáticos a nivel de servidor en Hostinger (configuración de hosting, no de código).
- Si el volumen de páginas de Biblioteca/Proyectos crece significativamente, considerar paginación real (el componente de paginación visual ya existe en el Design System).
