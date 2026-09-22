/*!
 * Accessibility Widget — 11 controles de accesibilidad en un solo archivo.
 * Vanilla JS · sin dependencias · sin build. Funciona en cualquier web
 * (HTML plano, WordPress, React, Vue, Angular…). Licencia MIT.
 *
 * ── USO (menos de 5 minutos) ────────────────────────────────────────────────
 *   1) Sube este archivo a tu sitio (o sírvelo desde un CDN).
 *   2) Añádelo antes de </body>:
 *        <script src="a11y-widget.js" defer></script>
 *   Eso es todo: aparece un botón flotante ♿ que abre el panel. Las
 *   preferencias del usuario se guardan solas (localStorage).
 *
 * ── CONFIGURACIÓN (opcional) ─────────────────────────────────────────────────
 *   a) Por atributos en el <script>:
 *        <script src="a11y-widget.js" data-accent="#ff6600"
 *                data-position="bottom-right" defer></script>
 *   b) O por objeto global ANTES del script:
 *        <script>window.A11yWidgetConfig = { accent:'#0066ff', position:'bottom-left' };</script>
 *   accent   → color de marca (CTA, foco, resaltados).  Def: #ff6600
 *   position → bottom-right | bottom-left | top-right | top-left. Def: bottom-right
 *   storageKey → clave de localStorage. Def: 'a11y-settings'
 *
 * Controles: tamaño de texto · espaciado de línea · fuente para dislexia ·
 * alto contraste · blanco y negro · resaltar enlaces · guía de lectura ·
 * cursor grande · lector de voz (TTS) · desactivar animaciones · modo visual total.
 */
