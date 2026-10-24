import { obtenerDb } from '../base-datos/conexion.js';
export const familiaDeUsuario=(usuarioId)=>obtenerDb().prepare('SELECT * FROM familias WHERE usuario_propietario_id=?').get(usuarioId);
export function crearFamilia(usuarioId,nombre){const r=obtenerDb().prepare('INSERT INTO familias(usuario_propietario_id,nombre) VALUES(?,?)').run(usuarioId,nombre);return obtenerDb().prepare('SELECT * FROM familias WHERE id=?').get(Number(r.lastInsertRowid));}
export function actualizarFamilia(usuarioId,nombre){obtenerDb().prepare('UPDATE familias SET nombre=? WHERE usuario_propietario_id=?').run(nombre,usuarioId);return familiaDeUsuario(usuarioId);}
