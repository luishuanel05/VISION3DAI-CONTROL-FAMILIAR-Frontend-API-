PRAGMA foreign_keys = ON;
CREATE TABLE IF NOT EXISTS usuarios (id INTEGER PRIMARY KEY AUTOINCREMENT,nombre TEXT NOT NULL,apellido TEXT NOT NULL,correo TEXT NOT NULL UNIQUE COLLATE NOCASE,clave_hash TEXT NOT NULL,rol TEXT NOT NULL DEFAULT 'adulto_responsable',activo INTEGER NOT NULL DEFAULT 1,creado_en TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,actualizado_en TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,ultimo_acceso_en TEXT);
CREATE TABLE IF NOT EXISTS sesiones (id INTEGER PRIMARY KEY AUTOINCREMENT,usuario_id INTEGER NOT NULL,token_hash TEXT NOT NULL UNIQUE,creado_en TEXT NOT NULL,expira_en TEXT NOT NULL,ultimo_uso_en TEXT NOT NULL,revocada INTEGER NOT NULL DEFAULT 0,FOREIGN KEY(usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE);
CREATE TABLE IF NOT EXISTS familias (id INTEGER PRIMARY KEY AUTOINCREMENT,usuario_propietario_id INTEGER NOT NULL,nombre TEXT NOT NULL,creado_en TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,FOREIGN KEY(usuario_propietario_id) REFERENCES usuarios(id) ON DELETE CASCADE);
CREATE TABLE IF NOT EXISTS perfiles (id INTEGER PRIMARY KEY AUTOINCREMENT,familia_id INTEGER NOT NULL,nombre TEXT NOT NULL,alias TEXT,color TEXT DEFAULT '#198754',tipo TEXT NOT NULL DEFAULT 'integrante',activo INTEGER NOT NULL DEFAULT 1,creado_en TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,FOREIGN KEY(familia_id) REFERENCES familias(id) ON DELETE CASCADE);
CREATE TABLE IF NOT EXISTS hidratacion (id INTEGER PRIMARY KEY AUTOINCREMENT,perfil_id INTEGER NOT NULL,cantidad_ml INTEGER NOT NULL CHECK(cantidad_ml>0),fecha TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,observacion TEXT,FOREIGN KEY(perfil_id) REFERENCES perfiles(id) ON DELETE CASCADE);
CREATE TABLE IF NOT EXISTS alimentacion (id INTEGER PRIMARY KEY AUTOINCREMENT,perfil_id INTEGER NOT NULL,tipo TEXT NOT NULL,descripcion TEXT NOT NULL,fecha TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,observacion TEXT,FOREIGN KEY(perfil_id) REFERENCES perfiles(id) ON DELETE CASCADE);
CREATE TABLE IF NOT EXISTS actividades (id INTEGER PRIMARY KEY AUTOINCREMENT,perfil_id INTEGER NOT NULL,nombre TEXT NOT NULL,duracion_minutos INTEGER NOT NULL CHECK(duracion_minutos>0),ubicacion TEXT NOT NULL DEFAULT 'interior',intensidad TEXT,metodo TEXT NOT NULL DEFAULT 'manual',fecha TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,observacion TEXT,FOREIGN KEY(perfil_id) REFERENCES perfiles(id) ON DELETE CASCADE);
CREATE TABLE IF NOT EXISTS metas (id INTEGER PRIMARY KEY AUTOINCREMENT,familia_id INTEGER NOT NULL,perfil_id INTEGER,titulo TEXT NOT NULL,descripcion TEXT,categoria TEXT NOT NULL,tipo TEXT NOT NULL DEFAULT 'individual',valor_objetivo REAL NOT NULL,valor_actual REAL NOT NULL DEFAULT 0,unidad TEXT NOT NULL,estado TEXT NOT NULL DEFAULT 'pendiente',fecha_objetivo TEXT,creado_en TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,FOREIGN KEY(familia_id) REFERENCES familias(id) ON DELETE CASCADE,FOREIGN KEY(perfil_id) REFERENCES perfiles(id) ON DELETE CASCADE);
CREATE TABLE IF NOT EXISTS eventos_calendario (id INTEGER PRIMARY KEY AUTOINCREMENT,familia_id INTEGER NOT NULL,perfil_id INTEGER,titulo TEXT NOT NULL,tipo TEXT NOT NULL,fecha_inicio TEXT NOT NULL,fecha_fin TEXT,descripcion TEXT,FOREIGN KEY(familia_id) REFERENCES familias(id) ON DELETE CASCADE,FOREIGN KEY(perfil_id) REFERENCES perfiles(id) ON DELETE SET NULL);
CREATE TABLE IF NOT EXISTS accesos_vision3d (id INTEGER PRIMARY KEY AUTOINCREMENT,usuario_id INTEGER NOT NULL,fecha TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,FOREIGN KEY(usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE);
CREATE INDEX IF NOT EXISTS idx_sesiones_token ON sesiones(token_hash); CREATE INDEX IF NOT EXISTS idx_perfiles_familia ON perfiles(familia_id); CREATE INDEX IF NOT EXISTS idx_hidratacion_perfil_fecha ON hidratacion(perfil_id,fecha); CREATE INDEX IF NOT EXISTS idx_actividades_perfil_fecha ON actividades(perfil_id,fecha);

CREATE TABLE IF NOT EXISTS analisis_vision3d (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  familia_id INTEGER NOT NULL,
  perfil_id INTEGER,
  id_externo TEXT,
  ejercicio TEXT NOT NULL,
  repeticiones INTEGER CHECK (repeticiones IS NULL OR repeticiones >= 0),
  repeticiones_correctas INTEGER CHECK (repeticiones_correctas IS NULL OR repeticiones_correctas >= 0),
  repeticiones_mejorables INTEGER CHECK (repeticiones_mejorables IS NULL OR repeticiones_mejorables >= 0),
  confianza_promedio REAL CHECK (confianza_promedio IS NULL OR confianza_promedio BETWEEN 0 AND 1),
  visibilidad_landmarks_promedio REAL CHECK (visibilidad_landmarks_promedio IS NULL OR visibilidad_landmarks_promedio BETWEEN 0 AND 1),
  tiempo_inferencia_ms REAL CHECK (tiempo_inferencia_ms IS NULL OR tiempo_inferencia_ms >= 0),
  duracion_segundos REAL CHECK (duracion_segundos IS NULL OR duracion_segundos >= 0),
  resultado TEXT CHECK (resultado IS NULL OR resultado IN ('correcto', 'mejorable', 'sin_datos')),
  modelo_version TEXT,
  fecha TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  datos_adicionales_json TEXT,
  FOREIGN KEY (familia_id) REFERENCES familias(id) ON DELETE CASCADE,
  FOREIGN KEY (perfil_id) REFERENCES perfiles(id) ON DELETE SET NULL,
  UNIQUE (familia_id, id_externo)
);

CREATE INDEX IF NOT EXISTS idx_analisis_vision3d_familia_fecha
  ON analisis_vision3d(familia_id, fecha);
