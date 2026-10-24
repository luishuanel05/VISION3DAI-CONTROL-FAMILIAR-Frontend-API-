/** Acceso exclusivo a resultados reales enviados por VISION3D. */
import { obtenerDb } from '../base-datos/conexion.js';

export function registrarAnalisis(familiaId, datos) {
  const consulta = obtenerDb().prepare(`
    INSERT INTO analisis_vision3d (
      familia_id, perfil_id, id_externo, ejercicio, repeticiones,
      repeticiones_correctas, repeticiones_mejorables, confianza_promedio,
      visibilidad_landmarks_promedio, tiempo_inferencia_ms, duracion_segundos,
      resultado, modelo_version, fecha, datos_adicionales_json
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(familia_id, id_externo) DO UPDATE SET
      ejercicio = excluded.ejercicio,
      repeticiones = excluded.repeticiones,
      repeticiones_correctas = excluded.repeticiones_correctas,
      repeticiones_mejorables = excluded.repeticiones_mejorables,
      confianza_promedio = excluded.confianza_promedio,
      visibilidad_landmarks_promedio = excluded.visibilidad_landmarks_promedio,
      tiempo_inferencia_ms = excluded.tiempo_inferencia_ms,
      duracion_segundos = excluded.duracion_segundos,
      resultado = excluded.resultado,
      modelo_version = excluded.modelo_version,
      fecha = excluded.fecha,
      datos_adicionales_json = excluded.datos_adicionales_json
  `);
  const resultado = consulta.run(
    familiaId, datos.perfilId ?? null, datos.idExterno ?? null, datos.ejercicio,
    datos.repeticiones ?? null, datos.repeticionesCorrectas ?? null,
    datos.repeticionesMejorables ?? null, datos.confianzaPromedio ?? null,
    datos.visibilidadLandmarksPromedio ?? null, datos.tiempoInferenciaMs ?? null,
    datos.duracionSegundos ?? null, datos.resultado ?? null,
    datos.modeloVersion ?? null, datos.fecha ?? new Date().toISOString(),
    datos.datosAdicionales ? JSON.stringify(datos.datosAdicionales) : null
  );
  return { id: Number(resultado.lastInsertRowid), idExterno: datos.idExterno ?? null };
}

export function obtenerResumenAnalisis(familiaId) {
  const db = obtenerDb();
  const totales = db.prepare(`
    SELECT COUNT(*) AS sesiones,
      COALESCE(SUM(repeticiones), 0) AS repeticiones,
      COALESCE(SUM(repeticiones_correctas), 0) AS correctas,
      COALESCE(SUM(repeticiones_mejorables), 0) AS mejorables,
      AVG(confianza_promedio) AS confianza,
      AVG(visibilidad_landmarks_promedio) AS visibilidad,
      AVG(tiempo_inferencia_ms) AS inferencia,
      AVG(duracion_segundos) AS duracion
    FROM analisis_vision3d WHERE familia_id = ?
  `).get(familiaId);
  const ejercicios = db.prepare(`
    SELECT ejercicio, COUNT(*) AS sesiones, COALESCE(SUM(repeticiones), 0) AS repeticiones,
      AVG(confianza_promedio) AS confianza
    FROM analisis_vision3d WHERE familia_id = ?
    GROUP BY ejercicio ORDER BY sesiones DESC, ejercicio ASC LIMIT 8
  `).all(familiaId);
  const recientes = db.prepare(`
    SELECT id, ejercicio, repeticiones, repeticiones_correctas, repeticiones_mejorables,
      confianza_promedio, visibilidad_landmarks_promedio, tiempo_inferencia_ms,
      duracion_segundos, resultado, modelo_version, fecha
    FROM analisis_vision3d WHERE familia_id = ? ORDER BY fecha DESC LIMIT 8
  `).all(familiaId);
  const porcentajeCorrectas = totales.repeticiones > 0
    ? (totales.correctas / totales.repeticiones) * 100
    : null;
  return { ...totales, porcentajeCorrectas, ejercicios, recientes };
}
