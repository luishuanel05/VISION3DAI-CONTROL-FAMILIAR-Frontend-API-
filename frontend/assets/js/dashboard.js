/** Orquestador del dashboard. La transformación visual vive en módulos separados. */
import { api } from './api.js';
import { exigirSesion, cerrarSesion } from './sesion.js';
import { mostrarEstado } from './utilidades.js';
import { mostrarResumenAnalisis } from './vista-analisis.js';

let grafico;
iniciar();

async function iniciar() {
  const usuario = await exigirSesion();
  document.getElementById('usuario').textContent = `${usuario.nombre} ${usuario.apellido}`;
  document.getElementById('salir').onclick = cerrarSesion;
  try {
    const [dashboard, analisis] = await Promise.all([
      api('/api/dashboard/resumen'),
      api('/api/analisis/resumen')
    ]);
    representarDashboard(dashboard);
    mostrarResumenAnalisis(analisis);
  } catch (error) {
    if (error.message.includes('crear una familia')) location.href = '/crear-familia.html';
    else mostrarEstado('estado', error.message);
  }
  await cargarVision();
}

function representarDashboard(datos) {
  document.getElementById('familia').textContent = datos.familia.nombre;
  document.getElementById('perfiles').textContent = datos.perfiles;
  document.getElementById('agua').textContent = `${datos.aguaMl} ml`;
  document.getElementById('actividad').textContent = `${datos.minutosActividad} min`;
  document.getElementById('metas').textContent = datos.metasActivas;
  const lista = document.getElementById('eventos');
  lista.replaceChildren(...(datos.proximosEventos.length
    ? datos.proximosEventos.map(crearEvento)
    : [crearMensajeVacio('Sin eventos próximos')]));
  crearGrafico(datos);
}

function crearEvento(evento) {
  const elemento = document.createElement('li');
  elemento.className = 'lista-dashboard__elemento';
  const titulo = document.createElement('span'); titulo.className = 'lista-dashboard__titulo'; titulo.textContent = evento.titulo;
  const fecha = document.createElement('span'); fecha.className = 'lista-dashboard__meta'; fecha.textContent = evento.fecha_inicio;
  elemento.append(titulo, fecha); return elemento;
}

function crearMensajeVacio(texto) {
  const elemento = document.createElement('li'); elemento.className = 'lista-dashboard__elemento';
  const mensaje = document.createElement('span'); mensaje.className = 'lista-dashboard__meta'; mensaje.textContent = texto;
  elemento.append(mensaje); return elemento;
}

function crearGrafico(datos) {
  grafico?.destroy();
  grafico = new Chart(document.getElementById('grafico'), {
    type: 'bar',
    data: {
      labels: ['Agua (100 ml)', 'Actividad (min)', 'Metas activas'],
      datasets: [{ data: [datos.aguaMl / 100, datos.minutosActividad, datos.metasActivas], backgroundColor: ['#34d399', '#10b981', '#047857'], borderRadius: 8 }]
    },
    options: { responsive: true, plugins: { legend: { display: false } }, scales: { x: { ticks: { color: '#b7d7c7' }, grid: { display: false } }, y: { beginAtZero: true, ticks: { color: '#b7d7c7' }, grid: { color: 'rgba(167,243,208,.1)' } } } }
  });
}

async function cargarVision() {
  const datos = await api('/api/configuracion/vision3d');
  const boton = document.getElementById('abrirVision');
  const tarjeta = document.getElementById('tarjetaVision');
  boton.disabled = !datos.disponible;
  tarjeta.disabled = !datos.disponible;
  document.getElementById('estadoVision').textContent = datos.mensaje;
  const abrir = async () => {
    if (!datos.disponible) return;
    await api('/api/vision3d/registrar-acceso', { metodo: 'POST', datos: {} });
    window.open(datos.url, '_blank', 'noopener,noreferrer');
  };
  boton.onclick = abrir; tarjeta.onclick = abrir;
}
