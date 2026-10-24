/** Valida y transforma el contrato de resultados enviado por VISION3D. */
import { asegurarFamilia } from './familias-servicio.js';
import { pertenecePerfil } from '../repositorios/perfiles-repositorio.js';
import { registrarAnalisis, obtenerResumenAnalisis } from '../repositorios/analisis-repositorio.js';
import { ErrorHttp } from '../nucleo/errores-http.js';
import { exigirTexto } from '../utilidades/validaciones.js';

function numeroOpcional(valor, campo, minimo = 0, maximo = Infinity) {
  if (valor === undefined || valor === null || valor === '') return null;
  const numero = Number(valor);
  if (!Number.isFinite(numero) || numero < minimo || numero > maximo) {
    throw new ErrorHttp(400, `El campo ${campo} no es válido`);
  }
  return numero;
}

export function obtenerResumen(usuarioId) {
  return obtenerResumenAnalisis(asegurarFamilia(usuarioId).id);
}

export function recibirResultado(usuarioId, entrada) {
  const familia = asegurarFamilia(usuarioId);
  const perfilId = numeroOpcional(entrada.perfilId, 'perfilId', 1);
  if (perfilId && !pertenecePerfil(perfilId, familia.id)) {
    throw new ErrorHttp(403, 'El perfil no pertenece a tu familia');
  }
  const repeticiones = numeroOpcional(entrada.repeticiones, 'repeticiones', 0);
  const correctas = numeroOpcional(entrada.repeticionesCorrectas, 'repeticionesCorrectas', 0);
  const mejorables = numeroOpcional(entrada.repeticionesMejorables, 'repeticionesMejorables', 0);
  if (repeticiones !== null && (correctas ?? 0) + (mejorables ?? 0) > repeticiones) {
    throw new ErrorHttp(400, 'Las repeticiones clasificadas superan el total');
  }
  return registrarAnalisis(familia.id, {
    ...entrada,
    perfilId,
    ejercicio: exigirTexto(entrada.ejercicio, 'ejercicio', 2, 80),
    repeticiones,
    repeticionesCorrectas: correctas,
    repeticionesMejorables: mejorables,
    confianzaPromedio: numeroOpcional(entrada.confianzaPromedio, 'confianzaPromedio', 0, 1),
    visibilidadLandmarksPromedio: numeroOpcional(entrada.visibilidadLandmarksPromedio, 'visibilidadLandmarksPromedio', 0, 1),
    tiempoInferenciaMs: numeroOpcional(entrada.tiempoInferenciaMs, 'tiempoInferenciaMs', 0),
    duracionSegundos: numeroOpcional(entrada.duracionSegundos, 'duracionSegundos', 0)
  });
}
