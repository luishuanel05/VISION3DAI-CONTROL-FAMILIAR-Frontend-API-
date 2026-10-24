/**
 * Normaliza resultados de la API para presentarlos al usuario.
 * No calcula corrección postural ni infiere resultados ausentes.
 */
export function crearModeloAnalisis(datos) {
  const porcentaje = valor => valor === null || valor === undefined
    ? null
    : Math.round(Number(valor) * 100);
  return {
    sesiones: Number(datos.sesiones || 0),
    repeticiones: Number(datos.repeticiones || 0),
    correctas: Number(datos.correctas || 0),
    mejorables: Number(datos.mejorables || 0),
    porcentajeCorrectas: datos.porcentajeCorrectas === null ? null : Math.round(datos.porcentajeCorrectas),
    confianza: porcentaje(datos.confianza),
    visibilidad: porcentaje(datos.visibilidad),
    inferencia: datos.inferencia === null ? null : Math.round(datos.inferencia),
    duracion: datos.duracion === null ? null : Math.round(datos.duracion),
    ejercicios: Array.isArray(datos.ejercicios) ? datos.ejercicios : [],
    recientes: Array.isArray(datos.recientes) ? datos.recientes : []
  };
}

export function textoDisponible(valor, sufijo = '') {
  return valor === null || valor === undefined ? 'Sin datos' : `${valor}${sufijo}`;
}
