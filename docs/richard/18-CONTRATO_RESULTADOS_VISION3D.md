# Contrato de resultados VISION3D

## Escritura
`POST /api/analisis/resultados`

El cuerpo acepta identificador externo, perfil, ejercicio, repeticiones, repeticiones correctas o mejorables, confianza media, visibilidad media de landmarks, tiempo de inferencia, duración, resultado y versión del modelo.

## Lectura
`GET /api/analisis/resumen`

Devuelve agregados familiares y resultados recientes. Los valores que Richard no envíe permanecen en `null` y el tablero muestra `Sin datos`. El tablero no determina por sí mismo si un ejercicio está bien realizado.

## Dataset
`imagePoses.csv` sirve como referencia de clases y cobertura de landmarks. Como no contiene una etiqueta explícita de calidad de ejecución, no debe utilizarse por sí solo para afirmar que una repetición fue correcta o incorrecta.

## Separación
- `logica.html`: contrato visible de integración.
- `logica-dashboard.js`: normalización de datos.
- `vista-analisis.js`: representación en DOM.
- `analisis-servicio.js`: validación del contrato.
- `analisis-repositorio.js`: persistencia y agregados SQLite.
