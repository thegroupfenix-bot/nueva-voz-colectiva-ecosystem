# Home y cierre de Valle Solidario

Fecha: 26 de octubre de 2026. Rama: `codex/home-logo-cierre-campana`.

Cambios locales pendientes de aprobación; no se hicieron commit, push, Pull Request ni despliegue. El commit de origen permanece en `2001747a1eb00986198ed8c635336db7a276b638`.

## Cambios

- Logotipo del encabezado del Home: 75 px de altura en escritorio y 60 px en móvil, con ancho automático y proporciones originales. Se reutiliza `portal/assets/logo/nvc-logo-oficial.png` (648 × 1032). No existe versión horizontal oficial ni SVG en el repositorio; no se inventó una variante ni se remuestreó la imagen. El original tiene suavidad propia que este cambio no corrige. Para una identidad horizontal será necesario disponer del archivo oficial.
- Menú completo en el Home desde 1400 px, con columnas independientes para marca, navegación y acciones; menú desplegable en móvil. Los ajustes visuales se limitan al Home.
- Título principal: contenido intacto, interlineado más holgado y ajuste de palabras al ancho disponible, sin recorte.
- Retiradas la franja promocional y la generación global de la ventana emergente. La URL antigua muestra «Campaña finalizada», sin donaciones, recolección ni invitaciones. Se retiró del sitemap y tiene `noindex, follow`.
- Añadida en Impacto la reseña solicitada, con título y tres párrafos exactos, sin atribuir entregas, atención a damnificados ni operaciones.
- Copia completa recuperable del portal anterior en `docs/archivo/valle-solidario-antes-del-cierre-2026-10-26.zip`, fuera de la carpeta pública. Instrucciones en `docs/archivo/README.md`.

## Protección

Solo se modificaron seis archivos públicos: Home, estilos de layout, navegación compartida (retirada del popup), Impacto, página de campaña y sitemap. Se conservaron programas, proyectos, formularios, información jurídica, tokens de colores y todas las imágenes. No se eliminaron archivos originales. La retirada del popup se aplica a todas las páginas que cargan la navegación compartida.

## Validación local

Chrome automatizado con Playwright, fuentes cargadas y sesiones nuevas. Se esperó más que el retraso original del popup.

| Home | Logo | Título completo | Desbordamiento horizontal | Consola | Popup / enlaces de campaña |
|---|---|---|---|---|---|
| 1440 × 900 | 75 px | Sí | Ninguno | Sin errores | Ausentes |
| 1920 × 1080 | 75 px | Sí | Ninguno | Sin errores | Ausentes |
| 390 × 844 | 60 px | Sí | Ninguno | Sin errores | Ausentes |

Se revisaron visualmente las capturas de los tres tamaños y el menú móvil. Se comprobó la separación entre logo, menú y acciones, así como la apertura de Programas y la navegación a Liderazgo Ciudadano desde escritorio y móvil. Se recorrieron las 25 páginas HTML del portal y sus enlaces internos: sin enlaces rotos ni errores de consola/JavaScript, incluyendo programas y proyectos. La página de cierre no contiene formulario, modal ni enlaces de WhatsApp. `node --check portal/js/nav.js` y `git diff --check` pasaron.

Evidencia reproducible: `validar.cjs` y `resultados.json`. Capturas: `home-1440x900.png`, `home-1920x1080.png`, `home-390x844.png`, sus versiones de página completa y `menu-movil.png`.

Estas comprobaciones corresponden al servidor local, no a producción. Publicación pendiente de aprobación del usuario.
