/** Ejecuta middlewares en secuencia y finaliza en el controlador. */
export async function ejecutarMiddlewares(contexto,middlewares,controlador){let indice=-1; async function siguiente(){indice++; const funcion=middlewares[indice]||controlador; if(funcion) return funcion(contexto,siguiente);} return siguiente();}
