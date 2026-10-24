import { obtenerDb } from '../base-datos/conexion.js';
export const listarEventos=(familiaId)=>obtenerDb().prepare('SELECT * FROM eventos_calendario WHERE familia_id=? ORDER BY fecha_inicio').all(familiaId);
export function crearEvento(familiaId,d){const r=obtenerDb().prepare('INSERT INTO eventos_calendario(familia_id,perfil_id,titulo,tipo,fecha_inicio,fecha_fin,descripcion) VALUES(?,?,?,?,?,?,?)').run(familiaId,d.perfilId||null,d.titulo,d.tipo,d.fechaInicio,d.fechaFin||null,d.descripcion||null);return {id:Number(r.lastInsertRowid)};}
