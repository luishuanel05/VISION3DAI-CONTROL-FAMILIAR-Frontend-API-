/** Archivo: entorno.js. Propósito: cargar y validar la configuración sin dependencias externas. */
import fs from 'node:fs';
import path from 'node:path';

function cargarArchivoEnv() {
  const ruta = path.resolve('.env');
  if (!fs.existsSync(ruta)) return;
  for (const linea of fs.readFileSync(ruta, 'utf8').split(/\r?\n/)) {
    const limpia = linea.trim();
    if (!limpia || limpia.startsWith('#') || !limpia.includes('=')) continue;
    const indice = limpia.indexOf('=');
    const clave = limpia.slice(0, indice).trim();
    const valor = limpia.slice(indice + 1).trim().replace(/^['"]|['"]$/g, '');
    if (!(clave in process.env)) process.env[clave] = valor;
  }
}
cargarArchivoEnv();

export const entorno = Object.freeze({
  puerto: Number(process.env.PUERTO || 3000),
  produccion: process.env.ENTORNO === 'produccion',
  rutaBaseDatos: path.resolve(process.env.RUTA_BASE_DATOS || './datos/vision3dai.sqlite'),
  secretoSesion: process.env.SECRETO_SESION || 'solo-desarrollo-cambiar-este-secreto',
  duracionSesionSegundos: Number(process.env.DURACION_SESION_SEGUNDOS || 28800),
  limiteJsonBytes: Number(process.env.LIMITE_JSON_BYTES || 1048576),
  vision3dUrl: process.env.VISION3D_URL || '',
  datosDemo: process.env.DATOS_DEMO === 'true'
});
