import { obtenerDb } from './conexion.js';
export function ejecutarTransaccion(operacion){const db=obtenerDb();db.exec('BEGIN');try{const r=operacion(db);db.exec('COMMIT');return r;}catch(e){db.exec('ROLLBACK');throw e;}}
