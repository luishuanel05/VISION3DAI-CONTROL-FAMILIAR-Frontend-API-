# Datos de imagePoses.csv

El archivo original se conserva en `datos/entrenamiento/imagePoses.csv`. Contiene imágenes Base64, dimensiones, landmarks serializados y una etiqueta escrita como `excercise`. Para evitar respuestas HTTP enormes, el navegador consume `GET /api/entrenamiento/imageposes/resumen`, que lee un resumen normalizado sin devolver Base64.

## Contrato
- `totalMuestras`: filas procesadas.
- `muestrasConLandmarks`: filas con contenido en `poseLandmarks`.
- `muestrasSinLandmarks`: filas sin landmarks.
- `etiquetas`: recuento por clase.
- `muestras`: vista segura de ejemplos sin imagen Base64.

## Responsabilidades
Este tablero muestra y entrega metadatos. El entrenamiento real sigue siendo responsabilidad del sistema de Richard. Si Richard necesita leer filas completas, debe crear un proceso dedicado de importación que respete campos CSV multilínea y normalice explícitamente `excercise` a `exercise`.
