/** Controlador visual del calendario. Toda comunicación pasa por api.js. */
import { api } from './api.js';
import { exigirSesion, cerrarSesion } from './sesion.js';
import { mostrarEstado } from './utilidades.js';
import { cargarComponentes } from './cargador-componentes.js';

let eventos = [];

await exigirSesion();
await cargarComponentes();
document.getElementById('salir').addEventListener('click', cerrarSesion);
document.getElementById('formulario-evento').addEventListener('submit', guardarEvento);
document.getElementById('filtro-tipo').addEventListener('change', representarEventos);
await obtenerEventos();

async function obtenerEventos(){
  establecerCarga(true);
  try { eventos = await api('/api/calendario/eventos'); representarResumen(); representarEventos(); }
  catch(error){ mostrarEstado('estado', error.message); }
  finally { establecerCarga(false); }
}

async function guardarEvento(eventoFormulario){
  eventoFormulario.preventDefault();
  const formulario = eventoFormulario.currentTarget;
  if(!formulario.reportValidity()) return;
  const boton = formulario.querySelector('button[type="submit"]');
  boton.disabled = true;
  try {
    await api('/api/calendario/eventos',{metodo:'POST',datos:Object.fromEntries(new FormData(formulario))});
    formulario.reset();
    mostrarEstado('estado','Evento guardado correctamente','success');
    await obtenerEventos();
  } catch(error){ mostrarEstado('estado',error.message); }
  finally { boton.disabled=false; }
}

function representarEventos(){
  const filtro=document.getElementById('filtro-tipo').value;
  const visibles=filtro?eventos.filter(evento=>evento.tipo===filtro):eventos;
  const lista=document.getElementById('lista-eventos');
  const vacio=document.getElementById('sin-eventos');
  lista.replaceChildren();
  for(const evento of visibles) lista.append(crearNodoEvento(evento));
  lista.hidden=visibles.length===0;
  vacio.hidden=visibles.length!==0;
}

function crearNodoEvento(evento){
  const fecha=new Date(evento.fecha_inicio);
  const elemento=document.createElement('li');
  elemento.className='evento';
  const fechaVisual=document.createElement('time');
  fechaVisual.className='evento__fecha';
  fechaVisual.dateTime=evento.fecha_inicio;
  fechaVisual.textContent=Number.isNaN(fecha.getTime())?'--':fecha.toLocaleDateString('es-CL',{day:'2-digit',month:'short'});
  const contenido=document.createElement('div');
  const titulo=document.createElement('h3'); titulo.className='evento__titulo'; titulo.textContent=evento.titulo;
  const meta=document.createElement('div'); meta.className='evento__meta'; meta.textContent=Number.isNaN(fecha.getTime())?evento.fecha_inicio:fecha.toLocaleString('es-CL');
  contenido.append(titulo,meta);
  const tipo=document.createElement('span'); tipo.className='insignia-tipo'; tipo.textContent=evento.tipo;
  elemento.append(fechaVisual,contenido,tipo);
  return elemento;
}

function representarResumen(){
  document.getElementById('total-eventos').textContent=eventos.length;
  document.getElementById('eventos-actividad').textContent=eventos.filter(e=>e.tipo==='actividad').length;
  document.getElementById('eventos-metas').textContent=eventos.filter(e=>e.tipo==='meta').length;
  document.getElementById('eventos-vision3d').textContent=eventos.filter(e=>e.tipo==='vision3d').length;
}
function establecerCarga(activa){document.getElementById('cargando-eventos').hidden=!activa;if(activa){document.getElementById('lista-eventos').hidden=true;document.getElementById('sin-eventos').hidden=true;}}
