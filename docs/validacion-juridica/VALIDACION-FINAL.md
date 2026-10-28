# Validación final previa al commit y Pull Request

Fecha: 27 de octubre de 2026. Rama: `codex/identidad-juridica`.

**Resultado: validación técnica y documental satisfactoria salvo el envío de formularios, que tiene una limitación preexistente. El usuario autorizó posteriormente crear el commit y el PR con esta limitación documentada, sin modificar los formularios.** La fusión y el despliegue no están autorizados. No se repitieron las validaciones jurídicas aprobadas para preparar el PR.

## Resultados

| Comprobación | Resultado |
|---|---|
| Nueve datos jurídicos | Coinciden con los PDF de Cámara de Comercio y RUT aportados, ambos expedidos/generados el 23/10/2026. Se repitió el cotejo de los nueve campos. La matriz de fuentes y páginas está en `INFORME.md`. |
| Personería jurídica y NIT | Visibles en Transparencia, sección Nuestra identidad jurídica. Se comprobaron el texto y la visibilidad del NIT. |
| Fechas | 22/10/2026 corresponde a inscripción; el documento constitutivo es del 30/09/2026. La etiqueta web mantiene esa distinción. |
| Régimen tributario | No se afirma pertenencia al RTE. El RUT aportado indica régimen ordinario. |
| Logotipos | Mismo archivo oficial y proporciones. En Transparencia se compararon dimensiones antes/después: 56 px de alto en escritorio, 50 px en móvil y 110 px en pie. El Home conserva 75 px en escritorio y 60 px en móvil. |
| Preservación | 61 archivos protegidos idénticos mediante SHA-256 respecto al inicio de la integración jurídica, incluidos Home, programas, proyectos, campaña cerrada, formularios, imágenes y colores. |
| Campaña del terremoto | Desactivada. Home sin franja ni popup; navegación sin enlaces a la campaña; URL antigua con aviso de cierre, sin formulario ni enlace de WhatsApp. Copia histórica conservada. |
| Escritorio y móvil | Home y páginas de identidad a 1440 × 900, 1920 × 1080 y 390 × 844: sin desbordamientos horizontales en los controles ejecutados. Contacto y Participa también comprobados a 390 × 844. |
| Navegación | Recorrido de las 25 páginas HTML y sus enlaces internos sin respuestas HTTP de error. Acceso jurídico desde Nosotros y el pie, incluso en subdirectorios, correcto. Menú de programas funcional. |
| Consola | Sin errores en las comprobaciones de Home y páginas recorridas por los scripts. |
| Formularios | **No satisfactoria la entrega de mensajes.** Campos editables, pero el envío se cancela y no produce solicitudes de red. |
| Sintaxis y diff | `node --check portal/js/nav.js` y `git diff --check` correctos. |

## Impedimento confirmado: formularios sin envío

`portal/contacto.html` y `portal/participa.html` contienen `onsubmit="return false"`, sin atributo `action` ni servicio de envío conectado. En Chrome local se rellenaron los campos con datos de prueba y se pulsó Enviar: ambos eventos quedaron cancelados y se observaron cero solicitudes de red tras el clic. No se enviaron mensajes a terceros.

Los dos archivos son idénticos al commit de origen y a `origin/main`; esta limitación no fue introducida por Identidad Jurídica. Se conservaron intactos conforme a la instrucción de protección. Corregirlos requiere definir el servicio receptor y ampliar expresamente el alcance. El usuario autorizó el commit y PR con esta limitación declarada y solicitó una auditoría independiente, sin implementación de servicios ni cambios de credenciales.

## Alcance del PR

El conjunto aprobado incluye la integración jurídica y los ajustes anteriores de Home y cierre de campaña. Se conservan como conjunto para no reactivar la campaña al publicar en el futuro. La base local también contiene el commit `2001747` de finalización histórica de Valle Solidario, correspondiente al PR #9 aún abierto contra `main`; por eso el diff completo contra main incluye estilos y siete imágenes históricas de ese commit, que no fueron alterados por esta tarea. El nuevo PR documenta este solapamiento; no se fusiona ni se modifica el PR #9.

Referencias tras `git fetch origin`:

- HEAD: `2001747a1eb00986198ed8c635336db7a276b638`.
- `origin/main`: `7e158485d4fd633ce9cb7c0fbea93620e142be66`.
- `origin/production`: `62c62e74dc1d07512729639a30577b5fbf34417d`.

La autorización permite subir únicamente la rama de trabajo y abrir el PR. No permite modificar `main` ni `production`, fusionar o desplegar. No se incluyen PDF originales, documentos personales ni imágenes temporales del cotejo.

## Evidencia

- Identidad, preservación y formularios: `validar.cjs` y `resultados.json` en esta carpeta.
- Home y recorrido de enlaces: `../validacion-home/validar.cjs` y `../validacion-home/resultados.json`.
- Capturas renovadas de sección, Transparencia, pie y Nosotros: enlaces en `INFORME.md`.

La limitación de los formularios queda expresamente aceptada para abrir el PR jurídico. Su solución se propondrá fuera de este PR y requerirá aprobación antes de modificar el sistema.
