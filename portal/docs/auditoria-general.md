# Auditoría General del Portal — Nueva Voz Colectiva
Fecha de auditoría: v1.0 pre-producción
Alcance: NVC-Portal/ completo (24 páginas + sistema de diseño + plantillas)

## 1. Enlaces internos
- 24 archivos HTML auditados, 100% de los `href` internos resueltos correctamente.
- 0 enlaces rotos detectados (verificado programáticamente contra el árbol de archivos real).
- Rutas relativas (`./`, `../`) consistentes según profundidad de carpeta vía `data-base`.

## 2. Breadcrumbs
- Presentes en las 18 páginas de contenido público (no aplica en Inicio, que es la raíz).
- Generados dinámicamente desde `data-trail` en cada página — un solo punto de mantenimiento (`js/nav.js`).
- Jerarquía correcta: Inicio › Sección › Subpágina.

## 3. Mega menú
- Refleja el sitemap completo (12 secciones principales, 3 con submenú: Programas, Proyectos, Biblioteca).
- Estado hover y focus-within verificados; transición suavizada (opacity + translateY, 250ms) en esta fase.
- Columna de feature destacado en Programas funcional.

## 4. Footer
- 4 columnas de enlaces + marca + redes + línea legal, generado una sola vez desde `SITE_MAP`.
- Enlace a Sistema de Diseño presente para uso interno/handoff.

## 5. Navegación móvil
- Drawer de pantalla completa con acordeones para submenús (Programas, Proyectos, Biblioteca).
- Botón hamburguesa y cierre verificados; breakpoint de colapso: 980px.

## 6. Navegación desktop
- Header sticky con blur de fondo; estados activos por página (`data-page` ↔ `SITE_MAP` key) verificados en las 24 páginas.

## 7. Accesibilidad
- Ver `reporte-accesibilidad.md` para el detalle.

## 8. SEO técnico
- Ver `reporte-seo.md` para el detalle.

## 9. Rendimiento
- Ver `reporte-rendimiento.md` para el detalle.

## 10. Consistencia visual
- Un solo archivo de tokens (`css/tokens.css`) gobierna color, tipografía, espaciado, radios y sombras — cero valores hardcodeados fuera de ese archivo en componentes nuevos.
- Paleta de marca (Cobre/Pátina/Navy) aplicada de forma consistente; sin colores ajenos al sistema.
- Un único logotipo oficial (`assets/logo/nvc-logo-oficial.png`) en las 24 páginas — se eliminaron todas las variantes heredadas/duplicadas.

## 11. Tipografía
- Archivo (display/cuerpo) + Archivo Narrow (condensada, navegación/etiquetas) en toda la plataforma.
- Escala tipográfica documentada y respetada: Display, H1–H6, Body, Label, Caption.

## 12. Espaciados
- Escala de 4px (`--sp-1` … `--sp-10`) aplicada en todas las secciones y componentes.

## 13. Iconografía
- Set de 12 iconos de navegación (trazo 1.6px) documentado en el Design System, coherente con el trazo del logotipo.

## 14. Componentes reutilizables
- ~25 componentes documentados con estados (default/hover/focus/disabled/success/error) en `design-system/index.html`.
- Ningún estilo one-off fuera del sistema de componentes en las páginas de contenido.

## Mejoras aplicadas en esta fase (sin alterar arquitectura)
- Micro-interacciones: subrayado animado en nav activa, transición suave del mega-menú (antes era display:none/grid abrupto), leve zoom en imagen de card al hover, entrada suave del hero (respeta `prefers-reduced-motion`).
- SEO técnico completo (ver reporte aparte).
- Accesibilidad: alt text corregido en todas las imágenes.
- Rendimiento: preload del logotipo, `font-display:swap` ya presente en Google Fonts.

## Pendiente explícito (fuera de esta fase, por decisión del cliente)
- Contenido institucional definitivo (cifras, aliados, fechas, textos de misión/visión) — todos los bloques quedan marcados con `.placeholder-block` hasta recibir el material oficial.
- Módulos reservados (Campus, Observatorio, Certificaciones, Comunidad) — no activados, según instrucción explícita.
