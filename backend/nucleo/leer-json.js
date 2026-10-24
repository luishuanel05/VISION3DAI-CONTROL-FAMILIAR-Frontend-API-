/** Lee JSON con límite para evitar consumo ilimitado de memoria. */
import { ErrorHttp } from './errores-http.js';
export async function leerJson(solicitud, limite) {
  if (!['POST','PUT','PATCH'].includes(solicitud.method)) return {};
  const tipo=solicitud.headers['content-type']||'';
  if (!tipo.includes('application/json')) throw new ErrorHttp(415,'Se requiere Content-Type application/json');
  const partes=[]; let total=0;
  for await (const parte of solicitud) { total+=parte.length; if(total>limite) throw new ErrorHttp(413,'El cuerpo de la solicitud supera el límite permitido'); partes.push(parte); }
  if (!partes.length) return {};
  try { return JSON.parse(Buffer.concat(partes).toString('utf8')); }
  catch { throw new ErrorHttp(400,'El cuerpo JSON no es válido'); }
}
