# VISION3DAI Control Familiar

Tablero familiar construido con **Node.js puro**, `node:http`, HTML, Bootstrap, JavaScript modular, Chart.js y SQLite. **No utiliza Express ni otro framework HTTP.** VISION3D ya fue desarrollado por Richard; este repositorio solo muestra un acceso configurable y no recrea cámara, predicciones ni entrenamiento.

## Requisitos
- Node.js 24 o superior, por el módulo nativo `node:sqlite`.
- Navegador moderno.

## Inicio rápido
```bash
cp .env.example .env
npm run migrar
npm start
```
Abre `http://localhost:3000`, registra una cuenta, inicia sesión, crea una familia y añade perfiles.

## Scripts
- `npm run desarrollo`: servidor con recarga automática.
- `npm start`: ejecución normal.
- `npm test`: pruebas con `node:test`.
- `npm run migrar`: crea o actualiza el esquema.
- `npm run sembrar`: ayuda para datos iniciales.
- `npm run verificar`: valida estructura y ausencia de Express.

## VISION3D
Configura `VISION3D_URL` en `.env`. El dashboard consulta `/api/configuracion/vision3d` y habilita el botón solo si existe una URL. No se incrusta ni se inventan resultados.

## Seguridad
Las contraseñas usan `crypto.scrypt` con sal única. Las sesiones persistentes guardan en SQLite solo el hash SHA-256 del token. Las cookies son `HttpOnly`, `SameSite=Lax` y `Secure` en producción. Las consultas usan parámetros.

## Estructura
- `backend/nucleo`: infraestructura HTTP propia.
- `backend/controladores`: adaptación HTTP.
- `backend/servicios`: reglas de negocio.
- `backend/repositorios`: acceso exclusivo a SQLite.
- `frontend`: HTML, CSS y JavaScript.
- `docs/richard`: transferencia técnica.

## Dataset imagePoses.csv
Se incluye el archivo recibido en `datos/entrenamiento/imagePoses.csv`, junto con un resumen normalizado y el endpoint autenticado `GET /api/entrenamiento/imageposes/resumen`. El tablero no ejecuta el entrenamiento; entrega estadísticas limpias para que Richard conecte su proceso existente.