(function () {
  'use strict';
  if (typeof window === 'undefined' || window.__a11yWidgetLoaded) return;
  window.__a11yWidgetLoaded = true;

  // ── Configuración ───────────────────────────────────────────────────────────
  var script = document.currentScript;
  var cfg = window.A11yWidgetConfig || {};
  var read = function (k, d) {
    return cfg[k] != null ? cfg[k] : (script && script.getAttribute('data-' + k.replace(/[A-Z]/g, function (m) { return '-' + m.toLowerCase(); }))) || d;
  };
  var ACCENT = read('accent', '#ff6600');
  var POSITION = read('position', 'bottom-right');
  var STORAGE_KEY = read('storageKey', 'a11y-settings');

  // Cursores de alto contraste, incrustados (PNG, no SVG: Safari no soporta
  // cursores SVG). Generados a 48×48; el hotspot va en la punta.
  var CURSOR_ARROW = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAEUUlEQVR4nN2ZvU4jVxiG39OmWa+UNoppSEu7aTJO6giqpGS4AkzSRuKkSBkt26TlcAfLFWCugKFNw6C0KYYmdZ5vBo/tz3+IjMHZR3o0Z7ygfV99M4ezS9D/nE+yQA8P0bjACreWgJ4hvkejwAFWuJUE9ERJpzimwAFWuHUE9ETNFjAKHGCFW0VAT9R8AcPCD7DArSGgJ+qxwJs3b/Tw8MCqpcIBFrgVBPREPRY4PT1VVVX68OEDdy0VDrDAVyegJ4rsWBeIMSqlpKOjIz5pqfAEk16ZgJ4osmNbwEhproRhHyS9IgE9UWTHSYG/S+nzvlJKW1cioCeK7DgpkHIpTzKKolCWZf7ljpJ+xRcnoCeK7Dgp8HsmvculrxGWlEhqpvGiBPREkR1nC9iX/nzFtWFbSgT0RJEdZwv8eS39dCV9xfqRsix1cHCg29tb7lqSmh3KdqqNE9ATRXacL7DLdWoKhv2cyJiEK1HgACvcKAE9UWTH+QKGm4LxmiUCeqLIjosL7GZzUzCsRJ7nury85K6lwAFWuBECeqLIjosLGAumMCanxMXFBasWCz/AAjsnoCeK7Li8wG62cApj8hcsEdATRXZcXsBYMQVjOBy+yCEwoCeK7Li6wG62cgpGSskfPSo8waSOCOiJIjuuLmD8ciN9scdiOSnNlTDsg6QOCOiJIjuuL/DukAc+aR0ppY2VCOiJIjuuL2D8dlefVNex5OgR9R8PgQE9UWTHpxX49lj68YzFepaUSGqm8SwCeqLIjusL/PBe+m7I4ul0XSKgJ4rsuLrA4Xl7vB5jP41t/7frKkoOgSklOZKaHWr1NzsCeqLIjssLLAhvnJ2d6eTEMjwb++YzfDIBPVFkx8UFHsPbo3B/f6/9/X0+bNjuAn8V/OAa1ft+SqndFg8PD5W4N+zRefv2LauWW/yIT6HCpOb6ZAJ6osiOkwJ/HEjfc3Xhx9zd3anf78vIZ89BFe6gXTdCQE8U2XFS4B/+/s96SgvCG8fHx7LHxyh5QXd2dli1nGDzhxsgoCeK7DgpABY8UWARvV6vnoJdjXx2CqVUT2EjBPREkR3bAgvCP+ABXmHN+GuNsiz9FI4waQME9ESRB+tQttOklDTFPVr4ApN4j1H9fr+ewpj8haYQ0BNFdqwfCdtZprjFTJOXsi/pDmvOz8+VE9wYjUYaDAasWo4wqWMCeqIeCzh8+DEfcR/V7/dnppBlma6vr1nVlNrAFAJ6ouYLLAtvZJp6F66urpRlmYzR/BTsZqQOCeiJmi2wKvyYkaRvUFmW1SXGZNxPTWGkpkRnBPQM8T0aTwlv5OIVwJqbmxvt7e2xIvFotNEpBPT0MFdD0vrwY0pJX2J7vLANwP5hH2PUFJd4gJ2wqMBzyTU1BftfifRYwrG1BXpYit8N4jIucIgVdkLALoma3QDGXGBUU7BTAnZJD0s1U3jApOYgV2pDdF3A6Kt5xpM6fFSW8S+B5gxPfpM7CAAAAABJRU5ErkJggg==';
  var CURSOR_HAND = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAADUElEQVR4nO2XvW7bVhiG3zMWLWBm62Ya6GjAytyh1BVEuoJSS7vV2ooutdRegIwuRbtERqdOUq9AX6/ANLoWEL1ls4QAQTbnOaSUKD9yKFKU4UAP8Bwd/YD6Xp5P4qHTA2cf4L6pGiDAb7GFnjFe4Ax3gsOyhJJG2MBVEmxjqh3gsCy++Bbq5OSEUbq6umLMGGMba6dKgFtU/4eOfv76QHox0y+XTme/PeXVjCrHLkzZL4kkTVDPf/xKX9z8z0x6+fmX+mzwjFnGY0ywVioHuP2OYQX3J0NOE00147AMkRYB/vvrVx0fH0u/t3nGAR9agMlkoiiKpO/zQ+0DbIjDMkSidvykA/SUB/gXa8NhGSJRO94VYEmq/KJWy19q/q2bE4na8b0Awd8Hms/nzN5ihp4AEzzHC6yMwzJEonZ8L0D605SRSoNA5+fn6vf7PPsgQ3EhR0+qkjgsQoAneI2p7gigP24Z3tBqtWRmiuM4CzUcDnV9fc07b5FK6qBpQxzehS/8KbZwSYIXOMCPBniX2WymMAw/1GaeJpo2wOE6ApxgA9eyaQDPkFUYYrfbzQL5VlvsZFNJR1gYh+voYnaWz87O1Ov1NB6PFdMKq2evTIB3GRKm0+kwy3iEMyyEw3WM8cnh4aHSNNWSJEkUUfAyxOsAif84NFoMm2FmajabzDL8xFQQh+voiZOPurm5yX6AS5YhPCnhVt8rg5nVEiCUNEWdnp5mfbpKSuGeMAxVFTOrJYBnqPym/U2r1ICZ1RYgwFTSgT/T0+mU6fYxs9oCeFo4wtf/RtvGzGoN4BnjE9Tl5aUajQaz7WFmtQcIMBWt5Iv3IbaJmdUewNPFAW69lcxsJwE8JukbzFbBr8Y2MLOdBQjFdQy32kpmtrMAni4OUIPBINuQVcXMVgM8whkWwmEZTLSS30L4C5xfjSr0+D0tbnzmGGBhHJYh1Eor+RA+TBn8dvro6Ch7hH+whYVxWJZY+c1OtgKj0UhhGGoTfNHtdltmpgWPMcHCOKzCUIu9kieOY0Xsl8Iw1McwivYbRB9iQR972hCHVYm1WIkK9LGnEjjcBqHyILGkQyzCHE154QmWwmEdNDDAdaTKrUxdAXbGPsB9sw9w3+wD3DcPPsArCr9JQGeBXDgAAAAASUVORK5CYII=';

  // ── Estado ──────────────────────────────────────────────────────────────────
  var DEFAULTS = {
    fontSize: 1, lineSpacing: 1, dyslexiaFont: false, highContrast: false,
    grayscale: false, highlightInteractions: false, readingRuler: false,
    bigCursor: false, speech: false, reducedMotion: false, visualAccessibilityMode: false
  };
  var settings = load();

  function load() {
    try {
      var s = window.localStorage.getItem(STORAGE_KEY);
      return s ? assign({}, DEFAULTS, JSON.parse(s)) : assign({}, DEFAULTS);
    } catch (e) { return assign({}, DEFAULTS); }
  }
  function save() {
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings)); } catch (e) {}
  }
  function assign(t) {
    for (var i = 1; i < arguments.length; i++) { var s = arguments[i]; if (s) for (var k in s) if (Object.prototype.hasOwnProperty.call(s, k)) t[k] = s[k]; }
    return t;
  }

  // ── Controles del panel ───────────────────────────────────────────────────────
  var CONTROLS = [
    { key: 'fontSize', label: 'Tamaño de texto', type: 'range', min: 1, max: 1.5, step: 0.25, desc: 'Aumenta el tamaño de la fuente para mejor legibilidad.' },
    { key: 'lineSpacing', label: 'Espaciado de línea', type: 'range', min: 1, max: 2, step: 0.5, desc: 'Aumenta el espacio entre líneas de texto.' },
    { key: 'dyslexiaFont', label: 'Fuente para dislexia', type: 'toggle', desc: 'Tipografía más legible y más espacio entre letras, palabras y líneas.' },
    { key: 'highContrast', label: 'Alto contraste', type: 'toggle', desc: 'Fondo negro, texto blanco y enlaces amarillos.' },
    { key: 'grayscale', label: 'Blanco y negro', type: 'toggle', desc: 'Elimina el color para evitar distracciones.' },
    { key: 'highlightInteractions', label: 'Resaltar enlaces', type: 'toggle', desc: 'Bordes y subrayado en todo lo que se puede tocar.' },
    { key: 'readingRuler', label: 'Guía de lectura', type: 'toggle', desc: 'Una franja clara sigue el cursor o el dedo y atenúa el resto.' },
    { key: 'bigCursor', label: 'Cursor grande', type: 'toggle', desc: 'Puntero extra grande y de alto contraste (solo en computador).' },
    { key: 'speech', label: 'Lector de voz', type: 'toggle', desc: 'Selecciona un texto (o deslízalo en el móvil) y se lee en voz alta.' },
    { key: 'reducedMotion', label: 'Desactivar animaciones', type: 'toggle', desc: 'Elimina el movimiento de la página.' },
    { key: 'visualAccessibilityMode', label: 'Modo Visual Total', type: 'toggle', desc: 'Máximo contraste y simplificación: fondo negro, texto amarillo.' }
  ];

  // ── Iconos (SVG inline) ───────────────────────────────────────────────────────
  var SVG = {
    a11y: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="4.2" r="1.6"/><path d="M4.5 8.2c2.4 1 4.8 1.5 7.5 1.5s5.1-.5 7.5-1.5"/><path d="M12 8.5v6"/><path d="m8.5 21 3.5-6.5 3.5 6.5"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="m6 6 12 12M18 6 6 18"/></svg>',
    speaker: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9v6h3.5L13 19V5L7.5 9H4Z"/><path d="M16.5 8.8a4.5 4.5 0 0 1 0 6.4"/></svg>',
    pause: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M9 5v14M15 5v14"/></svg>',
    play: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M7 5.5 19 12 7 18.5Z"/></svg>',
    stop: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="6" y="6" width="12" height="12" rx="1.5"/></svg>'
  };

  // ── CSS ───────────────────────────────────────────────────────────────────────
  var POS = {
    'bottom-right': 'bottom:20px;right:20px;', 'bottom-left': 'bottom:20px;left:20px;',
    'top-right': 'top:20px;right:20px;', 'top-left': 'top:20px;left:20px;'
  }[POSITION] || 'bottom:20px;right:20px;';

  var CSS = [
    ':root{--a11y-accent:' + ACCENT + '}',

    /* ===== Modos globales (afectan al CONTENIDO del sitio, van en <html>) ===== */
    ':focus-visible{outline:3px solid var(--a11y-accent)!important;outline-offset:2px;border-radius:4px}',

    '.a11y-high-contrast,.a11y-high-contrast *{background-color:#000!important;background-image:none!important;color:#fff!important;border-color:#fff!important;box-shadow:none!important;text-shadow:none!important}',
    '.a11y-high-contrast a,.a11y-high-contrast button,.a11y-high-contrast [role="button"],.a11y-high-contrast [role="link"],.a11y-high-contrast summary{color:#ff0!important;text-decoration:underline!important;outline:1px solid #ff0!important}',

    '.a11y-grayscale{filter:grayscale(1)!important}',

    '.a11y-dyslexia,.a11y-dyslexia *{font-family:Verdana,Tahoma,"Trebuchet MS",Arial,system-ui,sans-serif!important;font-style:normal!important;letter-spacing:.06em!important;word-spacing:.16em!important;line-height:1.6!important}',

    '.a11y-highlight a,.a11y-highlight button,.a11y-highlight [role="button"],.a11y-highlight [role="link"],.a11y-highlight [tabindex="0"]{outline:3px solid var(--a11y-accent)!important;outline-offset:3px!important;text-decoration:underline!important;font-weight:700!important}',

    '.a11y-reduced-motion *{animation:none!important;transition:none!important;scroll-behavior:auto!important}',

    '.a11y-visual-total,.a11y-visual-total *{background-color:#000!important;background-image:none!important;color:#ff0!important;border-color:#ff0!important;box-shadow:none!important;text-shadow:none!important}',
    '.a11y-visual-total a,.a11y-visual-total button,.a11y-visual-total [role="button"]{text-decoration:underline!important;font-weight:800!important;outline:2px solid #ff0!important}',
    '.a11y-visual-total img,.a11y-visual-total video{filter:grayscale(1) contrast(1.4)!important}',

    '.a11y-big-cursor,.a11y-big-cursor *{cursor:url(' + CURSOR_ARROW + ') 6 4,auto!important}',
    '.a11y-big-cursor a,.a11y-big-cursor button,.a11y-big-cursor [role="button"],.a11y-big-cursor [role="link"],.a11y-big-cursor label[for],.a11y-big-cursor select,.a11y-big-cursor summary,.a11y-big-cursor [tabindex]:not([tabindex="-1"]){cursor:url(' + CURSOR_HAND + ') 18 4,auto!important}',

    '.a11y-tts-reading{outline:3px solid var(--a11y-accent)!important;outline-offset:2px!important;background-color:rgba(0,0,0,.001);border-radius:4px!important}',

    /* ===== UI del widget (aislada + endurecida para que los modos no la deformen) ===== */
    /* Endurecido: neutraliza SOLO lo que los modos globales inyectarían dentro
       del widget (tipografía/espaciado/subrayado/sombra). NO se usa `all:revert`
       porque su especificidad (1,0,0) pisaría el propio layout del panel. */
    '#a11y-root,#a11y-root *{box-sizing:border-box;font-family:system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif!important;letter-spacing:normal!important;word-spacing:normal!important;line-height:normal!important;text-shadow:none!important;text-decoration:none!important}',
    '#a11y-root{position:fixed;z-index:2147483000}',

    '.a11y-launch{position:fixed;' + POS + 'width:56px;height:56px;border-radius:50%;border:none;background:var(--a11y-accent)!important;color:#fff!important;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 6px 20px rgba(0,0,0,.35)!important;z-index:2147483400;padding:0}',
    '.a11y-launch:hover{filter:brightness(1.08)!important}',
    '.a11y-launch svg{width:30px;height:30px}',
    '.a11y-launch:focus-visible{outline:3px solid #fff!important;outline-offset:2px}',

    '.a11y-backdrop{position:fixed;inset:0;background:rgba(0,0,0,.55)!important;z-index:2147483500}',

    '.a11y-panel{position:fixed;top:0;right:0;height:100%;width:360px;max-width:100vw;background:#101114!important;color:#fff!important;z-index:2147483600;display:flex;flex-direction:column;box-shadow:-10px 0 40px rgba(0,0,0,.5)!important;border-left:1px solid rgba(255,255,255,.1)!important}',
    '.a11y-panel.left{right:auto;left:0;border-left:none;border-right:1px solid rgba(255,255,255,.1)!important;box-shadow:10px 0 40px rgba(0,0,0,.5)!important}',
    '.a11y-head{display:flex;align-items:center;justify-content:space-between;padding:18px 20px;border-bottom:1px solid rgba(255,255,255,.1)!important;flex:none}',
    '.a11y-title{display:flex;align-items:center;gap:10px;font-size:18px;font-weight:700;color:#fff!important}',
    '.a11y-title svg{width:24px;height:24px;color:var(--a11y-accent)!important}',
    '.a11y-x{background:transparent!important;border:none;color:rgba(255,255,255,.6)!important;width:36px;height:36px;border-radius:8px;cursor:pointer;display:flex;align-items:center;justify-content:center;padding:0}',
    '.a11y-x:hover{background:rgba(255,255,255,.12)!important;color:#fff!important}',
    '.a11y-x svg{width:22px;height:22px}',
    '.a11y-body{flex:1;overflow-y:auto;padding:16px 20px;display:flex;flex-direction:column;gap:18px}',
    '.a11y-row{display:flex;align-items:flex-start;justify-content:space-between;gap:14px}',
    '.a11y-lab{display:flex;flex-direction:column;gap:3px;font-size:14px;font-weight:600;color:#fff!important}',
    '.a11y-desc{font-size:12px;font-weight:400;color:rgba(255,255,255,.55)!important}',
    '.a11y-sw{position:relative;flex:none;width:44px;height:24px;border-radius:999px;border:none;background:#333!important;cursor:pointer;transition:background .15s;margin-top:2px;padding:0}',
    '.a11y-sw[aria-pressed="true"]{background:var(--a11y-accent)!important}',
    '.a11y-sw span{position:absolute;top:4px;left:4px;width:16px;height:16px;border-radius:50%;background:#fff!important;transition:transform .15s}',
    '.a11y-sw[aria-pressed="true"] span{transform:translateX(20px)}',
    '.a11y-range{display:flex;flex-direction:column;gap:8px}',
    '.a11y-range input{width:100%;accent-color:var(--a11y-accent)}',
    '.a11y-val{font-size:12px;color:var(--a11y-accent)!important;font-variant-numeric:tabular-nums}',
    '.a11y-foot{flex:none;padding:16px 20px;border-top:1px solid rgba(255,255,255,.1)!important}',
    '.a11y-reset{width:100%;padding:12px;border-radius:10px;border:1px solid rgba(255,255,255,.15)!important;background:transparent!important;color:rgba(255,255,255,.8)!important;font-size:14px;font-weight:600;cursor:pointer}',
    '.a11y-reset:hover{color:#fff!important;border-color:var(--a11y-accent)!important}',

    /* Guía de lectura */
    '#a11y-ruler{position:fixed;inset:0;pointer-events:none;z-index:2147483300}',
    '#a11y-ruler>div{position:absolute;left:0;top:0;width:100%;height:72px;box-shadow:0 0 0 100vmax rgba(0,0,0,.5)!important;border-top:2px solid var(--a11y-accent)!important;border-bottom:2px solid var(--a11y-accent)!important;will-change:transform}',

    /* Barra del lector de voz */
    '.a11y-bar{position:fixed;bottom:16px;left:50%;transform:translateX(-50%);max-width:calc(100vw - 24px);display:flex;align-items:center;gap:8px;padding:8px 12px;border-radius:999px;background:#101114!important;color:#fff!important;border:1px solid rgba(255,255,255,.12)!important;box-shadow:0 8px 30px rgba(0,0,0,.5)!important;z-index:2147483450;font-size:14px}',
    '.a11y-bar .ic{width:20px;height:20px;flex:none;color:rgba(255,255,255,.6)!important}',
    '.a11y-bar.on .ic{color:var(--a11y-accent)!important}',
    '.a11y-bar span{color:rgba(255,255,255,.8)!important;padding:0 2px}',
    '.a11y-bar button{display:inline-flex;align-items:center;gap:6px;height:34px;padding:0 12px;border-radius:999px;border:none;background:rgba(255,255,255,.12)!important;color:#fff!important;font-size:14px;font-weight:600;cursor:pointer}',
    '.a11y-bar button svg{width:16px;height:16px}',
    '.a11y-bar button.pri{background:var(--a11y-accent)!important;color:#111!important}',
    '@media (max-width:640px){.a11y-panel{width:320px}.a11y-bar .txt{display:none}}'
  ].join('\n');

  // ── Utilidades DOM ──────────────────────────────────────────────────────────
  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }

  // ── Aplicar estado ──────────────────────────────────────────────────────────
  function apply() {
    var r = document.documentElement;
    r.classList.toggle('a11y-visual-total', settings.visualAccessibilityMode);
    if (settings.visualAccessibilityMode) { r.style.fontSize = '24px'; r.style.lineHeight = '1.5'; }
    else {
      r.style.fontSize = settings.fontSize === 1 ? '' : (settings.fontSize * 16) + 'px';
      r.style.lineHeight = settings.lineSpacing === 1 ? '' : String(settings.lineSpacing);
    }
    r.classList.toggle('a11y-high-contrast', settings.highContrast);
    r.classList.toggle('a11y-grayscale', settings.grayscale);
    r.classList.toggle('a11y-highlight', settings.highlightInteractions);
    r.classList.toggle('a11y-reduced-motion', settings.reducedMotion);
    r.classList.toggle('a11y-dyslexia', settings.dyslexiaFont);
    r.classList.toggle('a11y-big-cursor', settings.bigCursor);
    save();
    Ruler.setEnabled(settings.readingRuler);
    Speech.setEnabled(settings.speech);
  }

  // ── Guía de lectura ───────────────────────────────────────────────────────────
  var Ruler = (function () {
    var overlay = null, band = null, raf = null, y = 0, on = false;
    function paint() { raf = null; if (band) band.style.transform = 'translate3d(0,' + (y - 36) + 'px,0)'; }
    function move(e) { y = e.clientY; if (raf == null) raf = requestAnimationFrame(paint); }
    return {
      setEnabled: function (v) {
        if (v === on) return; on = v;
        if (v) {
          overlay = el('div'); overlay.id = 'a11y-ruler'; overlay.setAttribute('aria-hidden', 'true');
          band = el('div'); overlay.appendChild(band); document.body.appendChild(overlay);
          y = window.innerHeight / 2; paint();
          window.addEventListener('pointermove', move, { passive: true });
        } else {
          window.removeEventListener('pointermove', move);
          if (raf != null) cancelAnimationFrame(raf);
          if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
          overlay = band = null;
        }
      }
    };
  })();

  // ── Lector de voz (TTS) ───────────────────────────────────────────────────────
  var Speech = (function () {
    var sup = 'speechSynthesis' in window;
    var on = false, speaking = false, paused = false, last = '', voices = [], hl = null, dwell = null, bar = null;
    var coarse = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;

    function loadVoices() { if (sup) voices = window.speechSynthesis.getVoices() || []; }
    if (sup) { loadVoices(); if (window.speechSynthesis.addEventListener) window.speechSynthesis.addEventListener('voiceschanged', loadVoices); }

    function score(v) {
      var n = (v.name || '').toLowerCase(), l = (v.lang || '').toLowerCase();
      if (l.indexOf('es') !== 0) return -1; var s = 10;
      if (/es[-_]?(419|mx|us|co|ar|cl|pe)/.test(l)) s += 3;
      if (/google/.test(n)) s += 6;
      if (/natural|neural|premium|enhanced|online/.test(n)) s += 6;
      if (v.localService === false) s += 2;
      return s;
    }
    function best() {
      var arr = voices.length ? voices : (sup ? window.speechSynthesis.getVoices() : []);
      var b = null, bs = 0;
      for (var i = 0; i < arr.length; i++) { var sc = score(arr[i]); if (sc > bs) { bs = sc; b = arr[i]; } }
      return b;
    }
    function chunk(t) {
      var c = t.replace(/\s+/g, ' ').trim(); if (!c) return [];
      var parts = c.match(/[^.!?…\n]+[.!?…]*\s*/g) || [c], out = [], buf = '';
      for (var i = 0; i < parts.length; i++) { if ((buf + parts[i]).length > 220 && buf) { out.push(buf.trim()); buf = parts[i]; } else buf += parts[i]; }
      if (buf.trim()) out.push(buf.trim());
      return out;
    }
    function setHL(e) { if (hl === e) return; if (hl) hl.classList.remove('a11y-tts-reading'); hl = e; if (e) e.classList.add('a11y-tts-reading'); }
    function stop() { if (sup) window.speechSynthesis.cancel(); speaking = false; paused = false; setHL(null); render(); }
    function speak(text) {
      if (!sup) return; var parts = chunk(text); if (!parts.length) return;
      window.speechSynthesis.cancel(); last = text; var v = best(); speaking = true; paused = false;
      for (var i = 0; i < parts.length; i++) {
        var u = new SpeechSynthesisUtterance(parts[i]); u.lang = v ? v.lang : 'es-ES'; if (v) u.voice = v; u.rate = 0.95; u.pitch = 1;
        if (i === parts.length - 1) u.onend = function () { speaking = false; paused = false; setHL(null); render(); };
        u.onerror = function () { speaking = false; paused = false; render(); };
        window.speechSynthesis.speak(u);
      }
      render();
    }
    function blockAt(x, y) {
      var hit = document.elementFromPoint(x, y); if (!hit || hit.closest('#a11y-root,.a11y-bar')) return null;
      var b = hit.closest('p,h1,h2,h3,h4,h5,h6,li,a,button,summary,blockquote,figcaption,dd,dt,td,th,label,span');
      var e = b || (hit.innerText ? hit : null); if (!e) return null;
      return (e.innerText || '').trim().length >= 2 ? e : null;
    }
    function onUp(e) {
      if (e.pointerType === 'touch') return;
      setTimeout(function () {
        var sel = window.getSelection(); if (!sel || sel.isCollapsed) return;
        var t = sel.toString().trim(); if (t.length < 2) return;
        var a = sel.anchorNode; a = a && a.nodeType === 1 ? a : (a ? a.parentElement : null);
        if (a && a.closest && a.closest('#a11y-root,.a11y-bar')) return;
        if (t === last && speaking) return; speak(t);
      }, 10);
    }
    function readBlock(e) { var t = e.innerText.trim(); if (t.length < 2 || (t === last && speaking)) return; speak(t); }
    function onDown(e) { if (e.pointerType !== 'touch') return; var b = blockAt(e.clientX, e.clientY); if (!b) return; setHL(b); readBlock(b); }
    function onMove(e) { if (e.pointerType !== 'touch') return; var b = blockAt(e.clientX, e.clientY); if (!b) return; setHL(b); if (dwell) clearTimeout(dwell); dwell = setTimeout(function () { readBlock(b); }, 160); }
    function onEnd() { if (dwell) clearTimeout(dwell); }

    function render() {
      if (!bar) return;
      bar.className = 'a11y-bar' + (speaking && !paused ? ' on' : '');
      var html = '<span class="ic">' + SVG.speaker + '</span>';
      if (!sup) html += '<span>Tu navegador no soporta lectura por voz.</span>';
      else if (speaking) {
        html += '<span class="txt">' + (paused ? 'En pausa' : 'Leyendo…') + '</span>';
        html += '<button class="' + (paused ? 'pri' : '') + '" data-act="play" aria-label="' + (paused ? 'Reanudar lectura' : 'Pausar lectura') + '">' + (paused ? SVG.play : SVG.pause) + '<span class="txt">' + (paused ? 'Reanudar' : 'Pausar') + '</span></button>';
        html += '<button data-act="stop" aria-label="Detener lectura">' + SVG.stop + '<span class="txt">Detener</span></button>';
      } else html += '<span>' + (coarse ? 'Desliza el dedo sobre el texto para escucharlo' : 'Selecciona un texto para escucharlo') + '</span>';
      bar.innerHTML = html;
    }
    function onBarClick(ev) {
      var b = ev.target.closest('button'); if (!b) return; var act = b.getAttribute('data-act');
      if (act === 'stop') stop();
      else if (act === 'play') {
        if (speaking && !paused) { window.speechSynthesis.pause(); paused = true; render(); }
        else if (paused) { window.speechSynthesis.resume(); paused = false; render(); }
      }
    }
    return {
      setEnabled: function (v) {
        if (v === on) return; on = v;
        if (v) {
          bar = el('div', 'a11y-bar'); bar.setAttribute('role', 'region'); bar.setAttribute('aria-label', 'Lector de voz');
          bar.addEventListener('click', onBarClick); document.body.appendChild(bar); render();
          document.addEventListener('pointerup', onUp);
          document.addEventListener('pointerdown', onDown, { passive: true });
          document.addEventListener('pointermove', onMove, { passive: true });
          document.addEventListener('pointercancel', onEnd, { passive: true });
        } else {
          stop();
          document.removeEventListener('pointerup', onUp);
          document.removeEventListener('pointerdown', onDown);
          document.removeEventListener('pointermove', onMove);
          document.removeEventListener('pointercancel', onEnd);
          if (bar && bar.parentNode) bar.parentNode.removeChild(bar); bar = null;
        }
      }
    };
  })();

  // ── Panel + botón flotante ─────────────────────────────────────────────────────
  var root, panel, backdrop, launcher, panelOpen = false, lastFocus = null;

  function buildPanel() {
    backdrop = el('div', 'a11y-backdrop'); backdrop.setAttribute('aria-hidden', 'true');
    backdrop.addEventListener('click', closePanel);

    var onLeft = POSITION.indexOf('left') !== -1;
    panel = el('div', 'a11y-panel' + (onLeft ? ' left' : ''));
    panel.setAttribute('role', 'dialog'); panel.setAttribute('aria-modal', 'true'); panel.setAttribute('aria-label', 'Opciones de accesibilidad');

    var head = el('div', 'a11y-head');
    head.appendChild(el('div', 'a11y-title', SVG.a11y + '<span>Accesibilidad</span>'));
    var x = el('button', 'a11y-x', SVG.close); x.setAttribute('aria-label', 'Cerrar panel de accesibilidad'); x.addEventListener('click', closePanel);
    head.appendChild(x); panel.appendChild(head);

    var body = el('div', 'a11y-body');
    CONTROLS.forEach(function (c) {
      var row = el('div', 'a11y-row');
      var lab = el('div', 'a11y-lab', '<span>' + c.label + '</span><span class="a11y-desc">' + c.desc + '</span>');
      lab.setAttribute('id', 'a11y-lab-' + c.key);
      if (c.type === 'toggle') {
        row.appendChild(lab);
        var sw = el('button', 'a11y-sw', '<span></span>');
        sw.setAttribute('aria-pressed', String(!!settings[c.key])); sw.setAttribute('aria-labelledby', 'a11y-lab-' + c.key);
        sw.addEventListener('click', function () { settings[c.key] = !settings[c.key]; sw.setAttribute('aria-pressed', String(settings[c.key])); apply(); });
        row.appendChild(sw); body.appendChild(row);
      } else {
        var wrap = el('div', 'a11y-range'); wrap.style.width = '100%';
        row.appendChild(lab); wrap.appendChild(row);
        var line = el('div'); line.style.cssText = 'display:flex;align-items:center;gap:12px';
        var inp = el('input'); inp.type = 'range'; inp.min = c.min; inp.max = c.max; inp.step = c.step; inp.value = settings[c.key];
        inp.setAttribute('aria-labelledby', 'a11y-lab-' + c.key);
        var val = el('span', 'a11y-val', settings[c.key] + 'x');
        inp.addEventListener('input', function () { settings[c.key] = parseFloat(inp.value); val.textContent = settings[c.key] + 'x'; apply(); });
        line.appendChild(inp); line.appendChild(val); wrap.appendChild(line); body.appendChild(wrap);
      }
    });
    panel.appendChild(body);

    var foot = el('div', 'a11y-foot');
    var reset = el('button', 'a11y-reset', 'Restablecer valores predeterminados');
    reset.addEventListener('click', function () { settings = assign({}, DEFAULTS); apply(); refreshPanel(); });
    foot.appendChild(reset); panel.appendChild(foot);
  }

  function refreshPanel() {
    var sws = panel.querySelectorAll('.a11y-sw'); var i = 0;
    CONTROLS.forEach(function (c) {
      if (c.type === 'toggle') { var sw = sws[i++]; if (sw) sw.setAttribute('aria-pressed', String(!!settings[c.key])); }
      else { var inp = panel.querySelector('input[type=range][aria-labelledby="a11y-lab-' + c.key + '"]'); if (inp) { inp.value = settings[c.key]; var v = inp.parentNode.querySelector('.a11y-val'); if (v) v.textContent = settings[c.key] + 'x'; } }
    });
  }

  function trap(e) {
    if (e.key === 'Escape') { closePanel(); return; }
    if (e.key !== 'Tab') return;
    var f = panel.querySelectorAll('button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])');
    if (!f.length) return; var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { last.focus(); e.preventDefault(); }
    else if (!e.shiftKey && document.activeElement === last) { first.focus(); e.preventDefault(); }
  }
  function openPanel() {
    if (panelOpen) return; panelOpen = true; lastFocus = document.activeElement;
    refreshPanel(); root.appendChild(backdrop); root.appendChild(panel);
    document.addEventListener('keydown', trap);
    setTimeout(function () { var b = panel.querySelector('button'); if (b) b.focus(); }, 50);
  }
  function closePanel() {
    if (!panelOpen) return; panelOpen = false;
    document.removeEventListener('keydown', trap);
    if (backdrop.parentNode) backdrop.parentNode.removeChild(backdrop);
    if (panel.parentNode) panel.parentNode.removeChild(panel);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  // ── Init ────────────────────────────────────────────────────────────────────
  function init() {
    var style = el('style'); style.id = 'a11y-widget-style'; style.textContent = CSS; document.head.appendChild(style);
    root = el('div'); root.id = 'a11y-root'; document.body.appendChild(root);
    launcher = el('button', 'a11y-launch', SVG.a11y);
    launcher.setAttribute('aria-label', 'Abrir opciones de accesibilidad'); launcher.setAttribute('aria-haspopup', 'dialog');
    launcher.addEventListener('click', openPanel); root.appendChild(launcher);
    buildPanel();
    apply(); // aplica preferencias guardadas al cargar
    // API pública mínima
    window.A11yWidget = { open: openPanel, close: closePanel, get: function () { return assign({}, settings); }, set: function (o) { settings = assign({}, settings, o); apply(); refreshPanel(); } };
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
