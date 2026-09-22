# Changelog

Todas las versiones notables de este proyecto se documentan aquí.
El formato sigue [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/)
y el proyecto usa [Versionado Semántico](https://semver.org/lang/es/).

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
