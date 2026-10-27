# Identidad jurídica — entrega para revisión

Fecha: 27 de octubre de 2026. Rama: `codex/identidad-juridica`.

Validación final: ver `VALIDACION-FINAL.md`. Se confirmó una limitación preexistente en el envío de Contacto y Participa; el usuario autorizó el commit y PR con esta limitación documentada y manteniendo intactos ambos formularios.

La implementación está terminada y los nueve datos están contrastados con los documentos aportados. Las capturas se actualizaron sin la nota de verificación pendiente. El conjunto está autorizado para commit y Pull Request, sin fusión ni publicación. Se conservan los cambios de la tarea anterior y el cierre de Valle Solidario, conforme a la confirmación del usuario. La publicación sigue pendiente de aprobación.

## Implementación

- Transparencia incorpora «NUESTRA IDENTIDAD JURÍDICA», con los tres párrafos proporcionados y la tarjeta «UNA CORPORACIÓN LEGALMENTE CONSTITUIDA».
- Incluye los nueve datos suministrados: razón social, naturaleza jurídica, NIT, domicilio, inscripción, representante legal, vigilancia y ambos CIIU.
- Tarjeta blanca, fondo papel, títulos azul institucional y acentos cobre/dorado de la paleta existente. Sin escudos, iconos ni marcas inventadas.
- Espacios para existencia y representación legal, estatutos e informes: identificados como publicación pendiente, sin descargas ficticias.
- Referencia discreta en Quiénes Somos y acceso «Información jurídica» en el pie compartido, también funcional desde subdirectorios.
- No se agregaron documentos completos ni datos personales adicionales. No se afirma pertenencia al Régimen Tributario Especial.

Archivos de esta tarea: `portal/transparencia.html`, `portal/quienes-somos.html`, `portal/js/nav.js` (una entrada adicional en el pie) y el nuevo `portal/css/identidad-juridica.css`. Los demás cambios que muestra Git pertenecen a la tarea anterior.

## Verificación documental completada

El 27 de octubre de 2026 se contrastó la información con los dos PDF proporcionados por el usuario, mediante extracción de texto y revisión visual de las páginas relevantes. Fuentes originales, conservadas fuera del repositorio y de la carpeta pública:

- `CAMARA DE COMERCIO NUEVA VOZ COLECTIVA.pdf`: certificado de existencia y representación legal de la Cámara de Comercio de Tuluá, expedido el 23/10/2026, seis páginas. Original aportado por el usuario, no incluido en este repositorio.
- `RUT NUEVA VOZ COLECTIVA.pdf`: RUT de la DIAN, generado el 23/10/2026, cuatro páginas. Original aportado por el usuario, no incluido en este repositorio.

| Dato | Valor contrastado | Evidencia |
|---|---|---|
| Razón social | CORPORACION NUEVA VOZ COLECTIVA | Cámara p. 1; RUT p. 1, campo 35 |
| Naturaleza | Entidad sin ánimo de lucro | Cámara p. 1, Constitución y registro ESAL |
| NIT | 902119662-0 | Cámara p. 1; RUT p. 1, campos 5 y 6 |
| Domicilio | Tuluá, Valle del Cauca, Colombia | Cámara p. 1; RUT p. 1, campos 38–40 |
| Inscripción | 22 de octubre de 2026 | Cámara p. 1; RUT p. 2, campo 76 |
| Representante legal | Misael Valencia Barahona | Cámara p. 4; RUT p. 3, representante principal |
| Inspección, vigilancia y control | Gobernación del Valle del Cauca | Cámara p. 1; el campo 88 del RUT está vacío |
| CIIU principal | 9499 | Cámara p. 5 (S9499); RUT p. 1, campo 46 (9499) |
| CIIU secundario | 8899 | Cámara p. 5 (Q8899); RUT p. 1, campo 48 (8899) |

No se encontraron discrepancias en los nueve datos. Se conserva la denominación «Inscripción en Cámara de Comercio»: el documento privado constitutivo está fechado el 30/09/2026, mientras que su inscripción es del 22/10/2026. La página no presenta esta última como fecha del documento constitutivo.

El RUT p. 1 registra la responsabilidad 05, impuesto de renta y complementarios del régimen ordinario. No acredita calificación en el Régimen Tributario Especial; no se agregó esa afirmación ni información tributaria adicional al sitio.

Alcance: cotejo con el contenido de los archivos aportados y su fecha de expedición; no constituye una validación criptográfica de firmas ni consulta registral en línea. Se retiraron la nota visible de verificación pendiente y su estilo; el comentario HTML registra la fecha y fuentes del cotejo. No se incorporaron al sitio los PDF, las imágenes temporales de sus páginas, identificaciones personales, direcciones particulares, firmas ni códigos de verificación. Los espacios para futuras versiones públicas de documentos permanecen como publicación pendiente.

## Validación

Chrome con Playwright, a 1440 × 900, 1920 × 1080 y 390 × 844:

- Sin errores de consola ni JavaScript en las páginas recorridas.
- Sin desbordamiento horizontal en Transparencia ni Quiénes Somos.
- Texto institucional a 16 px; tarjeta y campos se adaptan a una columna en móvil.
- Logotipos de Transparencia idénticos antes/después: encabezado de 56 px en escritorio y 50 px en móvil; pie de 110 px. Mismo PNG oficial de 648 × 1032 y proporciones intactas. No hay SVG oficial disponible en el repositorio.
- Enlaces desde Nosotros y pie comprobados, incluyendo el pie de `programas/index.html`.
- Comparación SHA-256: 61 archivos protegidos permanecen sin cambios respecto al inicio de esta tarea. Incluye Home, estilos previos, campaña cerrada, programas, proyectos, formularios, imágenes y colores.
- `node --check portal/js/nav.js` y `git diff --check`: correctos.

Se inspeccionaron visualmente las capturas de identidad jurídica en escritorio y móvil, el pie de escritorio y la página completa de Transparencia en móvil. Evidencia y script reproducible: `resultados.json`, `validar.cjs`, `antes-hashes.json`. La carpeta `antes/` conserva los tres archivos modificados tal como estaban al iniciar esta tarea.

## Capturas

| Vista | Escritorio 1440 | Escritorio 1920 | Móvil 390 |
|---|---|---|---|
| Nueva sección | [Ver](identidad-1440x900.png) | [Ver](identidad-1920x1080.png) | [Ver](identidad-390x844.png) |
| Transparencia completa | [Ver](transparencia-1440x900.png) | [Ver](transparencia-1920x1080.png) | [Ver](transparencia-390x844.png) |
| Pie de página | [Ver](pie-1440x900.png) | [Ver](pie-1920x1080.png) | [Ver](pie-390x844.png) |
| Referencia en Nosotros | [Ver](nosotros-1440x900.png) | [Ver](nosotros-1920x1080.png) | [Ver](nosotros-390x844.png) |
