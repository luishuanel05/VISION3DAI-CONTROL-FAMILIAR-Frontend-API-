/** Deriva contraseñas con scrypt, sal única y comparación constante. */
import { randomBytes,scrypt as scryptCb,timingSafeEqual } from 'node:crypto'; import { promisify } from 'node:util'; const scrypt=promisify(scryptCb);
export async function crearHashContrasena(clave){const sal=randomBytes(16);const hash=await scrypt(clave,sal,64);return `scrypt$${sal.toString('hex')}$${Buffer.from(hash).toString('hex')}`;}
export async function verificarContrasena(clave,almacenado){try{const [alg,salHex,hashHex]=almacenado.split('$');if(alg!=='scrypt')return false;const esperado=Buffer.from(hashHex,'hex');const actual=Buffer.from(await scrypt(clave,Buffer.from(salHex,'hex'),esperado.length));return actual.length===esperado.length&&timingSafeEqual(actual,esperado);}catch{return false;}}
