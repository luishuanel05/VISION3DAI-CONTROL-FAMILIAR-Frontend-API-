/** Compara rutas declarativas y extrae parámetros dinámicos. */
export function coincidirRuta(patron,pathname) {
  const a=patron.split('/').filter(Boolean), b=pathname.split('/').filter(Boolean); if(a.length!==b.length)return null;
  const parametros={}; for(let i=0;i<a.length;i++){ if(a[i].startsWith(':')) parametros[a[i].slice(1)]=decodeURIComponent(b[i]); else if(a[i]!==b[i])return null; }
  return parametros;
}
