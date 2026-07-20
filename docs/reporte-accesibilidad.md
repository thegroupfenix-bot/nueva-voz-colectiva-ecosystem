# Reporte de Accesibilidad — Nueva Voz Colectiva

## Verificado y corregido en esta fase
- **Texto alternativo**: se corrigieron todas las imágenes con `alt=""` o sin atributo `alt` (11 instancias, principalmente logotipo en plantillas de marca). 100% de las imágenes del portal tienen `alt` descriptivo.
- **Foco visible**: `:focus-visible` global con contorno de 2px en color pátina (`--nvc-patina-deep`) — nunca se remueve sin reemplazo.
- **Contraste de color**: paleta verificada —
  - Texto navy (#16293F) sobre crema (#F4F1EA): contraste alto, apto para cuerpo de texto.
  - Blanco sobre navy: contraste alto, apto para hero y footer.
  - Cobre (#B0783F) sobre blanco: usado solo en textos grandes/eyebrow (≥14px bold), no en párrafos de lectura extensa.
- **Etiquetas de formulario**: todo `<input>`/`<select>`/`<textarea>` tiene `<label class="field-label">` asociado visualmente; recomendación técnica en el handoff de usar `for`/`id` al conectar a backend real.
- **Landmarks**: `<header>`, `<nav>`, `<footer>` semánticos en todas las páginas; breadcrumb con `aria-label`.
- **Navegación por teclado**: mega-menú se abre también por `:focus-within`, no solo `:hover` — operable con Tab.
- **Reduced motion**: las animaciones de entrada del hero están condicionadas a `@media (prefers-reduced-motion: no-preference)` — usuarios con esa preferencia no reciben movimiento.

## Pendiente / recomendación para la fase de contenido
- Cuando se integren imágenes reales (fotografías institucionales, íconos de aliados), definir `alt` descriptivo específico por imagen — no genérico.
- Verificar contraste una vez que se definan combinaciones de color en fotografías/overlays reales.
- Considerar `aria-current="page"` en el ítem de navegación activo (mejora menor, no bloqueante).
