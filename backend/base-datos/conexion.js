/** Mantiene una única conexión SQLite para el proceso. */
import fs from 'node:fs'; import path from 'node:path'; import { DatabaseSync } from 'node:sqlite'; import { entorno } from '../configuracion/entorno.js';
let baseDatos;
export function obtenerDb(){if(!baseDatos){fs.mkdirSync(path.dirname(entorno.rutaBaseDatos),{recursive:true});baseDatos=new DatabaseSync(entorno.rutaBaseDatos);baseDatos.exec('PRAGMA foreign_keys = ON; PRAGMA journal_mode = WAL;');}return baseDatos;}
export function cerrarDb(){if(baseDatos){baseDatos.close();baseDatos=null;}}
