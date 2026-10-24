/** Enrutador mínimo para Node.js puro. */
import { coincidirRuta } from './coincidencia-rutas.js';
import { crearContexto } from './contexto-http.js';
import { leerJson } from './leer-json.js';
import { ejecutarMiddlewares } from './ejecutar-middlewares.js';
import { ErrorHttp } from './errores-http.js';
export class Enrutador {
  constructor({limiteJsonBytes}){this.rutas=[];this.limiteJsonBytes=limiteJsonBytes;}
  registrar(metodo,ruta,...manejadores){const controlador=manejadores.pop();this.rutas.push({metodo,ruta,middlewares:manejadores,controlador});}
  get(r,...m){this.registrar('GET',r,...m)} post(r,...m){this.registrar('POST',r,...m)} put(r,...m){this.registrar('PUT',r,...m)} patch(r,...m){this.registrar('PATCH',r,...m)} delete(r,...m){this.registrar('DELETE',r,...m)}
  async resolver(solicitud,respuesta){const url=new URL(solicitud.url,`http://${solicitud.headers.host||'localhost'}`); for(const ruta of this.rutas){if(ruta.metodo!==solicitud.method)continue; const parametros=coincidirRuta(ruta.ruta,url.pathname); if(!parametros)continue; const cuerpo=await leerJson(solicitud,this.limiteJsonBytes); const contexto=crearContexto(solicitud,respuesta,url,cuerpo,parametros); await ejecutarMiddlewares(contexto,ruta.middlewares,ruta.controlador); return true;} return false;}
}
