<div align="center">

# ♿ Accessibility Widget

**Un widget de accesibilidad completo, en un solo archivo, sin dependencias.**
11 controles reales de accesibilidad que se integran en **cualquier** web en **menos de 5 minutos**.

[![npm version](https://img.shields.io/npm/v/connexo-accessibility-widget?color=ff6600&label=npm)](https://www.npmjs.com/package/connexo-accessibility-widget)
[![License: MIT](https://img.shields.io/badge/License-MIT-ff6600.svg)](./LICENSE)
![No dependencies](https://img.shields.io/badge/dependencias-0-ff6600.svg)
![Size](https://img.shields.io/badge/min-~23KB%20(~8KB%20gzip)-ff6600.svg)
![Vanilla JS](https://img.shields.io/badge/vanilla-JS-ff6600.svg)

</div>

> Creado por **Connexo** (Ecuador) en el marco del convenio con la **Fundación
> Arupo** por la inclusión y la accesibilidad. Es de **código abierto (MIT)**:
> úsalo, modifícalo y compártelo. Cuanta más gente lo integre, más personas con
> discapacidad podrán usar la web con comodidad. Ese es el objetivo. 🧡

---

## 📑 Índice
- [¿Qué hace?](#-qué-hace)
- [Demo](#-demo)
- [Instalación en 5 minutos](#-instalación-en-5-minutos)
- [Guías de integración por plataforma](#-guías-de-integración-por-plataforma)
- [Configuración](#-configuración)
- [API de JavaScript](#-api-de-javascript)
- [Accesibilidad y estándares](#-accesibilidad-y-estándares)
- [Compatibilidad](#-compatibilidad)
- [Personalización e idioma](#-personalización-e-idioma)
- [Preguntas frecuentes](#-preguntas-frecuentes)
- [Contribuir](#-contribuir)
- [Licencia y créditos](#-licencia-y-créditos)

---

## ✨ ¿Qué hace?

Añade un **botón flotante ♿** que abre un panel con 11 controles. Todo pensado
para funcionar **también en teléfono** (táctil), y las preferencias del usuario
se **guardan solas** entre visitas (`localStorage`).

| # | Control | Qué hace |
|---|---------|----------|
| 1 | **Tamaño de texto** | Escala la tipografía (100% → 150%). |
| 2 | **Espaciado de línea** | Aumenta el interlineado. |
| 3 | **Fuente para dislexia** | Tipografía legible + más espaciado entre letras/palabras (enfoque BDA/WebAIM/W3C). |
| 4 | **Alto contraste** | Fondo negro, texto blanco, enlaces amarillos. |
| 5 | **Blanco y negro** | Escala de grises total. |
| 6 | **Resaltar enlaces** | Borde + subrayado en todo lo interactivo. |
| 7 | **Guía de lectura** | Una franja clara sigue el cursor **o el dedo** y atenúa el resto. |
| 8 | **Cursor grande** | Puntero XL de alto contraste (PNG; funciona hasta en Safari). |
| 9 | **Lector de voz (TTS)** | Selecciona texto (o deslízalo en el móvil) y se lee en voz alta. |
| 10 | **Desactivar animaciones** | Elimina el movimiento (respeta también `prefers-reduced-motion`). |
| 11 | **Modo Visual Total** | Máximo contraste: fondo negro, texto amarillo. |

---

## 🎬 Demo

Abre **`demo.html`** con doble clic (no necesita servidor) y prueba los 11
controles. El botón ♿ aparece en la esquina.

---

## 🚀 Instalación en 5 minutos

### Opción A — CDN (no descargas nada) · recomendado
Añade **una sola línea** antes de `</body>`:

```html
<!-- jsDelivr (desde npm) -->
<script src="https://cdn.jsdelivr.net/npm/connexo-accessibility-widget/a11y-widget.min.js" defer></script>

<!-- o unpkg -->
<script src="https://unpkg.com/connexo-accessibility-widget/a11y-widget.min.js" defer></script>
```

### Opción B — Alojándolo tú
1. Copia `a11y-widget.min.js` (o `a11y-widget.js` sin minificar) a tu sitio.
2. Añade antes de `</body>`:

```html
<script src="/ruta/a11y-widget.min.js" defer></script>
```

Eso es todo. No hay que inicializar nada: el widget arranca solo. ✅

---

## 🧩 Guías de integración por plataforma

<details open>
<summary><b>HTML plano</b></summary>

```html
<!doctype html>
<html lang="es">
  <body>
    <!-- ...tu contenido... -->
    <script src="a11y-widget.min.js" defer></script>
  </body>
</html>
```
</details>

<details>
<summary><b>React (Vite / Create React App)</b></summary>

La forma más simple es cargar el script una sola vez al montar la app:

```jsx
// App.jsx
import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/connexo-accessibility-widget/a11y-widget.min.js';
    s.defer = true;
    document.body.appendChild(s);
    return () => { s.remove(); };
  }, []);

  return <>{/* ...tu app... */}</>;
}
```

O, más fácil aún, pega la etiqueta `<script>` directamente en `index.html`.
</details>

<details>
<summary><b>Next.js (App Router o Pages Router)</b></summary>

Usa el componente `next/script`:

```jsx
// app/layout.js  (o pages/_app.js)
import Script from 'next/script';

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        {children}
        <Script
          src="https://cdn.jsdelivr.net/npm/connexo-accessibility-widget/a11y-widget.min.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
```
</details>

<details>
<summary><b>Vue 3</b></summary>

```js
// main.js
const s = document.createElement('script');
s.src = '/a11y-widget.min.js';
s.defer = true;
document.body.appendChild(s);
```

O simplemente añade la etiqueta `<script>` en `public/index.html`.
</details>

<details>
<summary><b>Angular</b></summary>

En `angular.json`, agrégalo al array `scripts`:

```json
"scripts": [
  "src/assets/a11y-widget.min.js"
]
```
(copia el archivo a `src/assets/`).
</details>

<details>
<summary><b>WordPress</b></summary>

**Sin plugins:** Apariencia → Editor de temas → `footer.php`, y antes de
`</body>` pega:

```php
<script src="https://cdn.jsdelivr.net/npm/connexo-accessibility-widget/a11y-widget.min.js" defer></script>
```

**Con plugin** (recomendado para no perderlo al actualizar el tema): usa
*"Insert Headers and Footers"* / *"WPCode"* y pega la misma línea en el **footer**.
</details>

<details>
<summary><b>Shopify</b></summary>

Admin → *Temas* → *Editar código* → `layout/theme.liquid`, antes de `</body>`:

```liquid
<script src="https://cdn.jsdelivr.net/npm/connexo-accessibility-widget/a11y-widget.min.js" defer></script>
```
</details>

<details>
<summary><b>Webflow / Squarespace / Wix</b></summary>

Ve a los ajustes de *código personalizado* del sitio (Custom Code → Footer) y
pega la etiqueta `<script>` del CDN. En Webflow: *Project Settings → Custom Code
→ Footer Code*.
</details>

<details>
<summary><b>Google Tag Manager</b></summary>

Crea una etiqueta de tipo **HTML personalizado**, pega la etiqueta `<script>`
del CDN y dispárala en *All Pages*.
</details>

---

## ⚙️ Configuración

Opcional. Por atributos en el `<script>`:

```html
<script src="a11y-widget.min.js"
        data-accent="#ff6600"
        data-position="bottom-right"
        defer></script>
```

O por objeto global **antes** del script:

```html
<script>
  window.A11yWidgetConfig = { accent: '#0066ff', position: 'bottom-left' };
</script>
<script src="a11y-widget.min.js" defer></script>
```

| Opción | Valores | Por defecto |
|--------|---------|-------------|
| `accent` | cualquier color CSS (hex, rgb…) | `#ff6600` |
| `position` | `bottom-right` · `bottom-left` · `top-right` · `top-left` | `bottom-right` |
| `storageKey` | nombre de la clave de `localStorage` | `a11y-settings` |

---

## 🧠 API de JavaScript

```js
A11yWidget.open();   // abre el panel
A11yWidget.close();  // lo cierra
A11yWidget.get();    // → objeto con las preferencias actuales
A11yWidget.set({ highContrast: true, fontSize: 1.25 }); // aplica preferencias
```

Útil, por ejemplo, para poner tu **propio** botón "Accesibilidad" en el menú:

```html
<button onclick="A11yWidget.open()">Accesibilidad</button>
```

---

## ♿ Accesibilidad y estándares

Este widget está construido siguiendo buenas prácticas de la **WCAG 2.1** y de
la guía de la **British Dyslexia Association**:

- **Navegable por teclado**: el panel es un `role="dialog"` con **trampa de foco**,
  se cierra con `Esc` y devuelve el foco al botón que lo abrió.
- **Semántica ARIA**: `aria-pressed` en los interruptores, `aria-label` en los
  controles, foco visible en todo el sitio (`:focus-visible`).
- **Táctil primero**: la guía de lectura y el lector de voz funcionan con el
  **dedo** en el móvil, no solo con ratón.
- **Respeta al sistema**: honra `prefers-reduced-motion` del sistema operativo.
- **No intrusivo**: todo es *opt-in*; al apagar cada modo, la página vuelve a su
  estado original. Las preferencias se guardan por usuario en `localStorage`.

> **Nota honesta:** un widget ayuda muchísimo, pero **no sustituye** un sitio
> bien hecho (HTML semántico, textos alternativos en imágenes, contraste
> suficiente de base). Es un complemento potente, no una excusa. 🙂

---

## 🌐 Compatibilidad

- **Navegadores modernos**: Chrome, Edge, Firefox y Safari (escritorio y móvil).
- **Lector de voz**: usa la *Web Speech API* nativa. La calidad de la voz depende
  del dispositivo — Android e iOS traen voces muy naturales; en Windows con solo
  voces del sistema (SAPI) suena más básico. El widget elige automáticamente la
  mejor voz en español disponible.
- **Cursor grande**: solo aplica en escritorio (en móvil no hay puntero). Se usan
  PNG en vez de cursores SVG justamente para que funcione también en Safari.

---

## 🎨 Personalización e idioma

- **Color de marca:** cambia `accent` (ver [Configuración](#-configuración)).
  Internamente es la variable CSS `--a11y-accent`.
- **Textos / idioma:** los textos están en español dentro del array `CONTROLS`
  en `a11y-widget.js`. Tradúcelos o edítalos ahí y vuelve a minificar con
  `npm run build`.
- **Estilos de los modos:** son las reglas `.a11y-*` dentro del mismo archivo,
  fáciles de ajustar.

---

## ❓ Preguntas frecuentes

**¿Rompe el diseño de mi sitio?**
No. Los modos son *opt-in* y su UI está aislada; al apagarlos, tu sitio queda
igual que antes.

**¿Envía datos a algún servidor?**
No. Todo ocurre en el navegador del usuario; las preferencias se guardan solo en
su dispositivo (`localStorage`). Cero rastreo.

**¿Necesito build o npm?**
No. Es un archivo. `npm`/`esbuild` solo hacen falta si quieres **editar** y
volver a minificar.

**¿Puedo poner mi propio botón en vez del flotante?**
Sí: usa `A11yWidget.open()` desde cualquier botón tuyo.

---

## 🤝 Contribuir

Los aportes son bienvenidos: abre un *issue* o un *pull request*. Ideas útiles:
más idiomas, más voces, nuevos controles. Al ser MIT, cualquier agencia puede
adaptarlo a su marca.

Editar y reconstruir:
```bash
npm install      # instala esbuild (solo para build)
# edita a11y-widget.js
npm run build    # regenera a11y-widget.min.js
```

---

## 📄 Licencia y créditos

**MIT** — libre para usar, modificar y redistribuir. Ver [LICENSE](./LICENSE).

Hecho con 🧡 por **Connexo** (Ecuador) en convenio con la **Fundación Arupo**
([fundacionarupo.org](https://www.fundacionarupo.org/)) por una web más
inclusiva para las personas con discapacidad.
