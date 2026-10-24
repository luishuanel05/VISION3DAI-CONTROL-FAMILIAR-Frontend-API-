import fs from 'node:fs/promises'; import { obtenerDb } from './conexion.js';
export async function inicializarBaseDatos(){const sql=await fs.readFile(new URL('./esquema.sql',import.meta.url),'utf8');obtenerDb().exec(sql);}
