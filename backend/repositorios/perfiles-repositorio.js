import { obtenerDb } from '../base-datos/conexion.js';
export const listarPerfiles=(familiaId)=>obtenerDb().prepare('SELECT * FROM perfiles WHERE familia_id=? AND activo=1 ORDER BY id').all(familiaId);
export function crearPerfil(familiaId,{nombre,alias='',color='#198754',tipo='integrante'}){const r=obtenerDb().prepare('INSERT INTO perfiles(familia_id,nombre,alias,color,tipo) VALUES(?,?,?,?,?)').run(familiaId,nombre,alias,color,tipo);return obtenerDb().prepare('SELECT * FROM perfiles WHERE id=?').get(Number(r.lastInsertRowid));}
export const pertenecePerfil=(perfilId,familiaId)=>Boolean(obtenerDb().prepare('SELECT 1 FROM perfiles WHERE id=? AND familia_id=? AND activo=1').get(perfilId,familiaId));
