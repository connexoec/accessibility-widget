// El widget avisa de versiones nuevas comparando su VERSION con la última de npm.
// Si no coincide con package.json, avisaría mal para siempre: se frena el build.
const fs = require('fs');
const path = require('path');

const pkg = require('../package.json');
const src = fs.readFileSync(path.join(__dirname, '..', 'a11y-widget.js'), 'utf8');
const m = /var VERSION = '([^']+)'/.exec(src);

if (!m || m[1] !== pkg.version) {
  console.error(
    'VERSION en a11y-widget.js (' + (m ? m[1] : 'no encontrada') +
    ') no coincide con la de package.json (' + pkg.version + '). Corrígela y vuelve a compilar.'
  );
  process.exit(1);
}
