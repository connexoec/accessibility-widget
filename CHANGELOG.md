# Changelog

Todas las versiones notables de este proyecto se documentan aquí.
El formato sigue [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/)
y el proyecto usa [Versionado Semántico](https://semver.org/lang/es/).

## [Sin publicar]

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
