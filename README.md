# VISION3DAI Control Familiar

## Descripción del proyecto

**VISION3DAI Control Familiar** es una aplicación web diseñada para gestionar y monitorear los hábitos saludables de una familia desde un solo lugar.

Permite registrar información de los integrantes de una familia, llevar un seguimiento de sus actividades y consultar estadísticas mediante un tablero interactivo (*dashboard*).

El sistema también está preparado para integrarse con **VISION3D**, el proyecto desarrollado por Richard, con el objetivo de mostrar los resultados de los análisis de ejercicios físicos dentro de la plataforma familiar.

Este repositorio se encarga de la gestión familiar y de la visualización de información. No implementa nuevamente el sistema de visión artificial, la cámara, las predicciones ni el entrenamiento de modelos de VISION3D.

## Funcionalidades principales

- **Gestión de usuarios:** registro e inicio de sesión.
- **Gestión familiar:** creación de familias y administración de perfiles.
- **Seguimiento de hábitos saludables:** registro de hidratación, alimentación y actividad física.
- **Metas y eventos:** creación y seguimiento de objetivos y actividades familiares.
- **Dashboard interactivo:** visualización de estadísticas, gráficos y resúmenes.
- **Integración con VISION3D:** configuración de la dirección del sistema externo y visualización de resultados cuando estén disponibles mediante la API.
- **Información de entrenamiento:** consulta de estadísticas del archivo `imagePoses.csv`, como parte del apoyo al proceso de entrenamiento existente.

## Tecnologías utilizadas

El proyecto utiliza tecnologías web y módulos nativos de Node.js para mantener una arquitectura modular sin depender de frameworks HTTP externos.

- **Node.js:** ejecución del servidor y lógica del backend.
- **`node:http`:** gestión de solicitudes y respuestas HTTP.
- **HTML, CSS y JavaScript:** desarrollo de la interfaz y sus funcionalidades.
- **Bootstrap:** diseño adaptable a distintos tamaños de pantalla.
- **Chart.js:** representación gráfica de estadísticas.
- **SQLite:** almacenamiento persistente de los datos.
- **`node:test`:** ejecución de pruebas automatizadas.

**Importante:** el backend utiliza el módulo nativo `node:http`; no utiliza Express ni otro framework HTTP.

## Requisitos

- Node.js 24 o superior, debido al uso del módulo nativo `node:sqlite`.
- Un navegador moderno.
- Git, si deseas clonar el repositorio.

## Instalación y ejecución

### 1. Obtener el proyecto

Clona el repositorio desde GitHub y accede a su carpeta:

```bash
git clone URL_DEL_REPOSITORIO
cd VISION3DAI-CONTROL-FAMILIAR
```

Reemplaza `URL_DEL_REPOSITORIO` por la dirección real del repositorio.

### 2. Configurar las variables de entorno

Copia el archivo de ejemplo:

```bash
cp .env.example .env
```

En Windows PowerShell puedes utilizar:

```powershell
Copy-Item .env.example .env
```

Revisa las variables del archivo `.env`, especialmente el puerto del servidor y `VISION3D_URL`, que debe apuntar a la dirección real de la instalación de VISION3D.

### 3. Preparar la base de datos

Ejecuta:

```bash
npm run migrar
```

Este comando crea o actualiza el esquema de SQLite necesario para almacenar la información de la aplicación.

### 4. Iniciar el servidor

```bash
npm start
```

Después de iniciar el servidor, abre en tu navegador:

`http://localhost:3000`

El puerto puede variar según la configuración del proyecto.

### 5. Primeros pasos

1. Registra una cuenta.
2. Inicia sesión.
3. Crea una familia.
4. Añade los perfiles familiares.
5. Registra hábitos saludables.
6. Crea metas y eventos.
7. Consulta el dashboard para revisar la información registrada.

## Comandos disponibles

| Comando | Función |
|---|---|
| `npm start` | Inicia el servidor normalmente. |
| `npm run desarrollo` | Ejecuta el modo de desarrollo con recarga automática. |
| `npm run migrar` | Crea o actualiza el esquema de la base de datos. |
| `npm run sembrar` | Ejecuta la utilidad de apoyo para datos iniciales, según su implementación. |
| `npm test` | Ejecuta las pruebas automatizadas con `node:test`. |
| `npm run verificar` | Comprueba la estructura del proyecto y verifica la ausencia de Express. |

## Integración con VISION3D

VISION3D es un sistema independiente desarrollado por Richard. Su procesamiento de visión artificial no se ejecuta dentro de este repositorio.

La integración se realiza mediante una configuración que permite indicar dónde se encuentra VISION3D.

La variable `VISION3D_URL`, definida en `.env`, especifica esa dirección. El dashboard consulta el endpoint:

`GET /api/configuracion/vision3d`

Con esta información, la interfaz puede habilitar el acceso a VISION3D cuando existe una URL configurada.

**Tener una URL configurada no garantiza que VISION3D esté funcionando ni que sus resultados se estén recibiendo.** Para mostrar análisis reales, ambos sistemas deben estar correctamente conectados y disponer de los endpoints necesarios.

## Seguridad

La aplicación incorpora medidas de seguridad para proteger las cuentas y las sesiones:

- Las contraseñas se procesan con `crypto.scrypt` y una sal única.
- Las sesiones persistentes almacenan el hash SHA-256 del token, en lugar del token original.
- Las cookies de sesión utilizan `HttpOnly` y `SameSite=Lax`, además de `Secure` en producción.
- Las consultas a SQLite utilizan parámetros para reducir el riesgo de inyección SQL.

Estas medidas contribuyen a la seguridad del sistema, aunque no sustituyen una revisión completa antes de desplegarlo en producción.

## Estructura del proyecto

El código está organizado por responsabilidades para facilitar su mantenimiento:

- `backend/nucleo`: infraestructura HTTP propia y componentes centrales del servidor.
- `backend/controladores`: recepción de solicitudes HTTP y preparación de respuestas.
- `backend/servicios`: lógica de negocio y reglas de la aplicación.
- `backend/repositorios`: acceso a la base de datos SQLite.
- `frontend`: páginas HTML, estilos CSS y JavaScript del cliente.
- `docs/richard`: documentación para la transferencia técnica y la integración.
- `datos/entrenamiento/imagePoses.csv`: archivo de datos de entrenamiento incluido en el proyecto.

Esta separación permite modificar una parte del sistema sin concentrar toda la lógica en un único archivo.

## Dataset de entrenamiento: imagePoses.csv

El proyecto incluye el archivo `datos/entrenamiento/imagePoses.csv` y funcionalidades para consultar un resumen normalizado de sus datos.

El endpoint autenticado:

`GET /api/entrenamiento/imageposes/resumen`

permite obtener estadísticas del dataset para mostrarlas en el tablero o utilizarlas como referencia durante el desarrollo.

Esta funcionalidad es informativa: **la aplicación no entrena modelos ni ejecuta el procesamiento de VISION3D**. Richard puede utilizar estas estadísticas para apoyar su proceso de trabajo con el sistema de entrenamiento existente.

## Objetivo del proyecto

El objetivo de VISION3DAI Control Familiar es centralizar la gestión familiar y el seguimiento de hábitos saludables, ofreciendo una interfaz que pueda complementarse con los resultados de análisis generados por VISION3D.

De esta manera, ambos proyectos mantienen responsabilidades separadas: Control Familiar administra y presenta la información, mientras que VISION3D se encarga de su procesamiento especializado.

