import { obtenerDb } from '../base-datos/conexion.js';
export const buscarUsuarioPorCorreo=(correo)=>obtenerDb().prepare('SELECT * FROM usuarios WHERE correo=? AND activo=1').get(correo);
export const buscarUsuarioPorId=(id)=>obtenerDb().prepare('SELECT id,nombre,apellido,correo,rol,activo,creado_en,ultimo_acceso_en FROM usuarios WHERE id=?').get(id);
export function crearUsuario({nombre,apellido,correo,claveHash}){const r=obtenerDb().prepare('INSERT INTO usuarios(nombre,apellido,correo,clave_hash) VALUES(?,?,?,?)').run(nombre,apellido,correo,claveHash);return buscarUsuarioPorId(Number(r.lastInsertRowid));}
export const marcarAcceso=(id)=>obtenerDb().prepare('UPDATE usuarios SET ultimo_acceso_en=CURRENT_TIMESTAMP WHERE id=?').run(id);
