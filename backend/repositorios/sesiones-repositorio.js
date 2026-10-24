import { obtenerDb } from '../base-datos/conexion.js';
export function crearSesion({usuarioId,tokenHash,creadoEn,expiraEn}){obtenerDb().prepare('INSERT INTO sesiones(usuario_id,token_hash,creado_en,expira_en,ultimo_uso_en) VALUES(?,?,?,?,?)').run(usuarioId,tokenHash,creadoEn,expiraEn,creadoEn);}
export function buscarSesion(tokenHash){return obtenerDb().prepare(`SELECT s.*,u.nombre,u.apellido,u.correo,u.rol FROM sesiones s JOIN usuarios u ON u.id=s.usuario_id WHERE s.token_hash=? AND s.revocada=0 AND s.expira_en>datetime('now') AND u.activo=1`).get(tokenHash);}
export const revocarSesion=(tokenHash)=>obtenerDb().prepare('UPDATE sesiones SET revocada=1 WHERE token_hash=?').run(tokenHash);
export const tocarSesion=(id)=>obtenerDb().prepare('UPDATE sesiones SET ultimo_uso_en=CURRENT_TIMESTAMP WHERE id=?').run(id);
