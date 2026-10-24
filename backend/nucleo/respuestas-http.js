/** Centraliza respuestas JSON con formato uniforme. */
export function responderJson(respuesta, estado, cuerpo, cabeceras={}) {
  const contenido=JSON.stringify(cuerpo);
  respuesta.writeHead(estado, {'Content-Type':'application/json; charset=utf-8','Content-Length':Buffer.byteLength(contenido),...cabeceras});
  respuesta.end(contenido);
}
export const correcto=(respuesta,datos={},mensaje='Operación realizada correctamente',estado=200)=>responderJson(respuesta,estado,{correcto:true,mensaje,datos});
export const fallo=(respuesta,estado,mensaje,errores=[])=>responderJson(respuesta,estado,{correcto:false,mensaje,errores});
