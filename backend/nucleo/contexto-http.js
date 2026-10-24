/** Crea el contexto uniforme utilizado por rutas, controladores y middlewares. */
import { analizarCookies } from './analizar-cookies.js';
export function crearContexto(solicitud,respuesta,url,cuerpo,parametros){return {solicitud,respuesta,url,cuerpo,parametros,consulta:Object.fromEntries(url.searchParams),cookies:analizarCookies(solicitud.headers.cookie||''),usuario:null,sesion:null};}
