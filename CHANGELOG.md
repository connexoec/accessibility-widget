# Changelog

Todas las versiones notables de este proyecto se documentan aquí.
El formato sigue [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/)
y el proyecto usa [Versionado Semántico](https://semver.org/lang/es/).

## [Sin publicar]

### Añadido
- **Aviso de versión nueva** para quien aloja el archivo por su cuenta (las copias
  cargadas desde un CDN con `@1` o sin versión ya se actualizan solas y no consultan
  nada). Una vez por semana y por navegador consulta el `package.json` de jsDelivr
  (sin cookies ni `Referer`); si hay una versión más nueva, avisa en la consola del
  navegador y, al abrir la página con `?a11y-update`, en el pie del panel. Los
  visitantes normales no ven nada. Se apaga con `data-update-check="false"`.
- `A11yWidget.version` y `A11yWidget.checkForUpdates()`.
- `npm run build` falla si la `VERSION` del código no coincide con `package.json`, y
  `npm publish` recompila antes de subir.

### Documentación
- Nueva sección «Actualizar el widget»: qué instalaciones se actualizan solas y
  cuáles no, cómo descargar el archivo nuevo y cómo saber qué versión se usa.
- La respuesta sobre el envío de datos menciona la consulta semanal del aviso.
- **Importante:** las copias anteriores a la 1.2.0 (1.0.0 y 1.1.0) no traen este
  aviso, así que a quien las aloja hay que avisarle por otra vía.

## [1.1.0] — 2026-10-19

> Los sitios que cargan el widget desde el CDN con `@1` reciben esta versión
> solos. Quienes fijaron `@1.0.0` o alojan el archivo deben actualizarlo a mano.

### Corregido
- **Alto contraste** y **Modo Visual Total** ya no dejan la página entera en
  negro en sitios con capas decorativas encima del contenido (ruido, *scanlines*,
  viñetas, degradados sobre fotos). Antes, al pintar de negro el fondo de todos
  los elementos, esas capas transparentes se volvían una cortina opaca. Ahora se
  detectan (no reciben clics, o están posicionadas y no tienen texto ni controles)
  y conservan su fondo transparente, también las que se añaden después de activar
  el modo.
- Los modos de contraste ya no repintan la interfaz del propio widget (cuadro
  negro detrás del icono ♿, icono amarillo sobre el color de marca).

### Añadido
- Créditos al pie del panel: «Hecho por Quantum Code y Fundación Arupo», con
  enlaces a [quantumcode.art](https://www.quantumcode.art/) y
  [fundacionarupo.org](https://www.fundacionarupo.org/). Se ven subrayados y con
  buen contraste también con los modos de contraste activos.

### Cambiado
- El icono del botón flotante, la bolita de los interruptores encendidos y el
  botón principal del lector de voz eligen solos blanco o casi negro según el
  contraste con `accent` (mínimo 3:1). Con el naranja por defecto (`#ff6600`) el
  icono pasa a ser oscuro: el blanco solo llegaba a 2,9:1.

### Documentación
- Las URLs del CDN fijan la versión mayor (`@1`).
- Avisos sobre botones flotantes que el ♿ puede tapar, cómo usar un botón
  propio ocultando el flotante, y el recorte de títulos con la fuente base a 24 px.
- `demo.html` incluye una capa decorativa y una imagen con degradado para probar
  los modos de contraste.

## [1.0.0] — 2026-09-22

### Añadido
- Primera versión pública del widget de accesibilidad en un solo archivo.
- Botón flotante ♿ + panel accesible (`role="dialog"`, trampa de foco, cierre con `Esc`).
- **11 controles**: tamaño de texto, espaciado de línea, fuente para dislexia,
  alto contraste, blanco y negro, resaltar enlaces, guía de lectura, cursor
  grande, lector de voz (TTS), desactivar animaciones y modo visual total.
- Lector de voz con dos modos: selección en escritorio y **exploración con el
  dedo** en móvil (resalta el bloque bajo el dedo antes de leerlo).
- Persistencia de preferencias en `localStorage`.
- Configuración por `data-*` o por `window.A11yWidgetConfig` (color, posición).
- API pública: `A11yWidget.open() / close() / get() / set()`.
- Build minificada (`a11y-widget.min.js`).
