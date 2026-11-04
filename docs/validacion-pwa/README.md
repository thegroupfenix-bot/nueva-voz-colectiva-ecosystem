# Instalación y uso compartido PWA — 2026-11-03

## Auditoría y alcance
Base: main eda149345b9cd562951a4d6a9881f7a2e231039c. PR #11 intacto: b6b8b809daa80a5a28f3f059612138bc006b48de, abierto hacia production 62c62e7.
Se buscaron beforeinstallprompt, serviceWorker, appinstalled y navigator.share en los HTML/JS de todas las referencias remotas locales actualizadas con fetch. No hubo coincidencias. Solo existían site.webmanifest e iconos oficiales.
El sitio público sirve únicamente js/nav.js en Home, sin registro SW ni instalación propia; /sw.js y /service-worker.js responden 404. La invitación observada por el usuario es compatible con la interfaz nativa del navegador basada en el manifest. No se puede identificar con certeza ese aviso sin observar el dispositivo; no se añade otra ventana automática ni se cancela beforeinstallprompt.

## Cambios públicos (5 archivos)
- portal/js/nav.js: controles compartidos, instalación nativa cuando está disponible, instrucciones iPhone/otros navegadores, navigator.share, WhatsApp, copia con alternativa manual, detección standalone/appinstalled y actualización voluntaria.
- portal/css/layout.css: fila de controles sin superposición y diálogo accesible activado por el usuario. Colores y componentes existentes.
- portal/site.webmanifest: mismo id, nombre, colores e iconos; start_url y scope relativos a su ubicación. Soporta publicación en raíz o desarrollo bajo portal/.
- portal/sw.js: único service worker; registro relativo al script nav.js. Caché limitada a 100 recursos públicos, red primero y páginas visitadas disponibles offline. No almacena formularios, POST, consultas, documentos, credenciales ni terceros.
- portal/offline.html: respuesta para páginas no disponibles sin conexión. Base de enlaces ajustada por el worker incluso desde rutas internas.

No se modifican contenido institucional, identidad jurídica, imágenes, formularios, archivo histórico ni PR #11. Los blobs públicos protegidos de main coinciden con los equivalentes del PR #11. Las siete imágenes de categorías no se recrean.

## Pruebas reproducibles
Sin dependencias nuevas en el portal. El script utiliza Playwright del entorno de validación, Chrome instalado y Node.js:

    NODE_PATH=<directorio que contiene playwright> node docs/validacion-pwa/validate.cjs

Resultados en results.json y capturas PNG junto a este informe. Prueba automatizada real en Chrome sin interfaz: servidor local, manifest/iconos, registro/control del service worker, caché offline y actualización v1→v2 con limpieza de caché anterior. Instalación mediante evento simulado, copia permitida/denegada, compartir nativo simulado/cancelado, enlace WhatsApp, detección appinstalled y apertura standalone simulada. No se envían mensajes ni se instala una app en el equipo del usuario.
Escritorio 1440×900 y 1920×1080; Android e iPhone emulados a 390×844 en Chromium (no Safari/WebKit real). Sin desbordamientos en las vistas comprobadas; navegación de Programas operativa y 26 páginas con enlaces internos válidos. NIT visible. Sintaxis y git diff --check satisfactorios.

Pendiente en dispositivos físicos: invitación nativa original, instalación real, lanzamiento desde el icono Android/iPhone, hoja de compartir del sistema y persistencia offline en Safari. El navegador decide cuándo ofrece instalar; no podemos forzar ese aviso. La detección fiable de instalación se limita al modo standalone y al evento appinstalled de la sesión; un navegador no siempre revela otras instalaciones existentes.

## Actualización y publicación
No se fuerza recarga ni activación de una nueva versión mientras alguien usa el portal. El menú muestra Actualizar app cuando hay un worker esperando; al pulsarlo se activa y recarga. Aumentar VERSION si cambia el shell offline. updateViaCache:none evita la caché HTTP del registro; confirmar que Hostinger sirve sw.js con MIME JavaScript y sin caché prolongada de CDN.
La captura hPanel aportada confirma repositorio conectado, rama production, raíz public_html e implementación automática habilitada; no acredita ejecución reciente del disparador. PR #11 aún no fusionado. El respaldo del 30/10/2026 21:01 se estaba preparando para descarga; no hay archivo verificado en esta conversación.
Antes de publicar: obtener/verificar respaldo y configuración del alojamiento; integrar primero la versión institucional aprobada del #11 y después preparar una actualización pública PWA desde production, excluyendo docs/ y las pruebas. No fusionar main directamente en production. Este PR va a main y no altera #11. Revisar despliegue automático antes de actualizar production. Mantener las credenciales en Hostinger; no añadirlas al código.
Reversión: restaurar el respaldo del alojamiento y revertir mediante commit. Si ya se desplegó sw.js, no basta con borrarlo: publicar en la misma ruta una versión de recuperación que limpie solo las cachés nvc-public del scope, se desregistre y deje la navegación en red; verificarla online. No reactivar campañas históricas accidentalmente al escoger la versión de recuperación.

## Referencias técnicas
- https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeinstallprompt_event
- https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share
- https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/update

## Continuación autorizada
La revisión de respaldos de Hostinger queda suspendida por instrucción expresa y no bloquea el desarrollo PWA. No se realizaron lecturas ni restauraciones de respaldos en esta continuación. La integración/publicación se presenta para revisión, sin ejecutarla.
Se corrigió el acceso a las alternativas de compartir: al pulsar Compartir app siempre se ofrecen WhatsApp y copiar enlace, incluso en modo instalado y cuando existe navigator.share. El selector nativo se abre con una acción explícita dentro de ese panel; cancelarlo conserva las alternativas. No cambian los estilos ni la distribución respecto a la versión PWA anterior.
