/** Construye cookies de sesión con atributos seguros. */
export function crearCookie(nombre,valor,{maxAge=0,segura=false}={}) { const p=[`${nombre}=${encodeURIComponent(valor)}`,'HttpOnly','SameSite=Lax','Path=/']; if(maxAge) p.push(`Max-Age=${maxAge}`); if(segura)p.push('Secure'); return p.join('; '); }
export function eliminarCookie(nombre,{segura=false}={}) { return crearCookie(nombre,'',{maxAge:1,segura})+'; Expires=Thu, 01 Jan 1970 00:00:00 GMT'; }
