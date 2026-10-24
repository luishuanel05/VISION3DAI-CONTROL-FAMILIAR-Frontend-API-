/**
 * Archivo: servicio-imageposes.js
 * Propósito: exponer estadísticas ya normalizadas de imagePoses.csv.
 * Importante: no entrena modelos, no devuelve Base64 y no interpreta landmarks.
 */
import fs from 'node:fs/promises';
const rutaResumen = new URL('../../../datos/entrenamiento/resumen-imageposes.json', import.meta.url);
export async function obtenerResumenImagePoses(){return JSON.parse(await fs.readFile(rutaResumen,'utf8'));}
