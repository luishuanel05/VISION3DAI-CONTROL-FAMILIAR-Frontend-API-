# Estándar frontend para Richard

## Separación obligatoria

- Los archivos HTML contienen únicamente estructura semántica y puntos de montaje.
- `frontend/assets/css/base.css` importa las capas CSS en un orden estable.
- Los estilos globales se reparten entre tokens, reset, tipografía, layout, navegación, componentes, formularios, botones y estados.
- Cada página compleja tiene una hoja propia, por ejemplo `calendario.css` y `dashboard.css`.
- No se permiten estilos `style="..."` en HTML.
- Todas las llamadas HTTP pasan por `frontend/assets/js/api.js`.
- Las secciones conectables usan `id` y `data-api-modulo` estables.

## Convención CSS

Se usa una variante ligera de BEM:

- Bloque: `.panel`
- Elemento: `.panel__cabecera`
- Modificador: `.panel--destacado`

Los colores, espacios, radios y sombras deben proceder de `variables.css`. No se deben introducir colores hexadecimales en los componentes.

## Componentes HTML

El calendario está separado en:

- `componentes/calendario/cabecera.html`
- `componentes/calendario/resumen.html`
- `componentes/calendario/formulario-evento.html`
- `componentes/calendario/lista-eventos.html`

`cargador-componentes.js` inserta esos fragmentos antes de conectar listeners. Los fragmentos no deben contener scripts ni estilos.

## Integración API

El atributo `data-api-modulo` documenta la intención del bloque visual. No contiene lógica ni URLs. Las URLs permanecen en los módulos JavaScript para evitar acoplar la plantilla al backend.

## Revisión previa a entrega

1. Ejecutar `npm test`.
2. Ejecutar `npm run verificar`.
3. Buscar atributos `style` en `frontend`.
4. Comprobar navegación con teclado.
5. Probar 360 px, 768 px, 1024 px y escritorio.
