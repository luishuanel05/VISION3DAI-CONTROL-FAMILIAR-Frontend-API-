import { recuperarSesion } from '../middlewares/recuperar-sesion.js';
import { exigirAutenticacion } from '../middlewares/exigir-autenticacion.js';
import { resumen, recibir } from '../controladores/analisis-controlador.js';
export function registrarRutasAnalisis(enrutador) {
  enrutador.get('/api/analisis/resumen', recuperarSesion, exigirAutenticacion, resumen);
  enrutador.post('/api/analisis/resultados', recuperarSesion, exigirAutenticacion, recibir);
}
