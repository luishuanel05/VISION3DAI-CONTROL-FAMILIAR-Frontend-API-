/** Convierte la cabecera Cookie en un objeto seguro. */
export function analizarCookies(cabecera='') { return Object.fromEntries(cabecera.split(';').map(v=>v.trim()).filter(Boolean).map(v=>{const i=v.indexOf('='); return [decodeURIComponent(v.slice(0,i)),decodeURIComponent(v.slice(i+1))]})); }
