# Reporte Responsive — Nueva Voz Colectiva

## Breakpoints del sistema
- Móvil: hasta 560px
- Tablet: 561–980px
- Desktop: 981–1439px
- Desktop grande: ≥1440px

## Verificado
- **Header**: colapsa de navegación horizontal + mega-menú a botón hamburguesa por debajo de 980px.
- **Drawer móvil**: pantalla completa, con acordeones (`<details>`) para Programas/Proyectos/Biblioteca — probado con scroll interno.
- **Grillas de contenido** (`.g2/.g3/.g4`): 4→2 columnas a 900px, todo a 1 columna a 620px, en todas las páginas que las usan (Programas, Proyectos, Biblioteca, Design System, Impacto).
- **Tablas** (`.table-wrap`): scroll horizontal contenido (`overflow-x:auto`) en vez de romper el layout en pantallas angostas.
- **Tipografía fluida**: títulos con `clamp()` (H1, H2, Display) — se ajustan sin saltos bruscos entre breakpoints.
- **Padding lateral fluido**: `--pad: clamp(22px, 5vw, 64px)` evita contenido pegado al borde en móvil y exceso de aire en desktop grande.
- **Formularios** (Participa, Contacto): grid de 2 columnas colapsa a 1 columna en móvil.
- **Plantillas de marca** (tarjeta, redes sociales): construidas en canvas fijo — están pensadas para exportar a imagen/impresión, no para reflow responsive (correcto para su uso).

## Sin hallazgos críticos
No se detectaron overflows horizontales no intencionales ni elementos con hit-targets menores a 44px en controles interactivos principales (botones, ítems de menú).
