import { obtenerDb } from '../base-datos/conexion.js';
export const listarMetas=(familiaId)=>obtenerDb().prepare('SELECT * FROM metas WHERE familia_id=? ORDER BY creado_en DESC').all(familiaId);
export function crearMeta(familiaId,d){const r=obtenerDb().prepare('INSERT INTO metas(familia_id,perfil_id,titulo,descripcion,categoria,tipo,valor_objetivo,unidad,fecha_objetivo) VALUES(?,?,?,?,?,?,?,?,?)').run(familiaId,d.perfilId||null,d.titulo,d.descripcion||null,d.categoria,d.tipo||'individual',d.valorObjetivo,d.unidad,d.fechaObjetivo||null);return {id:Number(r.lastInsertRowid)};}
