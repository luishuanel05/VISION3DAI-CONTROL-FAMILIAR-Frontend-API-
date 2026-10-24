/** Adapta el resumen del dataset al contrato HTTP del tablero. */
import { correcto } from '../nucleo/respuestas-http.js';
import { obtenerResumenImagePoses } from '../integraciones/imageposes/servicio-imageposes.js';
export async function resumen(contexto){correcto(contexto.respuesta,await obtenerResumenImagePoses());}
