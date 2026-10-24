import { recuperarSesion } from '../middlewares/recuperar-sesion.js';
import { exigirAutenticacion } from '../middlewares/exigir-autenticacion.js';
import { resumen } from '../controladores/entrenamiento-controlador.js';
export function registrarRutasEntrenamiento(enrutador){enrutador.get('/api/entrenamiento/imageposes/resumen',recuperarSesion,exigirAutenticacion,resumen);}
