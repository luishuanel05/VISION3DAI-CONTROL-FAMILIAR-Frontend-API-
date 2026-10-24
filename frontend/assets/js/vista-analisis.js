/** Renderizado seguro de resultados de análisis en el dashboard. */
import { crearModeloAnalisis, textoDisponible } from './logica-dashboard.js';

export function mostrarResumenAnalisis(datos) {
  const modelo = crearModeloAnalisis(datos);
  asignar('analisisSesiones', modelo.sesiones);
  asignar('analisisRepeticiones', modelo.repeticiones);
  asignar('analisisCorrectas', textoDisponible(modelo.porcentajeCorrectas, '%'));
  asignar('analisisConfianza', textoDisponible(modelo.confianza, '%'));
  asignar('analisisVisibilidad', textoDisponible(modelo.visibilidad, '%'));
  asignar('analisisInferencia', textoDisponible(modelo.inferencia, ' ms'));
  representarRecientes(modelo.recientes);
  representarEjercicios(modelo.ejercicios);
}

function asignar(id, valor) { const elemento = document.getElementById(id); if (elemento) elemento.textContent = valor; }

function representarRecientes(resultados) {
  const contenedor = document.getElementById('analisisRecientes');
  contenedor.replaceChildren();
  if (!resultados.length) {
    const vacio = document.createElement('p');
    vacio.className = 'analisis-vacio';
    vacio.textContent = 'Aún no hay análisis registrados.';
    contenedor.append(vacio);
    return;
  }
  for (const resultado of resultados) {
    const articulo = document.createElement('article');
    articulo.className = 'analisis-reciente';
    articulo.innerHTML = `
      <div>
        <strong>${escapar(resultado.ejercicio)}</strong>
        <span>${escapar(new Date(resultado.fecha).toLocaleString('es-CL'))}</span>
      </div>
      <div class="analisis-reciente__resultado">
        <strong>${resultado.repeticiones ?? '—'}</strong>
        <span>${etiquetaResultado(resultado.resultado)}</span>
      </div>`;
    contenedor.append(articulo);
  }
}

function representarEjercicios(ejercicios) {
  const contenedor = document.getElementById('analisisEjercicios');
  contenedor.replaceChildren();
  for (const ejercicio of ejercicios) {
    const fila = document.createElement('div');
    fila.className = 'ejercicio-resumen';
    const nombre = document.createElement('span'); nombre.textContent = ejercicio.ejercicio;
    const valor = document.createElement('strong'); valor.textContent = `${ejercicio.repeticiones || 0} rep.`;
    fila.append(nombre, valor); contenedor.append(fila);
  }
  if (!ejercicios.length) contenedor.textContent = 'Sin ejercicios analizados.';
}

function etiquetaResultado(valor) {
  if (valor === 'correcto') return 'Realizado correctamente';
  if (valor === 'mejorable') return 'Puede mejorar';
  return 'Sin evaluación';
}

function escapar(valor) {
  const elemento = document.createElement('span');
  elemento.textContent = String(valor ?? '');
  return elemento.innerHTML;
}
