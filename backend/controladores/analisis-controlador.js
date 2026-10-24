/** Controladores HTTP para resultados producidos por VISION3D. */
import { correcto } from '../nucleo/respuestas-http.js';
import { obtenerResumen, recibirResultado } from '../servicios/analisis-servicio.js';
export function resumen(contexto) { correcto(contexto.respuesta, obtenerResumen(contexto.usuario.id)); }
export function recibir(contexto) { correcto(contexto.respuesta, recibirResultado(contexto.usuario.id, contexto.cuerpo), 'Resultado recibido', 201); }
